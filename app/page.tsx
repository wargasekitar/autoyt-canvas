"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
  setLoading(true);
  setResult("");

  try {
    const res = await fetch("/api/generate-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, mode: "short" }),
    });

    const data = await res.json();

    if (!res.ok) {
      setResult("ERROR: " + (data.error || "Unknown error"));
    } else {
      setResult(data.output || "AI tidak mengembalikan teks.");
    }
  } catch (err) {
    setResult("FETCH ERROR: tidak bisa menghubungi server");
  }

  setLoading(false);
}

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">AutoYT Canvas 2026 🎬</h1>

      <textarea
        className="w-full h-40 p-4 rounded bg-slate-900 border border-slate-700"
        placeholder="Masukkan ide / artikel / naskah..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generate}
        className="mt-4 px-6 py-3 rounded bg-red-600 hover:bg-red-700"
      >
        {loading ? "Generating..." : "Generate Script AI"}
      </button>

      {result && (
        <pre className="mt-6 whitespace-pre-wrap bg-slate-900 p-4 rounded border border-slate-700">
          {result}
        </pre>
      )}
    </main>
  );
}
