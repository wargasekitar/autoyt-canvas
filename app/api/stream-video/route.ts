import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return new Response("File not found", { status: 404 });
  }

  const filePath = path.join("/tmp", file);

  if (!fs.existsSync(filePath)) {
    return new Response("Missing file", { status: 404 });
  }

  const stream = fs.createReadStream(filePath);

  return new Response(stream as any, {
    headers: {
      "Content-Type": "video/mp4",
    },
  });
}
