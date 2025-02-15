import axios from "axios";

const FOOTBALL_API_URL = "https://api.football-data.org/v4/matches";

export async function GET() {
  try {
    const res = await axios.get(FOOTBALL_API_URL, {
      headers: {
        "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
      },
    });
    console.log(res.data);
    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (error) {
    console.log("Error fetching live scores:", error);
    console.error("Error fetching live scores:", error);
    return new Response("Error fetching live scores", { status: 500 });
  }
}
