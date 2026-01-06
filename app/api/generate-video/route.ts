import { NextResponse } from "next/server";
import { buildPrompt } from "../../../lib/ai";
import { createVideoTask } from "../../../lib/video-provider";

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = buildPrompt(body);
  const taskId = await createVideoTask(prompt);

  return NextResponse.json({ taskId });
}
