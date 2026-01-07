import { NextResponse } from "next/server";
import { buildVideo } from "@/lib/video-builder";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const data = await req.json();

  const output = `/tmp/final-${Date.now()}.mp4`;

  await buildVideo({
    videoInput: data.baseVideo,
    audioInput: data.bgmFile,
    watermarkInput: data.watermarkFile,
    output,
  });

  return NextResponse.json({
    videoUrl: output,
  });
}
