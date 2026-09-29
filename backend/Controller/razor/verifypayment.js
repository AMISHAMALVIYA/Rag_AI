const crypto = require("crypto");

exports.verifyPayment = async (req, res) => {

  const db = getDB();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Invalid Signature"
    });
  }

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  await db.collection("subscriptions").updateOne(
    { razorpayOrderId: razorpay_order_id },
    {
      $set: {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "Paid",
        subscriptionStatus: "Active",
        startDate: new Date(),
        endDate
      }
    }
  );

  res.json({
    success: true,
    message: "Subscription Activated"
  });
};