import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/apiCities";

export function useCities2() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnMount: true,
  });
  console.log(data);
  return { isLoading, error, data };
}
