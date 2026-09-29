

const Login = async (req, res) => {
  try {
    console.log("Body:", req.body);

    const db = getDB();

    const user = await db.collection("user").findOne({
      username: req.body.username,
      password: req.body.password,
    });

    console.log("User:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }


    console.log("User:", user);

const token = jwt.sign(
  {
    id: user.userid,
    role: user.role
  },
  "tnp",
  {
    expiresIn: "1d"
  }
);

console.log("Token:", token);

return res.status(200).json({
  success: true,
  message: "Login Successful",
  token,
  user: {
    userid: user.userid,
    username: user.username,
    role: user.role
  }
});

    // res.json({
    //   success: true,
    //   user,
    // });

  } catch (err) {
    console.log(err);
  }
};

module.exports = {Login}
