import { getRestaurants } from "../services/restaurantService";
import { useState, useEffect } from "react";
import ClockIcon from "../../public/icons/ClockIcon";
import StarIcon from "../../public/icons/StarIcon";
import ButtonComponent from "./ButtonComponent";
import OpeningStatus from "./OpeningStatus";
import PriceRange from "./PriceRange";
import { Link } from "react-router-dom";

export default function RestaurantListComponent({
  filters = {},
  sortBy = "",
  onCountChange,
}) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    loadRestaurants();
  }, []);

  const featureMap = {
    budget: "budgetFriendly",
    delivery: "freeDelivery",
    fineDining: "fineDining",
  };

  const priceMap = {
    p1: 1,
    p2: 2,
    p3: 3,
  };

  // FILTER
  const filteredRestaurants = restaurants.filter((restaurant) => {
    return Object.keys(filters).every((filterKey) => {
      // Popular filters
      const feature = featureMap[filterKey];

      if (feature) {
        return restaurant.features?.[feature] === true;
      }

      // Price filters
      const priceLevel = priceMap[filterKey];

      if (priceLevel) {
        return restaurant.priceLevel === priceLevel;
      }

      // Cuisine filter
      if (filterKey === "cuisine") {
        return restaurant.cuisineTypes?.includes(filters.cuisine);
      }

      return true;
    });
  });

  // SORT
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }

    return 0;
  });


  useEffect(() => {
    onCountChange?.(sortedRestaurants.length);
  }, [sortedRestaurants.length, onCountChange]);

  return (
    <div className="flex flex-col gap-6">

      {sortedRestaurants.length === 0 ? (

        // NO RESULTS
        <div className="w-full py-20 text-center">
          <p className="text-lg font-semibold text-red-500">
            No restaurants found
          </p>

          <p className="mt-2 text-sm text-gray-400">
            No restaurants match your selected criteria.
          </p>
        </div>

      ) : (

        // RESTAURANTS
        sortedRestaurants.map((restaurant) => (
          <Link
            to={`/restaurants/${restaurant._id}`}
            key={restaurant._id}
            className="flex gap-6 p-5 border border-gray-200 rounded-2xl shadow-sm bg-white"
          >
            {/* IMAGE */ }
          <div className = "w-56 h-56 rounded-2xl overflow-hidden flex-shrink-0" >

          <img
            src={restaurant.images}
            alt={restaurant.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />

            </div>

            {/* CONTENT */ }
  <div className="flex flex-col justify-between flex-1 h-56">

    {/* TOP */}
    <div className="flex justify-between">

      <div>

        {/* NAME */}
        <h2 className="text-2xl font-bold text-gray-800">
          {restaurant.name}
        </h2>

        {/* FEATURES */}
        <div className="flex gap-2 mt-3">

          {restaurant.features?.freeDelivery && (
            <span className="px-3 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium">
              # Free Delivery
            </span>
          )}

          {restaurant.features?.fineDining && (
            <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              # Fine Dining
            </span>
          )}

          {restaurant.features?.budgetFriendly && (
            <span className="px-3 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">
              # Budget Friendly
            </span>
          )}

        </div>

        {/* INFO */}
        <div className="flex gap-6 mt-5 text-gray-500 text-sm">

          <div className="flex items-center gap-1">
            📍 1.2 km
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon color="black" />

            {restaurant.delivery?.estimatedTime?.min}-
            {restaurant.delivery?.estimatedTime?.max} min
          </div>

          <div className="flex items-center gap-1">
            <StarIcon color="red" />

            {restaurant.reviewCount} Reviews
          </div>

        </div>

      </div>

      {/* RATING */}
      <ButtonComponent className="px-3 py-2.5 h-fit">

        <div className="flex items-center gap-2">

          <StarIcon
            color="white"
            fill="white"
            size={16}
          />

          <span>
            {restaurant.rating}
          </span>

        </div>

      </ButtonComponent>

    </div>

    {/* BOTTOM */}
    <div className="flex justify-between items-end">

      <OpeningStatus />

      <div className="flex flex-col items-end gap-6">

        <PriceRange
          priceLevel={restaurant.priceLevel}
        />

        <ButtonComponent
          className="px-8"
          variant="primary"
        >
          Order Now
        </ButtonComponent>

      </div>

    </div>

  </div>
          
    </Link>
        ))
      )
}

    </div >
    
  );
}