import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import PlusIcon from "../../public/icons/PlusIcon";
import MinusIcon from "../../public/icons/MinusIcon";

export default function ReviewOrderModal({
    selectedItem,
    onClose,
}) {
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setQuantity(1);
    }, [selectedItem]);

    if (!selectedItem) {
        return null;
    }

    const totalPrice =
        Number(selectedItem.price) * quantity;

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((current) => {
            if (current === 1) {
                onClose();
                return 1;
            }

            return current - 1;
        });
    };

    const handleAddToCart = () => {
        addToCart({
            foodId: selectedItem._id,
            restaurantId: selectedItem.restaurantId,
            imageUrl: selectedItem.imageUrl,
            foodName: selectedItem.dishName,
            price: Number(selectedItem.price),
            quantity,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* MODAL */}
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4 bg-white rounded-2xl shadow-xl p-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-semibold">
                        Review Order
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                {/* COLUMN HEADERS */}
                <div className="flex justify-between mt-8 p-3 border-b">

                    <h3 className="text-sm font-medium text-gray-500">
                        {quantity}{" "}
                        {quantity === 1 ? "Item" : "Items"}
                    </h3>

                    <h3 className="text-sm font-medium text-gray-500">
                        Total
                    </h3>

                </div>

                {/* ITEM */}
                <div className="flex items-center gap-4 mt-5">

                    {/* IMAGE */}
                    <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.dishName}
                        className="w-24 h-24 rounded-xl object-cover"
                    />

                    {/* INFO */}
                    <div className="flex-1 min-w-0">

                        <h3 className="text-lg font-medium truncate">
                            {selectedItem.dishName}
                        </h3>

                        {/* PRICE PER ITEM */}
                        <p className="text-gray-500 mt-1">
                            {Number(selectedItem.price).toFixed(2)}€ / item
                        </p>

                        {/* COUNTER */}
                        <div className="flex items-center gap-3 mt-3">

                            <button
                                onClick={decreaseQuantity}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                            >
                                <MinusIcon size={14}/>
                            </button>

                            <span className="w-5 text-center font-medium">
                                {quantity}
                            </span>

                            <button
                                onClick={increaseQuantity}
                                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                            >
                                <PlusIcon size={14}/>
                            </button>

                        </div>

                    </div>

                    {/* ITEM TOTAL */}
                    <div className="font-semibold whitespace-nowrap">
                        {totalPrice.toFixed(2)}€
                    </div>

                </div>

                {/* TOTAL */}
                <div className="mt-auto pt-6">

                    <div className="flex justify-between items-center">

                        <span className="text-lg font-medium">
                            Total
                        </span>

                        <span className="text-xl font-bold">
                            {totalPrice.toFixed(2)}€
                        </span>

                    </div>

                    {/* CHECKOUT BUTTON */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full mt-10 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
                    >
                        Continue to Checkout
                    </button>

                </div>

            </div>

        </div>
    );
}