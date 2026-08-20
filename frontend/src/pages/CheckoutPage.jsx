import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import NavbarComponent from "../components/NavbarComponent";
import AddAddressModal from "../components/AddAddressModal";

import ArrowLeftIcon from "../../public/icons/ArrowLeftIcon";
import CutleryIcon from "../../public/icons/CutleryIcon";
import ClockIcon from "../../public/icons/ClockIcon";
import LocationIcon from "../../public/icons/LocationIcon";
import ChefHatIcon from "../../public/icons/ChefHatIcon";
import CashIcon from "../../public/icons/CashIcon";
import PaymentMethodIcon from "../../public/icons/CreditCardIcon";

import { CartContext } from "../context/CartContext";
import { getRestaurantById } from "../services/restaurantService";
import { getAllAddresses } from "../services/adressService";
import { getUser } from "../services/userService";
import { createOrder } from "../services/ordersService";

export default function CheckoutPage() {

    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState(null);
    const [loadingRestaurant, setLoadingRestaurant] = useState(true);

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    const [additionalNotes, setAdditionalNotes] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("cash");

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

    const [user, setUser] = useState(null);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);


    const orderQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );


    const restaurantId = cartItems[0]?.restaurantId;


    useEffect(() => {

        if (!restaurantId) {
            setLoadingRestaurant(false);
            return;
        }

        const fetchRestaurant = async () => {

            try {

                const data = await getRestaurantById(restaurantId);

                setRestaurant(data);

            } catch (error) {

                console.error(
                    "Failed to fetch restaurant:",
                    error
                );

            } finally {

                setLoadingRestaurant(false);

            }

        };

        fetchRestaurant();

    }, [restaurantId]);


    useEffect(() => {

        const fetchUser = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    return;
                }

                const data = await getUser(token);

                setUser(data);

                setCustomerName(data.name || "");
                setCustomerEmail(data.email || "");

            } catch (error) {

                console.error(
                    "Failed to load user:",
                    error
                );

            }

        };

        fetchUser();

    }, []);


    useEffect(() => {

        const fetchAddresses = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    return;
                }

                const data = await getAllAddresses(token);

                setAddresses(data);

                const defaultAddress = data.find(
                    (address) => address.isDefault
                );

                if (defaultAddress) {

                    setSelectedAddress(
                        defaultAddress._id
                    );

                } else if (data.length > 0) {

                    setSelectedAddress(
                        data[0]._id
                    );

                }

            } catch (error) {

                console.error(
                    "Failed to load addresses:",
                    error
                );

            }

        };

        fetchAddresses();

    }, []);


    const handleAddressAdded = (newAddress) => {

        setAddresses((prev) => [
            ...prev,
            newAddress
        ]);

        setSelectedAddress(newAddress._id);

        setIsAddAddressModalOpen(false);

    };


    const deliveryFee =
        restaurant?.delivery?.fee ?? 0;


    const totalPrice =
        subtotal + deliveryFee;


    const estimatedDeliveryMin =
        restaurant?.delivery?.estimatedTime?.min ?? 0;


    const estimatedDeliveryMax =
        restaurant?.delivery?.estimatedTime?.max ?? 0;


    const handleCompleteOrder = async () => {

        try {

            if (!user) {

                alert(
                    "User information is missing."
                );

                return;
            }


            if (!selectedAddress) {

                alert(
                    "Please select a delivery address."
                );

                return;
            }


            if (!restaurantId) {

                alert(
                    "Restaurant information is missing."
                );

                return;
            }


            const address = addresses.find(
                (item) =>
                    item._id === selectedAddress
            );


            if (!address) {

                alert(
                    "Selected address could not be found."
                );

                return;
            }


            setIsCreatingOrder(true);


            const createdOrder = await createOrder({

                user,

                restaurantId,

                cartItems,

                address,

                customer: {
                    name: customerName,
                    email: customerEmail,
                },

                notes: additionalNotes,

                subtotal,

                deliveryFee,

                totalPrice,

                paymentMethod,

            });


            console.log(
                "Order created:",
                createdOrder
            );


            navigate(
                `/orders/${createdOrder._id}`
            );


        } catch (error) {

            console.error(
                "Failed to complete order:",
                error
            );

            alert(
                "Something went wrong while creating your order."
            );

        } finally {

            setIsCreatingOrder(false);

        }

    };


    if (cartItems.length === 0) {

        return (
            <>
                <NavbarComponent />

                <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Your cart is empty
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Add some items before continuing to checkout.
                    </p>

                    <button
                        onClick={() => navigate("/popular")}
                        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
                    >
                        Browse Restaurants
                    </button>

                </div>
            </>
        );

    }


    return (
        <>

            <NavbarComponent />


            <div className="flex items-center mt-6 px-4 sm:px-10 lg:px-8">

                <Link
                    to="/"
                    className="p-1 rounded-lg hover:bg-gray-100 transition"
                >
                    <ArrowLeftIcon
                        size={20}
                        bold={2.5}
                    />
                </Link>

            </div>


            <div className="flex flex-col lg:flex-row gap-12 px-4 sm:px-10 lg:px-8 mt-6 pb-16">


                {/* LEFT */}

                <div className="w-full lg:w-2/3">


                    <div>

                        <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-gray-900">
                            Checkout
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Review your order and complete your delivery details.
                        </p>

                    </div>


                    {/* RESTAURANT */}

                    <div className="mt-7 pb-6 border-b border-gray-100">

                        {loadingRestaurant ? (

                            <p className="text-sm text-gray-400">
                                Loading restaurant...
                            </p>

                        ) : restaurant ? (

                            <>

                                <div className="flex items-center gap-2 mt-1">

                                    <CutleryIcon size={18} />

                                    <p className="text-lg font-semibold">
                                        {restaurant.name}
                                    </p>

                                </div>


                                <p className="text-sm text-gray-500 mt-1">
                                    {restaurant.description}
                                </p>


                                <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-4">


                                    <div className="flex items-center gap-2">

                                        <ChefHatIcon />

                                        <span className="text-sm text-gray-600">
                                            {restaurant.cuisineTypes?.join(" - ")}
                                        </span>

                                    </div>


                                    <div className="flex items-center gap-2">

                                        <ClockIcon size={18} />

                                        <span className="text-sm text-gray-600">

                                            {estimatedDeliveryMin}
                                            {" – "}
                                            {estimatedDeliveryMax}
                                            {" "}min

                                        </span>

                                    </div>


                                    <div className="flex items-center gap-2">

                                        <LocationIcon size={18} />

                                        <span className="text-sm text-gray-600">
                                            {restaurant.address?.city}
                                        </span>

                                    </div>


                                </div>

                            </>

                        ) : (

                            <p className="text-sm text-red-500">
                                Restaurant information could not be loaded.
                            </p>

                        )}

                    </div>


                    {/* STEP 1 */}

                    <section className="mt-8">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Step 1: Delivery Address
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Choose where you'd like your order delivered.
                        </p>


                        <div className="mt-5 max-h-72 overflow-y-auto space-y-3 pr-1">

                            {addresses.length > 0 ? (

                                addresses.map((address) => (

                                    <label
                                        key={address._id}
                                        className={`group flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition ${
                                            selectedAddress === address._id
                                                ? "border-red-500 bg-red-50/30"
                                                : "border-gray-200 hover:border-red-400 hover:bg-red-50/30"
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="address"
                                            value={address._id}
                                            checked={
                                                selectedAddress === address._id
                                            }
                                            onChange={() =>
                                                setSelectedAddress(
                                                    address._id
                                                )
                                            }
                                            className="mt-1 accent-red-500"
                                        />


                                        <div className="flex-1 min-w-0">

                                            <div className="flex items-center gap-2">

                                                <h3 className="text-sm font-semibold text-gray-800">
                                                    {address.label}
                                                </h3>


                                                {address.isDefault && (

                                                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">
                                                        Default
                                                    </span>

                                                )}

                                            </div>


                                            <p className="text-sm text-gray-500 mt-1.5">

                                                {address.street}{" "}
                                                {address.houseNumber},{" "}
                                                {address.postalCode}{" "}
                                                {address.city}

                                            </p>


                                            {address.additionalInfo && (

                                                <p className="text-xs text-gray-400 mt-1">
                                                    {address.additionalInfo}
                                                </p>

                                            )}

                                        </div>

                                    </label>

                                ))

                            ) : (

                                <div className="border border-dashed border-gray-300 rounded-xl p-5 text-center">

                                    <p className="text-sm text-gray-500">
                                        You don't have any saved addresses yet.
                                    </p>

                                </div>

                            )}

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                setIsAddAddressModalOpen(true)
                            }
                            className="mt-4 text-sm font-medium text-red-500 hover:text-red-600 transition"
                        >
                            + Add new address
                        </button>

                    </section>


                    {/* STEP 2 */}

                    <section className="mt-10">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Step 2: Customer Details
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your contact information for this order.
                        </p>


                        <div className="mt-5 space-y-5">


                            <div>

                                <label
                                    htmlFor="customerName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Name
                                </label>


                                <input
                                    id="customerName"
                                    type="text"
                                    value={customerName}
                                    readOnly
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none"
                                />

                            </div>


                            <div>

                                <label
                                    htmlFor="customerEmail"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email
                                </label>


                                <input
                                    id="customerEmail"
                                    type="email"
                                    value={customerEmail}
                                    readOnly
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-gray-50 focus:outline-none"
                                />

                            </div>


                            <div>

                                <label
                                    htmlFor="additionalNotes"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >

                                    Additional Notes

                                    <span className="text-gray-400 font-normal ml-1">
                                        (Optional)
                                    </span>

                                </label>


                                <textarea
                                    id="additionalNotes"
                                    rows={4}
                                    value={additionalNotes}
                                    onChange={(e) =>
                                        setAdditionalNotes(
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Please leave the order at the door."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
                                />

                            </div>


                        </div>

                    </section>


                    {/* STEP 3 */}

                    <section className="mt-10">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Step 3: Payment Method
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Choose your preferred payment method.
                        </p>


                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">


                            {/* CASH */}

                            <label
                                className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                                    paymentMethod === "cash"
                                        ? "border-red-500 bg-red-50/30"
                                        : "border-gray-200 hover:border-red-400 hover:bg-red-50/30"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={
                                        paymentMethod === "cash"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                    className="accent-red-500"
                                />


                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                        paymentMethod === "cash"
                                            ? "bg-red-50 text-red-500"
                                            : "bg-gray-50 text-gray-500"
                                    }`}
                                >

                                    <CashIcon size={21} />

                                </div>


                                <div className="min-w-0">

                                    <p className="text-sm font-medium text-gray-800">
                                        Cash
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Pay when your order arrives.
                                    </p>

                                </div>

                            </label>


                            {/* CARD */}

                            <label
                                className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                                    paymentMethod === "card"
                                        ? "border-red-500 bg-red-50/30"
                                        : "border-gray-200 hover:border-red-400 hover:bg-red-50/30"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={
                                        paymentMethod === "card"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                    className="accent-red-500"
                                />


                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                        paymentMethod === "card"
                                            ? "bg-red-50 text-red-500"
                                            : "bg-gray-50 text-gray-500"
                                    }`}
                                >

                                    <PaymentMethodIcon size={21} />

                                </div>


                                <div className="min-w-0">

                                    <p className="text-sm font-medium text-gray-800">
                                        Card
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Pay by card.
                                    </p>

                                </div>

                            </label>


                        </div>

                    </section>


                </div>


                {/* RIGHT */}

                <aside className="w-full lg:w-1/3">

                    <div className="lg:sticky lg:top-6 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">


                        <img
                            src={
                                restaurant?.images?.[0] ||
                                "/images/restaurant-placeholder.jpg"
                            }
                            alt={
                                restaurant?.name ||
                                "Restaurant"
                            }
                            className="w-full h-60 object-cover rounded-xl"
                        />


                        <div className="mt-4">

                            <div className="flex items-center justify-between gap-3">

                                <h3 className="text-base font-semibold text-gray-900">
                                    {restaurant?.name || "Restaurant"}
                                </h3>

                                <span className="text-sm text-red-500">
                                    ★ {restaurant?.rating ?? 0}
                                </span>

                            </div>

                        </div>


                        {/* RESTAURANT INFO */}

                        <div className="mt-5 space-y-3">

                            <div className="flex items-center justify-between text-sm">

                                <span className="text-gray-700">
                                    Delivery time
                                </span>

                                <span className="text-gray-400">

                                    {estimatedDeliveryMin}
                                    {" – "}
                                    {estimatedDeliveryMax}
                                    {" "}min

                                </span>

                            </div>


                            <div className="flex items-center justify-between text-sm">

                                <span className="text-gray-700">
                                    Location
                                </span>

                                <span className="text-gray-400">
                                    {restaurant?.address?.city || "-"}
                                </span>

                            </div>

                        </div>


                        <div className="border-t border-gray-100 my-5" />


                        {/* SELECTED ITEMS */}

                        <div>

                            <h3 className="text-sm font-semibold text-gray-800">
                                Selected items
                            </h3>


                            <div className="mt-3 space-y-3">

                                {cartItems.map((item) => (

                                    <div
                                        key={item.foodId}
                                        className="flex items-center justify-between gap-3"
                                    >

                                        <div className="flex items-center gap-3 min-w-0">

                                            <img
                                                src={item.imageUrl}
                                                alt={item.foodName}
                                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                                            />


                                            <div className="min-w-0">

                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {item.foodName}
                                                </p>

                                                <p className="text-xs text-gray-400">

                                                    {item.quantity}
                                                    {" × "}
                                                    {Number(
                                                        item.price
                                                    ).toFixed(2)}€

                                                </p>

                                            </div>

                                        </div>


                                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">

                                            {(
                                                Number(item.price) *
                                                item.quantity
                                            ).toFixed(2)}

                                            €

                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* PRICE */}

                        <div className="mt-5 space-y-3">


                            <div className="flex justify-between items-center text-sm">

                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="text-gray-700">
                                    {subtotal.toFixed(2)}€
                                </span>

                            </div>


                            <div className="flex justify-between items-center text-sm">

                                <span className="text-gray-500">
                                    Order quantity
                                </span>

                                <span className="text-gray-700">
                                    {orderQuantity}x
                                </span>

                            </div>


                            <div className="flex justify-between items-center text-sm">

                                <span className="text-gray-500">
                                    Delivery fee
                                </span>

                                <span className="text-gray-700">
                                    {deliveryFee.toFixed(2)}€
                                </span>

                            </div>


                        </div>


                        <div className="border-t border-gray-200 my-5" />


                        <div className="flex justify-between items-center">

                            <span className="text-base font-semibold text-gray-900">
                                Total
                            </span>

                            <span className="text-lg font-semibold text-gray-900">
                                {totalPrice.toFixed(2)}€
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={handleCompleteOrder}
                            disabled={isCreatingOrder}
                            className="w-full mt-5 rounded-xl bg-red-500 py-3.5 text-sm font-semibold text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {isCreatingOrder
                                ? "Creating Order..."
                                : "Complete Order"}

                        </button>


                    </div>

                </aside>

            </div>


            <AddAddressModal
                isOpen={isAddAddressModalOpen}
                onClose={() =>
                    setIsAddAddressModalOpen(false)
                }
                onAddressAdded={
                    handleAddressAdded
                }
            />

        </>
    );

}

