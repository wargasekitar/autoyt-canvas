import { NextResponse } from "next/server";
import { buildPrompt } from "../../../lib/ai";
import { createVideoTask } from "../../../lib/video-provider";

export async function POST(req: Request) {
  const body = await req.json();

  const userGeminiKey = req.headers.get("x-user-gemini-key");
    if (!userGeminiKey) {
    return NextResponse.json(
        { error: "Missing user API key" },
        { status: 400 }
    );
    }

  const prompt = buildPrompt(body);
  const taskId = await createVideoTask(prompt);

  return NextResponse.json({ taskId });
}
