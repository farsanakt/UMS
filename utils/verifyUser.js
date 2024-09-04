import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";
import { config } from 'dotenv';
config()

const secret=process.env.JMT_SECRET|| "";


export const verifyToken = async(req, res, next) => {

    const token = req.cookies?.jwt;
  
    if (!token) {
        
        return next(errorHandler(401, 'You are not authenticated'));
    }
  
    const payload= jwt.verify(token,secret);
    
    req.user=payload.id

    next()

};
