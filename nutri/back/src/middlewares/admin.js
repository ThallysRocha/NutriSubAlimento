import jwt from "jsonwebtoken";

export const adminMiddleware = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "No token provided" });
  }

  const authHeaderSplitted = authHeader.split(" ");

  if (authHeaderSplitted.length !== 2) {
    return response.status(401).json({ error: "Invalid token" });
  }

  const [scheme, token] = authHeaderSplitted;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: "Invalid token" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_HASH_SECRET);
    request.userId = decoded.id;
  } catch (error) {
    return response.status(401).json({ error: "Invalid token" });
  }
  let isAdmin = false;
  
  const adminIds = process.env.ADMIN_IDS.split(',').map((id) => id.replace('"', '').replace('"', ''));
  console.log(adminIds,request.userId);
  adminIds.forEach((adminId) => {
    if (request.userId == adminId && !isAdmin) {
      isAdmin = true;
    }
  });
    if (!isAdmin) {
        //console.log(adminIds[1],request.userId,adminIds[1]==request.userId,isAdmin);
        return response.status(401).json({ error: "Only admin users can access this route"});
    }
  return next();
};
