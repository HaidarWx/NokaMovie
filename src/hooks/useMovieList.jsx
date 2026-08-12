import { useState, useEffect } from "react";

export function useMovieList(fetchFunction, deps = []) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function loadMovies() {
      const results = await fetchFunction();

      setMovies(results);
    }
    loadMovies();
  }, deps);
  return movies;
}
