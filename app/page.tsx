"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">
        AutoYT Canvas 🎬
      </h1>

      <p className="text-slate-400 mb-6">
        Ubah teks menjadi video YouTube Short atau Long (AI Automation)
      </p>

      <textarea
        className="w-full h-40 p-4 rounded bg-slate-900 border border-slate-700"
        placeholder="Tulis naskah video di sini..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-3 rounded bg-red-600 hover:bg-red-700"
      >
        Generate Video (Coming Soon)
      </button>
    </main>
  );
}
