import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("ENV KEY:", process.env.GEMINI_API_KEY ? "ADA" : "KOSONG");

    const { text, mode } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            });

    const result = await model.generateContent(
      `Buatkan script YouTube tentang: ${text}`
    );

    return NextResponse.json({
      output: result.response.text(),
    });
  } catch (error: any) {
    console.error("GEN ERROR:", error);
    return NextResponse.json(
      { error: error.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
