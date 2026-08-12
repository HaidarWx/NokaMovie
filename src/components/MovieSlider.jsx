import { useMovieList } from "../hooks/useMovieList.jsx";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";

export function MovieSlider({ title, fetchFunction, idSlider }) {
  const movies = useMovieList(fetchFunction);

  return (
    <section className={`card-slider-${idSlider}`}>
      <div className="swiper cardSwiper">
        <h1>{title}</h1>
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={0}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            navigation
            slidesPerView={2}
            breakpoints={{
              768: {
                slidesPerView: 2, // tablet ke atas
              },
              1024: {
                slidesPerView: 6, // desktop
              },
            }}
          >
            {movies.map((e) => {
              const poster = e.poster_path
                ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                : `https://demofree.sirv.com/nope-not-here.jpg`;
              return (
                <SwiperSlide key={e.id}>
                  <Link
                    to={`/detail/${e.media_type}/${e.id}`}
                    className="swiper-slide"
                  >
                    <img
                      src={poster}
                      alt=""
                      className="card-img modal-detail-button"
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
