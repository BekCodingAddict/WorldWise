import axios from "axios";

export const getCities = async () => {
  try {
    const { data } = await axios.post(
      "/api/users/get-cities",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error("getCities:" + error.message);
  }
};

export const getCity = async (cityId) => {
  try {
    const { data } = await axios.post(
      "/api/users/get-city-by-id",
      { cityId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error("getCity:" + error.message);
  }
};

export const addCity = async (newCity) => {
  try {
    const { data } = await axios.post("/api/users/add-city", newCity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error("addCity:" + error.message);
  }
};

export const deleteCity2 = async (cityId) => {
  try {
    const { data } = await axios.post(
      "/api/users/delete-city",
      { cityId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error.message);
    throw new Error("deleteCity:" + error.message);
  }
};

export const reverseGeocode = async ({ lat, lng }) => {
  const response = await axios.post("/api/users/reverse-geocode", {
    lat,
    lng,
  });
  if (!response) {
    console.log("Could not found city!");
    return { error: { message: "Could not found the city!" } };
  }

  return response.data.data;
};
