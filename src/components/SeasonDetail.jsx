import { useParams } from "react-router-dom";

import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useSeasonDetail } from "../hooks/UseSeasonDetail.jsx";
import { SeasonLayout } from "../pages/SeasonLayout.jsx";
import { EpisodeList } from "../pages/EpisodeList.jsx";
export function SeasonDetail() {
  const { seasonNumber, id } = useParams();
  const detail = useMovieDetail("tv", id);

  const seasons = useSeasonDetail(id, seasonNumber);
  if (!seasons) return;
  return (
    <>
      <div className="season-container">
        <SeasonLayout dataSeason={seasons} dataDetail={detail}></SeasonLayout>
        <EpisodeList dataSeason={seasons}></EpisodeList>
      </div>
    </>
  );
}
