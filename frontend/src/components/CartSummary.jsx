import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import PlusIcon from "../../public/icons/PlusIcon";
import MinusIcon from "../../public/icons/MinusIcon";

export default function CartSummary({ onClose }) {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
    } = useContext(CartContext);

    const cartRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                cartRef.current &&
                !cartRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [onClose]);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div
                ref={cartRef}
                className="absolute right-0 top-12 w-80 bg-white border rounded-xl shadow-lg p-5 z-10"
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-4">

                    <h2 className="text-lg font-semibold">
                        Your Order
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 text-xl"
                    >
                        ×
                    </button>

                </div>

                {/* EMPTY CART CONTENT */}
                <div className="flex flex-col items-center text-center py-5">

                    <img
                        src="/images/shoppi-bag.png"
                        alt="Empty cart"
                    />

                    <h3 className="text-lg font-semibold text-gray-800 -mt-3">
                        There are no items yet.
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        Your cart is waiting for something delicious.
                        <br />
                        Let's add some!
                    </p>

                    <ButtonComponent
                        variant="primary"
                        onClick={() => {
                            onClose();
                            navigate("/popular");
                        }}
                        className="w-full mt-5"
                    >
                        Browse Restaurants
                    </ButtonComponent>

                </div>

            </div>
        );
    }

    return (
        <div
            ref={cartRef}
            className="absolute right-0 top-12 w-96 bg-white border rounded-xl shadow-lg p-5 z-50"
        >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-lg font-semibold">
                    Your Cart
                </h2>

                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700 text-xl"
                >
                    ×
                </button>

            </div>

            {/* ITEMS */}
            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">

                {cartItems.map((item) => (
                    <div
                        key={item.foodId}
                        className="flex items-center gap-3"
                    >

                        {/* IMAGE */}
                        <img
                            src={item.imageUrl}
                            alt={item.foodName}
                            className="w-16 h-16 rounded-lg object-cover"
                        />

                        {/* INFO */}
                        <div className="flex-1 min-w-0">

                            <h3 className="font-medium truncate">
                                {item.foodName}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {Number(item.price).toFixed(2)}€ / item
                            </p>

                            {/* COUNTER */}
                            <div className="flex items-center gap-2 mt-2">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.foodId)
                                    }
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <MinusIcon size={14}/>
                                </button>

                                <span className="w-5 text-center text-sm font-medium">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.foodId)
                                    }
                                    className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                                >
                                    <PlusIcon size={14}/>
                                </button>

                            </div>

                        </div>

                        {/* ITEM TOTAL */}
                        <span className="font-semibold whitespace-nowrap">
                            {(
                                Number(item.price) *
                                item.quantity
                            ).toFixed(2)}
                            €
                        </span>

                    </div>
                ))}

            </div>

            {/* TOTAL */}
            <div className="border-t mt-5 pt-4">

                <div className="flex justify-between items-center">

                    <span className="text-lg font-medium">
                        Total
                    </span>

                    <span className="text-xl font-bold">
                        {totalPrice.toFixed(2)}€
                    </span>

                </div>

                {/* CHECKOUT */}
                <button
                    onClick={() => {
                        onClose();
                        navigate("/checkout");
                    }}
                    className="w-full mt-4 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
                >
                    Go to checkout
                </button>

            </div>

        </div>
    );
}