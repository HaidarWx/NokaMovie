export const API_KEY = "1c353dc1b6d94ce88642f8d6b57fa0b7";
export const BASE_URL = "https://api.themoviedb.org/3";

/* Request data untuk hasil film dari search */
export async function getMovies(inputKeyword) {
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${inputKeyword}`,
      ),
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
  } catch (error) {
    throw error;
  }
}
