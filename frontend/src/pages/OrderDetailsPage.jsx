import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";

import ArrowLeftIcon from "../../public/icons/ArrowLeftIcon";
import ClockIcon from "../../public/icons/ClockIcon";
import LocationIcon from "../../public/icons/LocationIcon";
import CutleryIcon from "../../public/icons/CutleryIcon";
import CashIcon from "../../public/icons/CashIcon";
import CreditCardIcon from "../../public/icons/CreditCardIcon";

import { getOrderById } from "../services/ordersService";

export default function OrderDetailsPage() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (error) {
                console.error("Failed to load order:", error);
                setError("Failed to load order.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <>
                <NavbarComponent />

                <div className="min-h-[70vh] flex items-center justify-center">
                    <p className="text-sm text-gray-500">
                        Loading order...
                    </p>
                </div>
            </>
        );
    }

    if (error || !order) {
        return (
            <>
                <NavbarComponent />

                <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Order not found
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        We couldn't find this order.
                    </p>

                    <Link
                        to="/orders"
                        className="mt-5 text-sm font-medium text-red-500 hover:text-red-600"
                    >
                        Back to orders
                    </Link>
                </div>
            </>
        );
    }

    const restaurant = order.restaurantId;

    const statusSteps = [
        {
            value: "pending",
            label: "Order confirmed",
        },
        {
            value: "preparing",
            label: "Preparing",
        },
        {
            value: "on_the_way",
            label: "On the way",
        },
        {
            value: "delivered",
            label: "Delivered",
        },
    ];

    const statusIndex = statusSteps.findIndex(
        (step) => step.value === order.status
    );

    const isCancelled = order.status === "cancelled";

    const orderDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const orderTime = new Date(order.createdAt).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const isCashPayment = order.paymentMethod === "cash";

    return (
        <>
            <NavbarComponent />

            <main className="px-4 sm:px-10 lg:px-8 mt-6 pb-16">

                <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
                >
                    <ArrowLeftIcon size={18} />
                    Orders
                </Link>

                {/* HEADER */}

                <div className="mt-7">

                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Your order
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 mt-2">

                        <span className="text-sm text-gray-500">
                            Order #{order._id}
                        </span>

                        <span className="text-gray-300">
                            •
                        </span>

                        <span className="text-sm text-gray-500">
                            {restaurant?.name || "Restaurant"}
                        </span>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* LEFT */}

                    <div className="lg:col-span-2 space-y-6">

                        {/* ORDER STATUS */}

                        <section className="border border-gray-200 rounded-2xl p-6 bg-white">

                            <div className="flex items-center justify-between gap-4">

                                <div>

                                    <h2 className="text-base font-semibold text-gray-900">
                                        Order status
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Track your order progress.
                                    </p>

                                </div>

                                {!isCancelled && (

                                    <div className="flex items-center gap-2 text-sm text-gray-500">

                                        <ClockIcon size={17} />

                                        <span>
                                            {restaurant?.delivery?.estimatedTime?.min ?? 0}
                                            {" – "}
                                            {restaurant?.delivery?.estimatedTime?.max ?? 0}
                                            {" "}min
                                        </span>

                                    </div>

                                )}

                            </div>

                            {isCancelled ? (

                                <div className="mt-6 rounded-xl bg-red-50 border border-red-100 p-5">

                                    <p className="text-sm font-semibold text-red-600">
                                        Order cancelled
                                    </p>

                                    <p className="text-sm text-red-500 mt-1">
                                        This order has been cancelled.
                                    </p>

                                </div>

                            ) : (

                                <div className="mt-8">

                                    {statusSteps.map((step, index) => {

                                        const isCompleted =
                                            index < statusIndex;

                                        const isActive =
                                            index === statusIndex;

                                        const isLast =
                                            index === statusSteps.length - 1;

                                        return (

                                            <div
                                                key={step.value}
                                                className="flex gap-4"
                                            >

                                                <div className="flex flex-col items-center">

                                                    <div
                                                        className={`w-4 h-4 rounded-full border-2 transition ${
                                                            isCompleted || isActive
                                                                ? "border-red-500 bg-red-500"
                                                                : "border-gray-300 bg-white"
                                                        }`}
                                                    />

                                                    {!isLast && (

                                                        <div
                                                            className={`w-0.5 h-10 ${
                                                                isCompleted
                                                                    ? "bg-red-500"
                                                                    : "bg-gray-200"
                                                            }`}
                                                        />

                                                    )}

                                                </div>

                                                <div className="-mt-1 pb-7">

                                                    <p
                                                        className={`text-sm font-medium ${
                                                            isActive
                                                                ? "text-gray-900"
                                                                : isCompleted
                                                                    ? "text-gray-700"
                                                                    : "text-gray-400"
                                                        }`}
                                                    >
                                                        {step.label}
                                                    </p>

                                                    {isActive && (

                                                        <p className="text-xs text-red-500 mt-1">
                                                            Current status
                                                        </p>

                                                    )}

                                                </div>

                                            </div>

                                        );

                                    })}

                                </div>

                            )}

                        </section>

                        {/* DELIVERY */}

                        <section className="border border-gray-200 rounded-2xl p-6 bg-white">

                            <div className="flex items-center gap-2">

                                <LocationIcon size={19} />

                                <h2 className="text-base font-semibold text-gray-900">
                                    Delivery
                                </h2>

                            </div>

                            <div className="mt-5">

                                <p className="text-sm font-semibold text-gray-800">
                                    {order.customer?.address?.label || "Address"}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {order.customer?.address?.street}{" "}
                                    {order.customer?.address?.houseNumber}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {order.customer?.address?.postalCode}{" "}
                                    {order.customer?.address?.city}
                                </p>

                                {order.customer?.address?.additionalInfo && (

                                    <p className="text-xs text-gray-400 mt-2">
                                        {order.customer.address.additionalInfo}
                                    </p>

                                )}

                            </div>

                            {/* PAYMENT */}

                            <div className="border-t border-gray-100 mt-6 pt-5">

                                <p className="text-sm font-semibold text-gray-900">
                                    Payment method
                                </p>

                                <div className="flex items-center gap-3 mt-3">

                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">

                                        {isCashPayment ? (
                                            <CashIcon size={20} />
                                        ) : (
                                            <CreditCardIcon size={20} />
                                        )}

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-gray-800 capitalize">
                                            {order.paymentMethod}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {isCashPayment
                                                ? "Pay when your order arrives."
                                                : "Paid by card."
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* NOTES */}

                        {order.customer?.notes && (

                            <section className="border border-gray-200 rounded-2xl p-6 bg-white">

                                <h2 className="text-base font-semibold text-gray-900">
                                    Delivery notes
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    {order.customer.notes}
                                </p>

                            </section>

                        )}

                    </div>

                    {/* RIGHT */}

                    <aside className="space-y-5">

                        {/* ORDER SUMMARY */}

                        <div className="lg:sticky lg:top-6 border border-gray-200 rounded-2xl bg-white overflow-hidden">

                            {/* RESTAURANT HEADER */}

                            <div className="p-5">

                                <div className="flex items-center gap-4">

                                    {restaurant?.images?.[0] ? (

                                        <img
                                            src={restaurant.images[0]}
                                            alt={restaurant.name}
                                            className="w-16 h-16 rounded-2xl object-cover shrink-0"
                                        />

                                    ) : (

                                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
                                            <CutleryIcon size={24} />
                                        </div>

                                    )}

                                    <div className="min-w-0">

                                        <h2 className="text-base font-semibold text-gray-900 truncate">
                                            {restaurant?.name || "Restaurant"}
                                        </h2>

                                        {restaurant?.address?.city && (

                                            <p className="text-sm text-gray-500 mt-1">
                                                {restaurant.address.city}
                                            </p>

                                        )}

                                        <p className="text-xs text-gray-400 mt-1">
                                            Ordered on {orderDate} at {orderTime}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="border-t border-gray-100" />

                            {/* ITEMS */}

                            <div className="p-5">

                                <h3 className="text-sm font-semibold text-gray-900">
                                    Your order
                                </h3>

                                <div className="mt-4 space-y-4">

                                    {order.items?.map((item, index) => (

                                        <div
                                            key={`${item.foodId?._id || item.foodId}-${index}`}
                                            className="flex items-center justify-between gap-3"
                                        >

                                            <div className="flex items-center gap-3 min-w-0">

                                                {item.foodId?.image ? (

                                                    <img
                                                        src={item.foodId.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                                                    />

                                                ) : (

                                                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                                        <CutleryIcon size={18} />
                                                    </div>

                                                )}

                                                <div className="min-w-0">

                                                    <p className="text-sm font-medium text-gray-800 truncate">
                                                        {item.name}
                                                    </p>

                                                    <div className="flex items-center gap-2 mt-1">

                                                        <span className="text-xs text-gray-400">
                                                            {Number(item.price).toFixed(2)}€ each
                                                        </span>

                                                        <span className="text-xs text-gray-400">
                                                            × {item.quantity}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {(Number(item.price) * item.quantity).toFixed(2)}€
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            <div className="border-t border-gray-100" />

                            {/* PRICE */}

                            <div className="p-5">

                                <div className="space-y-3">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>

                                        <span className="text-gray-700">
                                            {Number(order.subtotal).toFixed(2)}€
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-500">
                                            Delivery fee
                                        </span>

                                        <span className="text-gray-700">
                                            {Number(order.deliveryFee).toFixed(2)}€
                                        </span>

                                    </div>

                                </div>

                                <div className="border-t border-gray-200 my-5" />

                                <div className="flex items-center justify-between">

                                    <span className="text-base font-semibold text-gray-900">
                                        Total
                                    </span>

                                    <span className="text-lg font-semibold text-gray-900">
                                        {Number(order.totalPrice).toFixed(2)}€
                                    </span>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </main>
        </>
    );
}