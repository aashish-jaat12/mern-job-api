import jwt from 'jsonwebtoken'
import {User} from "../models/User.js"
const SECRET = "ashishjaat1234"


export const isAuthorized = async (req , res , next) =>{
    const {token} = req.cookies;
    if(!token){
      return  res.status(400).json({
            success : false,
            message : "user not auth"
        })
    }
const decode = jwt.verify(token , SECRET )


req.user = await User.findById(decode.id)
 next()
}