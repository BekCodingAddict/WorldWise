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

export const createCities = () => {};

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
  } catch (error) {
    console.log(error.message);
    throw new Error("deleteCity:" + error.message);
  }
};
