import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";
import dotenv from 'dotenv';
dotenv.config()

const secret=process.env.JMT_SECRET;


export const verifyToken = async(req, res, next) => {

   try {
    console.log(process.env.JWT_SECRET);
    const token = req.cookies?.jwt;
    
    console.log('akakakakakakka',req.cookies);
    
    if (!token) {
        console.log('ajajaj');
        
        return next(errorHandler(401, 'You are not authenticated'));
    }
  
    console.log('akakakakakakkaaaaaaaaa');
    const payload=  jwt.verify(token,process.env.JWT_SECRET);
    console.log('akakakakakakkaaaaaaaaa');
    
    req.user=payload.id

    next()
   } catch (error) {
    console.log(error);
    
        next(errorHandler(400,error.message))
   }

};
