const express = require("express");
const Razorrouter = express.Router();

const {
  createOrder,
 
} = require("../../Controller/razor/createorder");

const {  verifyPayment }  = require("../../Controller/razor/verifypayment")
Razorrouter.post("/create/order", createOrder);
Razorrouter.post("/verify/payment", verifyPayment);

module.exports = Razorrouter;