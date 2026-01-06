import { NextResponse } from "next/server";
import { getVideoStatus } from "../../../lib/video-provider";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId")!;

  const result = await getVideoStatus(taskId);
  return NextResponse.json(result);
}
