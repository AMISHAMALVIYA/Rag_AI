const express = require('express')

const router = require('../backend/Route/cousreRouter')

const Teacherouter = require("./Route/teacherRouter")
const Studentrouter  = require("./Route/studentRouter")
const { connectDB } = require("./Model/db");

const path = require('path')
const cors = require('cors')
const app = express()
app.use(cors())


app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(express.json())
async function startServer() {
  await connectDB();
app.use("/",router)


app.use("/",Studentrouter)
app.use("/",Teacherouter)

app.listen(3000,()=>{
    console.log("server is on")
    console.log(router)
})
}
startServer();