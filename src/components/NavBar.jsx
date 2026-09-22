import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function NavBar({ isModalProfileOpen, setIsModalProfileOpen }) {
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
      <nav
        className={`navbar ${isMobileSearchOpen && isMobileButtonSearchOpen ? "active" : ""}`}
      >
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-left">
              <i
                className="bi bi-list"
                id="menuToggle"
                onClick={() => setIsMobileMenuOpen(true)}
              ></i>

              <Link to={`/`} className={`navbar-icon }`}>
                <img
                  src="/image/madoka-icon.gif"
                  alt="Icon"
                  className="img-icon"
                />

                <span
                  className={`logo-title ${isMobileButtonSearchOpen && isMobileSearchOpen ? "active" : ""}`}
                >
                  NokaMovie
                </span>
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
                <Link to={`/wishlist/`} className="nav-bookmark">
                  <i className="bi bi-bookmark-fill"></i>
                </Link>
              </div>
              <div
                className="navbar-pfp"
                onClick={() => {
                  setIsModalProfileOpen(true);
                }}
              >
                <img src="/image/madoka_pfp.jpg" alt="" className="img-pp" />
              </div>

              {/*  */}
              <div
                className={`container-profile ${isModalProfileOpen && "active"}`}
              >
                <div className="box-profile">
                  <div className="account-header">
                    <div className="account-header-box">
                      <div className="icon-profile-img">
                        <img
                          src="/image/madoka_pfp.jpg"
                          alt="Profile Picture's"
                        />
                      </div>
                      <div className="icon-profile-info">
                        <div className="icon-profile-name">Homudoka</div>
                        <div className="icon-profile-mail">
                          thisaemail@gmail.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="account-menu">
                    <Link className="menu-profile-button">
                      <section className="item-button-profile">
                        <i className="bi bi-person-fill"></i>
                        Account
                      </section>
                    </Link>
                    <Link className="menu-profile-button">
                      <section className="item-button-profile">
                        <i className="bi bi-person-fill-gear"></i>
                        Change Account
                      </section>
                    </Link>
                    <Link className="menu-profile-button">
                      <section className="item-button-profile">
                        <i className="bi bi-box-arrow-right"></i>
                        Sign Out
                      </section>
                    </Link>
                  </div>
                </div>
              </div>
              {/*  */}
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
                src="/image/madoka-icon.gif"
                alt="Icon"
                className="img-icon"
              />
              <span className="logo-title">NokaMovie</span>
            </div>

            <div className="mobile-box-left"></div>
            <Link
              to={`/`}
              key={"Home"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="bi bi-house-door-fill"></i>Home
            </Link>
            <a href="/">
              <i className="bi bi-heart"></i>Favorite
            </a>
            <Link
              to={`/wishlist/`}
              key={"Wishlist"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="bi bi-list-ul"></i>Watchlist
            </Link>
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
          <div onClick={() => setIsModalProfileOpen(true)}>
            <img
              src="/image/madoka_pfp.jpg"
              alt=""
              className={`img-pp-mobile`}
            />
          </div>
          {/*  */}
          <div
            className={`container-profile ${isModalProfileOpen && "active"}`}
          >
            <div className="box-profile">
              <div className="account-header">
                <div className="account-header-box">
                  <div className="icon-profile-img">
                    <img src="/image/madoka_pfp.jpg" alt="Profile Picture's" />
                  </div>
                  <div className="icon-profile-info">
                    <div className="icon-profile-name">Homudoka</div>
                    <div className="icon-profile-mail">
                      thisaemail@gmail.com
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="account-menu">
                <Link className="menu-profile-button">
                  <section className="item-button-profile">
                    <i className="bi bi-person-fill"></i>
                    Account
                  </section>
                </Link>
                <Link className="menu-profile-button">
                  <section className="item-button-profile">
                    <i className="bi bi-person-fill-gear"></i>
                    Change Account
                  </section>
                </Link>
                <Link className="menu-profile-button">
                  <section className="item-button-profile">
                    <i className="bi bi-box-arrow-right"></i>
                    Sign Out
                  </section>
                </Link>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </nav>

      <div
        className={`overlay-global ${isMobileButtonSearchOpen ? "active" : ""}`}
        id="overlayGlobal"
        onClick={() => {
          setIsMobileSearchOpen(false);
          setIsMobileButtonSearchOpen(false);
        }}
      ></div>
    </>
  );
}
