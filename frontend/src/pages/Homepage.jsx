import { ChevronRightIcon, HandRaisedIcon } from "@heroicons/react/24/solid";
import NavbarComponent from "../components/NavbarComponent";
import RestaurantCardComponent from "../components/RestaurantCardComponent";
import HandIcon from "../../public/icons/HandIcon";
import ButtonComponent from "../components/ButtonComponent";
import CuisineLabelComponent from "../components/CuisineLabelComponent";
import { Link } from "react-router-dom";


export default function Homepage() {

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <NavbarComponent />

      <div className="min-h-screen px-12 pt-12 bg-white">

        {/* HERO */}
        <div className="relative w-full">

          <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden">

            <img
              src="/images/test2-img.jpg"
              className="w-full h-full object-cover blur-sm"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white">
              <div>
                <h1 className="text-lg md:text-4xl font-bold">
                  Find your favourite restaurant
                </h1>

                <p className="text-sm md:text-lg mt-4 text-gray-200">
                  Discover a variety of local cuisines!
                </p>

                <ButtonComponent variant="primary" children={"Get Started"} className="mt-6 md:hidden px-5 py-3" />

              </div>
            </div>

          </div>

          {/* FLOATING CARD */}
          <div className="hidden md:block absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-[70%] bg-white text-black px-10 py-8 rounded-full shadow-2xl">
            <div className="flex justify-around items-center">

              <div>
                <h1>Location</h1>
                <p className="text-gray-400 mt-2">Search restaurants</p>
              </div>

              <div>
                <h1>Order</h1>
                <p className="text-gray-400 mt-2">Select date</p>
              </div>

              <div>
                <h1>Review</h1>
                <p className="text-gray-400 mt-2">Number of</p>
              </div>

              <div>
                <h1>Payment</h1>
                <p className="text-gray-400 mt-2">Select method</p>
              </div>

              <button className="p-4 rounded-3xl bg-red-600 hover:bg-red-700">
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

        </div>

        {/* CUISINES */}
        <div className="mt-20 md:mt-36 text-2xl">
          <h1>Popular Cuisines</h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[200px]">

            {/* 1 */}
            <div className="md:row-span-2 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto">
              <img
                src="/images/italian-food.jpg"
                className="w-full h-full object-cover"
              />
              <CuisineLabelComponent children={"Italian"} />
            </div>

            {/* 2 COLUMN */}
            <div className="md:row-span-2 flex flex-col gap-4 h-full">

              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full">
                <img
                  src="/images/asian-food.jpg"
                  className="w-full h-full object-cover"
                />
                <CuisineLabelComponent children={"Asian"} className="px-5" />
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full">
                <img
                  src="/images/indian-food.jpg"
                  className="w-full h-full object-cover"
                />
                <CuisineLabelComponent children={"Indian"} />
              </div>

            </div>

            {/* 3 */}
            <div className="md:row-span-2 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto">
              <img
                src="/images/american-food.jpg"
                className="w-full h-full object-cover"
              />
              <CuisineLabelComponent children={"American"} />

            </div>

            {/* 4 COLUMN */}
            <div className="md:row-span-2 flex flex-col gap-4 h-full">

              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full">
                <img
                  src="/images/mediterranean-food.jpg"
                  className="w-full h-full object-cover"
                />
                <CuisineLabelComponent children={"Mediterranean"} />
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] flex-1 h-full">
                <img
                  src="/images/chinese-food.jpg"
                  className="w-full h-full object-cover"
                />
                <CuisineLabelComponent children={"Chinese"} />
              </div>

            </div>

          </div>
        </div>

        {/* RESTAURANTS */}
        <div className="mt-20">
          <h1 className="text-2xl md:text-start text-center">Top rated restaurants</h1>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-8xl mx-auto">

            <RestaurantCardComponent imageUrl="/images/restaurant-1.jpg" restaurantName={"Pasta Paradise"} location={"Rome"} rating={9.6} averagePrice={10}></RestaurantCardComponent>
            <RestaurantCardComponent imageUrl="/images/restaurant-3.jpg" restaurantName={"Sushi Delight"} location={"Tokyo"} rating={9.6} averagePrice={15}></RestaurantCardComponent>
            <RestaurantCardComponent imageUrl="/images/restaurant-4.jpg" restaurantName={"Burger Heaven"} location={"New York"} rating={9.5} averagePrice={20}></RestaurantCardComponent>
            <RestaurantCardComponent imageUrl="/images/restaurant-2.jpg" restaurantName={"Taco Fiesta"} location={"Mexico City"} rating={9.4} averagePrice={10}></RestaurantCardComponent>
            <RestaurantCardComponent imageUrl="/images/restaurant-5.jpg" restaurantName={"Curry House"} location={"Mumbai"} rating={9.2} averagePrice={5}></RestaurantCardComponent>
          </div>
        </div>

        {/* BOTTOM SIGN UP */}
        {!isLoggedIn && (
          <div className="flex flex-row items-center mt-20 p-12 border shadow-2xl w-full h-28 rounded-3xl">
            <HandIcon size={45} />

            <div className="flex flex-col ml-10">
              <h1 className="font-bold">Hungry?</h1>
              <h1 className="text-gray-500">
                Get exclusive offers and discounts on your favorite restaurants. Sign up now!
              </h1>
            </div>

            <div className="ml-auto">
              <Link to="/register">
                <ButtonComponent variant="secondary" className="px-14 py-2 border-black">
                  Sign up now
                </ButtonComponent>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-20">
          <h1>s</h1>
        </div>

      </div>
    </>
  );
}