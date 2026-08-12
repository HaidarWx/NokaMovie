import { useState, useEffect } from "react";

import { getSeasons } from "../api/tmdb.jsx";
export function useSeason(data, id, type) {
  const [episode, setEpisode] = useState([]);

  useEffect(() => {
    if (type === "movie") return;
    const seasonNumber = data ? data.seasons.map((e) => e.season_number) : [];
    async function loadSeason() {
      const episodeDetails = await Promise.all(
        seasonNumber.map((n) => getSeasons(id, type, n)),
      );
      setEpisode(episodeDetails);
    }
    loadSeason();
  }, [data, id, type]);
  return episode;
}
