import { useState } from "react";
import { getMovies } from "../src/api/tmdb.jsx";
import { useEffect } from "react";
function NavBar() {
  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  function handleSearch(event) {
    event.preventDefault();

    const inputUser = keyword.trim().toLowerCase().replace(/\s+/g, "-");
    if (!inputUser) return;
    window.location.href = `/?search=${encodeURIComponent(inputUser)}`;
  }
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-left">
              <i className="bi bi-list" id="menuToggle"></i>

              <a href="index.html" className="navbar-icon">
                <img
                  src="src/assets/image/madoka-icon.gif"
                  alt="Icon"
                  className="img-icon"
                />
                <span className="logo-title">NokaMovie</span>
              </a>
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
  const [movies, setMovies] = useState([]);
  console.log(movies);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("search");

    if (!keyword) return;

    async function loadMovies() {
      const results = await getMovies(keyword);

      setMovies(results);
    }
    loadMovies();
  }, []);

  return (
    <>
      <div className="search-results container-film">
        {movies.map((mov) => {
          const poster = mov.poster_path
            ? `https://image.tmdb.org/t/p/w500${mov.poster_path}`
            : `https://demofree.sirv.com/nope-not-here.jpg`;

          return (
            <a href="" key={`${mov.media_type}-${mov.id}`}>
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
            </a>
          );
        })}
      </div>
    </>
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
function HomeContent() {
  return (
    <div className="home-content">
      <section className="hero-slider">
        <div className="swiper swiper-hero">
          <div className="swiper-wrapper swiper-content"></div>

          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 5l-8 7 8 7" stroke="black" strokeWidth="2" />
            </svg>
          </div>
          <div className="swiper-button-next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 5l8 7-8 7" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

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

function App() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("search");

  const isSearchMode = Boolean(keyword);

  return (
    <>
      <NavBar />

      {isSearchMode ? (
        <SearchResults />
      ) : (
        <>
          <ModalOverlay />
          <HomeContent />
        </>
      )}

      <Footer />
    </>
  );
}
export default App;
