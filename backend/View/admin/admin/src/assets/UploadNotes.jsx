import { useState } from "react";
import axios from "axios";
import { Upload, FileText, BookOpen, CheckCircle } from "lucide-react";

const STATS = [
  { label: "Total Notes", value: 15, icon: BookOpen, accent: "text-amber-600", ring: "ring-amber-200", rotate: "-rotate-1" },
  { label: "PDFs Uploaded", value: 10, icon: FileText, accent: "text-emerald-600", ring: "ring-emerald-200", rotate: "rotate-1" },
  { label: "AI Summaries", value: 10, icon: CheckCircle, accent: "text-rose-600", ring: "ring-rose-200", rotate: "-rotate-1" },
];

function StatCards() {
  return (
    <div className="grid sm:grid-cols-3 gap-6 mb-10">
      {STATS.map(({ label, value, icon: Icon, accent, ring, rotate }) => (
        <div
          key={label}
          className={`bg-white rounded-lg border border-dashed border-stone-300 p-6 ring-1 ${ring} ${rotate} hover:rotate-0 transition-transform shadow-sm`}
        >
          <Icon className={`${accent} mb-3`} size={30} />
          <h3 className="text-stone-500 text-sm font-medium">{label}</h3>
          <p className="text-3xl font-serif font-bold text-slate-900 mt-1">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function UploadNotes() {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadPDF = async (e) => {
    e.preventDefault();

    if (!pdf) {
      alert("Please Select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5004/upload", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-slate-900 rounded-xl text-white p-8 mb-8 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1.5 bg-amber-400" />
        <p className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
          Teacher dashboard
        </p>
        <h2 className="font-serif text-3xl md:text-4xl">Upload Notes</h2>
        <p className="mt-3 text-slate-300 max-w-lg">
          Upload your notes and let AI generate a clear summary automatically, powered by Groq.
        </p>
      </div>

      <StatCards />

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-rose-600 rounded-full" />
          <h2 className="font-serif text-2xl text-slate-900">Upload Notes PDF</h2>
        </div>

        <form onSubmit={uploadPDF} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-700">Notes Title</label>
            <input
              type="text"
              placeholder="Enter Notes Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 border border-stone-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Select PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full mt-2 border border-stone-300 rounded-lg p-3 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-slate-900 file:text-white file:text-sm hover:file:bg-slate-800"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 transition text-slate-900 font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload PDF
              </>
            )}
          </button>
        </form>

        {message && (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} />
            {message}
          </div>
        )}
      </div>
    </>
  );
}
