import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { getPopularMovies, loadAllGenres } from "../api/tmdb.jsx";
// Import Swiper React components
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Link } from "react-router-dom";
export function HeroMovieSlider() {
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
                  <Link
                    to={`/detail/${e.media_type}/${e.id}`}
                    key={`${e.media_type}-${e.id}`}
                    className="slide-button-2 modal-detail-button"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
