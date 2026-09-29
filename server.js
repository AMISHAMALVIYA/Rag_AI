require("dotenv").config();

const express = require("express");

const mongodb = require("mongodb");
const cors = require("cors");
const Notesrouter = require('./backend/Route/notesRouter')
const path = require('path')
const {userRouter} = require('./backend/Route/userRouter') 
    const   router=require("./backend/Route/teacher2")
     const Stuentrouter = require("./backend/Route/student")

const    Razorrouter  = require("./backend/Route/razorRoute/razorRouter")
 


const app = express();









app.use(cors());
app.use(express.json());


 app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))

 )
 app.use("/teacher",router)

 

app.use("/student",Stuentrouter)


app.use("/payment",Razorrouter)
app.use("/",userRouter)
const fs = require("fs");
app.use('/api', router);

app.get("/test", (req, res) => {
  const file = path.join(__dirname, "uploads", "12345-node.pdf");

  console.log(file);
  console.log(fs.existsSync(file));

  res.send(fs.existsSync(file) ? "FOUND" : "NOT FOUND");
});
app.use("/",Notesrouter)
const { connectDB } = require("./backend/Model/db");

async function startServer() {
  await connectDB(); // ← must happen BEFORE app.listen
  app.listen(5004, () => console.log("Server Running On Port 5004"));
}





startServer()



















