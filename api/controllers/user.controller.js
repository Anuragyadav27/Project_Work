import User from "../modals/user.modal.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const UpdateUser =async(req ,res , next) =>{
    //check if user is valid aur not
   if(req.user.id !== req.params.id) return next(errorHandler(401 , "You do not have permission to change the password"))
 
   try {
    if(req.body.password){
        //encrypting new  password
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }

    // Update user details and record the update time
    const currentTime = new Date(); 

    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
       //updating password
        $set:{
            password: req.body.password,
            // record the update time
            passwordUpdated: currentTime, // Record password update time
        }
    } , {new: true})
    res.status(200).json(updatedUser)
   } catch (error) {
    next(error)
   }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can not delete others account"))

    try {
        // finding the user and deleting it
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User deleted successfully')
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}