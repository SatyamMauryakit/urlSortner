import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("urlHistory")) || [];
    setHistory(saved);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/shorten", { originalUrl: longUrl });
      setShortUrl(res.data.shortUrl);

      const updated = [{ longUrl, shortUrl: res.data.shortUrl }, ...history];
      setHistory(updated);
      localStorage.setItem("urlHistory", JSON.stringify(updated));

      setLongUrl("");
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten URL");
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8">
      
      {/* Main Card */}
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">  URL Shortener</h1>

       
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL..."
            className="px-4 py-3 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition duration-200">
            Shorten
          </button>
        </form>

        
        {shortUrl && (
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="mb-2 text-sm text-gray-400">Your Short URL:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <a href={shortUrl} className="text-blue-400 underline break-all" target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
              <button
                onClick={() => copyToClipboard(shortUrl)}
                className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Copy
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <QRCodeCanvas value={shortUrl} size={128} bgColor="#111" fgColor="#fff" />
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-10 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4"> History</h2>
          <div className="space-y-2">
            {history.map((item, i) => (
              <div key={i} className="glass p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2">
                <a
                  href={item.shortUrl}
                  className="text-blue-400 underline break-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.shortUrl}
                </a>
                <button
                  onClick={() => copyToClipboard(item.shortUrl)}
                  className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Glassmorphism Style */}
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}
