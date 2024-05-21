import express from "express";
const router = express.Router();
import { applicant } from "../models/appSchema.js"
import { isAuthorized } from "../middlewares/auth.js"

import mime from 'mime'
import {job} from '../models/jobSchema.js'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'daf7smkia', 
  api_key: '784632231634692', 
  api_secret: 'GYg8qbtl4LViCOt8CEMzIaYlQhE' 
});

////////////////////////////getEmployer-recvedjobs///////////////////

router.get("/getEmployer-recvedjobs", isAuthorized, async (req, res, next) => {

    const { role } = req.user;
    if (role === "job-Seeker") {
        return res.status(400).json({
            success: false,
            message: "job Seeker is not allowed this resourcess"
        })
    }
    const { _id } = req.user;
    const applicants = await applicant.find({ 'employerID.user': _id })
    res.status(200).json({
        success: true,
        message: "job applicants",
        applicants
    })
})

//////////////////getjobs-seeker-appjob//////////////////

router.get("/getjobs-seekerappjob", isAuthorized, async (req, res, next) => {

    const { role } = req.user;
    if (role === "Employer") {
        return res.status(400).json({
            success: false,
            message: "job Employer is not allowed this resourcess"
        })
    }
    const { _id } = req.user;
    const applicants = await applicant.find({ 'applicantID.user': _id })
    res.status(200).json({
        success: true,
        message: "job applicants",
        applicants
    })
})
/////////////////delete applicatin////////////////////



router.delete("/deletejobs-seeker/:id", isAuthorized, async (req, res, next) => {

    const { role } = req.user;
    if (role === "Employer") {
        return res.status(400).json({
            success: false,
            message: "job Employer is not allowed this resourcess"
        })
    }
    const { id } = req.params

    const appliction = await applicant.findById(id)
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "applicant not founds"
        })
    }

    await appliction.deleteOne()
    res.status(200).json({
        success: true,
        message: "delete succfully appliction",

    })
})

///////////////////post application/////////////////


router.post("/postapplications", isAuthorized,  async (req, res, next) => {

    const { role } = req.user;
    if (role === "Employer") {
        return res.status(400).json({
            success: false,
            message: "job Employer is not allowed this resourcess"
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            message: "resuma file required"
        })
    }

    const { resume } = req.files;
    const allowedFormate = mime.getType('png', 'jpg', "webp");

    if (!allowedFormate) {
        return res.status(400).json({
            success: false,
            message: "file type only PNG , JPG , WEBP"
        })
    }


    const cloudinaryResponse = await  cloudinary.uploader.upload( resume.tempFilePath , function(error, result) {
        //   console.log(result,  error)
        })

   

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        
      return  res.status(400).json({
            success: false,
            message: "faild to uplode resume"
        })
    }
    const { name, email, phone, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "job-Seeker"
    };

    if (!jobId) {

        res.status(400).json({
            success: false,
            message: "job not found"
        })
    }

    const jobdetails = await job.findById(jobId)
    if (!jobdetails) {
      return  res.status(400).json({
            success: false,
            message: "job not found"
        })
    }
    const employerID = {
        user: jobdetails.PostedBy,
        role: "Employer"
    }
    if (!name || !email || !phone || !employerID || !resume || !applicantID) {
      return  res.status(400).json({
            success: false,
            message: "enter full delials"
        })

    }

    const applicantss = await applicant.create({
        name, email, phone, employerID, applicantID, resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }

    });

    res.status(200).json({
        success: true,
        message: "application posted  succfully ",
        applicantss
    })
})




export default router
