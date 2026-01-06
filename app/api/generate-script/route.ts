import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      idea,
      theme,
      language,
      voice,
      style,
      duration,
      geminiKey,
      videoApiKey,
    } = await req.json();

    /* 1️⃣ Generate Script (Gemini) */
    const scriptRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: `
Buatkan script video ${duration} detik.
Tema: ${theme}
Bahasa: ${language}
Gaya visual: ${style}
Voice: ${voice}
Topik: ${idea}
`
            }]
          }]
        })
      }
    );

    const scriptData = await scriptRes.json();
    const script =
      scriptData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!script) {
      return NextResponse.json({ error: "Script gagal dibuat" }, { status: 500 });
    }

    /* 2️⃣ Generate Video (contoh pseudo Runway/Pika) */
    const videoRes = await fetch(
      "https://api.video-ai-provider.com/v1/generate",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${videoApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: script,
          style,
          duration,
          voice,
          output: "mp4",
        }),
      }
    );

    const videoData = await videoRes.json();

    return NextResponse.json({
      videoUrl: videoData.video_url,
      script,
    });

  } catch (err: any) {
    console.error("VIDEO GEN ERROR:", err);
    return NextResponse.json(
      { error: "Video generation failed" },
      { status: 500 }
    );
  }
}
