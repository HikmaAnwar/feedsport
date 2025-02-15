import axios from "axios";

export async function fetchLiveScores() {
  try {
    const res = await axios.get("/api/live-scores");
    return res.data.matches;
  } catch (error) {
    console.error("Error fetching live scores:", error);
    return [];
  }
}

export async function fetchUpcomingMatches() {
  try {
    const res = await axios.get("/api/fixtures");
    return res.data;
  } catch (error) {
    console.error("Error fetching live scores:", error);
    return [];
  }
}

export async function fetchFootballNews() {
  try {
    const res = await axios.get("/api/news");
    return res.data;
  } catch (error) {
    console.error("Error fetching football news:", error);
    return [];
  }
}
