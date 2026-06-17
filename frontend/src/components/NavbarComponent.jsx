import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const username = localStorage.getItem("name");

  const dropDownRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  // CLICK OUTSIDE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex flex-row items-center p-6 bg-white border-b sticky w-full z-50">

      {/* LEFT - LOGO + MENU */}
      <div className="flex items-center gap-10">

        {/* LOGO */}
        <Link to="/" className="ml-3">
          <img
            className="w-22 h-12"
            src="./images/shoppi-logo-img.png"
            alt="logo"
          />
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-gray-500 hover:text-black">Home</Link>
          <Link className="text-gray-500 hover:text-black">Popular</Link>
          <Link className="text-gray-500 hover:text-black">Search</Link>
        </div>

      </div>

      {/* RIGHT */}
      <div className="ml-auto flex items-center gap-6">

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-6">

          {!token ? (
            <>
              <Link to="/register">
                <ButtonComponent variant="secondary" children={"Sign Up"}/>
              </Link>

              <Link to="/login">
              <ButtonComponent variant="primary" children={"Login"} className="px-8"/>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="text-black px-3 py-1 rounded-md flex items-center gap-2"
              >
                {/* USER ICON */}
                <span>👤</span>

                {/* Usernam */}
                {username ? username : "Account"} ▾
              </button>

              {/* DROPDOWN */}
              {open && (
                <div
                  ref={dropDownRef}
                  className="absolute right-6 top-16 w-48 bg-white border rounded shadow-md"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2  hover:text-red-500  hover:bg-gray-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-t shadow-md flex flex-col gap-4 p-6 z-50">

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-gray-700 hover:text-red-500 transition"
          >
            Home
          </Link>

          <Link
            to="/popular"
            onClick={() => setMobileOpen(false)}
            className="text-gray-700 hover:text-red-500 transition"
          >
            Popular
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileOpen(false)}
            className="text-gray-700 hover:text-red-500 transition"
          >
            Search
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-red-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-red-500 transition"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-red-500 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-gray-700 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}