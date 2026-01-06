import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("ENV KEY:", process.env.GEMINI_API_KEY ? "ADA" : "KOSONG");

    const { text } = await req.json();

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: {
            text: `Buatkan script YouTube yang informatif, naratif, dan engaging tentang:\n${text}`,
          },
          temperature: 0.7,
          maxOutputTokens: 512,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("GEMINI ERROR:", data);
      return NextResponse.json(
        { error: data.error?.message || "Gemini API error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      output: data.candidates?.[0]?.output || "",
    });
  } catch (err: any) {
    console.error("GEN ERROR:", err);
    return NextResponse.json(
      { error: err.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
