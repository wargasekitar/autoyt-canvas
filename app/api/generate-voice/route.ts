export async function POST(req: Request) {
  const { text, voiceId, apiKey } = await req.json();

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  const audioBuffer = await res.arrayBuffer();

  // Simpan ke storage (S3 / Cloudflare R2)
  // return audio URL
}
