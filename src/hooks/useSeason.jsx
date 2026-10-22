import { useQueries } from "@tanstack/react-query";
import { getSeasons } from "../api/tmdb.jsx";
export function useSeason(data, id, type) {
  const isTv = type === "tv";
  const hasSeasonData = data && data.seasons;
  const shouldFetch = isTv && hasSeasonData;
  console.log(shouldFetch);
  const seasonNumbers = shouldFetch
    ? data.seasons.map((e) => ({ number: e.seasonNumber, idSeason: e.id }))
    : [];

  const results = useQueries({
    queries: seasonNumbers.map((season) => ({
      queryKey: ["season", id, season.number, season.idSeason],
      queryFn: () => {
        return getSeasons(id, type, season.number);
      },
      enabled: Boolean(shouldFetch),
    })),
  });
  console.log(results);
  const episode = results.map((res) => res.data).filter(Boolean);
  const loadingSeason = shouldFetch
    ? results.some((res) => res.isLoading || res.isPending)
    : false;
  const errorSeason = results.find((res) => res.isError)?.error || null;

  return { episode, errorSeason, loadingSeason };
}
