// lib/video-provider.ts
const API = "https://api.replicate.com/v1/predictions";
const TOKEN = process.env.REPLICATE_API_TOKEN!;

// contoh model video (ganti kalau mau)
const MODEL_VERSION = "f4e4c3e3c9a6c6b1a9b9b7d3f6b5f2b1"; // contoh

export async function createVideoTask(prompt: string) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input: {
        prompt,
        duration: 30,
      },
    }),
  });

  const data = await res.json();
  return data.id;
}

export async function getVideoStatus(taskId: string) {
  const res = await fetch(`${API}/${taskId}`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  const data = await res.json();

  if (data.status === "succeeded") {
    return {
      status: "done",
      videoUrl: data.output?.[0],
    };
  }

  return { status: data.status };
}
