const API_URL = "http://localhost:5000/api/orders";


// CREATE ORDER
export const createOrder = async ({
    user,
    restaurantId,
    cartItems,
    address,
    customer,
    notes,
    subtotal,
    deliveryFee,
    totalPrice,
    paymentMethod
}) => {

    const token = localStorage.getItem("token");

    const orderData = {
        restaurantId,

        customer: {
            name: customer.name,
            email: customer.email,

            address: {
                label: address.label,
                street: address.street,
                houseNumber: address.houseNumber,
                postalCode: address.postalCode,
                city: address.city,
                additionalInfo: address.additionalInfo || "",
            },

            notes,
        },

        items: cartItems.map((item) => ({
            foodId: item.foodId,
            name: item.foodName,
            price: Number(item.price),
            quantity: item.quantity,
        })),

        subtotal,
        deliveryFee,
        totalPrice,
        paymentMethod,
    };


    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orderData),
    });


    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
    }

    return data;
};


// GET ALL USER ORDERS
export const getUserOrders = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
};


// GET SINGLE ORDER
export const getOrderById = async (orderId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${orderId}`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );


    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch order");
    }

    return data;
};

