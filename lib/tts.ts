export async function generateVoice({
  text,
  lang,
  gender,
  apiKey,
}: {
  text: string;
  lang: string;
  gender: string;
  apiKey: string;
}) {
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: lang,
          ssmlGender: gender.toUpperCase(),
        },
        audioConfig: {
          audioEncoding: "MP3",
        },
      }),
    }
  );

  const data = await res.json();
  return Buffer.from(data.audioContent, "base64");
}
