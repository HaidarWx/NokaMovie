export function ProfilePage({ account }) {
  console.log(account);
  const pfp = account.avatar.tmdb.avatar_path;
  const username = account.username;

  return (
    <div className="profile-container">
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
            <div className="member-since">Member since </div>
          </div>
        </div>
      </div>
    </div>
  );
}
