import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
title:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
category:{
    type: String,
    required: true
},
country:{
    type: String,
    required: true
},
city:{
    type: String,
    required: true
},
location:{
    type: String,
    required: true
},

salaryFrom:{
    type: Number,
    required: true
},

expired:{
    type: Boolean,
  default: false
},
jobPostedOn:{
    type: Date,
    default: Date.now
},
PostedBy:{
    type: mongoose.Schema.ObjectId,
   ref: "user",
   required: true
}

})

export const job = mongoose.model("job", jobschema)