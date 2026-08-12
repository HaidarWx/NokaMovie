import { Link } from "react-router-dom";
export function EpisodeList({ dataSeason }) {
  const nfound = `https://static.vecteezy.com/system/resources/thumbnails/004/639/366/small/error-404-not-found-text-design-vector.jpg`;
  const dataEpisode = dataSeason.episodes;
  if (!dataEpisode) return;
  console.log(dataEpisode);

  return (
    <div className=".episode-container">
      {dataEpisode.map((episode) => {
        const rating = episode.vote_average
          ? Math.round(episode.vote_average * 10)
          : "-";
        const runtime = episode.runtime ? episode.runtime : "-";
        const imgEpisode = episode.still_path
          ? `https://media.themoviedb.org/t/p/w227_and_h127_face/${episode.still_path}`
          : nfound;
        return (
          <Link
            to={`/stream/${episode.show_id}/${episode.season_number}/${episode.episode_number}`}
            className="episode-card"
            key={episode.episode_number}
          >
            <div className="episode-card-left">
              <img src={imgEpisode} alt="" />
            </div>
            <div className="episode-card-right">
              <div className="title-episode">
                <div className="title-wrapper">
                  <span className="episode-number">
                    {episode.episode_number}
                  </span>
                  <div className="title-box">
                    <div className="episode-title">{episode.name}</div>
                    <div className="more-info">
                      <div className="rating">★ {rating}%</div>
                      <div className="date">{episode.air_date}</div>
                      <div className="runtime">• {runtime}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overview">
                <p>{episode.overview}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
