import { useState } from "react";

export default function DashboardPage() {
  const [idea, setIdea] = useState("");

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🎬 AutoYT Canvas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="space-y-4">
          <textarea
            placeholder="Tulis ide / konten video di sini..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full h-32 p-3 rounded-xl bg-neutral-900 border border-neutral-700"
          />

          <select className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700">
            <option>Tema Video</option>
            <option>Horror</option>
            <option>Misteri</option>
            <option>Sejarah</option>
            <option>Legenda</option>
          </select>

          <select className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700">
            <option>Bahasa</option>
            <option>Indonesia</option>
            <option>English</option>
            <option>Spanish</option>
          </select>

          <select className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700">
            <option>Voice Over</option>
            <option>Pria</option>
            <option>Perempuan</option>
          </select>

          <select className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700">
            <option>Gaya Video</option>
            <option>Cinematic</option>
            <option>Anime</option>
            <option>Cartoon</option>
            <option>CGI</option>
          </select>

          <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold">
            🚀 Generate Video
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-neutral-900 rounded-2xl p-4 flex flex-col items-center justify-center">
          <p className="opacity-60">Preview video akan muncul di sini</p>
        </div>
      </div>
    </div>
  );
}
