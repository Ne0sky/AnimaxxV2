import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = (req, res, next) => {
    const token = req.get("Authorization");
    console.log("token:",token);
    if (!token) {
        return res.status(401).json({
            message: "Access Denied",
        });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid Token",
        });
    }
};
