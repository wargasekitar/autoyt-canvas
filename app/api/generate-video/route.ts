import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

import { generateScript } from "@/lib/generate-script";
import { generateVoice } from "@/lib/tts";
import { createVideoFromImage } from "@/lib/video-from-image";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = req.headers.get("x-user-gemini-key");

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key tidak ada" },
        { status: 400 }
      );
    }

    const {
      idea,
      theme,
      duration,
      voiceLang,
      voiceGender,
      voiceStyle,
    } = body;

    /* =========================
       1️⃣ AI SCRIPT
    ========================= */
    const scriptText = await generateScript({
      idea,
      theme,
      duration,
      voiceStyle,
      apiKey,
    });

    /* =========================
       2️⃣ VOICE AI (MP3)
    ========================= */
    const voiceBuffer = await generateVoice({
      text: scriptText,
      lang: voiceLang,
      gender: voiceGender,
      apiKey,
    });

    const voicePath = path.join("/tmp", `voice-${Date.now()}.mp3`);
    fs.writeFileSync(voicePath, voiceBuffer);

    /* =========================
       3️⃣ IMAGE + VOICE → VIDEO
    ========================= */
    const outputName = `video-${Date.now()}.mp4`;
    const outputPath = path.join("/tmp", outputName);

    await createVideoFromImage({
      imagePath: path.join(process.cwd(), "public/bg.jpg"),
      audioPath: voicePath,
      outputPath,
    });

    /* =========================
       RESPONSE
    ========================= */
    return NextResponse.json({
      success: true,
      videoUrl: `/api/stream-video?file=${outputName}`,
    });
  } catch (err: any) {
    console.error("GEN ERROR:", err);
    return NextResponse.json(
      { error: "Generate video gagal" },
      { status: 500 }
    );
  }
}
