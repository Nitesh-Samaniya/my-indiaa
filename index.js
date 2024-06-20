require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

// routes
app.use('/auth/user', require('./routes/authRoutes'));
app.use('/user/profile', require('./routes/userRoutes'));
app.use('/product', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));

app.get("/", (req, res)=>{
    res.send("My Indiaa backend application.");
})

app.listen(PORT, ()=>{
    connectDB();
    console.log(`app running on http://localhost:${PORT}`)
})