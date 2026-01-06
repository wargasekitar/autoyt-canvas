import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idea, theme, language, apiKey } = await req.json();

  const prompt = `
Buatkan script YouTube ${language} bertema ${theme}.
Format JSON:
- title
- scenes[] (narration + visual_prompt)
Topik: ${idea}
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json({ output: data });
}
