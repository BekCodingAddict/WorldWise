import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/apiCities";

export function useCities() {
  const {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnMount: true,
  });

  return { isLoading, error, data };
}
