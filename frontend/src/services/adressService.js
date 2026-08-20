const API_URL = "http://localhost:5000/api/addresses";

// GET ALL ADDRESSES
export const getAllAddresses = async (token) => {
    const res = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch addresses");
    }

    return data;
};


export const addAddress = async (token, addressData) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to add address");
    }

    return data;
};


export const updateAddress = async (
    token,
    addressId,
    addressData
) => {
    const res = await fetch(`${API_URL}/${addressId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update address");
    }

    return data;
};


export const deleteAddress = async (token, addressId) => {
    const res = await fetch(`${API_URL}/${addressId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to delete address");
    }

    return data;
};