import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser, toggleFavorite } from "../services/userService";

import HeartIcon from "../../public/icons/HearthIcon";

export default function FavouritesTabComponent({ user }) {

    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {

        const fetchFavorites = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setFavorites([]);
                    return;
                }

                const userData = await getUser(token);

                setFavorites(userData?.favorites || []);

            } catch (err) {

                console.error(
                    "Failed to fetch favorites:",
                    err
                );

                setFavorites([]);

            } finally {

                setLoading(false);

            }

        };

        fetchFavorites();

    }, []);


    const handleRemoveFavorite = async (restaurantId) => {

        try {

            setRemovingId(restaurantId);

            const token = localStorage.getItem("token");

            const data = await toggleFavorite(
                token,
                restaurantId
            );

            setFavorites((currentFavorites) =>
                currentFavorites.filter(
                    (restaurant) =>
                        restaurant._id?.toString() !==
                        restaurantId?.toString()
                )
            );

        } catch (err) {

            console.error(
                "Failed to remove favorite:",
                err
            );

        } finally {

            setRemovingId(null);

        }

    };


    if (loading) {

        return (
            <div className="flex justify-center py-20">

                <p className="text-sm text-gray-500">
                    Loading favourites...
                </p>

            </div>
        );

    }


    if (favorites.length === 0) {

        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">

                    <HeartIcon
                        color="#9ca3af"
                        size={28}
                    />

                </div>

                <h2 className="mt-5 text-lg font-semibold text-gray-900">
                    No favourites yet
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Restaurants you save will appear here.
                </p>

                <button
                    onClick={() => navigate("/popular")}
                    className="mt-6 px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                    Explore Restaurants
                </button>

            </div>
        );

    }


    return (
        <div>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                    My Favourites
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Your saved restaurants
                </p>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {favorites.map((restaurant) => (

                    <div
                        key={restaurant._id}
                        className="bg-white border border-gray-200 rounded-2xl p-3 hover:shadow-md transition"
                    >

                        <div className="relative">

                            <img
                                src={restaurant.images?.[0]}
                                alt={restaurant.name}
                                onClick={() =>
                                    navigate(
                                        `/restaurants/${restaurant._id}`
                                    )
                                }
                                className="w-full h-44 object-cover rounded-xl cursor-pointer"
                            />


                            <button
                                onClick={() =>
                                    handleRemoveFavorite(
                                        restaurant._id
                                    )
                                }
                                disabled={
                                    removingId === restaurant._id
                                }
                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-50"
                            >

                                <HeartIcon
                                    color="#ef4444"
                                    size={19}
                                />

                            </button>

                        </div>


                        <div className="px-1 pt-4 pb-2">

                            <h3
                                onClick={() =>
                                    navigate(
                                        `/restaurants/${restaurant._id}`
                                    )
                                }
                                className="text-base font-semibold text-gray-900 cursor-pointer hover:text-red-500 transition"
                            >
                                {restaurant.name}
                            </h3>


                            {restaurant.address?.city && (

                                <p className="text-sm text-gray-500 mt-1">
                                    {restaurant.address.city}
                                </p>

                            )}


                            {restaurant.cuisineTypes?.length > 0 && (

                                <p className="text-xs text-gray-400 mt-2">
                                    {restaurant.cuisineTypes.join(" · ")}
                                </p>

                            )}


                            {restaurant.priceLevel && (

                                <div className="mt-3 flex gap-0.5">

                                    {Array.from({
                                        length: restaurant.priceLevel
                                    }).map((_, index) => (

                                        <span
                                            key={index}
                                            className="text-sm font-semibold text-gray-900"
                                        >
                                            €
                                        </span>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

