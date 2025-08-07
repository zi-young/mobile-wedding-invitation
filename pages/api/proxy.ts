import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "https://script.google.com/macros/s/AKfycbzeSdehAO0ePY2MfPP-W1stqrVllMsR36yaJ5oxxWGLUi-GezAZHjDqw8eKi_yJb8K0Tw/exec";

  try {
    console.log("받은 데이터:", req.body); 
    const fetchRes = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const text = await fetchRes.text();
    console.log("스크립트 응답:", text);
    // CORS 허용 헤더 추가
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(fetchRes.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error" });
  }
}
