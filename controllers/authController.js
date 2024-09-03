import User from "../Models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    const hashPassword=bcryptjs.hashSync(password,10)

    try {
        const newUser = new User({ username, email, password :hashPassword});

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {

        console.log("Error during user creation:", error);

        next(error); 
    }
}

export const signin=async(req,res,next)=>{

    const {email,password}=req.body

    console.log(req.body)

    try {
        
        const validUser=await User.findOne({email})

        if(!validUser) return next(errorHandler(404,'User not found'))
           
        const validPassword=bcryptjs.compareSync(password,validUser.password) 
        
        if(!validPassword) return next(errorHandler(401,'Wrong Password'))

        const token=jwt.sign({id:validUser._id},process.env.JMT_SECRET)  
        
        const {password:hashPassword,...rest}=validUser._doc

        const expiryDate=new Date(Date.now()+360000);
        
        res.cookie ('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)

    } catch (error) {

        next(error)
    }
}

