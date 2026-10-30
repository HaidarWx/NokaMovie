export const API_KEY = "1c353dc1b6d94ce88642f8d6b57fa0b7";
export const BASE_URL = "https://api.themoviedb.org/3";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: "1c353dc1b6d94ce88642f8d6b57fa0b7" },
});

/* const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzM1M2RjMWI2ZDk0Y2U4ODY0MmY4ZDZiNTdmYTBiNyIsIm5iZiI6MTc3MjAzNTI1OC45NzgsInN1YiI6IjY5OWYxY2JhNDdiY2QzY2Y2M2U4NWY3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qOfQ5MU0G09aObPB_H42tcE8_Gg-uDcw3D2Vyw7X_l0`,
};

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { headers, ...options });
  const data = await res.json();
  console.log(data);
  if (!res.ok) throw new Error(data.status_message || "Request gagal");
  return data;
} */

export async function login(username, password) {
  //1. Meminta request token
  const { data } = await api.get(`/authentication/token/new`);
  const request_token = data.request_token;

  // 2. Cek username & password ? request_token = true
  await api.post(`/authentication/token/validate_with_login`, {
    username,
    password,
    request_token,
  });

  //3. Meminta session baru
  const sessionRes = await api.post(`/authentication/session/new`, {
    request_token,
  });
  console.log(sessionRes);
  return sessionRes.data.session_id;
}

export async function getAccount(sessionId) {
  const response = await api.get(`/account`, {
    params: {
      session_id: sessionId,
    },
  });

  return response.data;
}
/* Request data untuk hasil film dari search */
export async function getMovies(keyword) {
  const [movieRes, tvRes] = await Promise.all([
    api.get(`/search/movie`, { params: { query: keyword } }),
    api.get("/search/tv", { params: { query: keyword } }),
  ]);

  return [
    ...movieRes.data.results.map((item) => ({ ...item, media_type: "movie" })),
    ...tvRes.data.results.map((item) => ({ ...item, media_type: "tv" })),
  ];
}
export async function getPopularMovies() {
  const { data } = await api.get("/trending/all/week");
  return data.results;
}
export async function loadAllGenres() {
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
  const { data } = await api.get("/trending/all/day");
  return data.results;
}
export async function getTrendingWeeks() {
  const { data } = await api.get("/trending/all/week");
  return data.results;
}
export async function getTrendingPopular() {
  const { data } = await api.get("/tv/popular");
  const movies = data.results.map((movie) => ({
    ...movie,
    media_type: "tv",
  }));
  return movies;
}
export async function getTrendingTopRated() {
  const { data } = await api.get("/movie/popular");
  const movies = addMediaType(data, "movie");
  return movies;
}
export async function getDetail(id, type) {
  const { data } = await api.get(
    `/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,content_ratings`,
  );
  return data;
}

export async function getSeasons(id, type, seasonNumber) {
  if (type !== "tv") {
    return;
  }

  const { data } = await api.get(
    `/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`,
  );
  return data;
}
export async function getAllSeason(data, id, type) {
  if (type !== "tv") {
    return;
  }
  console.log(data);
  const seasonNumber = data ? data.seasons.map((e) => e.season_number) : [];

  return await Promise.all(seasonNumber.map((n) => getSeasons(id, type, n)));
}
export async function getSeasonDetail(id, seasonNumber) {
  const { data } = await api.get(
    `/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`,
  );
  return data;
}

function addMediaType(data, type) {
  return data.results.map((item) => ({
    ...item,
    media_type: type,
  }));
}
