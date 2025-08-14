import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbzcLtJMkA0o20-4SrM-8Pyz7aGv85fxBAcatNe7S4oiYr8V-B-RnIoz3ehY13kFp4Ez0Q/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
