const API = "https://api.replicate.com/v1/predictions";
const TOKEN = process.env.REPLICATE_API_TOKEN!;

export async function createVideoTask(prompt: string) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "video-model-version-id",
      input: { prompt },
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
    return { status: "done", videoUrl: data.output[0] };
  }

  return { status: data.status };
}
