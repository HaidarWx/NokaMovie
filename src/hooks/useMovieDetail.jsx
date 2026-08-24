import { useState, useEffect } from "react";

export function useMovieDetail(fetchFunction, type, id) {
  const [data, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadDetail() {
      try {
        setLoading(true);
        setError(null);
        const results = await fetchFunction();
        if (!ignore) setMovie(results);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadDetail();

    return () => {
      ignore = true;
    };
  }, [type, id]);

  return { data, loading, error };
}
