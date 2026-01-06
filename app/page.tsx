"use client";
import { useState } from "react";
import { Film, Sparkles, Download, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const generate = async () => {
    setStatus("loading");
    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: JSON.stringify({ idea }),
    });

    const { taskId } = await res.json();

    const interval = setInterval(async () => {
      const check = await fetch(`/api/check-status?taskId=${taskId}`);
      const data = await check.json();

      if (data.status === "done") {
        clearInterval(interval);
        setVideoUrl(data.videoUrl);
        setStatus("done");
      }
    }, 4000);
  };

  <input
    type="password"
    placeholder="Google AI Studio API Key"
    className="w-full p-3 rounded-xl bg-neutral-800 border border-neutral-700"
  />

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
          <Film className="text-red-500" /> AutoYT Canvas
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Contoh: Kisah misteri gunung di Jawa Timur..."
              className="w-full h-36 p-4 rounded-xl bg-neutral-800 border border-neutral-700"
            />

            <button
              onClick={generate}
              disabled={status === "loading"}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {status === "loading" ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Generate Video
            </button>
          </div>

          <div className="bg-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center">
            {!videoUrl && <p className="opacity-60">Preview video MP4</p>}

            {videoUrl && (
              <>
                <video src={videoUrl} controls className="rounded-xl" />
                <a
                  href={videoUrl}
                  download
                  className="mt-4 flex items-center gap-2 bg-neutral-700 px-4 py-2 rounded-lg"
                >
                  <Download /> Download MP4
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


