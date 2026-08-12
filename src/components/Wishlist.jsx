import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";

export function Wishlist({ wishlist, onToggleWishlist }) {
  return (
    <div
      className="wish-container"
      data-bs-toggle="modal"
      data-bs-target="#movieDetailModal"
    >
      {wishlist.length > 0 ? (
        wishlist.map((item) => {
          const [
            id,
            type,
            title,
            poster,
            isCurrentMovieIsWishlist,
            date,
            original,
          ] = [
            item.id,
            item.type,
            item.title,
            item.poster,
            item.isWishlist,
            item.date,
            item.original,
          ];

          return (
            <Link key={id} to={`/detail/${type}/${id}`}>
              <div className="wish-card">
                <div className="wish-poster">
                  <img src={poster} alt="" />
                </div>
                <div className="wish-detail">
                  <div className="wish-top">
                    <div className="movie-title">
                      <h2>
                        {title}
                        <span className="title">({original})</span>
                      </h2>
                    </div>
                    <span className="wish-date">{date}</span>
                  </div>
                  <div className="wish-bottom">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        onToggleWishlist({
                          id,
                          type,
                          title,
                          poster,
                          isCurrentMovieIsWishlist,
                          date,
                          original,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div>Tidak ada wishlist</div>
      )}
    </div>
  );
}
