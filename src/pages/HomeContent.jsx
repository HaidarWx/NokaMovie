import { HeroMovieSlider } from "../components/HeroMovieSlider.jsx";
import { MovieSlider } from "../components/MovieSlider.jsx";
import {
  getTrendingDays,
  getTrendingWeeks,
  getTrendingPopular,
  getTrendingTopRated,
} from "../api/tmdb.jsx";
export function HomeContent() {
  return (
    <div className="home-content">
      <HeroMovieSlider />
      <MovieSlider
        title={"Trending Day's"}
        fetchFunction={getTrendingDays}
        idSlider={"day"}
      />
      <MovieSlider
        title={"Trending Week's"}
        fetchFunction={getTrendingWeeks}
        idSlider={"week"}
      />
      <MovieSlider
        title={"Trending Popular's"}
        fetchFunction={getTrendingPopular}
        idSlider={"popular"}
      />
      <MovieSlider
        title={"Trending Top Rated's"}
        fetchFunction={getTrendingTopRated}
        idSlider={"topRated"}
      />
    </div>
  );
}
