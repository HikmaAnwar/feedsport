import axios from "axios";

const SPORTSDB_URL = process.env.NEXT_PUBLIC_SPORTSDB_API_URL;

export async function GET() {
  try {
    const res = await axios.get(`${SPORTSDB_URL}/eventsnextleague.php?id=4328`);
    return new Response(JSON.stringify(res.data.events), { status: 200 });
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return new Response("Error fetching fixtures", { status: 500 });
  }
}
