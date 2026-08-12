import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useParams } from "react-router-dom";
import { StreamLayout } from "../pages/StreamLayout.jsx";
import { useSeasonDetail } from "../hooks/UseSeasonDetail.jsx";
export function StreamDetail() {
  const { id, seasonNumber, episodeNumber } = useParams();
  const dataSeason = useSeasonDetail(id, seasonNumber);
  const dataMovie = useMovieDetail("tv", id);
  if (!dataMovie || !dataSeason?.episodes) return <p>Loading UwU</p>;

  return (
    <div className="watch-layout">
      <StreamLayout
        key={`${seasonNumber}-${episodeNumber}`}
        dataEpisode={dataSeason.episodes[episodeNumber - 1]}
        dataSeason={dataSeason}
        dataMovie={dataMovie}
      />
    </div>
  );
}
