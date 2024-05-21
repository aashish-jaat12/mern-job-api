import express from "express";
import { job } from "../models/jobSchema.js";

import { isAuthorized } from "../middlewares/auth.js"
import { User } from "../models/User.js";
const router = express.Router();

////////////////////all job ///////////////////////////
router.get("/getall", async (req, res) => {

    const jobs = await job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs
    })

})

///////////////////post job ///////////////////

router.post("/post", isAuthorized, async (req, res, next) => {

    const { role } = req.user;
   
  
    if (role === "job-Seeker") {
        return res.status(400).json({
            success: false,
            message: "job Seeker is not allowed this resourcess"
        })
    }

    const { title, description, category, country, city, location, salaryFrom } = req.body;


    if (!title || !description || !category || !country || !city || !location || !salaryFrom) {

        return res.status(400).json({
            success: false,
            message: "provide full job details"
        })
    }


    const PostedBy = req.user._id;
   
    
    const jobs = await job.create({
        title, description, category, country, city, location, salaryFrom, PostedBy
    })
    res.status(200).json({
        success: true,
        message: "job posted sucessful",
        jobs
    })
})

///////////////// my jobs ////////////////////////////
router.get("/getmyjob",isAuthorized, async(req , res , next)=>{


    const { role } = req.user;
   
  
    if (role === "job-Seeker") {
        return res.status(400).json({
            success: false,
            message: "job Seeker is not allowed this resourcess"
        })
    }

    const myjob = await job.find({PostedBy: req.user._id})
    res.status(200).json({
        success: true,
        message: "my jobs",
        myjob
    })

})

////////////update/////////////////


router.put("/update/:id", isAuthorized, async (req , res, next)=>{
   
const {id } = req.params;
const { role } = req.user;
if (role === "job-Seeker") {
    return res.status(400).json({
        success: false,
        message: "job Seeker is not allowed this resourcess"
    })
}


let update = await job.findById(id)

if (!update) {
    return next( res.status(400).json({
        success: false,
        message: "job not find"
    }))
}

update = await job.findByIdAndUpdate(id ,req.body ,{
    new: true,
    runValidators: true,
    useFindAndModify: false
});
res.status(200).json({
    success: true,
    message: "job update succfully",
    update
})

})

////////////////////////delete////////////////////////

router.delete("/delete/:id", isAuthorized, async (req , res, next)=>{
    const {id } = req.params;
    const { role } = req.user;
    if (role === "job-Seeker") {
        return res.status(400).json({
            success: false,
            message: "job Seeker is not allowed this resourcess"
        })
    }
const ids = await job.findById(id)
      
if (!ids) {
    return next( res.status(400).json({
        success: false,
        message: "Oooo ! job not find"
    }))
}

    const  deletes = await job.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: "job delete succfully",
        deletes
    })
})



router.get("/getjobdetails/:id", isAuthorized, async (req , res, next)=>{
    const {id } = req.params; 
    try {
        const responce = await job.findById(id);
        if(!job){
            return next( res.status(400).json({
                success: false,
                message: "Oooo ! job not find"}))
        }
        res.status(200).json({
            success: true,
            message: "job details",
            responce
        })
    } catch (error) {
        return res.status(400).json({error
        })
    }

})
export default router
