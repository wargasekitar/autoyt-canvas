import { NextResponse } from "next/server";
import { buildPrompt } from "../../../lib/ai";
import { createVideoTask } from "../../../lib/video-provider";

export async function POST(req: Request) {
  const { idea } = await req.json();

  const prompt = buildPrompt(idea);
  const taskId = await createVideoTask(prompt);

  return NextResponse.json({ taskId });
}
