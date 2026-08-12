import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function NavBar() {
  const [keyword, setKeyword] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileButtonSearchOpen, setIsMobileButtonSearchOpen] =
    useState(false);

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
              <i
                className="bi bi-list"
                id="menuToggle"
                onClick={() => setIsMobileMenuOpen(true)}
              ></i>

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
                <Link to={`/wishlist/`} className="nav-bookmark">
                  <i className="bi bi-bookmark-fill"></i>
                </Link>
                <a href="" className="nav-loves">
                  <i className="bi bi-heart-fill"></i>
                </a>
                <a href="" className="nav-user">
                  <i className="bi bi-person-fill"></i>
                </a>
              </div>
              <div className="navbar-pfp">
                <img
                  src="src/assets/image/madoka_pfp.jpg"
                  alt=""
                  className="img-pp"
                />
              </div>
            </div>
          </div>
        </div>

        <>
          <div
            className={`overlay-navbar ${isMobileMenuOpen ? "active" : ""}`}
            id="overlayNavbar"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            className={`mobile-content-left asides ${isMobileMenuOpen ? "active" : ""}`}
            id="mobileMenu"
          >
            <div className="navbar-icon">
              <img
                src="src/assets/image/madoka-icon.gif"
                alt="Icon"
                className="img-icon"
              />
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
        </>

        <div className="navbar-mobile-right">
          <div
            className={`navbar-search-mobile ${isMobileSearchOpen ? "active" : ""}`}
          >
            <form
              className={`navbar-search-mobile-form`}
              action=""
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control input-keyword-mobile"
                placeholder="Search..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <button type="submit">
                <i
                  className="bi bi-search search-button-mobile"
                  id="searchButtonMobile"
                ></i>
              </button>
            </form>
          </div>
          <i
            className={`bi bi-search search-button-nav-mobile ${isMobileButtonSearchOpen ? "inactive" : ""} `}
            onClick={() => {
              setIsMobileSearchOpen(true);
              setIsMobileButtonSearchOpen(true);
            }}
          ></i>
          <img
            src="src/assets/image/madoka_pfp.jpg"
            alt=""
            className={`img-pp-mobile ${isMobileButtonSearchOpen ? "inactive" : ""}`}
          />
        </div>
      </nav>

      <div className="overlay-global" id="overlayGlobal"></div>
    </>
  );
}
