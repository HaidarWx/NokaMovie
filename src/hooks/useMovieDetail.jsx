import { useState, useEffect } from "react";
import { getDetail } from "../api/tmdb.jsx";

export function useMovieDetail(type, id) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      const results = await getDetail(id, type);

      setMovie(results);
    }
    loadDetail();
  }, [type, id]);
  return movie;
}
