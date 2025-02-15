import { NextResponse } from "next/server";
import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: "sports",
        q: "football",
        apiKey: API_KEY,
      },
    });

    return NextResponse.json(response.data.articles);
  } catch (error) {
    console.error("Error fetching football news:", error);
    return NextResponse.json(
      { error: "Failed to fetch football news" },
      { status: 500 }
    );
  }
}
