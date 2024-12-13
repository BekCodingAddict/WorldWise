import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCity2 as deleteCityAPI } from "../services/apiCities";

export function useDeleteCity() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCity } = useMutation({
    mutationFn: (cityId) => deleteCityAPI(cityId),
    onSuccess: () => {
      toast.success("City deleted successfuly!");
      queryClient.invalidateQueries({
        queryKey: ["cities"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCity };
}
