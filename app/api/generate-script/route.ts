import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(
      `Buatkan script YouTube menarik tentang: ${title}`
    );

    return NextResponse.json({
      script: result.response.text()
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
