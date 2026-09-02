import { Link } from "react-router-dom";

export function SeasonList({ seasons, id }) {
  return (
    <>
      <div className="episode-wrapper">
        {seasons.map((n) => {
          const imgEpisode = n.poster_path
            ? `https://media.themoviedb.org/t/p/w300_and_h450_face/${n.poster_path}`
            : `https://static.vecteezy.com/system/resources/thumbnails/004/639/366/small/error-404-not-found-text-design-vector.jpg`;

          return (
            <Link
              className="season"
              data-season={n.season_number}
              key={n.season_number}
              to={`/season/${n.season_number}/${id}`}
            >
              <div className="season-card">
                <div className="season-img">
                  <img src={imgEpisode} />
                </div>
                <div className="season-detail">
                  <div className="detail-top">
                    <div className="season-title">{n.name}</div>
                    <div className="season-hot">
                      <div className="season-date">
                        {n.air_date ? n.air_date : "No Date "}
                      </div>
                      <div className="season-date">
                        {n.episodes.length} Episode's
                      </div>
                    </div>
                  </div>
                  <div className="season-overview">{n.overview}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
