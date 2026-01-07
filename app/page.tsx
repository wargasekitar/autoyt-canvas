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
  const [aspect, setAspect] = useState("9:16");
  const [voiceLang, setVoiceLang] = useState("id-ID");
  const [voiceGender, setVoiceGender] = useState("male");
  const [bgmFile, setBgmFile] = useState<File | null>(null);
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [voiceStyle, setVoiceStyle] = useState("mystery");

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Film className="text-red-500" />
          AutoYT Canvas Studio
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT PANEL – CONTROL STUDIO */}
        <div className="lg:col-span-1 bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-6 backdrop-blur">
          {/* Idea */}
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

          {/* CONTROL GRID */}
          <div className="grid grid-cols-2 gap-4">
            {/* Style */}
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

            {/* Narrator */}
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

            {/* Voice AI */}
            <div>
              <label className="text-xs flex items-center gap-1 text-neutral-400">
                🎙️ Voice AI
              </label>
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
  <label className="text-xs flex items-center gap-1 text-neutral-400">
    🎭 Voice Style
  </label>
  <select
    value={voiceStyle}
    onChange={(e) => setVoiceStyle(e.target.value)}
    className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
  >
    <option value="horror">Horror (Deep, Dramatic)</option>
    <option value="mystery">Misteri (Calm, Suspense)</option>
    <option value="fun">Fun (Energetic)</option>
    <option value="history">Sejarah (Formal)</option>
  </select>
</div>


            {/* Language */}
            <div>
              <label className="text-xs flex items-center gap-1 text-neutral-400">
                🌍 Language
              </label>
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

            {/* Duration */}
            <div>
              <label className="text-xs flex items-center gap-1 text-neutral-400">
                ⏱️ Durasi
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

            {/* Aspect */}
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

            {/* Theme */}
            <div>
              <label className="text-xs flex items-center gap-1 text-neutral-400">
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

            {/* Watermark */}
            <div>
  <label className="text-xs flex items-center gap-1 text-neutral-400">
    🖼️ Watermark (Logo / Gambar)
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setWatermarkFile(e.target.files?.[0] || null)}
    className="w-full text-xs text-neutral-400
      file:mr-3 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-neutral-700 file:text-white
      hover:file:bg-neutral-600"
  />

  {!watermarkFile && (
    <input
      value={watermark}
      onChange={(e) => setWatermark(e.target.value)}
      placeholder="Contoh: @channelkamu"
      className="mt-2 w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
    />
  )}
</div>
            {/* Music */}
            <div>
  <label className="text-xs flex items-center gap-1 text-neutral-400">
    🎵 Background Music
  </label>

  <input
    type="file"
    accept="audio/*"
    onChange={(e) => setBgmFile(e.target.files?.[0] || null)}
    className="w-full text-xs text-neutral-400
      file:mr-3 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-neutral-700 file:text-white
      hover:file:bg-neutral-600"
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

          {/* Generate */}
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

        {/* RIGHT PANEL – PREVIEW */}
        <div className="lg:col-span-2 bg-neutral-900/70 rounded-2xl p-6 border border-neutral-800 backdrop-blur space-y-4">
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
              placeholder="AIza..."
              className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700"
            />
          </div>

          {!videoUrl && (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <p className="text-lg">🎬 Preview Video MP4</p>
              <p className="text-sm">Hasil video akan muncul di sini</p>
            </div>
          )}

          {videoUrl && (
            <>
              <video src={videoUrl} controls className="rounded-xl w-full max-h-[420px]" />
              <a
                href={videoUrl}
                download
                className="mt-4 inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg"
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
