import { login } from "../api/tmdb.jsx";

export async function getSessionId(username, password) {
  try {
    return await login(username, password);
  } catch (error) {
    throw error.message;
  }
}
