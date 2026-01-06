"use client";

import { useState } from "react";
import {
  Film,
  Sparkles,
  Download,
  Loader2,
  Wand2,
  Mic,
  Palette,
  Video,
} from "lucide-react";

export default function DashboardPage() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [style, setStyle] = useState("Cinematic");
  const [narrator, setNarrator] = useState("Male");
  const [duration, setDuration] = useState("Short (30s)");
  const [theme, setTheme] = useState("Misteri");

  const [watermark, setWatermark] = useState("AutoYT Canvas");
  const [bgm, setBgm] = useState("none");
  const [userApiKey, setUserApiKey] = useState("");

  const generate = async () => {
    setStatus("loading");

    const res = await fetch("/api/generate-video", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
            "x-user-gemini-key": userApiKey,
          },
      body: JSON.stringify({
      idea,
      style,
      narrator,
      duration,
      theme,
      watermark,
      bgm,
      }),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Film className="text-red-500" />
          <h1 className="text-3xl font-bold tracking-tight">
            AutoYT Canvas Studio
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-1 space-y-5 bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 backdrop-blur">
            {/* Idea Input */}
            <div>
              <label className="text-sm mb-1 block text-neutral-300">
                🧠 Ide / Script Inti
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Contoh: Kisah misteri gunung di Jawa Timur..."
                className="w-full h-32 p-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600/40"
              />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs mb-1 flex items-center gap-1 text-neutral-400">
                  <Palette size={14} /> Gaya Video
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option>Cinematic</option>
                  <option>Realistic</option>
                  <option>Cartoon</option>
                  <option>Anime</option>
                  <option>LEGO</option>
                  <option>CGI</option>
                </select>
              </div>

              <div>
                <label className="text-xs mb-1 flex items-center gap-1 text-neutral-400">
                  <Mic size={14} /> Narator
                </label>
                <select
                  value={narrator}
                  onChange={(e) => setNarrator(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <label className="text-xs mb-1 flex items-center gap-1 text-neutral-400">
                  <Video size={14} /> Durasi
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option>Short (30s)</option>
                  <option>Short (60s)</option>
                  <option>Long (3–5 min)</option>
                </select>
              </div>

              <div>
                <label className="text-xs mb-1 flex items-center gap-1 text-neutral-400">
                  <Wand2 size={14} /> Tema
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option>Misteri</option>
                  <option>Horror</option>
                  <option>Sejarah</option>
                  <option>Legenda</option>
                  <option>Edukasi</option>
                </select>
              </div>
              <div>
                <label className="text-xs mb-1 flex items-center gap-1 text-neutral-400">
                  🖋️ Watermark
                </label>
                <input
                  value={watermark}
                  onChange={(e) => setWatermark(e.target.value)}
                  placeholder="Contoh: @channelkamu"
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                />
              </div>

              <div>
                <label className="text-xs mb-1 flex items-center gap-1 text-neutral-400">
                  🎵 Background Music
                </label>
                <select
                  value={bgm}
                  onChange={(e) => setBgm(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option value="none">Tanpa Musik</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="horror">Horror</option>
                  <option value="uplifting">Uplifting</option>
                </select>
              </div>

            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={status === "loading"}
              className="w-full mt-3 bg-red-600 hover:bg-red-700 transition-colors py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles />
              )}
              Generate Video
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div>
          <label className="text-xs mb-1 block text-neutral-400">
            🔑 Google AI Studio API Key (BYOK)
          </label>
          <input
            type="password"
            value={userApiKey}
            onChange={(e) => {
              setUserApiKey(e.target.value);
              localStorage.setItem("USER_GEMINI_KEY", e.target.value);
            }}
            placeholder="AIza..."
            className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
          />
        </div>
          <div className="lg:col-span-2 bg-neutral-900/70 rounded-2xl p-6 flex flex-col items-center justify-center border border-neutral-800 backdrop-blur">
            {!videoUrl && (
              <div className="text-center text-neutral-400">
                <p className="text-lg">🎬 Preview Video MP4</p>
                <p className="text-sm mt-2">
                  Hasil video akan muncul di sini
                </p>
              </div>
            )}

            {videoUrl && (
              <>
                <video
                  src={videoUrl}
                  controls
                  className="rounded-xl w-full max-h-[420px]"
                />
                <a
                  href={videoUrl}
                  download
                  className="mt-4 flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 transition px-4 py-2 rounded-lg"
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
