const {Login}  = require('../Controller/user')


const express = require('express')
const verifyToken = require('../Controller/middleware')

const userRouter = express.Router()


userRouter.post("/login",  Login)


module.exports = {userRouter}