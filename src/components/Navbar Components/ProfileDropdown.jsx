import { Link } from "react-router-dom";

export function ProfileDropdown({ isModalProfileOpen }) {
  return (
    <div className={`container-profile ${isModalProfileOpen ? "active" : ""}`}>
      <div className="box-profile">
        <div className="account-header">
          <div className="account-header-box">
            <div className="icon-profile-img">
              <img src="/image/madoka_pfp.jpg" alt="Profile Picture's" />
            </div>
            <div className="icon-profile-info">
              <div className="icon-profile-name">Homudoka</div>
              <div className="icon-profile-mail">thisaemail@gmail.com</div>
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
  );
}
