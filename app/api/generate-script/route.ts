import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("ENV KEY:", process.env.GEMINI_API_KEY ? "ADA" : "KOSONG");

    const { text } = await req.json();

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Buatkan script YouTube yang informatif dan menarik tentang: ${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("GEMINI ERROR:", data);
      return NextResponse.json(
        { error: "Gemini API error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      output: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
    });
  } catch (err: any) {
    console.error("GEN ERROR:", err);
    return NextResponse.json(
      { error: err.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
