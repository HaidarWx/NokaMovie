export function ProfilePage({ account }) {
  console.log(account);
  const pfp = account.avatar.tmdb.avatar_path;
  const username = account.username;
  const bgImage = `https://media.themoviedb.org/t/p/w1920_and_h318_multi_faces/${account.background_image}`;
  console.log(account);
  const description = account.description;
  return (
    <div className="profile-container">
      <div
        className="profile-info"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="profile-wrapper">
          <div className="pfp-wrapper">
            <img
              src={`https://media.themoviedb.org/t/p/w50_and_h50_face/${pfp}`}
              alt=""
            />
          </div>
          <div className="profile-info-wrapper">
            <div className="content-wrapper">
              <div className="username">{username}</div>
              <div className="description">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
