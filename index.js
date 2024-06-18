require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("My Indiaa backend application.");
})

app.listen(PORT, ()=>{
    console.log(`app running on http://localhost:${PORT}`)
})