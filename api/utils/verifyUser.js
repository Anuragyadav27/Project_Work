import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req , res , next) => {
        const token = req.cookies.access_token;
// checking for token which we initialized when user user is created
        if(!token) return next(errorHandler(401, 'unauthorized'));

        jwt.verify(token,'anuragyadav', (err , user) =>{
            if(err) return next(errorHandler(403,'forbidden'));

            req.user = user;
            next();
        });
}