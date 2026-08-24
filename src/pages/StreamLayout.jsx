import { useState } from "react";
import { Link } from "react-router-dom";
export function StreamLayout({ dataEpisode, dataSeason, dataMovie }) {
  const video = `https://image.tmdb.org/t/p/w500/${dataEpisode.still_path}`;
  const title = dataEpisode.name;
  const date = dataEpisode.air_date;
  const age =
    dataMovie.content_ratings.results.find((r) => r.iso_3166_1 === "US")
      ?.rating || "N/A";
  console.log(dataMovie.content_ratings.results);
  const poster_season = dataSeason.poster_path;
  const poster = `https://media.themoviedb.org/t/p/w300_and_h450_face/${poster_season}`;
  const genres = dataMovie.genres
    .map((g) => {
      return g.name;
    })
    .join(", ");

  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loveCount, setLoveCount] = useState(0);
  const handleSendComment = () => {
    if (inputText === "") return;

    const newComment = {
      id: Date.now(),
      text: inputText,
      date: new Date().toLocaleDateString("id-ID"),
    };

    setComments([newComment, ...comments]);
    setInputText("");
  };
  const handleCancelComment = () => {
    setInputText("");
  };

  const episodeCards = dataSeason.episodes.map((e) => {
    const poster_episode = `https://image.tmdb.org/t/p/w500/${e.still_path}`;
    const name_episode = e.episode_number;
    const cardURL = `/stream/${e.show_id}/${e.season_number}/${e.episode_number}`;

    return (
      <Link to={cardURL} key={name_episode} className="episode-cards">
        <div className="episode-img">
          <img src={poster_episode} alt="" />
        </div>
        <div className="episode-title">
          <h4>Episode {name_episode}</h4>
        </div>
      </Link>
    );
  });

  return (
    <>
      <section className="watch-player">
        <div className="video-frame">
          <img src={video} alt="" />
        </div>
        <div className="video-detail">
          <div className="video-title">
            <section className="video-name">{title}</section>
            <div className="video-etc">
              <div className="video-age">17+</div>
              <div className="video-year">{date}</div>
              <div className="video-number">
                Episode {dataEpisode.episode_number}
              </div>
            </div>
          </div>
          <div className="serial-detail">
            <h3>Serial Detail</h3>
            <Link
              to={`/season/${dataEpisode.season_number}/${dataEpisode.show_id}`}
              key={`${dataSeason.name}`}
              className="serial-poster"
            >
              <div className="serial-left">
                <img src={poster} alt="" />
              </div>
              <div className="serial-right">
                <div className="serial-name">
                  {dataMovie.name} {dataSeason.name}
                </div>
                <div className="serial-etc">
                  <div className="serial-age">{age}</div>
                  <div className="serial-year">{dataSeason.air_date}</div>
                </div>
              </div>
            </Link>
            <div className="serial-info">
              <p>{dataEpisode.overview}</p>
            </div>
            <div className="genre-list">
              <div className="serial-genre">{genres}</div>
            </div>
          </div>
        </div>
        <div className="video-comment">
          <div className="comment-top">
            <h1>
              Comment's (<span>{comments.length}</span>)
            </h1>
          </div>
          <div className="comment-user">
            <div className="user-icon">
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="input-comment">
              <input
                type="text"
                className="input-box"
                placeholder="Add comment's"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              />
              <div className="input-wrapper">
                <button className="cancel-button" onClick={handleCancelComment}>
                  Cancel
                </button>
                <button className="send-button" onClick={handleSendComment}>
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="comment-list">
            {comments.map((item) => {
              return (
                <>
                  <div className="comment-card">
                    <div className="comment-icon">
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div className="comment-info">
                      <div className="comment-name">Homudoka {item.date}</div>
                      <div className="user-input">{item.text}</div>
                      <div className="comment-reply">
                        <div className="icon-love">
                          <i
                            className="bi bi-heart"
                            onClick={() => setLoveCount(loveCount + 1)}
                          ></i>{" "}
                          {loveCount} like
                        </div>

                        <div className="path">
                          <i className="bi bi-flag"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        </div>
      </section>
      <aside className="episode-panel">
        <div className="episode-list">
          <span className="all-episode">All Episode</span>
          {episodeCards}
        </div>
      </aside>
    </>
  );
}
