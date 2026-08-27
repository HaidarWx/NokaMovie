import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useParams } from "react-router-dom";
import { StreamLayout } from "../pages/StreamLayout.jsx";
import { useSeasonDetail } from "../hooks/UseSeasonDetail.jsx";
import { getDetail, getSeasonDetail } from "../api/tmdb.jsx";
import { BeatLoader } from "react-spinners";
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
  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <BeatLoader color="pink" size={50} />
      </div>
    );
  if (error)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <p>Error {error.message}</p>
      </div>
    );
  if (loadingSeason)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <BeatLoader color="pink" size={50} />
      </div>
    );
  if (errorSeason)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <p>Error {error.message}</p>
      </div>
    );
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
