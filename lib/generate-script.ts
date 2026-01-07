export async function generateScript({
  idea,
  theme,
  duration,
  voiceStyle,
  apiKey,
}: {
  idea: string;
  theme: string;
  duration: string;
  voiceStyle: string;
  apiKey: string;
}) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
Buatkan narasi video YouTube.
Tema: ${theme}
Durasi: ${duration}
Gaya suara: ${voiceStyle}

Topik:
${idea}

Buat narasi utuh, mengalir, tidak pakai poin.
`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
