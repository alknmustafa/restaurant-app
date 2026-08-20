import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/NavbarComponent";
import ArrowLeftIcon from "../../public/icons/ArrowLeftIcon";
import StarIcon from "../../public/icons/StarIcon";
import ButtonComponent from "../components/ButtonComponent";
import { getRestaurantById } from "../services/restaurantService";
import FooterComponent from "../components/FooterComponent";
import CutleryIcon from "../../public/icons/CutleryIcon";
import ClockIcon from "../../public/icons/ClockIcon";
import DeliveryIcon from "../../public/icons/DeliveryIcon";
import LocationIcon from "../../public/icons/LocationIcon";
import DescriptionIcon from "../../public/icons/DescriptionIcon";
import MenuCardComponent from "../components/MenuCardComponent";
import { getMealsByRestaurantId } from "../services/mealService";
import ReviewOrderModal from "../components/ReviewOrderModal";

export default function RestaurantDetail() {
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [meals, setMeals] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);


  const handleOrder = (item) => {

    setSelectedItem(item);
    setShowOrderModal(true);
};
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurantById(id);
                setRestaurant(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurant();
    }, [id]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const data = await getMealsByRestaurantId(id);
                setMeals(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMeals();
    }, [id]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />

            {/* Back Button */}
            <div className="flex items-center gap-3 mt-5 px-4 sm:px-6 lg:px-8">
                <Link to="/">
                    <ArrowLeftIcon size={20} bold={2.5} />
                </Link>
            </div>

            <div className="w-full min-w-0 px-4 sm:px-6 lg:px-8 mb-20">

                {/* Restaurant Header */}
                <div className="flex items-start justify-between gap-4 mt-8 sm:mt-10">

                    {/* Restaurant Information */}
                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <CutleryIcon />

                            <h1 className="text-xl font-semibold break-words">
                                {restaurant.name}
                            </h1>

                        </div>

                        <h5 className="mt-1 text-gray-500 break-words">
                            {restaurant.cuisineTypes.join(" - ")}
                        </h5>

                        <h5 className="text-red-500 text-xl">
                            {"€".repeat(restaurant.priceLevel)}
                        </h5>

                    </div>

                    {/* Rating */}
                    <ButtonComponent className="shrink-0">

                        <div className="flex items-center justify-center">

                            <StarIcon
                                color="white"
                                fill="white"
                                size={14}
                            />

                            <span className="ml-1">
                                {restaurant.rating}
                            </span>

                        </div>

                    </ButtonComponent>

                </div>

                {/* Image Gallery */}
                {/* Hidden on mobile */}
                <div className="hidden sm:flex flex-row mt-10">

                    {/* Left side */}
                    <div className="bg-red-500 w-1/2 h-80 rounded-xl overflow-hidden">

                        <img
                            src="/images/restaurant-d1.jpg"
                            alt={restaurant.name}
                            className="w-full h-full rounded-xl object-cover"
                        />

                    </div>

                    {/* Right side */}
                    <div className="ml-8 w-1/2 h-80 grid grid-cols-2 grid-rows-2 gap-3">

                        <div className="rounded-xl overflow-hidden">
                            <img
                                src="/images/restaurant-d2.jpg"
                                alt={restaurant.name}
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>

                        <div className="rounded-xl overflow-hidden">
                            <img
                                src="/images/restaurant-d5.jpg"
                                alt={restaurant.name}
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>

                        <div className="rounded-xl overflow-hidden">
                            <img
                                src="/images/restaurant-d6.jpg"
                                alt={restaurant.name}
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>

                        <div className="rounded-xl overflow-hidden">
                            <img
                                src="/images/restaurant-d3.jpg"
                                alt={restaurant.name}
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>

                    </div>

                </div>

                {/* Description */}
                <div className="mt-8 sm:mt-10">

                    <div className="flex items-center">

                        <DescriptionIcon size={18} />

                        <h1 className="text-black text-lg font-semibold ml-2">
                            Description
                        </h1>

                    </div>

                    <div className="mt-2">

                        <p className="text-gray-500 leading-relaxed">
                            {restaurant.description}
                        </p>

                    </div>

                </div>

                {/* Restaurant Information */}
                <div className="flex flex-col md:flex-row gap-6 mt-8 sm:mt-10">

                    {/* Restaurant Image */}
                    <div className="w-full md:w-80 flex-shrink-0">

                        <img
                            src={restaurant.images[0]}
                            alt={restaurant.name}
                            className="w-full h-52 rounded-2xl object-cover"
                        />

                    </div>

                    {/* Restaurant Information */}
                    <div className="min-w-0">

                        <div className="flex items-center">

                            <LocationIcon size={20} />

                            <h1 className="text-black text-lg font-semibold ml-2">
                                Restaurant Information
                            </h1>

                        </div>

                        <div className="mt-3 space-y-2">

                            <p className="text-gray-500 break-words">
                                {restaurant.address.street},{" "}
                                {restaurant.address.postalCode}{" "}
                                {restaurant.address.city},{" "}
                                {restaurant.address.country}
                            </p>

                            <p className="text-gray-500 break-words">
                                {restaurant.phone}
                            </p>

                            <p className="text-gray-500 break-words">
                                {restaurant.email}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Overview */}
                <div className="mt-10 sm:mt-12">

                    <h1 className="text-black text-lg font-semibold">
                        Overview
                    </h1>

                    <hr className="mt-2" />

                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">

                        {/* Opening Hours */}
                        <div className="border rounded-xl p-4 sm:p-5">

                            <div className="flex items-center">

                                <ClockIcon size={18} />

                                <h5 className="font-semibold ml-2">
                                    Opening Hours
                                </h5>

                            </div>

                            <p className="mt-3 text-gray-500">
                                {restaurant.openingHours.monday.open}
                                {" - "}
                                {restaurant.openingHours.monday.close}
                            </p>

                        </div>

                        {/* Estimated Delivery */}
                        <div className="border rounded-xl p-4 sm:p-5">

                            <div className="flex items-center">

                                <DeliveryIcon size={18} />

                                <h5 className="font-semibold ml-2">
                                    Estimated Delivery
                                </h5>

                            </div>

                            <p className="mt-3 text-gray-500">
                                {restaurant.delivery.estimatedTime.min}
                                {" - "}
                                {restaurant.delivery.estimatedTime.max}
                                {" min"}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Menu */}
                <div id="menu" className="mt-10 sm:mt-12">

                    <h1 className="text-black text-lg font-semibold">
                        Menu
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-5">

                        {meals.map((meal) => (
                            <MenuCardComponent
                                key={meal._id}
                                meal={meal}
                                imageUrl={meal.image}
                                dishName={meal.name}
                                portion={meal.portion}
                                persons={meal.persons}
                                description={meal.description}
                                price={meal.price}
                                restaurantId={restaurant._id}
                                onOrder={handleOrder}
                            />
                        ))}

                    </div>

                </div>

            </div>


            {showOrderModal && (
                <ReviewOrderModal
                    selectedItem={selectedItem}
                    onClose={() => setShowOrderModal(false)}
                />
            )}
            <FooterComponent />
        </>
    );
}

