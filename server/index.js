import app from './app.js'
// import express from "express";
// import path  from "path";

// app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
    
app.listen(5000,()=> console.log(`Server running on port 5000`))