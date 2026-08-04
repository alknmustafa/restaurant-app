const API_URL = "http://localhost:5000/api/restaurants"

export const getRestaurants = async () =>{
    const res = await fetch(API_URL, {
        method : "GET",
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Failed to fetch restaurants.")
    }

    return data;
}