import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pdf, setPdf] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const uploadPDF = async () => {
    if (!pdf) {
      alert("Select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5009/api/upload", formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (q) => {
    const finalQuestion = q || question;
    if (!finalQuestion) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5009/api/query", {
        question: finalQuestion,
      });

      setAnswer(res.data.answer);
      speakAnswer(res.data.answer); // 🔊 auto speak the answer
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  // 🎤 Speech-to-Text (voice input)
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // change to "hi-IN" for Hindi
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      askQuestion(transcript); // auto-ask after voice input
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // 🔊 Text-to-Speech (voice output)
  const speakAnswer = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel(); // stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container">
      <h1>📄 PDF AI Assistant</h1>

      <div className="card">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />
        <button onClick={uploadPDF}>Upload PDF</button>
      </div>

      <div className="card">
        <textarea
          placeholder="Ask Question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={() => askQuestion()}>Ask AI</button>

          <button onClick={startListening} disabled={listening}>
            {listening ? "🎙️ Listening..." : "🎤 Speak"}
          </button>

          {answer && (
            <button onClick={() => speakAnswer(answer)}>🔊 Replay Answer</button>
          )}
        </div>
      </div>

      {loading && <h3>Loading...</h3>}

      {answer && (
        <div className="answer">
          <h2>Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;