import express from "express"
import colors from "colors"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
// import path from 'path'
//configure env
dotenv.config();

//database config
connectDB();
//rest object
const app=express();

// middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth",authRoutes);
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

// app.use(express.static(path.join(__dirname,'./client/build')))

//rest api
// app.use("*",function(req,res){
//     res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })

//-----------------
app.get("/",(req,res)=>{
    res.send(
        "<h1>Welcome the ecomerce app</h1>"
    )
})

//port
const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port  ${PORT}`.bgCyan.white);
}); 
