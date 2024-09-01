import { log } from 'console';
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from '../routes/user_routes.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Db connect')
})
.catch((err)=>{
    console.log(err)
})

const app=express();


app.use('/',userRoutes)

app.listen(3000,()=>{
    console.log('server is rinning')
})