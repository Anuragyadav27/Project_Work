import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        //defining usename 
        type: String , required: true, unique: true
    },
    email: {
        type: String , required: true, unique: true
    },
    password: {
        type: String , required: true
    },
    passwordUpdated: {
        // for change update regarding the password
        type: Date,
        default: null 
    }
} , {timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;