import { ChevronRightIcon } from "@heroicons/react/24/solid";
import HeartIcon from "../../public/icons/HearthIcon";
import { useState } from "react";



export default function RestaurantCardComponent({
    imageUrl,
    rating,
    restaurantName,
    location,
    averagePrice
}) {

   const [liked,setLiked ] = useState(false); 

    return (
        <div className="flex flex-col w-full rounded-3xl border shadow-xl p-3 gap-3">

            <div className="relative">

                <img
                    src={imageUrl}
                    className="w-full h-40 object-cover rounded-xl"
                    alt={restaurantName}
                />

                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {rating}
                </div>

                <button className="absolute top-2 right-2 p-2 rounded-full bg-white border"
                    onClick={ ()=> setLiked(!liked) } >
                    <HeartIcon color={liked ? "#ef4444" : "#4b5563"} />
                </button>

            </div>

            <div className="flex flex-col">

                <h1 className="text-lg">{restaurantName}</h1>
                <h2 className="text-sm text-gray-400">{location}</h2>

                <div className="flex justify-between mt-3 items-center">
                    <h3 className="text-sm font-bold">from ${averagePrice}</h3>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                        <ChevronRightIcon className="w-5 h-5 text-black" />
                    </button>
                </div>

            </div>

        </div>
    )
}
