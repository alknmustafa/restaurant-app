import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import AddAddressModal from "./AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import AddressCardComponent from "./AddressCardComponent";
import ConfirmationModal from "./ConfirmationModal";

import {
    getAllAddresses,
    updateAddress,
    deleteAddress,
} from "../services/adressService";

export default function AddressesTabComponent() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // GET ADDRESSES
    useEffect(() => {
        const fetchAddresses = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                setError("You are not logged in.");
                return;
            }

            try {
                const data = await getAllAddresses(token);
                setAddresses(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    // ADD ADDRESS
    const handleAddressAdded = (newAddress) => {
        setAddresses((prev) => [...prev, newAddress]);
    };

    // EDIT ADDRESS
    const handleEdit = (address) => {
        setSelectedAddress(address);
        setIsEditModalOpen(true);
    };

    // UPDATED ADDRESS
    const handleAddressUpdated = (updatedAddress) => {
        setAddresses((prev) =>
            prev.map((address) => {
                if (address._id === updatedAddress._id) {
                    return updatedAddress;
                }

                if (updatedAddress.isDefault) {
                    return {
                        ...address,
                        isDefault: false,
                    };
                }

                return address;
            })
        );

        setSelectedAddress(null);
        setIsEditModalOpen(false);
    };

    // SET DEFAULT ADDRESS
    const handleSetDefault = async (address) => {
        try {
            const token = localStorage.getItem("token");

            const updatedAddress = await updateAddress(
                token,
                address._id,
                {
                    ...address,
                    isDefault: true,
                }
            );

            setAddresses((prev) =>
                prev.map((item) => ({
                    ...item,
                    isDefault: item._id === updatedAddress._id,
                }))
            );
        } catch (error) {
            setError(error.message);
        }
    };

    // DELETE ADDRESS
    const handleDelete = (addressId) => {
        setSelectedAddressId(addressId);
        setIsDeleteModalOpen(true);
    };

    // CONFIRM DELETE
    const handleConfirmDelete = async () => {
        try {
            setDeleteLoading(true);

            const token = localStorage.getItem("token");

            await deleteAddress(token, selectedAddressId);

            const data = await getAllAddresses(token);
            setAddresses(data);

            setSelectedAddressId(null);
            setIsDeleteModalOpen(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setDeleteLoading(false);
        }
    };

    // LOADING
    if (loading) {
        return (
            <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-800">
                    Addresses
                </h2>

                <p className="mt-4 text-gray-500">
                    Loading addresses...
                </p>
            </div>
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-800">
                    Addresses
                </h2>

                <p className="mt-4 text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">

            {/* EMPTY STATE */}
            {addresses.length === 0 && (
                <div className="flex flex-col items-center">

                    <div className="flex items-center justify-center">
                        <img
                            className="h-80 max-w-full"
                            src="/images/adress-img.jpg"
                            alt="Delivery address"
                        />
                    </div>

                    <div className="flex flex-col items-center">

                        <div>
                            <h2 className="text-center text-2xl font-bold text-gray-800">
                                Manage your delivery addresses
                            </h2>

                            <p className="mt-2 text-center text-gray-500">
                                Add your delivery address to make ordering your
                                favorite meals quick and easy.
                            </p>
                        </div>

                        <ButtonComponent
                            variant="primary"
                            className="mt-5 w-full px-6 py-3 sm:w-auto"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add new address
                        </ButtonComponent>

                    </div>

                </div>
            )}

            {/* ADDRESSES */}
            {addresses.length > 0 && (
                <div>

                    {/* HEADER */}
                    <div className="mt-8 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Your Addresses
                        </h2>

                        <ButtonComponent
                            variant="primary"
                            className="px-5 py-2.5"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add new address
                        </ButtonComponent>

                    </div>

                    {/* ADDRESS CARDS */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-10">

                        {addresses.map((address) => (
                            <AddressCardComponent
                                key={address._id}
                                address={address}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onSetDefault={handleSetDefault}
                            />
                        ))}

                    </div>

                </div>
            )}

            {/* ADD ADDRESS MODAL */}
            <AddAddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddressAdded={handleAddressAdded}
            />

            {/* EDIT ADDRESS MODAL */}
            <EditAddressModal
                isOpen={isEditModalOpen}
                address={selectedAddress}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedAddress(null);
                }}
                onAddressUpdated={handleAddressUpdated}
            />

            {/* DELETE CONFIRMATION MODAL */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    if (!deleteLoading) {
                        setIsDeleteModalOpen(false);
                        setSelectedAddressId(null);
                    }
                }}
                onConfirm={handleConfirmDelete}
                title="Delete address?"
                message="Are you sure you want to delete this address?"
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleteLoading}
            />

        </div>
    );
}