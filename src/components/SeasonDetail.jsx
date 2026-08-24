import { useParams } from "react-router-dom";

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
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error {error.message}</p>;
  if (loadingSeason) return <p>Loading</p>;
  if (errorSeason) return <p>Error {errorSeason.message}</p>;
  return (
    <>
      <div className="season-container">
        <SeasonLayout dataSeason={seasons} dataDetail={data}></SeasonLayout>
        <EpisodeList dataSeason={seasons}></EpisodeList>
      </div>
    </>
  );
}
