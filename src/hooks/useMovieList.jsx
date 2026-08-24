import { useState, useEffect } from "react";

export function useMovieList(fetchFunction, deps = []) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const results = await fetchFunction();
        if (!ignore) setMovies(results);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadMovies();
    return () => {
      ignore = true;
    };
  }, deps);
  return { movies, loading, error };
}
