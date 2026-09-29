// import { useState } from "react";
// import axios from "axios";

// function AiSummary() {
//   const [pdf, setPdf] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Teacher Upload
//   const uploadPDF = async () => {
//     if (!pdf) {
//       return alert("Select PDF");
//     }

//     const formData = new FormData();
//     formData.append("pdf", pdf);

//     try {
//      const res = await axios.post("http://localhost:5004/teacher/upload", formData);

//       alert(res.data.message);

//     } catch (err) {
//       console.log(err);
//       alert("Upload Failed");
//     }
//   };

//   // Student Question
//   const askQuestion = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5004/student/summary",
//         {
//           question
//         }
//       );

//       setAnswer(res.data.answer);

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h1>TNP Learning AI</h1>

//       {/* Teacher Upload */}

//       <h2>Teacher Upload PDF</h2>

//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) =>
//           setPdf(e.target.files[0])
//         }
//       />

//       <br /><br />

//       <button onClick={uploadPDF}>
//         Upload PDF
//       </button>

//       <hr />

//       {/* Student Question */}

//       <h2>Ask Question</h2>

//       <textarea
//         rows="4"
//         cols="50"
//         placeholder="Ask from uploaded PDF..."
//         value={question}
//         onChange={(e) =>
//           setQuestion(e.target.value)
//         }
//       />

//       <br /><br />

//       <button onClick={askQuestion}>
//         Get Answer
//       </button>

//       <hr />

//       {loading && <p>Generating...</p>}

//       {answer && (
//         <>
//           <h3>AI Answer</h3>
//           <p>{answer}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default AiSummary;



import { useState } from "react";
import axios from "axios";
import {
  Upload,
  FileText,
  Sparkles,
  SendHorizonal,
} from "lucide-react";

function AiSummary() {
  const [pdf, setPdf] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadPDF = async () => {
    if (!pdf) {
      return alert("Please Select PDF");
    }

    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
      const res = await axios.post(
        "http://localhost:5004/teacher/upload",
        formData
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  const askQuestion = async () => {
    if (!question) {
      return alert("Enter your question");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5004/student/summary",
        {
          question,
        }
      );

      setAnswer(res.data.answer);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        AI Notes Summary
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Upload Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-6">

            <Upload className="text-indigo-600" size={30} />

            <h2 className="text-2xl font-bold">
              Teacher Upload PDF
            </h2>

          </div>

          <label className="border-2 border-dashed border-indigo-400 rounded-xl h-56 flex flex-col justify-center items-center cursor-pointer hover:bg-indigo-50">

            <FileText size={60} className="text-indigo-600" />

            <p className="mt-4 text-gray-600">
              Click to Select PDF
            </p>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setPdf(e.target.files[0])}
            />

          </label>

          {pdf && (
            <p className="mt-4 text-green-600 font-semibold">
              Selected : {pdf.name}
            </p>
          )}

          <button
            onClick={uploadPDF}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
          >
            Upload PDF
          </button>

        </div>

        {/* AI Question Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles className="text-yellow-500" size={30} />

            <h2 className="text-2xl font-bold">
              Ask AI
            </h2>

          </div>

          <textarea
            rows="8"
            placeholder="Ask anything from uploaded notes..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded-xl p-4 outline-none focus:border-indigo-600"
          />

          <button
            onClick={askQuestion}
            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
          >
            <SendHorizonal size={20} />
            Ask AI
          </button>

        </div>

      </div>

      {/* AI Answer */}

      {loading && (

        <div className="mt-8 bg-white rounded-xl shadow p-6">

          <div className="animate-pulse">

            <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>

            <div className="h-4 bg-gray-200 rounded mb-2"></div>

            <div className="h-4 bg-gray-200 rounded mb-2"></div>

            <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          </div>

        </div>

      )}

      {answer && (

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-5">
            AI Generated Answer
          </h2>

          <div className="bg-slate-50 border rounded-xl p-5 leading-8 text-gray-700 whitespace-pre-wrap">
            {answer}
          </div>

        </div>

      )}

    </div>
  );
}

export default AiSummary;