import { useQuery } from "@tanstack/react-query";

export function useMovieList(fetchFunction, deps = []) {
  const {
    data: movies,
    isLoading: loading,
    error,
  } = useQuery({ queryKey: [deps], queryFn: fetchFunction });

  return { movies, loading, error };
}
