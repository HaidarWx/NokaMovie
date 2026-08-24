import { useState, useEffect } from "react";

import { getSeasons } from "../api/tmdb.jsx";
export function useSeason(data, id, type) {
  const [episode, setEpisode] = useState([]);
  const [errorSeason, setError] = useState(null);
  const [loadingSeason, setLoading] = useState(true);
  useEffect(() => {
    if (type === "movie") return;
    let ignore = false;
    const seasonNumber = data ? data.seasons.map((e) => e.season_number) : [];
    async function loadSeason() {
      try {
        setLoading(true);
        setError(null);
        const episodeDetails = await Promise.all(
          seasonNumber.map((n) => getSeasons(id, type, n)),
        );
        if (!ignore) setEpisode(episodeDetails);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadSeason();

    return () => {
      ignore = true;
    };
  }, [data, id, type]);
  return { episode, errorSeason, loadingSeason };
}
