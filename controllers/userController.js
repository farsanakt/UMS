import User from "../Models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const test=(req,res)=>{
    res.json({
        message:'apiiiiiii'
    })
}


export const updateUser=async(req,res,next)=>{

    if(req.user !== req.params.id){
       
        return next(errorHandler(401,'you can update only your account'))
    }
    
    try {
        
        if(req.body?.password){

            req.body.password=bcryptjs.hashSync(req.body.password,10)

        }
       
        const updatedUser=await User.findByIdAndUpdate(

            req.params.id,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                }
            },
            {new:true}
        )
    
        res.status(200).json({data:updatedUser})

       
    } catch (error) {

        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{

    if(req.user !== req.params.id){
       
        return next(errorHandler(401,'you can delete only your account'))
    }
    try {
        
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json('User has been deleted....')

    } catch (error) {
        
    }

}