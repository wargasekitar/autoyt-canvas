import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("REQUEST DATA:", body);

    // validasi minimal (hindari 400)
    if (!body.idea || body.idea.trim() === "") {
      return NextResponse.json(
        { error: "Idea kosong" },
        { status: 400 }
      );
    }

    /* ======================
       VIDEO DUMMY (AMAN)
    ====================== */
    const outputName = `video-${Date.now()}.mp4`;
    const outputPath = path.join("/tmp", outputName);

    fs.copyFileSync(
      path.join(process.cwd(), "public/sample.mp4"),
      outputPath
    );

    return NextResponse.json({
      success: true,
      videoUrl: `/api/stream-video?file=${outputName}`,
    });
  } catch (err: any) {
    console.error("GEN ERROR:", err);
    return NextResponse.json(
      { error: "Gagal generate video" },
      { status: 500 }
    );
  }
}
