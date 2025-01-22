import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const auth = async(req, res, next) => { 

    try {

        const token = req.header('Authorization').replace("Bearer ", "");

        if (!token) { 

            return res.status(401).json({
                success: false,
                message: "Access Denied token is required"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) { 

            return res.status(401).json({
                success: false,
                message: "Access Denied token is expired or invalid"
            })
        }

        req.user = payload;
        next();


    } catch (error) { 

        console.log("Error occured while signing up", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while signing up",
            error : error.message
        })
    }
}