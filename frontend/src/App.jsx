import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Popular from "./pages/Popular";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RestaurantDetail from "./pages/RestaurantDetail";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage"




export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage/>} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/orders/:id" element={<OrderDetailsPage/>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </CartProvider>
  );
}