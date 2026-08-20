import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../../public/icons/UserIcon";
import ButtonComponent from "../components/ButtonComponent";
import ShoppingBagIcon from "../../public/icons/ShoppingBagIcon";
import { CartContext } from "../context/CartContext";
import CartSummary from "./CartSummary";

export default function Navbar({ variant = "default" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(
    localStorage.getItem("name") || "Account"
  );

  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = useNavigate();
  const ref = useRef(null);

  const showMenu = variant !== "hideMenu";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    setToken(null);
    setMenuOpen(false);

    navigate("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-6 bg-white border-b sticky top-0 z-50">

      {/* LEFT */}
      <div className="flex items-center gap-10">

        <Link to="/">
          <img
            className="w-30 h-10"
            src="/images/shoppi-logo-img.png"
          />
        </Link>

        {showMenu && (
          <div className="hidden md:flex gap-6 text-gray-500">
            <Link to="/">Home</Link>
            <Link to="/popular">Popular</Link>
            <Link to="/search">Search</Link>
          </div>
        )}

      </div>

      {/* RIGHT */}
      <div
        className="relative flex items-center gap-3"
        ref={ref}
      >

        {/* USER BUTTON */}
        {token && (
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <UserIcon
              size={18}
              color="#111827"
            />

            <span className="max-w-[90px] truncate">
              {username}
            </span>

            <span className="hidden md:inline">
              ▾
            </span>
          </button>
        )}

        {/* CART */}
        {token && (
          <div className="relative">

            <div
              onClick={() => setCartOpen((current) => !current)}
              className="cursor-pointer"
            >
              <ShoppingBagIcon className="w-6 h-6 text-black" />

              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-red-500 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            </div>

            {cartOpen && (
              <CartSummary
                onClose={() => setCartOpen(false)}
              />
            )}

          </div>
        )}

        {/* AUTH DESKTOP */}
        {!token && (
          <div className="hidden md:flex gap-3">

            <Link to="/login">
              <ButtonComponent variant="secondary">
                Login
              </ButtonComponent>
            </Link>

            <Link to="/register">
              <ButtonComponent variant="primary">
                Register
              </ButtonComponent>
            </Link>

          </div>
        )}

        {/* AUTH MOBILE */}
        {!token && (
          <div className="relative md:hidden">

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              ☰
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white border rounded-lg shadow-lg z-50">

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Register
                </Link>

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Home
                </Link>

                <Link
                  to="/popular"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Popular
                </Link>

                <Link
                  to="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Search
                </Link>

              </div>
            )}

          </div>
        )}

        {/* DROPDOWN */}
        {menuOpen && token && (
          <div className="absolute right-0 top-12 w-44 bg-white border shadow-md rounded flex flex-col z-50">

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="p-3 hover:text-red-500 hover:bg-gray-50"
            >
              Profile
            </Link>

            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="p-3 hover:text-red-500 hover:bg-gray-50"
            >
              Orders
            </Link>

            {/* FAVOURITES */}
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/profile", {
                  state: {
                    activeTab: "favourites"
                  }
                });
              }}
              className="w-full text-left p-3 hover:text-red-500 hover:bg-gray-50"
            >
              Favourites
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="p-3 text-left hover:text-red-500 hover:bg-gray-50"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}