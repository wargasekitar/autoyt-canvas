import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, audioUrl, apiKey } = await req.json();

  const res = await fetch("https://api.runwayml.com/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      audio: audioUrl,
      model: "gen3",
      duration: 10,
    }),
  });

  const data = await res.json();
  return NextResponse.json({ taskId: data.id });
}
