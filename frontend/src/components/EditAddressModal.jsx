import { useEffect, useState } from "react";
import { updateAddress } from "../services/adressService"
import ButtonComponent from "./ButtonComponent";

export default function EditAddressModal({
    isOpen,
    address,
    onClose,
    onAddressUpdated,
}) {
    const [formData, setFormData] = useState({
        label: "Home",
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        additionalInfo: "",
        isDefault: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fill form with selected address
    useEffect(() => {
        if (address) {
            setFormData({
                label: address.label || "Home",
                street: address.street || "",
                houseNumber: address.houseNumber || "",
                postalCode: address.postalCode || "",
                city: address.city || "",
                additionalInfo: address.additionalInfo || "",
                isDefault: address.isDefault || false,
            });
        }
    }, [address]);

    if (!isOpen || !address) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const updatedAddress = await updateAddress(
                token,
                address._id,
                formData
            );

            onAddressUpdated(updatedAddress);

            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* CLOSE BUTTON */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl text-gray-500 shadow-sm transition hover:bg-gray-100 hover:text-gray-800"
                >
                    ×
                </button>


                {/* IMAGE */}
                <div className="flex justify-center overflow-hidden rounded-t-3xl bg-white px-10 pt-6">
                    <img
                        src="/images/adress-img.jpg"
                        alt="Edit delivery address"
                        className="h-40 w-auto object-contain"
                    />
                </div>


                {/* CONTENT */}
                <div className="px-7 pb-7 pt-6 sm:px-9">

                    {/* HEADER */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Edit address
                        </h2>

                        <p className="mt-1.5 text-sm text-gray-500">
                            Update your delivery address details.
                        </p>
                    </div>


                    {/* ERROR */}
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
                            {error}
                        </div>
                    )}


                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* LABEL */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Address label
                            </label>

                            <select
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-50"
                            >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>


                        {/* STREET + HOUSE NUMBER */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Street
                                </label>

                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Königstraße"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    House No.
                                </label>

                                <input
                                    type="text"
                                    name="houseNumber"
                                    value={formData.houseNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="12"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                />
                            </div>

                        </div>


                        {/* POSTAL CODE + CITY */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Postal Code
                                </label>

                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                    placeholder="70173"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="Stuttgart"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                />
                            </div>

                        </div>


                        {/* ADDITIONAL INFO */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Additional information
                            </label>

                            <input
                                type="text"
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                placeholder="e.g. 2nd floor, apartment 4"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                            />
                        </div>


                        {/* DEFAULT ADDRESS */}
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 transition hover:bg-gray-100">

                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={handleChange}
                                className="h-4 w-4 cursor-pointer accent-red-500"
                            />

                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Set as default address
                                </p>

                                <p className="mt-0.5 text-xs text-gray-400">
                                    Use this address automatically for future orders.
                                </p>
                            </div>

                        </label>


                        {/* ACTIONS */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full rounded-xl px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 sm:w-auto"
                            >
                                Cancel
                            </button>

                            <ButtonComponent
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="w-full px-6 py-3 sm:w-auto"
                            >
                                {loading ? "Saving..." : "Save changes"}
                            </ButtonComponent>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}