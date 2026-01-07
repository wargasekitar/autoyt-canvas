import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("REQUEST DATA:", body);

    // 🔹 sementara: pakai video dummy lokal
    const outputName = `video-${Date.now()}.mp4`;
    const outputPath = path.join("/tmp", outputName);

    // copy video dummy → seolah hasil AI
    fs.copyFileSync(
      path.join(process.cwd(), "public/sample.mp4"),
      outputPath
    );

    return NextResponse.json({
      videoUrl: `/api/stream-video?file=${outputName}`,
    });
  } catch (err: any) {
    console.error("GEN ERROR:", err);
    return NextResponse.json(
      { error: "Generate failed" },
      { status: 500 }
    );
  }
}
