import { useState } from "react";
import { SeasonList } from "../components/SeasonList.jsx";
import { Link, useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useSeason } from "../hooks/useSeason.jsx";
import { getDetail } from "../api/tmdb.jsx";

export function MovieDetail({ wishlist, onToggleWishlist }) {
  const { type, id } = useParams();
  const { data, loading, error } = useMovieDetail(
    () => getDetail(id, type),
    type,
    id,
  );
  const { episode, errorSeason, loadingSeason } = useSeason(data, id, type); //if this film is tv, will make list of seasons
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const title = data.title || data.name;
  const date = data.last_air_date || data.release_date;
  const original =
    data.origin_country == "US"
      ? `.`
      : data.original_name || data.original_title;

  const genre = data.genres
    .map((i) => i)
    .map((g) => g.name)
    .join(", ");
  const rating = Math.round(data.vote_average * 10);
  const backdrop = data.belongs_to_collection
    ? data.belongs_to_collection.backdrop_path
    : data.backdrop_path;
  const bgDetail = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop}`;
  const poster = `https://media.themoviedb.org/t/p/w300_and_h450_face/${data.poster_path}`;
  const video =
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Trailer",
    ) ||
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Teaser",
    );
  const trailerEmbedUrl = video
    ? `https://www.youtube.com/embed/${video.key}`
    : null;

  const isCurrentMovieIsWishlist = wishlist.some((item) => item.id === id);

  if (type === "tv") {
    if (loadingSeason) return <p>Loading...</p>;
    if (errorSeason) return <p>Error {errorSeason.message}</p>;
  }
  return (
    <>
      <div
        className="info-body"
        style={{
          backgroundImage: `url(${bgDetail})`,
        }}
      >
        <div className="container-detail">
          <div id="movie-detail">
            <div className="mov-poster">
              <img src={poster} alt={title} />
            </div>
            <div className="mov-info">
              <div className="mov-top">
                <div className="mov-title">
                  <h2>
                    <a href="" className="title">
                      {title}
                    </a>
                  </h2>
                  <span>({date.slice(0, 4)})</span>
                </div>
                <div className="original-name">{original}</div>
                <div className="mov-fact">
                  <div className="certification">{rating}</div>
                  <div className="genres">{genre}</div>
                </div>
              </div>
              <div className="mov-middle">
                <div className="mov-action">
                  <button
                    onClick={() =>
                      onToggleWishlist({
                        id,
                        type,
                        title,
                        poster,
                        isCurrentMovieIsWishlist,
                        date,
                        original,
                      })
                    }
                    className="mov-bookmark action"
                  >
                    <i
                      className={`bi ${isCurrentMovieIsWishlist ? `bi-bookmark-fill` : `bi-bookmark`} `}
                    ></i>
                  </button>
                  <Link key={date} className="mov-loves action">
                    <i className="bi bi-heart-fill"></i>
                  </Link>
                  <div className="trailer" onClick={() => setShowTrailer(true)}>
                    <span className="mov-play">
                      <i className="bi bi-play-fill"></i>
                      Play Trailer
                    </span>
                  </div>
                </div>
              </div>
              <div className="mov-bottom">
                <div className="header-info">
                  <h3 dir="auto">Overview</h3>
                </div>
                <div className="overview">
                  <p>{data.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {type === "tv" && (
        <div className=".info-episode">
          <SeasonList seasons={episode} id={id} type={type}></SeasonList>
        </div>
      )}
      {showTrailer && (
        <div
          className="overlay-trailer"
          data-src={trailerEmbedUrl}
          onClick={() => setShowTrailer(false)}
        >
          {trailerEmbedUrl ? (
            <div
              className="trailer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="560"
                height="315"
                src={`${trailerEmbedUrl}?autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="encrypted-media;autoplay"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="no-trailer">Tidak Punya Trailer!</div>
          )}
        </div>
      )}
    </>
  );
}
