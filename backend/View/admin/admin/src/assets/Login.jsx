import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5004/login",
        {
          username,
          password
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "Teacher") {

        navigate("/teacher");

      }

      else if (role === "Student") {

        navigate("/student");

      }

      else if (role === "Admin") {

        navigate("/admin");

      }

    }

    catch (err) {

      alert(
        err.response?.data?.message || "Login Failed"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600">

      <div className="bg-white w-[400px] rounded-xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-indigo-700">

          AI Notes Portal

        </h1>

        <p className="text-center text-gray-500 mt-2">

          Login to Continue

        </p>

        <form
          onSubmit={login}
          className="mt-8 space-y-5"
        >

          <input

            type="text"

            placeholder="Username"

            value={username}

            onChange={(e)=>setUsername(e.target.value)}

            className="w-full border rounded-lg p-3 outline-none focus:border-indigo-500"

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            className="w-full border rounded-lg p-3 outline-none focus:border-indigo-500"

          />

          <button

            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"

          >

            {

              loading ?

              "Please Wait..."

              :

              "Login"

            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;