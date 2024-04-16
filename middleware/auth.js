import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = (req, res, next) => {
    let token = req.headers.authorization;
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
