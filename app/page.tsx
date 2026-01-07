"use client";

import { useState } from "react";
import { PRESETS } from "@/lib/presets";

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
  const [aspect, setAspect] = useState("9:16");
  const [voiceLang, setVoiceLang] = useState("id-ID");
  const [voiceGender, setVoiceGender] = useState("male");
  const [voiceStyle, setVoiceStyle] = useState("mystery");

  const [bgmFile, setBgmFile] = useState<File | null>(null);
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);

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
        aspect,
        voiceLang,
        voiceGender,
        voiceStyle,
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
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <Film className="text-red-500" />
          <h1 className="text-3xl font-bold">AutoYT Canvas Studio</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-1 bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-6">
            {/* Idea */}
            <div>
              <label className="text-sm text-neutral-300 block mb-1">
                🧠 Ide / Script Inti
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Contoh: Kisah misteri gunung di Jawa Timur..."
                className="w-full h-32 p-3 rounded-xl bg-neutral-800 border border-neutral-700"
              />
            </div>

            {/* CONTROL GRID */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs flex items-center gap-1 text-neutral-400">
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
                <label className="text-xs flex items-center gap-1 text-neutral-400">
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
                <label className="text-xs text-neutral-400">🎙️ Voice AI</label>
                <select
                  value={voiceGender}
                  onChange={(e) => setVoiceGender(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-neutral-400">🎭 Voice Style</label>
                <select
                  value={voiceStyle}
                  onChange={(e) => setVoiceStyle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option value="horror">Horror</option>
                  <option value="mystery">Misteri</option>
                  <option value="fun">Fun</option>
                  <option value="history">Sejarah</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-neutral-400">🌍 Language</label>
                <select
                  value={voiceLang}
                  onChange={(e) => setVoiceLang(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option value="id-ID">Indonesia</option>
                  <option value="en-US">English</option>
                  <option value="es-ES">Spanish</option>
                  <option value="pt-BR">Brazil</option>
                  <option value="it-IT">Italian</option>
                  <option value="de-DE">German</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-neutral-400">⏱️ Durasi</label>
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
                <label className="text-xs flex items-center gap-1 text-neutral-400">
                  <Video size={14} /> Aspect Ratio
                </label>
                <select
                  value={aspect}
                  onChange={(e) => setAspect(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                >
                  <option value="9:16">Shorts (9:16)</option>
                  <option value="16:9">YouTube (16:9)</option>
                  <option value="1:1">Square (1:1)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-neutral-400">🪄 Tema</label>
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
                <label className="text-xs text-neutral-400">🖼️ Watermark</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setWatermarkFile(e.target.files?.[0] || null)
                  }
                  className="w-full text-xs text-neutral-400"
                />
                {!watermarkFile && (
                  <input
                    value={watermark}
                    onChange={(e) => setWatermark(e.target.value)}
                    className="mt-2 w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                  />
                )}
              </div>

              <div>
                <label className="text-xs text-neutral-400">🎵 Background Music</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setBgmFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-neutral-400"
                />
                {!bgmFile && (
                  <select
                    value={bgm}
                    onChange={(e) => setBgm(e.target.value)}
                    className="mt-2 w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
                  >
                    <option value="none">Tanpa Musik</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="horror">Horror</option>
                    <option value="uplifting">Uplifting</option>
                  </select>
                )}
              </div>
            </div>

            <div className="space-y-2">
            <p className="text-xs text-neutral-400">🎯 Template 1-Klik</p>

            <div className="grid grid-cols-2 gap-2">
              {Object.values(PRESETS).map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setStyle(preset.style);
                    setTheme(preset.theme);
                    setVoiceStyle(preset.voiceStyle);
                    setBgm(preset.bgm);
                    setAspect(preset.aspect);
                    setDuration(preset.duration);
                  }}
                  className="bg-neutral-800 hover:bg-neutral-700 text-xs px-3 py-2 rounded-lg text-left"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
            <button
              onClick={generate}
              disabled={status === "loading"}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
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
          <div className="lg:col-span-2 bg-neutral-900/70 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div>
              <label className="text-xs text-neutral-400">
                🔑 Google AI Studio API Key (BYOK)
              </label>
              <input
                type="password"
                value={userApiKey}
                onChange={(e) => {
                  setUserApiKey(e.target.value);
                  localStorage.setItem("USER_GEMINI_KEY", e.target.value);
                }}
                className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
              />
            </div>

            {!videoUrl && (
              <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                <p className="text-lg">🎬 Preview Video MP4</p>
                <p className="text-sm">Hasil video akan muncul di sini</p>
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
                  className="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg"
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
