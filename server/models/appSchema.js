import mongoose from "mongoose";


const appschema = new mongoose.Schema({
name:{
    type: String,
    required: true
},
email:{
type: String,
required: true
},
phone:{
    type: Number,
    required: true
},
resume:{
    public_id:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
},
applicantID:{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
role:{
    type: String,
    enum: ["job-Seeker"],
    required: true
}
},
employerID:{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
role:{
    type: String,
    enum: ["Employer"],
    required: true
}
}
})
export const applicant = mongoose.model("applicant", appschema)