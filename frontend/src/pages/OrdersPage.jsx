import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";

import { getUserOrders } from "../services/ordersService";

import CashIcon from "../../public/icons/CashIcon";
import CreditCardIcon from "../../public/icons/CreditCardIcon";
import ButtonComponent from "../components/ButtonComponent";

export default function OrdersPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrders();

                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error);
                setError(error.message || "Failed to load your orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusLabel = (status) => {
        switch (status) {
            case "pending":
                return "Pending";

            case "preparing":
                return "Preparing";

            case "on_the_way":
                return "On the way";

            case "delivered":
                return "Delivered";

            case "cancelled":
                return "Cancelled";

            default:
                return status;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-50 text-yellow-600";

            case "preparing":
                return "bg-orange-50 text-orange-600";

            case "on_the_way":
                return "bg-blue-50 text-blue-600";

            case "delivered":
                return "bg-green-50 text-green-600";

            case "cancelled":
                return "bg-red-50 text-red-600";

            default:
                return "bg-gray-50 text-gray-600";
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getItemCount = (items = []) => {
        return items.reduce(
            (total, item) => total + item.quantity,
            0
        );
    };

    const filteredOrders = orders.filter((order) => {
        if (activeFilter === "active") {
            return [
                "pending",
                "preparing",
                "on_the_way",
            ].includes(order.status);
        }

        if (activeFilter === "completed") {
            return [
                "delivered",
                "cancelled",
            ].includes(order.status);
        }

        return true;
    });

    if (loading) {
        return (
            <>
                <NavbarComponent />

                <main className="min-h-screen bg-gray-50">
                    <div className="px-10 py-10">
                        <h1 className="text-sm sm:text-sm font-semibold tracking-tight text-gray-900">
                            My Orders
                        </h1>

                        <div className="mt-10 flex items-center justify-center min-h-[300px]">
                            <p className="text-sm text-gray-500">
                                Loading orders...
                            </p>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavbarComponent />

                <main className="min-h-screen bg-gray-50">
                    <div className="px-10 py-10">
                        <h1 className="text-2xl sm:text-xl font-semibold tracking-tight text-gray-900">
                            My Orders
                        </h1>

                        <div className="mt-10 bg-white border border-gray-200 rounded-2xl min-h-[300px] flex flex-col items-center justify-center text-center">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Something went wrong
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                {error}
                            </p>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <NavbarComponent />

            <main className="min-h-screen bg-gray-50">
                <div className="px-10 py-10">

                    <div>
                        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900">
                            My Orders
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Track and manage your recent orders.
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center gap-7 border-b border-gray-200">

                            <button
                                onClick={() => setActiveFilter("all")}
                                className={`pb-3 text-sm font-medium transition ${activeFilter === "all"
                                    ? "text-red-500 border-b-2 border-red-500"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                All
                            </button>

                            <button
                                onClick={() => setActiveFilter("active")}
                                className={`pb-3 text-sm font-medium transition ${activeFilter === "active"
                                    ? "text-red-500 border-b-2 border-red-500"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                Active
                            </button>

                            <button
                                onClick={() => setActiveFilter("completed")}
                                className={`pb-3 text-sm font-medium transition ${activeFilter === "completed"
                                    ? "text-red-500 border-b-2 border-red-500"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                Completed
                            </button>

                        </div>
                    </div>

                    <div className="mt-8 space-y-5">

                        {filteredOrders.length === 0 ? (

                            <div className="bg-white border border-gray-200 rounded-2xl min-h-[400px] flex flex-col items-center justify-center text-center">

                                <h2 className="text-xl font-semibold text-gray-900">
                                    No orders found
                                </h2>

                                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                                    Your orders will appear here after you complete your first order.
                                </p>

                                <Link
                                    to="/popular"
                                    className="mt-6 px-6 py-3 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                                >
                                    Browse Restaurants
                                </Link>

                            </div>

                        ) : (

                            filteredOrders.map((order) => {

                                const restaurant = order.restaurantId;

                                const isCashPayment =
                                    order.paymentMethod === "cash";

                                return (

                                    <div
                                        key={order._id}
                                        className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-gray-300 transition"
                                    >

                                        {/* RESTAURANT HEADER */}

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                                            <div className="flex items-center gap-4 min-w-0">

                                                {restaurant?.images?.[0] ? (

                                                    <img
                                                        src={restaurant.images[0]}
                                                        alt={restaurant.name}
                                                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                                                    />

                                                ) : (

                                                    <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center">

                                                        <span className="text-xs text-gray-400">
                                                            No image
                                                        </span>

                                                    </div>

                                                )}

                                                <div className="min-w-0">

                                                    <h2 className="text-base font-semibold text-gray-900">
                                                        {restaurant?.name || "Restaurant"}
                                                    </h2>

                                                    {restaurant?.cuisineTypes?.length > 0 && (

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {restaurant.cuisineTypes.join(" · ")}
                                                        </p>

                                                    )}

                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {restaurant?.address?.city || ""}
                                                    </p>

                                                </div>

                                            </div>

                                            <span
                                                className={`self-start sm:self-center shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}
                                            >
                                                {getStatusLabel(order.status)}
                                            </span>

                                        </div>


                                        {/* ITEMS */}

                                        <div className="border-t border-gray-100 my-5" />

                                        <div className="space-y-3">

                                            {order.items?.map((item, index) => (

                                                <div
                                                    key={`${item.foodId?._id || item.foodId}-${index}`}
                                                    className="flex items-center justify-between gap-4"
                                                >

                                                    <div className="flex items-center gap-3 min-w-0">

                                                        {item.foodId?.image ? (

                                                            <img
                                                                src={item.foodId.image}
                                                                alt={item.name}
                                                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                                                            />

                                                        ) : (

                                                            <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center">

                                                                <span className="text-xs text-gray-400">
                                                                    —
                                                                </span>

                                                            </div>

                                                        )}

                                                        <span className="text-sm text-gray-400 w-8 shrink-0">
                                                            {item.quantity}×
                                                        </span>

                                                        <span className="text-sm text-gray-700 truncate">
                                                            {item.name}
                                                        </span>

                                                    </div>

                                                    <span className="text-sm text-gray-600 whitespace-nowrap">
                                                        {(
                                                            Number(item.price) *
                                                            item.quantity
                                                        ).toFixed(2)}€
                                                    </span>

                                                </div>

                                            ))}

                                        </div>


                                        {/* ORDER META */}

                                        <div className="border-t border-gray-100 mt-5 pt-5">

                                            <div className="flex flex-wrap items-center gap-3 text-sm">

                                                <span className="text-gray-500">
                                                    {getItemCount(order.items)} items
                                                </span>

                                                <span className="text-gray-300">
                                                    •
                                                </span>

                                                <span className="text-gray-500">
                                                    {formatDate(order.createdAt)}
                                                </span>

                                                <span className="text-gray-300">
                                                    •
                                                </span>

                                                <span className="text-gray-500">
                                                    {formatTime(order.createdAt)}
                                                </span>

                                                <span className="text-gray-300">
                                                    •
                                                </span>

                                                <div className="flex items-center gap-1.5 text-gray-500">

                                                    {isCashPayment ? (
                                                        <CashIcon size={17} />
                                                    ) : (
                                                        <CreditCardIcon size={17} />
                                                    )}

                                                    <span className="capitalize">
                                                        {order.paymentMethod}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                        {/* TOTAL */}

                                        <div className="border-t border-gray-100 mt-5 pt-5">

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                                <div>
                                                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                                                        Total
                                                    </p>

                                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                                        {Number(order.totalPrice).toFixed(2)}€
                                                    </p>
                                                </div>

                                                <ButtonComponent
                                                    type="button"
                                                    onClick={() => navigate(`/orders/${order._id}`)}
                                                    variant="primary"
                                                >
                                                    View Order
                                                </ButtonComponent>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })

                        )}

                    </div>

                </div>
            </main>
        </>
    );
}
