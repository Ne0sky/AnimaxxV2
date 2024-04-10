
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userdb from '../models/UserSchema.js';
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userdb.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(400).json({
                message: "User already exists",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                },
            });
        }
        const newUser = new userdb({
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.status(200).json({
            message: "User registered successfully",
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userdb.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }   
    catch (err) {
        console.log(err);
    }
}


