require("dotenv").config();


const express=require("express");

const cors=require("cors");


const {
connectDB
}=require("./Model/db");


const upload=require("./Route/upoload");

const ask=require("./Route/ask");


const app=express();


app.use(cors());

app.use(express.json());


app.use("/api",upload);

app.use("/api",ask);



connectDB();


app.listen(5008,()=>{

console.log("Server running");

});