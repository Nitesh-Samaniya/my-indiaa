require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

let swaggerFile;
if (fs.existsSync('./swagger_output.json')) {
    swaggerFile = require('./swagger_output.json');
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

// routes
app.use('/auth/user', require('./routes/authRoutes'));
app.use('/user/profile', require('./routes/userRoutes'));
app.use('/product', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/orders', require('./routes/orderRoutes'));

app.get("/", (req, res)=>{
    res.send("My Indiaa backend application.");
})

app.listen(PORT, ()=>{
    connectDB();
    console.log(`app running on http://localhost:${PORT}`)
})