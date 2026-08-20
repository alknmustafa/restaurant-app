import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

import HeartIcon from "../../public/icons/HearthIcon";
import UserIcon from "../../public/icons/UserIcon";
import PaymentIcon from "../../public/icons/PaymentIcon";
import HomeIcon from "../../public/icons/HomeIcon";

import { getUser } from "../services/userService";
import PersonalInfoTabComponent from "../components/PersonalInfoTabComponent";
import AddressesTabComponent from "../components/AdressTabComponent";
import OrderTabComponent from "../components/OrderTabComponent";
import FavouritesTabComponent from "../components/FavouritesTabComponent";

export default function UserDashboard() {

  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "personalInfo"
  );

  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {

    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }

  }, [location.state]);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token");

        const data = await getUser(token);

        setUser(data);
        setEditUser(data);

      } catch (err) {

        toast.error(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, []);

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!user) {
    return <p className="p-10">User not found</p>;
  }

  return (
    <div>

      <NavbarComponent variant="hideMenu" />

      {/* HEADER */}
      <div className="mt-12 px-5 md:px-20">

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

          <button
            onClick={() => setActiveTab("personalInfo")}
            className={`font-bold text-2xl ${
              activeTab === "personalInfo"
                ? "text-red-500"
                : "text-gray-700"
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("favourites")}
            className={`inline-flex items-center px-6 py-3 gap-2 rounded-3xl ${
              activeTab === "favourites"
                ? "bg-red-600 text-white"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            <HeartIcon color="white" />
            Favourites
          </button>

        </div>

        {/* TAB BAR */}
        <div className="flex flex-col gap-5 mt-20 text-lg md:flex-row md:justify-around md:mt-14">

          <button
            onClick={() => setActiveTab("personalInfo")}
            className={`flex items-center transition-colors ${
              activeTab === "personalInfo"
                ? "text-red-500"
                : "text-gray-700"
            } hover:text-red-500`}
          >
            <UserIcon color="currentColor" />
            <p className="ml-2">Personal Info</p>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center transition-colors ${
              activeTab === "addresses"
                ? "text-red-500"
                : "text-gray-700"
            } hover:text-red-500`}
          >
            <HomeIcon color="currentColor" />
            <p className="ml-2">Addresses</p>
          </button>

          <button
            onClick={() => setActiveTab("paymentMethods")}
            className={`flex items-center transition-colors ${
              activeTab === "paymentMethods"
                ? "text-red-500"
                : "text-gray-700"
            } hover:text-red-500`}
          >
            <PaymentIcon color="currentColor" />
            <p className="ml-2">Payment Methods</p>
          </button>

          <button
            onClick={() => setActiveTab("orderHistory")}
            className={`flex items-center transition-colors ${
              activeTab === "orderHistory"
                ? "text-red-500"
                : "text-gray-700"
            } hover:text-red-500`}
          >
            <PaymentIcon color="currentColor" />
            <p className="ml-2">Order history</p>
          </button>

        </div>

        <hr className="mt-12 md:mt-4" />

      </div>

      {/* CONTENT */}
      <div className="mt-10 md:mt-20 px-5 md:px-40">

        {activeTab === "personalInfo" && (
          <PersonalInfoTabComponent
            user={user}
            editUser={editUser}
            setEditUser={setEditUser}
            setUser={setUser}
            onLogout={handleLogout}
          />
        )}

        {activeTab === "addresses" && (
          <AddressesTabComponent />
        )}

        {activeTab === "paymentMethods" && (
          <h2>Payment Methods</h2>
        )}

        {activeTab === "orderHistory" && (
          <OrderTabComponent />
        )}

        {activeTab === "favourites" && (
          <FavouritesTabComponent
            user={user}
          />
        )}

      </div>

      <div className="mt-20">
        <FooterComponent />
      </div>

    </div>
  );
}