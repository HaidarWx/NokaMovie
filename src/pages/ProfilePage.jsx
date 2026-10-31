export function ProfilePage({ account }) {
  console.log(account);
  const pfp = account ? account.avatar.tmdb.avatar_path : "nohave";
  const username = account ? account.username : "nohave";
  const bgImage = `https://media.themoviedb.org/t/p/w1920_and_h318_multi_faces/${account ? account.background_image : "nohave"}`;
  console.log(account);
  const description = account ? account.description : "nohave";
  return (
    <div className="profile-container">
      <div
        className="profile-info"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="profile-overlay">
          <div className="profile-wrapper">
            <div className="pfp-wrapper">
              <img
                src={`https://image.tmdb.org/t/p/w185/${pfp}`}
                alt={`${username}'s profile`}
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
    </div>
  );
}
