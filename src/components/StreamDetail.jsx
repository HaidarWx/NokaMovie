import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useParams } from "react-router-dom";
import { StreamLayout } from "../pages/StreamLayout.jsx";
import { useSeasonDetail } from "../hooks/UseSeasonDetail.jsx";
import { getDetail, getSeasonDetail } from "../api/tmdb.jsx";
export function StreamDetail() {
  const { id, seasonNumber, episodeNumber } = useParams();
  const { seasons, loadingSeason, errorSeason } = useSeasonDetail(
    () => getSeasonDetail(id, seasonNumber),
    id,
    seasonNumber,
  );

  const { data, loading, error } = useMovieDetail(
    () => getDetail(id, "tv"),
    "tv",
    id,
  );
  console.log(data);
  if (!data || !seasons?.episodes) return <p>Loading UwU</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (loadingSeason) return <p>Loading...</p>;
  if (errorSeason) return <p>Error</p>;
  return (
    <div className="watch-layout">
      <StreamLayout
        key={`${seasonNumber}-${episodeNumber}`}
        dataEpisode={seasons.episodes[episodeNumber - 1]}
        dataSeason={seasons}
        dataMovie={data}
      />
    </div>
  );
}
