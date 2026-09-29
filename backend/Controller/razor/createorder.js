// const { getDB } = require("../../Model/db");
// require("dotenv").config();
// console.log(process.env.RAZORPAY_KEY_ID);
// console.log(process.env.RAZORPAY_KEY_SECRET);



const Razorpay = require("razorpay");
const { getDB } = require("../../Model/db");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.createOrder = async (req, res) => {
  try {
    const db = getDB();

    const { userId, plan, amount } = req.body;
console.log(req.body);
    const options = {
      amount: amount * 100, // ₹499 => 49900 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    await db.collection("subscriptions").insertOne({
      userId,
      plan,
      amount,
      razorpayOrderId: order.id,
      paymentStatus: "Pending",
      subscriptionStatus: "Inactive",
      createdAt: new Date()
    });

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID, // Send public key to frontend
      order
    });

  } catch (err) {
    console.error("Create Order Error:", err);

    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
}
  
};