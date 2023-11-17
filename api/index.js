import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser';

// connecting to mongoose
mongoose.connect("mongodb+srv://anuragyadav290902:ram@ram.fq5dfu0.mongodb.net/").then(() =>{
    console.log('Connected to Database');
}).catch((err) =>{
  console.log(err)});


const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(4000 ,()=>{
    console.log('Server started');
})

// providing the roots functionality
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})