import { errorHandler } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    console.log("middle cookie :",req.cookies);

    if(!token) return next(errorHandler(401,'Unauthorised token'))

    // const decoded = jwt.decode(token);
    // console.log(decoded);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return next(errorHandler(403,'Forbidden'));

        req.user = user;
        next(); // going to the next function if we get a user
    })
}