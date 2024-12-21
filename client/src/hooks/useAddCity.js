import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCity as addCityAPI } from "../services/apiCities";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useAddCity() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: addCity, isLoading: isAdding } = useMutation({
    mutationFn: (newCity) => addCityAPI(newCity),
    onSuccess: () => {
      toast.success("New City has been added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
      navigate("/app/cities");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isAdding, addCity };
}
