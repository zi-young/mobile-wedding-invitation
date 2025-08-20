export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    try {
      const data = JSON.parse(event.body);
  
      // Google Apps Script 호출
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzcLtJMkA0o20-4SrM-8Pyz7aGv85fxBAcatNe7S4oiYr8V-B-RnIoz3ehY13kFp4Ez0Q/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
  
      const text = await res.text();
      return {
        statusCode: res.status,
        body: text,
      };
    } catch (error) {
      console.error("Proxy error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Proxy error" }),
      };
    }
  }
  