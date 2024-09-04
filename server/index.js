import { log } from 'console';
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from '../routes/user_routes.js'
import authRoutes from '../routes/auth_route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Db connect')
})
.catch((err)=>{
    console.log(err)
})

const app=express();
app.use(express.json());

app.use(cookieParser())



app.use('/',userRoutes)
app.use('/auth',authRoutes)

app.use((err,req,res,next)=>{

    const statusCode=err.statusCode || 500;
    const message=err.message || 'internal server error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})

app.listen(3000,()=>{
    console.log('server is rinning')
})