export function SeasonLayout({ dataSeason, dataDetail }) {
  if (!dataDetail) return <p>Loading...</p>;
  const title = dataDetail.name;
  const seasonNumber = dataSeason.name;
  const poster = `https://media.themoviedb.org/t/p/w300_and_h450_face/${dataSeason.poster_path}`;
  const date = dataSeason.air_date;
  const rating = Math.round(dataSeason.vote_average * 10);
  const backdrop = dataDetail.belongs_to_collection
    ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${dataDetail.belongs_to_collection.backdrop_path}`
    : `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${dataDetail.backdrop_path}`;

  /* const backdrop = data.belongs_to_collection
    ? data.belongs_to_collection.backdrop_path
    : data.backdrop_path; */
  /* const video =
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Trailer",
    ) ||
    data.videos.results.find(
      (item) => item.site === "YouTube" && item.type === "Teaser",
    ); */
  /*   const trailerEmbedUrl = video
    ? `https://www.youtube.com/embed/${video.key}`
    : null; */

  return (
    <div className="info-body" style={{ backgroundImage: `url(${backdrop})` }}>
      <div className="container-detail">
        <div id="movie-detail">
          <div className="mov-poster">
            <img src={poster} alt={title} />
          </div>
          <div className="mov-info">
            <div className="mov-top">
              <div className="mov-title">
                <h2>
                  <a href="#" className="title">
                    {title}
                  </a>
                </h2>
                <h2>
                  <a href="#" className="title">
                    {seasonNumber}
                  </a>
                </h2>
                <span>({date ? date.slice(0, 4) : "-"})</span>
              </div>
              <div className="mov-fact">
                <div className="certification">{rating.toString()}</div>
              </div>
            </div>
            <div className="mov-bottom">
              <div className="overview">
                <p>
                  {dataSeason.overview
                    ? dataSeason.overview
                    : dataDetail.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
