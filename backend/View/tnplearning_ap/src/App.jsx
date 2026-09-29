import { useState } from "react";
import axios from "axios";

function App() {
  const [pdf, setPdf] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Teacher Upload
  const uploadPDF = async () => {
    if (!pdf) {
      return alert("Select PDF");
    }

    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
     const res = await axios.post("http://localhost:5004/teacher/upload", formData);

      alert(res.data.message);

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  // Student Question
  const askQuestion = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5004/student/summary",
        {
          question
        }
      );

      setAnswer(res.data.answer);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>TNP Learning AI</h1>

      {/* Teacher Upload */}

      <h2>Teacher Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setPdf(e.target.files[0])
        }
      />

      <br /><br />

      <button onClick={uploadPDF}>
        Upload PDF
      </button>

      <hr />

      {/* Student Question */}

      <h2>Ask Question</h2>

      <textarea
        rows="4"
        cols="50"
        placeholder="Ask from uploaded PDF..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <br /><br />

      <button onClick={askQuestion}>
        Get Answer
      </button>

      <hr />

      {loading && <p>Generating...</p>}

      {answer && (
        <>
          <h3>AI Answer</h3>
          <p>{answer}</p>
        </>
      )}
    </div>
  );
}

export default App;