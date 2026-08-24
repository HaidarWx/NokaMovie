import { useState, useEffect } from "react";

export function useSeasonDetail(fetchFunction, id, seasonNumber) {
  const [seasons, setEpisode] = useState(null);
  const [errorSeason, setError] = useState(null);
  const [loadingSeason, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadSeasonDetail() {
      try {
        setError(null);
        setLoading(true);
        console.log(id, seasonNumber);
        const seasonDetail = await fetchFunction(id, seasonNumber);
        if (!ignore) setEpisode(seasonDetail);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadSeasonDetail();

    return () => {
      ignore = true;
    };
  }, [id, seasonNumber]);

  return { seasons, loadingSeason, errorSeason };
}
