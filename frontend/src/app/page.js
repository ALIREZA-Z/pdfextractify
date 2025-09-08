"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setMessage(`Uploaded successfully: ${data.filename || "file"}`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Nav */}
      <header className="flex justify-end p-4 shadow-sm bg-white">
        <a href="/login" className="text-blue-600 font-medium hover:underline">
          Sign In
        </a>
        <a href="/signup" className="ml-4 text-blue-600 font-medium hover:underline">
          Sign Up
        </a>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Upload Your File</h1>

          {/* Styled Browse Button */}
          <label className="w-full inline-block mb-4 px-6 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
            {file ? file.name : "Choose File"}
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Upload
          </button>

          {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
      </main>
    </div>
  );
}
