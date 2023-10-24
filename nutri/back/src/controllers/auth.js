import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { User } from '../models/user.js';

export default class AuthController {
    constructor() {}
    login = async (request, response) => {
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return response.status(400).json({ error: "Invalid credentials" });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return response.status(400).send({ error: "Invalid credentials" });
        }
        user.password = undefined;
        const token = jwt.sign({ id: user.id }, process.env.JWT_HASH_SECRET, {
            expiresIn: 86400,
        });
        response.send({ user, token });

    };
    validateToken = async (request, response) => {
        return response.json({userId: request.userId});
    };
}