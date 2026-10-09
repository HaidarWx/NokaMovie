import { Link } from "react-router-dom";

export function ProfileDropdown({ isModalProfileOpen, account }) {
  const username = account ? account.username : "";
  const profilePicture = account
    ? `https://media.themoviedb.org/t/p/w50_and_h50_face/${account.avatar.tmdb.avatar_path}`
    : "";
  const id = account ? account.id : "";

  function handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("session_id");
    window.location.href = "/";
  }

  return (
    <div className={`container-profile ${isModalProfileOpen ? "active" : ""}`}>
      <div className="box-profile">
        <div className="account-header">
          <div className="account-header-box">
            <div className="icon-profile-img">
              <img src={profilePicture} alt="Profile Picture's" />
            </div>
            <div className="icon-profile-info">
              <div className="icon-profile-name">
                {username ? username : ""}
              </div>
              <div className="icon-profile-mail">ID : {id ? id : ""}</div>
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
          <Link className="menu-profile-button" onClick={handleLogOut}>
            <section className="item-button-profile">
              <i className="bi bi-box-arrow-right"></i>
              Sign Out
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
}
