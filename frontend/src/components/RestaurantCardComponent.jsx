import { ChevronRightIcon } from "@heroicons/react/24/solid";
import HeartIcon from "../../public/icons/HearthIcon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../services/userService";

export default function RestaurantCardComponent({
    imageUrl,
    rating,
    restaurantName,
    location,
    averagePrice,
    restaurantId,
    favorites = [],
    onFavoriteChange
}) {

    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);

    useEffect(() => {

        const isFavorite = favorites?.some((favorite) => {

            const favoriteId =
                typeof favorite === "object"
                    ? favorite._id
                    : favorite;

            return favoriteId?.toString() === restaurantId?.toString();
        });

        setLiked(isFavorite);

    }, [favorites, restaurantId]);

    const handleFavorite = async (e) => {

        e.stopPropagation();

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            const data = await toggleFavorite(
                token,
                restaurantId
            );

            setLiked((prev) => !prev);

            if (onFavoriteChange) {
                onFavoriteChange(data.favorites);
            }

        } catch (err) {

            console.error(
                "Failed to update favorite:",
                err
            );

        }
    };

    const handleRestaurantClick = () => {
        navigate(`/restaurants/${restaurantId}`);
    };

    return (
        <div className="flex flex-col w-full rounded-3xl border shadow-xl p-3 gap-3">

            <div
                className="relative cursor-pointer"
                onClick={handleRestaurantClick}
            >

                <img
                    src={imageUrl}
                    className="w-full h-40 object-cover rounded-xl"
                    alt={restaurantName}
                />

                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {rating}
                </div>

                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-white border"
                    onClick={handleFavorite}
                >
                    <HeartIcon
                        color={
                            liked
                                ? "#ef4444"
                                : "#4b5563"
                        }
                    />
                </button>

            </div>

            <div className="flex flex-col">

                <h1
                    className="text-lg cursor-pointer"
                    onClick={handleRestaurantClick}
                >
                    {restaurantName}
                </h1>

                <h2 className="text-sm text-gray-400">
                    {location}
                </h2>

                <div className="flex justify-between mt-3 items-center">

                    <div className="flex items-center gap-1">

                        <span className="text-sm text-gray-500">
                            from 10
                        </span>

                        <span className="text-sm font-bold text-black">
                            €{averagePrice}
                        </span>

                    </div>

                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        onClick={handleRestaurantClick}
                    >
                        <ChevronRightIcon className="w-5 h-5 text-black" />
                    </button>

                </div>

            </div>

        </div>
    );
}