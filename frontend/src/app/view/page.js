"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

export default function ViewPage() {
  const params = useSearchParams();
  const filename = params.get("filename");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!filename) {
      setError("No filename provided.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/pdf2text/?filename=${encodeURIComponent(filename)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setText(data.text || "No text found.");
        setLoading(false);
      })
      .catch((err) => {
        setError(`Failed to load text: ${err.message}`);
        setLoading(false);
      });
  }, [filename]);

  if (loading) return <p className="p-4">Loading text...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Extracted Text</h1>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md">{text}</pre>
    </main>
  );
}
