import { Link, useSearchParams } from "react-router-dom";
import { getMovies } from "../api/tmdb.jsx";
import { useMovieList } from "../hooks/useMovieList.jsx";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");
  const movies = useMovieList(() => getMovies(keyword), [keyword]);

  return (
    <>
      <div className="search-results container-film">
        {movies.map((mov) => {
          const poster = mov.poster_path
            ? `https://image.tmdb.org/t/p/w500${mov.poster_path}`
            : `https://demofree.sirv.com/nope-not-here.jpg`;

          return (
            <Link
              to={`/detail/${mov.media_type}/${mov.id}`}
              key={`${mov.media_type}-${mov.id}`}
            >
              <div
                className="movie-card"
                data-bs-toggle="modal"
                data-bs-target="#movieDetailModal"
              >
                <div className="movie-poster">
                  <img src={poster} alt="" />
                </div>
                <div className="movie-info">
                  <div className="movie-top">
                    <div className="movie-title">
                      <h2>
                        {mov.title || mov.name}
                        <span className="title">
                          ({mov.original_name || mov.original_title})
                        </span>
                      </h2>
                    </div>
                    <span className="movie-date">
                      {mov.release_date || mov.first_air_date}
                    </span>
                  </div>
                  <div className="movie-bottom">
                    <p>{mov.overview}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
