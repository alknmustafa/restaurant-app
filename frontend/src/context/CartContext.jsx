import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (cartItem) => cartItem.foodId === item.foodId
            );

            if (existingItem) {
                return currentItems.map((cartItem) =>
                    cartItem.foodId === item.foodId
                        ? {
                              ...cartItem,
                              quantity:
                                  cartItem.quantity + item.quantity,
                          }
                        : cartItem
                );
            }

            return [...currentItems, item];
        });
    };

    const increaseQuantity = (foodId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.foodId === foodId
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (foodId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.foodId === foodId
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}