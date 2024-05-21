import express from "express";
const app = express()
import db  from './database/db.js'
import cors from 'cors'
// import path  from "path";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoutr from './routes/userRouter.js'
import applicationRoutr from './routes/applicationRoutr.js'
import jobRoutr from './routes/jobRouter.js'
// import { register } from "./controllers/userController.js";


app.use(
    cors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', "DELETE", "PUT"],
        credentials: true
    }))


app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/user' , userRoutr)
app.use('/application' , applicationRoutr)
app.use('/job' , jobRoutr)
export default app;

    
