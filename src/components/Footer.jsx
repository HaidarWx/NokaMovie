export function Footer() {
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
