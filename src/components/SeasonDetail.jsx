import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useSeasonDetail } from "../hooks/UseSeasonDetail.jsx";
import { SeasonLayout } from "../pages/SeasonLayout.jsx";
import { EpisodeList } from "../pages/EpisodeList.jsx";
import { getDetail } from "../api/tmdb.jsx";
import { getSeasonDetail } from "../api/tmdb.jsx";
export function SeasonDetail() {
  const { seasonNumber, id } = useParams();

  const { data, loading, error } = useMovieDetail(
    () => getDetail(id, "tv"),
    "tv",
    id,
  );

  const { seasons, loadingSeason, errorSeason } = useSeasonDetail(
    () => getSeasonDetail(id, seasonNumber),
    id,
    seasonNumber,
  );

  if (!seasons) return;
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
        <h1>Error {error.message}</h1>
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
        <h1>Error {error.message}</h1>
      </div>
    );
  return (
    <>
      <div className="season-container">
        <SeasonLayout dataSeason={seasons} dataDetail={data}></SeasonLayout>
        <EpisodeList dataSeason={seasons}></EpisodeList>
      </div>
    </>
  );
}
