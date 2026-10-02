export const API_KEY = "1c353dc1b6d94ce88642f8d6b57fa0b7";
export const BASE_URL = "https://api.themoviedb.org/3";

/* Request data untuk hasil informasi akun tmdb */

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzM1M2RjMWI2ZDk0Y2U4ODY0MmY4ZDZiNTdmYTBiNyIsIm5iZiI6MTc3MjAzNTI1OC45NzgsInN1YiI6IjY5OWYxY2JhNDdiY2QzY2Y2M2U4NWY3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qOfQ5MU0G09aObPB_H42tcE8_Gg-uDcw3D2Vyw7X_l0`,
};

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { headers, ...options });
  console.log(headers.Authorization);
  const data = await res.json();
  if (!res.ok) throw new Error(data.status_message || "Request gagal");
  return data;
}

export async function login(username, password) {
  const { request_token } = await request(`/authentication/token/new`);

  await request("/authentication/token/validate_with_login", {
    method: "POST",
    body: JSON.stringify({ username, password, request_token }),
  });

  const session_id = await request("/authentication/session/new", {
    method: "POST",
    body: JSON.stringify({ request_token }),
  });
  return session_id;
}

export function getAccount(sessionId) {
  return request(`/account?session_id=${sessionId}`);
}
/* Request data untuk hasil film dari search */
export async function getMovies(inputKeyword) {
  const [movieRes, tvRes] = await Promise.all([
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${inputKeyword}`),
    fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${inputKeyword}`),
  ]);
  if (!movieRes.ok || !tvRes.ok) {
    throw new Error("Gagal mengambil data");
  }

  const movieData = await movieRes.json();
  const tvData = await tvRes.json();

  const results = [
    ...movieData.results.map((item) => ({ ...item, media_type: "movie" })),
    ...tvData.results.map((item) => ({ ...item, media_type: "tv" })),
  ];

  return results;
}
export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`, //Hero-Swiper
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data movie popular!");
  }
  const data = await response.json();
  return data.results;
}
export async function loadAllGenres() {
  // Library Genre

  const [movieRes, tvRes] = await Promise.all([
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
  ]);

  if (!movieRes.ok || !tvRes.ok) {
    throw new Error("Gagal mengambil data");
  }
  const movieData = await movieRes.json();
  const tvData = await tvRes.json();
  return [...movieData.genres, ...tvData.genres];
}
export async function getTrendingDays() {
  const response = await fetch(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data movie popular!");
  }
  const data = await response.json();
  return data.results;
}
export async function getTrendingWeeks() {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data movie popular!");
  }
  const data = await response.json();

  return data.results;
}
export async function getTrendingPopular() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data movie popular!");
  }
  const data = await response.json();
  const movies = data.results.map((movie) => ({
    ...movie,
    media_type: "tv",
  }));
  console.log(movies);
  return movies;
}
export async function getTrendingTopRated() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data movie popular!");
  }
  const data = await response.json();
  const movies = addMediaType(data, "movie");
  console.log(movies);
  return movies;
}
export async function getDetail(id, type) {
  const detailRes = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,content_ratings`,
  );
  if (!detailRes.ok) {
    throw new Error("Gagal mengambil data detail film!");
  }
  const detail = await detailRes.json();
  return detail;
}

export async function getSeasons(id, type, seasonNumber) {
  if (type !== "tv") {
    return;
  }

  const res = await fetch(
    `${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`,
  );
  if (!res.ok) {
    throw new Error("Gagal mengambil data seasons");
  }
  const data = await res.json();

  return data;
}
export async function getSeasonDetail(id, seasonNumber) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`,
  );
  if (!res.ok) {
    throw new Error("Gagal mengambil data detail season!");
  }
  const data = await res.json();

  return data;
}

function addMediaType(data, type) {
  return data.results.map((item) => ({
    ...item,
    media_type: type,
  }));
}
