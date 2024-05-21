import express from "express";
const router = express.Router();
import { User } from "../models/User.js"
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'
import { sendtoken } from '../utils/authtoken.js'
import { isAuthorized } from "../middlewares/auth.js";


router.post('/registation', [

    body('email', "Enter email....? ").isEmail(),
    body('name', "Plz provide full name....? ").isLength({ min: 3 }),
    body('password', "Min Length 6...?  ").isLength({ min: 5 }),
    body('phone', "plz provide 10 digits number...?").isLength({ min: 10 })
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const { name, email, phone, role } = req.body;

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        const isemail = await User.findOne({ email })

        if (!name && !email && !phone && !role && !password) {


            return res.status(400).json({
                success: false,
                message: "enter your all requrid ingormation "
            })
        }

        if (isemail) {
            return res.status(400).json({
                success: false,
                message: "User already registered "
            })
        }



        const user = await User.create({
            name, email, phone, role, password
        })
        sendtoken(user, res, "user registered successfully")
    }



)




router.post('/login', async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Enter user right information ",

        })
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "invalid user "
        })
    }

    const ispassword = await bcrypt.compare(password, user.password)
    if (!ispassword) {
        return res.status(400).json({
            success: false,
            message: "invalid password "
        })
    }
    if (user.role !== role)
        return res.status(400).json({
            success: false,
            message: "thid role not found"
        })
    sendtoken(user, res, "User login succfully")

})

router.get('/logout', async (req, res) => {

    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logout"
    })

})


router.get('/getuser', isAuthorized, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })

})

export default router