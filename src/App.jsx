import { useState } from "react";
import {
  getMovies,
  getPopularMovies,
  loadAllGenres,
  getTrendingDays,
  getTrendingWeeks,
  getTrendingPopular,
  getTrendingTopRated,
  getDetail,
  getSeasons,
  getSeasonDetail,
} from "../src/api/tmdb.jsx";
import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  Link,
  useParams,
} from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";

function swiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
}
function NavBar() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  function handleSearch(event) {
    event.preventDefault();
    const inputUser = keyword.trim().toLowerCase().replace(/\s+/g, "-");
    if (!inputUser) return;
    navigate(`/search?query=${encodeURIComponent(inputUser)}`);
  }
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-left">
              <i className="bi bi-list" id="menuToggle"></i>

              <Link className="navbar-icon">
                <img
                  src="src/assets/image/madoka-icon.gif"
                  alt="Icon"
                  className="img-icon"
                />
                <span className="logo-title">NokaMovie</span>
              </Link>
              <div className="navbar-content-left"></div>
            </div>
            <div className="navbar-right">
              <form className="navbar-search" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control input-keyword"
                  placeholder="Search Movies..."
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
                <button type="submit">
                  <i
                    className="bi bi-search search-button"
                    id="searchButton"
                  ></i>
                </button>
              </form>
              <div className="navbar-content-right">
                <a href="/" className="nav-sound">
                  <i className="bi bi-volume-up-fill"></i>
                </a>
                <a href="" className="nav-bookmark">
                  <i className="bi bi-bookmark-fill"></i>
                </a>
                <a href="" className="nav-loves">
                  <i className="bi bi-heart-fill"></i>
                </a>
                <a href="" className="nav-user">
                  <i className="bi bi-person-fill"></i>
                </a>
              </div>
              <div className="navbar-pfp">
                <img src="image/madoka_pfp.jpg" alt="" className="img-pp" />
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-navbar" id="overlayNavbar"></div>

        <div className="mobile-content-left asides" id="mobileMenu">
          <div className="navbar-icon">
            <img src="image/madoka-icon.gif" alt="Icon" className="img-icon" />
            <span className="logo-title">NokaMovie</span>
          </div>
          <div className="mobile-box-left"></div>
          <a href="index.html">
            <i className="bi bi-house-door-fill"></i>Home
          </a>
          <a href="/">
            <i className="bi bi-heart"></i>Favorite
          </a>
          <a href="/">
            <i className="bi bi-list-ul"></i>Watchlist
          </a>
          <a href="/">
            <i className="bi bi-clock-history"></i>History
          </a>
          <a href="/">
            <i className="bi bi-person-circle"></i>Profile
          </a>
        </div>
        <div className="navbar-mobile-right">
          <div className="navbar-search-mobile">
            <input
              type="text"
              className="form-control input-keyword-mobile"
              placeholder="Search..."
            />
            <i
              className="bi bi-search search-button-mobile"
              id="searchButtonMobile"
            ></i>
          </div>
          <i className="bi bi-search search-button-nav-mobile"></i>
          <img src="image/madoka_pfp.jpg" alt="" className="img-pp-mobile" />
        </div>
      </nav>
      <div className="overlay-global" id="overlayGlobal"></div>
    </>
  );
}
function SearchResults() {
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
function HeroMovieSlider() {
  const [genreList, setGenreList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const [genres, results] = await Promise.all([
        loadAllGenres(),
        getPopularMovies(),
      ]);

      setMovies(results);
      setGenreList(genres);
    }
    loadMovies();
  }, []);

  return (
    <Swiper
      className="swiper-content hero-slider"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000, // jeda 3 detik sebelum pindah ke slide berikutnya
        disableOnInteraction: false, // tetap autoplay lagi meski user pernah geser manual
        pauseOnMouseEnter: true,
      }}
    >
      {movies.map((e) => {
        const backdrop = e.backdrop_path
          ? `https://image.tmdb.org/t/p/original${e.backdrop_path}`
          : "";
        const genre = e.genre_ids
          .map((x) => {
            const genre = genreList.find((g) => g.id === x);
            return genre ? genre.name : "";
          })
          .join(", ");
        const title = e.title ? e.title : e.name;
        return (
          <SwiperSlide>
            <div
              className="slide-bg"
              style={{
                backgroundImage: `url(${backdrop})`,
              }}
            ></div>
            <div className="slide-overlay">
              <div className="slide-content">
                <img src="#" alt="" className="slide-img" />
                <h1 className="slide-title">{title}</h1>
                <div className="slide-genre">{genre}</div>
                <p className="slide-info">{e.overview}</p>
                <div className="slide-buttons">
                  <a href="#" className="slide-button-1">
                    <i className="bi bi-play-fill"></i> Watch Now
                  </a>
                  <a href="#" className="slide-button-2 modal-detail-button">
                    More Info
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
function ModalOverlay() {
  return (
    <>
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal-content">
          <div className="modal-header"></div>
          <div className="modal-body"></div>
          <div className="modal-footer">
            <button className="modal-close" aria-label="Close modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
/* function HomeContent() {
  return (
    <div className="home-content">
      <HeroMovieSlider />
      <section className="card-slider-day">
        <div className="swiper cardSwiper">
          <h1>Trending Today</h1>
          <div className="swiper-wrapper">
            <p>Loading...</p>
          </div>
          <div className="swiper-button-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </div>
          <div className="swiper-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="card-slider-week">
        <div className="swiper cardSwiper">
          <h1>Trending Week</h1>
          <div className="swiper-wrapper">
            <p>Loading...</p>
          </div>
          <div className="swiper-button-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </div>
          <div className="swiper-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="card-slider-popular">
        <div className="swiper cardSwiper">
          <h1>Trending Popular</h1>
          <div className="swiper-wrapper">
            <p>Loading...</p>
          </div>
          <div className="swiper-button-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </div>
          <div className="swiper-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="card-slider-topRated">
        <div className="swiper cardSwiper">
          <h1>Trending Top-Rated</h1>
          <div className="swiper-wrapper">
            <p>Loading...</p>
          </div>
          <div className="swiper-button-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </div>
          <div className="swiper-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
} */
function HomeContent() {
  return (
    <div className="home-content">
      <HeroMovieSlider />
      <MovieSlider
        title={"Trending Day's"}
        fetchFunction={getTrendingDays}
        idSlider={"day"}
      />
      <MovieSlider
        title={"Trending Week's"}
        fetchFunction={getTrendingWeeks}
        idSlider={"week"}
      />
      <MovieSlider
        title={"Trending Popular's"}
        fetchFunction={getTrendingPopular}
        idSlider={"popular"}
      />
      <MovieSlider
        title={"Trending Top Rated's"}
        fetchFunction={getTrendingTopRated}
        idSlider={"topRated"}
      />
    </div>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-icon">
              <img
                src="src/assets/image/madoka1.gif"
                alt="Icon"
                className="footer-img-icon"
              />
              <span className="footer-logo">NokaMovie</span>
            </div>
            <p className="brand-title">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              quisquam explicabo, dolore itaque facilis earum facere.
            </p>
            <div className="footer-social">
              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-telegram"></i>
              </a>
            </div>
          </div>
          <div className="footer-link">
            <h2>Site Map</h2>
            <div className="footer-links">
              <a href="">Homepage</a>
              <a href="">Contact Us</a>
              <a href="">Subscription</a>
              <a href="">Premium Account</a>
              <a href="">Portal</a>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-rights">
        <span>Copyright © 2026, NokaMovie, All Rights Reserved.</span>
      </div>
    </footer>
  );
}

function useMovieList(fetchFunction, deps = []) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function loadMovies() {
      const results = await fetchFunction();

      setMovies(results);
    }
    loadMovies();
  }, deps);
  return movies;
}
function MovieSlider({ title, fetchFunction, idSlider }) {
  const movies = useMovieList(fetchFunction);

  return (
    <section className={`card-slider-${idSlider}`}>
      <div className="swiper cardSwiper">
        <h1>{title}</h1>
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={0}
            slidesPerView={6}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            navigation
          >
            {movies.map((e) => {
              const poster = e.poster_path
                ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                : `https://demofree.sirv.com/nope-not-here.jpg`;
              return (
                <SwiperSlide key={e.id}>
                  <Link
                    to={`/detail/${e.media_type}/${e.id}`}
                    className="swiper-slide"
                  >
                    <img
                      src={poster}
                      alt=""
                      className="card-img modal-detail-button"
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
function useMovieDetail(type, id) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      const results = await getDetail(id, type);

      setMovie(results);
    }
    loadDetail();
  }, [type, id]);
  return movie;
}
function useSeason(data, id, type) {
  const [episode, setEpisode] = useState([]);

  const seasonNumber = data ? data.seasons.map((e) => e.season_number) : [];

  useEffect(() => {
    if (type === "movie") return;
    async function loadSeason() {
      const episodeDetails = await Promise.all(
        seasonNumber.map((n) => getSeasons(id, type, n)),
      );
      setEpisode(episodeDetails);
    }
    loadSeason();
  }, [data, id, type]);
  return episode;
}
function useSeasonDetail(id, seasonNumber) {
  const [episode, setEpisode] = useState([]);

  useEffect(() => {
    async function loadSeasonDetail() {
      const seasonDetail = await getSeasonDetail(id, seasonNumber);
      setEpisode(seasonDetail);
    }
    loadSeasonDetail();
  }, [id, seasonNumber]);
  return episode;
}
function MovieDetail() {
  const { type, id } = useParams();
  const data = useMovieDetail(type, id);
  const seasons = type === "tv" ? useSeason(data, id, type) : []; //if this film is tv, will make list of seasons
  console.log(data);
  if (!data) return <p>Loading...</p>;

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
                  <a href="" className="mov-bookmark action">
                    <i className="bi bi-bookmark-fill"></i>
                  </a>
                  <a href="" className="mov-loves action">
                    <i className="bi bi-heart-fill"></i>
                  </a>
                  <div className="trailer">
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
          <SeasonList seasons={seasons} id={id} type={type}></SeasonList>
        </div>
      )}
      <div className="overlay-trailer" data-src={trailerEmbedUrl}></div>
    </>
  );
}
function SeasonList({ seasons, id, type }) {
  return (
    <>
      <div className=".episode-wrapper">
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

function SeasonDetail() {
  const { seasonNumber, id } = useParams();
  const detail = useMovieDetail("tv", id);
  const seasons = useSeasonDetail(id, seasonNumber);

  return (
    <>
      <div className="season-container">
        <SeasonLayout dataSeason={seasons} dataDetail={detail}></SeasonLayout>
      </div>
    </>
  );
}
function SeasonLayout({ dataSeason, dataDetail }) {
  if (!dataDetail) return <p>Loading...</p>;
  const title = dataDetail.name;
  const seasonNumber = dataSeason.name;
  const poster = `https://media.themoviedb.org/t/p/w300_and_h450_face/${dataSeason.poster_path}`;
  const date = dataSeason.air_date;
  const rating = Math.round(dataSeason.vote_average * 10);
  const backdrop = dataDetail.belongs_to_collection
    ? dataDetail.belongs_to_collection.backdrop_path
    : dataDetail.backdrop_path;

  /* const backdrop = data.belongs_to_collection
    ? data.belongs_to_collection.backdrop_path
    : data.backdrop_path; */
  /* const video =
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Trailer",
    ) ||
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Teaser",
    ); */
  /*   const trailerEmbedUrl = video
    ? `https://www.youtube.com/embed/${video.key}`
    : null; */

  return (
    <div className="info-body">
      <div className="container-detail">
        <div id="movie-detail">
          <div className="mov-poster">
            <img src={poster} alt={title} />
          </div>
          <div className="mov-info">
            <div className="mov-top">
              <div className="mov-title">
                <h2>
                  <a href="#" className="title">
                    {title}
                  </a>
                </h2>
                <h2>
                  <a href="#" className="title">
                    {seasonNumber}
                  </a>
                </h2>
                <span>({date ? date.slice(0, 4) : "-"})</span>
              </div>
              <div className="mov-fact">
                <div className="certification">{rating.toString()}</div>
              </div>
            </div>
            <div className="mov-bottom">
              <div className="overview">
                <p>
                  {dataSeason.overview
                    ? dataSeason.overview
                    : dataDetail.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ModalOverlay />
              <HomeContent />
            </>
          }
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/detail/:type/:id" element={<MovieDetail />}></Route>
        <Route
          path="/season/:seasonNumber/:id"
          element={<SeasonDetail />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
