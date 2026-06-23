const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
const connectDB = require("./src/config/db.js");
const authRoutes = require('./src/routes/authRoutes');

const productRoutes = require("./src/routes/productRoutes");


dotenv.config();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use('/api/auth',authRoutes);
app.use('/api/login',authRoutes);
app.use('/api/profile',authRoutes);


app.use("/api/products", productRoutes);


connectDB();


app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
})