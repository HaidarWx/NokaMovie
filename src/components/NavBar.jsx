import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function NavBar() {
  const [keyword, setKeyword] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileButtonSearchOpen, setIsMobileButtonSearchOpen] =
    useState(false);

  const [isAccountOpen, setIsAccountOpen] = useState(false);
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

              <Link
                to={`/`}
                className={`navbar-icon ${isMobileButtonSearchOpen && isMobileSearchOpen ? "active" : ""}`}
              >
                <img
                  src="/image/madoka-icon.gif"
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
                <Link to={`/wishlist/`} className="nav-bookmark">
                  <i className="bi bi-bookmark-fill"></i>
                </Link>
                <a href="" className="nav-user">
                  <i className="bi bi-person-fill"></i>
                </a>
              </div>
              <div
                className="navbar-pfp"
                onClick={() => setIsAccountOpen(true)}
              >
                <img src="./image/madoka_pfp.jpg" alt="" className="img-pp" />
              </div>

              {/*  */}
              <div
                className={`container-profile ${isAccountOpen && "active"}`}
                style={{
                  color: "white",
                  width: "fit-content",

                  textDecoration: "none",
                  position: "absolute",
                  right: "6rem",
                  top: "4rem",
                }}
              >
                <div
                  className="box-profile"
                  style={{
                    padding: "10px",
                    backgroundColor: "#333",
                    borderRadius: "10px",
                  }}
                >
                  <div className="account-header">
                    <div
                      className="account-header-box"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "20px",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div className="icon-profile-img">
                        <img
                          src="public/image/madoka_pfp.jpg"
                          style={{ width: "50px", borderRadius: "999px" }}
                          alt="Profile Picture's"
                        />
                      </div>
                      <div className="icon-profile-info">
                        <div
                          className="icon-profile-name"
                          style={{ fontSize: "18px", fontWeight: "600" }}
                        >
                          Homudoka
                        </div>
                        <div className="icon-profile-mail">
                          thisaemail@gmail.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    className="account-menu"
                    style={{
                      display: "flex",
                      fontSize: "20px",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "1rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Link className="menu-profile-button">
                      <section
                        style={{
                          display: "flex",
                          gap: "2rem",
                          alignItems: "center",
                        }}
                        className="item-button-profile"
                      >
                        <i
                          className="bi bi-google"
                          style={{ fontSize: "18px" }}
                        ></i>
                        Google Account
                      </section>
                    </Link>
                    <Link>
                      <section
                        style={{
                          color: "white",
                          display: "flex",
                          gap: "2rem",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-person-fill-gear"
                          style={{ fontSize: "18px" }}
                        ></i>
                        Change Account
                      </section>
                    </Link>
                    <Link>
                      <section
                        style={{
                          color: "white",
                          display: "flex",
                          gap: "2rem",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-box-arrow-right"
                          style={{ fontSize: "18px" }}
                        ></i>
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
                src="./image/madoka-icon.gif"
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
          <img
            src="src/assets/image/madoka_pfp.jpg"
            alt=""
            className={`img-pp-mobile`}
          />
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
      <div
        className={`overlay-global ${isAccountOpen ? "active" : ""}`}
        id="overlayGlobal"
        onClick={() => setIsAccountOpen(false)}
      ></div>
    </>
  );
}
63;
