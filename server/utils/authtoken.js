import Jwt from 'jsonwebtoken'
const SECRET = "ashishjaat1234"
const exp = 7
export const sendtoken = (user,res , message)=>{
    const token =  Jwt.sign({id: user._id}, SECRET)
    const option = {
        expires: new Date(
            Date.now() + exp * 24 * 60 *1000
        ),
        httpOnly : true
    };

res.status(200).cookie("token" , token , option).json({
    success: true,
    user,
    message,
    token
})



}