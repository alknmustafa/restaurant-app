import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const isFormValid =
    name.trim() && email.trim() && password && confirmPassword;


  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading)
      return;

    if (!isFormValid) {
      toast.warn("Please fill all fields.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Invalid email format");
      return;
    };


    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        toast.error(data.message || "Email already registered");
        return;
      }

      if (response.ok) {
        toast.success("Account created successfully 🎉");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 800);
      }
      else {
        toast.error(data.message || "Registration failed");
      }
    }
    catch (err) {
      console.log("Error: ", err);
      toast.error("Server error...")
    }

    finally {
      setLoading(false);
    }

  }

  return (

    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-center items-center text-white p-10 bg-cover bg-center relative"
        style={{ backgroundImage: "url('../images/background-register.jpg')" }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center">
          <img
            src="/images/fork-knife-logo.png"
            className="w-25 h-25 mb-4"
            alt=""
          />

          <h1 className="text-4xl font-semibold">
            Join Shoppi 🍔
          </h1>

          <p className="text-white/80 text-xl mt-5 max-w-3xl">
            Order food instantly from your favorite restaurants
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">

          <div className="flex justify-center mb-3">
            <img
              src="/images/shoppi-logo.png"
              className="w-20 h-20"
              alt=""
            />
          </div>

          <h2 className="text-xl font-bold text-center mb-1">
            Create your account
          </h2>

          <p className="text-xs text-gray-500 text-center mb-6">
            Start your food journey 🍕
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">

            <input
              className="bg-gray-100 px-3 py-2 rounded-md text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="bg-gray-100 px-3 py-2 rounded-md text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="bg-gray-100 px-3 py-2 rounded-md text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="bg-gray-100 px-3 py-2 rounded-md text-sm"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="bg-red-500 text-white py-2.5 rounded-md text-sm hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating...
                </>
              ) : (
                "Create account"
              )}
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>



  );

}


