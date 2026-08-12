const API_URL = "http://localhost:5000/api/meals";

export const getMealsByRestaurantId = async (restaurantId) => {
  const response = await fetch(`${API_URL}/${restaurantId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return response.json();
};