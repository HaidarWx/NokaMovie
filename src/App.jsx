import { useState, useEffect } from "react";
import { Wishlist } from "./components/Wishlist.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchResults } from "./pages/SearchResults.jsx";
import { StreamDetail } from "./components/StreamDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieDetail } from "./pages/MovieDetail.jsx";
import { SeasonDetail } from "./components/SeasonDetail.jsx";
import { ModalOverlay } from "./components/ModalOverlay.jsx";
import { HomeContent } from "./pages/HomeContent.jsx";
import "swiper/css";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const saveWishlist = localStorage.getItem("wishlist");

    return saveWishlist ? JSON.parse(saveWishlist) : [];
  });
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
