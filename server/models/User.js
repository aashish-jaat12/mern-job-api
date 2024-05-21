import mongoose from "mongoose";

const userschema = new mongoose.Schema ({

name:{
    type: String ,
    required: [true, "Plz Provide your name"],
   
},
email:{
    type: String ,
    required: [true, "Plz Provide your email"],
   
},
phone:{
    type: Number ,
    required: [true, "Plz Provide your number"],
   
},
password:{
    type: String ,
    required: [true, "Plz Provide your password"],
    
},
role:{
    type: String ,
    required: [true, "Plz Provide your role"],
    enum: ["job-Seeker", "Employer"]
},
createdAt:{
    type: Date,
    default: Date.now
}
})


export const User = mongoose.model("User" , userschema)