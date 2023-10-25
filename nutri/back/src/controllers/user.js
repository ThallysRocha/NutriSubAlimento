import { User } from "../models/user.js";

export default class UserController {
    createUser = async (request, response) => {
        const {email} = request.body;
        try{
            if(await User.findOne({email})){
                return response.status(400).json({error: "User already exists"});
            }
            const user = await User.create(request.body);
            user.password = undefined;
            return response.status(201).json({user});
        } catch(error){
            return response.
                status(400).
                json({message: "Registration failed", error: error});
        }
    };
    getAllUsers = async (request, response) => {
        try{
            const users = await User.find();    
            if(users.length > 0)
                return response
                    .status(200)
                    .json({users});
            else
                return response
                    .status(404)
                    .json({error: "No users found"});
        } catch(error){
            return response.status(400).json({error: error});
        }
    };
    getUser = async  (request, response) => {
        try{
            const user = await User.findById({ _id: request.params.userId });
            if (user) return response.send({ user });
            else 
                return response
                    .status(404)
                    .json({ error: "User not found" });
        } catch (error){
            return response
                .status(500)
                .json({ message: "Something went wrong with the server", error });
        }
    };
    editUser = async (request, response) => {
        try{
            if(await User.findOne({ _id: request.userId})){
            const body = request.body;
            //delete body.password;
            delete body.createdAt;
            delete body._id;
            await User.updateOne({ _id: request.userId }, body);
            return response.send(body);
            }else
                return response
                    .status(404)
                    .json({ error: "User not found" });
        }
        catch(error){
            return response
                .status(500)
                .json({ message: "Something went wrong with the server", error });
        }
        
    };
}