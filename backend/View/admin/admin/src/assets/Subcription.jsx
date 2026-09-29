import axios from "axios";

function Subscription() {

  const userId = localStorage.getItem("userid");

  const subscribe = async (plan) => {

    try {

      const res = await axios.post(
        "http://localhost:5004/payment/create/order",
        {
              userId,
    plan: "Premium",
    amount: 999
        }
      );

      const { key, order } = res.data;

      const options = {

        key,

        amount: order.amount,

        currency: order.currency,

        name: "TNP Learning",

        description: `${plan} Subscription`,

        order_id: order.id,

        handler: async function (response) {

          const verify = await axios.post(
            "http://localhost:5004/verify/payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }
          );

          if (verify.data.success) {

            alert("Subscription Activated");

          } else {

            alert("Verification Failed");

          }

        },

        prefill: {

          name: "Student",

          email: "student@gmail.com"

        },

        theme: {

          color: "#2563eb"

        }

      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {

      console.log(err);

      alert("Payment Failed");

    }

  };

  return (

   <div className="min-h-screen bg-[#0B1020] text-white py-20 px-6">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">
      <span className="px-4 py-2 border border-yellow-500 rounded-full text-yellow-400 text-sm">
        PREMIUM MEMBERSHIP
      </span>

      <h1 className="text-5xl font-bold mt-6">
        Upgrade your <span className="text-purple-400">Learning</span>
      </h1>

      <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
        Unlock AI-powered learning, unlimited premium courses,
        certificates, and priority support with our subscription plans.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Basic */}
      <div className="bg-[#111827] rounded-3xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold">Basic</h2>
        <h1 className="text-5xl font-bold mt-5">₹299</h1>
        <p className="text-gray-400">/month</p>

        <ul className="mt-8 space-y-4 text-gray-300">
          <li>✓ 20 Premium Courses</li>
          <li>✓ AI Summary</li>
          <li>✓ Download Notes</li>
          <li>✗ Certificate</li>
        </ul>

        <button className="w-full mt-10 bg-gray-700 py-3 rounded-xl">
          Choose Plan
        </button>
      </div>

      {/* Premium */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-8 scale-105 shadow-2xl">
        <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
          Most Popular
        </span>

        <h2 className="text-2xl font-bold mt-5">Premium</h2>

        <h1 className="text-5xl font-bold mt-5">₹799</h1>
        <p>/month</p>

        <ul className="mt-8 space-y-4">
          <li>✓ Unlimited Courses</li>
          <li>✓ AI Tutor</li>
          <li>✓ Certificates</li>
          <li>✓ Priority Support</li>
        </ul>

        <button className="w-full mt-10 bg-white text-black py-3 rounded-xl font-semibold">
          Get Premium
        </button>
      </div>

      {/* Enterprise */}
      <div className="bg-[#111827] rounded-3xl p-8 border border-cyan-500">
        <h2 className="text-2xl font-bold">Enterprise</h2>

        <h1 className="text-5xl font-bold mt-5">₹1499</h1>
        <p className="text-gray-400">/month</p>

        <ul className="mt-8 space-y-4 text-gray-300">
          <li>✓ Everything in Premium</li>
          <li>✓ Team Dashboard</li>
          <li>✓ Dedicated Mentor</li>
          <li>✓ Lifetime Resources</li>
        </ul>

        <button className="w-full mt-10 bg-cyan-500 text-black py-3 rounded-xl font-semibold">
          Go Enterprise
        </button>
      </div>

    </div>
  </div>
</div>

  );
  

}

export default Subscription;