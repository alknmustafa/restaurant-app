import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import RestaurantCardComponent from "../components/RestaurantCardComponent";
import ButtonComponent from "../components/ButtonComponent";
import CuisineLabelComponent from "../components/CuisineLabelComponent";

import HandIcon from "../../public/icons/HandIcon";

import { getRestaurants } from "../services/restaurantService";
import { getUser } from "../services/userService";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Homepage() {

  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const restaurantData = await getRestaurants();

        setRestaurants(restaurantData);

        const token = localStorage.getItem("token");

        if (token) {

          const userData = await getUser(token);

          setUser(userData);

        }

      } catch (error) {

        console.error(
          "Failed to load homepage data:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  const goToCuisine = (cuisine) => {
    navigate(`/popular?cuisine=${encodeURIComponent(cuisine)}`);
  };

  return (
    <>
      <NavbarComponent />

      <div className="min-h-screen px-12 pt-12 bg-white">

        {/* HERO */}

        <div className="relative w-full">

          <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden">

            <img
              src="/images/layout-img.jpg"
              className="w-full h-full object-cover blur-sm"
              alt="Restaurant"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white">

              <div>

                <h1 className="text-lg md:text-4xl font-bold">
                  Find your favourite restaurant
                </h1>

                <p className="text-sm md:text-lg mt-4 text-gray-200">
                  Discover a variety of local cuisines!
                </p>

                <ButtonComponent
                  variant="primary"
                  onClick={() => navigate("/popular")}
                  className="mt-6 md:hidden px-5 py-3"
                >
                  Get Started
                </ButtonComponent>

              </div>

            </div>

          </div>

          {/* FLOATING CARD */}

          <div className="hidden md:block absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-[70%] bg-white text-black px-10 py-8 rounded-full shadow-2xl">

            <div className="flex justify-around items-center">

              <div>

                <h1>Location</h1>

                <p className="text-gray-400 mt-2">
                  Search restaurants
                </p>

              </div>

              <div>

                <h1>Order</h1>

                <p className="text-gray-400 mt-2">
                  Select date
                </p>

              </div>

              <div>

                <h1>Review</h1>

                <p className="text-gray-400 mt-2">
                  Number of
                </p>

              </div>

              <div>

                <h1>Payment</h1>

                <p className="text-gray-400 mt-2">
                  Select method
                </p>

              </div>

              <Link
                to="/popular"
                className="p-4 rounded-3xl bg-red-600 hover:bg-red-700 inline-flex items-center justify-center"
              >

                <ChevronRightIcon className="w-6 h-6 text-white" />

              </Link>

            </div>

          </div>

        </div>

        {/* CUISINES */}

        <div className="mt-20 md:mt-36 text-2xl">

          <h1>
            Popular Cuisines
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[200px]">

            {/* ITALIAN */}

            <div
              onClick={() => goToCuisine("Italian")}
              className="md:row-span-2 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto cursor-pointer"
            >

              <img
                src="/images/italian-food.jpg"
                className="w-full h-full object-cover"
                alt="Italian food"
              />

              <CuisineLabelComponent>
                Italian
              </CuisineLabelComponent>

            </div>

            {/* ASIAN + INDIAN */}

            <div className="md:row-span-2 flex flex-col gap-4 h-full">

              <div
                onClick={() => goToCuisine("Asian")}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full cursor-pointer"
              >

                <img
                  src="/images/asian-food.jpg"
                  className="w-full h-full object-cover"
                  alt="Asian food"
                />

                <CuisineLabelComponent className="px-5">
                  Asian
                </CuisineLabelComponent>

              </div>

              <div
                onClick={() => goToCuisine("Indian")}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full cursor-pointer"
              >

                <img
                  src="/images/indian-food.jpg"
                  className="w-full h-full object-cover"
                  alt="Indian food"
                />

                <CuisineLabelComponent>
                  Indian
                </CuisineLabelComponent>

              </div>

            </div>

            {/* AMERICAN */}

            <div
              onClick={() => goToCuisine("American")}
              className="md:row-span-2 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto cursor-pointer"
            >

              <img
                src="/images/american-food.jpg"
                className="w-full h-full object-cover"
                alt="American food"
              />

              <CuisineLabelComponent>
                American
              </CuisineLabelComponent>

            </div>

            {/* MEDITERRANEAN + CHINESE */}

            <div className="md:row-span-2 flex flex-col gap-4 h-full">

              <div
                onClick={() => goToCuisine("Mediterranean")}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full cursor-pointer"
              >

                <img
                  src="/images/mediterranean-food.jpg"
                  className="w-full h-full object-cover"
                  alt="Mediterranean food"
                />

                <CuisineLabelComponent>
                  Mediterranean
                </CuisineLabelComponent>

              </div>

              <div
                onClick={() => goToCuisine("Chinese")}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full cursor-pointer"
              >

                <img
                  src="/images/chinese-food.jpg"
                  className="w-full h-full object-cover"
                  alt="Chinese food"
                />

                <CuisineLabelComponent>
                  Chinese
                </CuisineLabelComponent>

              </div>

            </div>

          </div>

        </div>

        {/* RESTAURANTS */}

        <div className="mt-20">

          <h1 className="text-2xl md:text-start text-center">
            Top rated restaurants
          </h1>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-8xl mx-auto">

            {loading ? (

              <div className="col-span-full flex justify-center py-10">

                <p className="text-sm text-gray-500">
                  Loading restaurants...
                </p>

              </div>

            ) : restaurants.length === 0 ? (

              <div className="col-span-full flex justify-center py-10">

                <p className="text-sm text-gray-500">
                  No restaurants found.
                </p>

              </div>

            ) : (

              restaurants
                .slice()
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 5)
                .map((restaurant) => (

                  <RestaurantCardComponent
                    key={restaurant._id}
                    restaurantId={restaurant._id}
                    imageUrl={restaurant.images?.[0]}
                    restaurantName={restaurant.name}
                    location={restaurant.address?.city}
                    rating={restaurant.rating}
                    averagePrice={restaurant.averagePrice}
                    favorites={user?.favorites || []}
                  />

                ))

            )}

          </div>

        </div>

        {/* SIGN UP */}

        {!isLoggedIn && (

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 mt-10 sm:mt-20 p-6 sm:p-12 border shadow-2xl w-full rounded-3xl">

            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100">

              <HandIcon size={30} />

            </div>

            <div className="flex flex-col sm:ml-10">

              <h1 className="font-bold">
                Hungry?
              </h1>

              <h1 className="text-gray-500">
                Get exclusive offers and discounts on your favorite restaurants. Sign up now!
              </h1>

            </div>

            <div className="sm:ml-auto w-full sm:w-auto">

              <Link to="/register">

                <ButtonComponent
                  variant="secondary"
                  className="w-full sm:w-auto px-6 sm:px-14 py-2 border-black"
                >
                  Sign up now
                </ButtonComponent>

              </Link>

            </div>

          </div>

        )}

      </div>

      <div className="mt-20">

        <FooterComponent />

      </div>

    </>
  );
}