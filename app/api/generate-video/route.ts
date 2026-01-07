import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  console.log("GENERATE VIDEO HIT");

  return NextResponse.json({
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  });
}
