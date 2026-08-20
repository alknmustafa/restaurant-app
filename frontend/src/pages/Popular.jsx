import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import FooterComponent from "../components/FooterComponent";
import FilterSectionComponent from "../components/FilterSectionComponent";
import ButtonComponent from "../components/ButtonComponent";
import ArrowLeftIcon from "../../public/icons/ArrowLeftIcon";
import ChevronDownIcon from "../../public/icons/ChevronDownIcon";
import RestaurantListComponent from "../components/RestaurantListComponent";
import Navbar from "../components/NavbarComponent";

export default function Popular() {

  const [searchParams] = useSearchParams();

  const cuisineFromUrl = searchParams.get("cuisine");

  const [filters, setFilters] = useState(() => {
    if (cuisineFromUrl) {
      return {
        cuisine: cuisineFromUrl,
      };
    }

    return {};
  });

  const [sortBy, setSortBy] = useState("");
  const [restaurantCount, setRestaurantCount] = useState(0);

  const cuisineTypes = [
    "American",
    "Asian",
    "Chinese",
    "Indian",
    "Italian",
    "Mediterranean",
  ];

  useEffect(() => {

    if (cuisineFromUrl) {

      setFilters((prev) => ({
        ...prev,
        cuisine: cuisineFromUrl,
      }));

    }

  }, [cuisineFromUrl]);

  // Toggle filter
  const toggle = (key, label) => {

    setFilters((prev) => {

      const updated = { ...prev };

      if (updated[key]) {

        delete updated[key];

      } else {

        updated[key] = label;

      }

      return updated;

    });

  };

  // Remove filter
  const removeFilter = (key) => {

    setFilters((prev) => {

      const updated = { ...prev };

      delete updated[key];

      return updated;

    });

  };

  const activeFilters = Object.entries(filters);

  return (
    <>

      <Navbar />

      <div className="flex bg-white min-h-screen">

        {/* SIDEBAR */}

        <div className="w-72 h-screen overflow-y-auto p-6 bg-white border-r">

          {/* HEADER */}

          <div className="flex items-center gap-3 mb-6">

            <Link to="/">
              <ArrowLeftIcon size={20} bold={2.5} />
            </Link>

          </div>

          {/* POPULAR */}

          <FilterSectionComponent
            title="Popular"
            filters={filters}
            toggle={toggle}
            items={[
              {
                key: "budget",
                label: "Budget Friendly",
              },
              {
                key: "delivery",
                label: "Free Delivery",
              },
              {
                key: "fineDining",
                label: "Fine Dining",
              },
            ]}
          />

          {/* PRICE */}

          <FilterSectionComponent
            title="Price Range"
            filters={filters}
            toggle={toggle}
            items={[
              {
                key: "p1",
                label: "Under €15",
              },
              {
                key: "p2",
                label: "€15 - €35",
              },
              {
                key: "p3",
                label: "€35 and above",
              },
            ]}
          />

          {/* APPLY BUTTON */}

          <div className="mt-10">

            <ButtonComponent
              children="Apply Filters"
              variant="primary"
              className="w-full"
            />

          </div>

        </div>

        {/* CONTENT */}

        <div className="flex-1 p-8">

          {/* HEADER */}

          <div className="mb-6">

            {/* RESULT COUNT */}

            <p className="text-sm text-gray-500">
              {restaurantCount} results found
            </p>

            <div className="flex justify-between items-center mt-2">

              <h2 className="text-2xl font-bold">
                Restaurants nearby
              </h2>

              {/* SORT */}

              <div className="relative w-48">

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none border rounded-xl px-4 py-2 pr-10 bg-white text-sm"
                >

                  <option value="">
                    Sort by
                  </option>

                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="rating">
                    Highest Rating
                  </option>

                  <option value="nearest">
                    Nearest
                  </option>

                </select>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">

                  <ChevronDownIcon size={18} />

                </div>

              </div>

            </div>

            {/* FILTER CHIPS */}

            <div className="flex flex-wrap gap-2 mt-4">

              {activeFilters.map(([key, label]) => (

                <div
                  key={key}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-sm"
                >

                  {label}

                  <button
                    onClick={() => removeFilter(key)}
                    className="ml-1"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* CATEGORY */}

          <div className="mt-8">

            <p className="text-lg font-bold">
              Browse by Category
            </p>

            <hr className="mt-3" />

            <div className="flex flex-wrap gap-4 mt-6">

              {cuisineTypes.map((cuisine) => (

                <div
                  key={cuisine}
                  onClick={() => toggle("cuisine", cuisine)}
                  className={`px-5 py-1.5 border rounded-full cursor-pointer ${filters.cuisine === cuisine
                      ? "bg-red-500 text-white border-red-500"
                      : "hover:bg-gray-100"
                    }`}
                >

                  {cuisine}

                </div>

              ))}

            </div>

          </div>

          {/* RESTAURANT LIST */}

          <div className="mt-5">

            <RestaurantListComponent
              filters={filters}
              sortBy={sortBy}
              onCountChange={setRestaurantCount}
            />

          </div>

        </div>

      </div>

      <FooterComponent />

    </>
  );
}

