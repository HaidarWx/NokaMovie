import { useState, useEffect } from "react";
import { getSeasonDetail } from "../api/tmdb.jsx";
export function useSeasonDetail(id, seasonNumber) {
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    async function loadSeasonDetail() {
      const seasonDetail = await getSeasonDetail(id, seasonNumber);
      setEpisode(seasonDetail);
    }
    loadSeasonDetail();
  }, [id, seasonNumber]);
  return episode;
}
