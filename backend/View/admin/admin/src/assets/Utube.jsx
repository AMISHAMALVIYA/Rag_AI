import { useState } from "react";
import axios from "axios";

export default function Utube() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loadingVideo, setLoadingVideo] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const processVideo = async () => {
    if (!url.trim()) {
      alert("Please enter a YouTube URL");
      return;
    }

    try {
      setLoadingVideo(true);

      const { data } = await axios.post(
        "http://localhost:3008/api/videos",
        {
          url,
        }
      );

      setVideoId(data.videoId);

      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoadingVideo(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Enter your question");
      return;
    }

    try {
      setLoadingAnswer(true);

      const { data } = await axios.post(
        "http://localhost:3008/api/ask",
        {
          question,
          videoId,
        }
      );

      setAnswer(data.answer);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoadingAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-white">
          🎥 YouTube AI Assistant
        </h1>

        <p className="text-center text-slate-400 mt-2">
          Process a YouTube video and ask questions about its transcript.
        </p>

        {/* Video URL */}

        <div className="mt-10">
          <label className="text-white font-semibold">
            YouTube URL
          </label>

          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={processVideo}
            disabled={loadingVideo}
            className="mt-5 w-full bg-red-300 hover:bg-red-700 rounded-lg py-3 font-semibold transition"
          >
            {loadingVideo ? "Processing..." : "Process Video"}
          </button>
        </div>

        {/* Question */}

        <div className="mt-10">
          <label className="text-white font-semibold">
            Ask Question
          </label>

          <textarea
            rows={5}
            placeholder="Ask anything about this video..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={askQuestion}
            disabled={loadingAnswer}
            className="mt-5 w-full bg-green-400 hover:bg-blue-700 rounded-lg py-3 font-semibold transition"
          >
            {loadingAnswer ? "Generating Answer..." : "Ask AI"}
          </button>
        </div>

        {/* Answer */}

        {answer && (
          <div className="mt-10 rounded-xl bg-slate-800 border border-slate-700 p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">
              AI Answer
            </h2>

            <p className="text-slate-300 whitespace-pre-wrap leading-7">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}