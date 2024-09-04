import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const signup = async (req, res, next) => {

  const { username, email, password } = req.body;

   const hashPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password:hashPassword });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error during user creation:", error);

    next(error);
  }
};

export const signin = async (req, res, next) => {

  console.log('wroking')

  const { email, password } = req.body;

  console.log(email,password)

  try {

    const secret = process.env.JMT_SECRET || "";

    console.log(secret)
  
    const validUser = await User.findOne({ email });


    if (!validUser) return res.status(400).json({mesage:"user not exist"})

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return res.status(400).json({mesage:"wrong passowrd"})

    const token = jwt.sign({ id: validUser._id }, secret);

    const { password: hashPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 360000);

    res
    
      .cookie("jwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/", })
      .status(200)
      .json(rest);

  } catch (error) {
    console.log(error)
    next(error);
  }
};


export const signout=(req,res)=>{
 try{
  
  res.clearCookie('access_token').status(200).json({message:'signout success'})

 }catch(err){
  console.log(err)
 }
}
