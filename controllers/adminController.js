import dotenv from 'dotenv'
import bcryptjs from "bcryptjs";
import generateToken from '../jwt.js';
import User from '../Models/userModel.js';
dotenv.config();


export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL) {

            if (password === process.env.ADMIN_PASSWORD) {
                
                const token = generateToken(process.env.ADMIN_EMAIL);
               
                return res.status(200).json({ message: 'Logged in successfully', success: true, token });

            } else {

                return res.status(200).json({ message: 'Invalid password' });

            }

        } else {

            return res.status(200).json({ message: 'Invalid email' });

        }
    } catch (error) {

        console.error('Error in login:', error);

        res.status(500).json({ message: 'Server error' });
    }
};

export const user = async (req, res) => {

    try {

      const users = await User.find({})

      res.status(200).json(users);

    } catch (error) {

      console.error('Error fetching users:', error);

      res.status(500).json({ message: 'Error fetching users' });

    }

  };  

export const newUser=async(req,res)=>{

    const {username,password,email}=req.body

    const hashPassword=bcryptjs.hashSync(password,10)

    const userExist=await User.findOne({$or:[{email},{username}]})

    if(userExist) return res.status(400).json({message:"user already exist"})

        const newUser=new User({

            username:username,
            email,
            password:hashPassword

        })

        newUser.save()
        res.status(200).json('User Added successfully.....!')

    try {
        
    } catch (error) {
        
        console.log(error)

    }
}

export const deleteUser = async (req, res, next) => {   

    console.log(req.params.id,'id')
    
    try {

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({success:true,message:'User Delete Successfully...'});
        
    } catch (error) {
        
        next(error)

    }

};


export const getUser=async(req,res)=>{

    try {
        
        const userData=await User.findById({_id:req.params.id})

         res.status(200).json({user:userData})


    } catch (error) {

        console.log(error)

    }
}

export const editUser = async (req, res) => {

    try {

      const updateFields = {}

      if (req.body.username) updateFields.username = req.body.username

      if (req.body.password) updateFields.password = req.body.password
  
      const user = await User.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
  
      res.status(200).json(user)

    } catch (error) {

      console.log(error)

      res.status(500).json({ message: "Server Error" })

    }
  }
  