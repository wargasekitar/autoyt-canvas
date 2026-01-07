import { NextResponse } from "next/server";
import { buildVideo } from "@/lib/video-builder";
import path from "path";

export async function POST(req: Request) {
  const data = await req.json();

  const outputPath = path.join(
    process.cwd(),
    "public/tmp",
    `final-${Date.now()}.mp4`
  );

  await buildVideo({
    videoInput: data.baseVideo,
    audioInput: data.bgmFile,
    watermarkInput: data.watermarkFile,
    output: outputPath,
  });

  return NextResponse.json({
    videoUrl: outputPath.replace("public", ""),
  });
}
