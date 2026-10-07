import { useState, useEffect } from "react";
import { Wishlist } from "./components/Wishlist.jsx";
import { NavBar } from "./components/Navbar Components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchResults } from "./pages/SearchResults.jsx";
import { StreamDetail } from "./components/StreamDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieDetail } from "./pages/MovieDetail.jsx";
import { SeasonDetail } from "./components/SeasonDetail.jsx";
import { ModalOverlay } from "./components/ModalOverlay.jsx";
import { HomeContent } from "./pages/HomeContent.jsx";
import "swiper/css";
import { LoginForm } from "./components/Navbar Components/LoginForm.jsx";
import { getAccount } from "./api/tmdb.jsx";
function App() {
  const [wishlist, setWishlist] = useState(() => {
    const saveWishlist = localStorage.getItem("wishlist");

    return saveWishlist ? JSON.parse(saveWishlist) : [];
  });
  const [sessionId, setSessionId] = useState(() => {
    const saveSessionId = localStorage.getItem("session_id");

    return saveSessionId ? JSON.parse(saveSessionId) : [];
  });
  const [account, setAccount] = useState(null);

  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  console.log(isModalProfileOpen);
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem("session_id", JSON.stringify(sessionId));
  }, [sessionId]);
  useEffect(() => {
    if (!sessionId?.session_id) {
      setAccount(null);
      return;
    }
    let ignore = false;

    getAccount(sessionId.session_id)
      .then((data) => {
        if (!ignore) setAccount(data);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      ignore = true;
    };
  }, [sessionId]);
  function toggleWishlist(movie) {
    const { id, type, title, poster, date, original } = movie;

    const dataWishlist = {
      id: id,
      type: type,
      title: title,
      poster: poster,
      isWishlist: true,
      date: date,
      original: original,
    };
    setWishlist((prevWishlist) => {
      const isAlreadyWishlist = prevWishlist.some(
        (item) => item.id === id && item.type === type,
      );
      console.log(isAlreadyWishlist);
      if (isAlreadyWishlist) {
        return prevWishlist.filter((item) => item.id !== id);
      }

      return [dataWishlist, ...prevWishlist];
    });
  }
  console.log(account);
  return (
    <BrowserRouter>
      <div
        className="container"
        onClick={(e) => {
          if (isModalProfileOpen) {
            if (e.target.closest(`.container-profile`)) {
              return;
            }
            setIsModalProfileOpen(false);
          }
          if (isSearchMobileOpen) {
            if (e.target.closest(`.navbar-search-mobile`)) {
              return;
            }
            setIsSearchMobileOpen(false);
          }
        }}
      >
        <NavBar
          setIsModalProfileOpen={setIsModalProfileOpen}
          isModalProfileOpen={isModalProfileOpen}
          isSearchMobileOpen={isSearchMobileOpen}
          setIsSearchMobileOpen={setIsSearchMobileOpen}
          account={account}
        />
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
          <Route
            path="/detail/:type/:id"
            element={
              <MovieDetail
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          ></Route>
          <Route
            path="/season/:seasonNumber/:id"
            element={<SeasonDetail />}
          ></Route>
          <Route
            path="/stream/:id/:seasonNumber/:episodeNumber"
            element={<StreamDetail />}
          ></Route>
          <Route
            element={
              <Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} />
            }
            path={"/wishlist/"}
          ></Route>
          <Route
            path="/login"
            element={
              <LoginForm sessionId={sessionId} setSessionId={setSessionId} />
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
