import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 flex-col">

        {/* TOP IMAGE */}
        <img
          src="../images/top-register.jpg"
          className="h-1/2 w-full object-cover"
          alt=""
        />

        {/* MIDDLE SECTION */}
        <div className="p-24 text-center bg-red-500 flex flex-col justify-between h-full">

          {/* TOP CONTENT */}
          <div>

            {/* LOGO */}
            <div className="flex justify-center">
              <img
                src="../images/fork-knife-logo.png"
                className="w-13 h-13"
                alt=""
              />
            </div>

            <p className="text-4xl text-white mt-4">
              Welcome to Shoppi
            </p>

            <p className="pt-5 text-2xl text-white/80">
              Deliver food instantly
            </p>

          </div>

          {/* FOOTER */}
          <div className="text-xs text-white/70 mt-10 flex flex-col gap-2">
            <p className="text-xl">© 2026 Shoppi Inc.</p>
          </div>
        </div>

        {/* BOTTOM IMAGE */}
        <img
          src="../images/bottom-register.jpg"
          className="h-1/2 w-full object-cover"
          alt=""
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-100 px-6">

        {/* LOGO */}
        <img
          src="../images/shoppi-logo.png"
          className="w-15 h-15"
          alt=""
        />

        {/* TEXT */}
        <div className="text-center text-xl text-gray-600 mb-4 max-w-xs">
          <span className="text-red-500 font-semibold text-xl">
            Login
          </span>{" "}
          to your account to manage your services and explore new tastes.
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-xs">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 text-xl px-3 py-3 rounded-md
            focus:outline-none focus:border-red-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 text-xl px-3 py-3 rounded-md
            focus:outline-none focus:border-red-400"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white text-xl px-3 py-3 rounded-md
            hover:bg-red-600 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}