const API_URL = "http://localhost:5000/api/auth";


// GET USER
export const getUser = async (token) => {
  const res = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch user");
  }

  return data;
};


// UPDATE USER
export const updateUser = async (token, updateData) => {
  const res = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update user");
  }

  return data;
};


// TOGGLE FAVORITE
export const toggleFavorite = async (token, restaurantId) => {
  const res = await fetch(
    `${API_URL}/user/favorites/${restaurantId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to update favorite"
    );
  }

  return data;
};


// DELETE USER
export const deleteUser = async (token) => {
  const res = await fetch(`${API_URL}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to delete account"
    );
  }

  return data;
};