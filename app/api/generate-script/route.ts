import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, mode } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
Kamu adalah AI YouTube Automation.
Ubah teks berikut menjadi script video ${mode}.

RULE:
- Bagi menjadi scene
- Sertakan narasi voice over
- Sertakan deskripsi visual per scene
- Bahasa Indonesia
- Ringkas tapi engaging

TEKS:
${text}
`;

  const result = await model.generateContent(prompt);
  const output = result.response.text();

  return NextResponse.json({ output });
}
