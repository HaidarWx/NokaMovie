import { useQuery } from "@tanstack/react-query";

export function useMovieDetail(fetchFunction, type, id) {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: [type, id],
    queryFn: fetchFunction,
  });

  return { data, loading, error };
}
