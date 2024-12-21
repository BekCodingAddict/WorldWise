import { useQuery } from "@tanstack/react-query";
import { getCity } from "../services/apiCities";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCity } from "../redux/currentCitySlice";
import { useEffect } from "react";

export function useCity() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.currentCity);

  const {
    isLoading,
    data: city = {},
    error,
  } = useQuery({
    queryKey: ["city", id],
    queryFn: () => getCity(id),
    refetchOnMount: true,
  });

  useEffect(() => {
    if (city?._id && city._id !== currentCity?._id) {
      dispatch(setCurrentCity(city));
    }
  }, [city, currentCity, dispatch]);

  return { isLoading, error, city };
}
