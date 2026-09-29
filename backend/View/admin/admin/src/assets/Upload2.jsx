// import { useState } from "react";
// import axios from "axios";
// import {
//   Upload,
//   FileText,
//   BookOpen,
//   CheckCircle,
// } from "lucide-react";

// function Upload2() {
//   const [title, setTitle] = useState("");
//   const [pdf, setPdf] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const uploadPDF = async (e) => {
//     e.preventDefault();

//     if (!pdf) {
//       alert("Please Select PDF");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("title", title);
//     formData.append("pdf", pdf);

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5004/upload",
//         formData
//       );

//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(
//         err.response?.data?.error || "Upload Failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* Navbar */}

//       <div className="bg-indigo-700 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
//           <h1 className="text-3xl font-bold">
//             AI Notes Portal
//           </h1>

//           <button className="bg-white text-indigo-700 px-5 py-2 rounded-lg font-semibold">
//             Teacher
//           </button>
//         </div>
//       </div>

//       {/* Main */}

//       <div className="max-w-7xl mx-auto p-8">

//         {/* Welcome */}

//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-8 mb-8 shadow-lg">

//           <h2 className="text-4xl font-bold">
//             Welcome Teacher 👋
//           </h2>

//           <p className="mt-3 text-lg">
//             Upload Notes and Generate AI Summary
//             automatically using Groq AI.
//           </p>

//         </div>

//         {/* Cards */}

//         <div className="grid md:grid-cols-3 gap-6 mb-8">

//           <div className="bg-white rounded-xl shadow-md p-6">

//             <BookOpen className="text-indigo-600 mb-3" size={35}/>

//             <h3 className="text-gray-500">
//               Total Notes
//             </h3>

//             <h1 className="text-3xl font-bold">
//               15
//             </h1>

//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6">

//             <FileText className="text-green-600 mb-3" size={35}/>

//             <h3 className="text-gray-500">
//               PDFs Uploaded
//             </h3>

//             <h1 className="text-3xl font-bold">
//               10
//             </h1>

//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6">

//             <CheckCircle className="text-orange-500 mb-3" size={35}/>

//             <h3 className="text-gray-500">
//               AI Summaries
//             </h3>

//             <h1 className="text-3xl font-bold">
//               10
//             </h1>

//           </div>

//         </div>

//         {/* Upload Card */}

//         <div className="bg-white rounded-xl shadow-lg p-8">

//           <h2 className="text-2xl font-bold mb-6">
//             Upload Notes PDF
//           </h2>

//           <form
//             onSubmit={uploadPDF}
//             className="space-y-6"
//           >

//             <div>

//               <label className="font-semibold">
//                 Notes Title
//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter Notes Title"
//                 value={title}
//                 onChange={(e) =>
//                   setTitle(e.target.value)
//                 }
//                 className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//               />

//             </div>

//             <div>

//               <label className="font-semibold">
//                 Select PDF
//               </label>

//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) =>
//                   setPdf(e.target.files[0])
//                 }
//                 className="w-full mt-2 border rounded-lg p-3"
//               />

//             </div>

//             <button
//               className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-3 rounded-lg flex items-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <Upload size={20}/>
//                   Upload PDF
//                 </>
//               )}
//             </button>

//           </form>

//           {message && (

//             <div className="mt-6 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg">

//               {message}

//             </div>

//           )}

//         </div>

//       </div>
//     </div>
//   );
// }

// export default Upload2;


















import { useState } from "react";
import axios from "axios";
import {
  Upload,
  FileText,
  BookOpen,
  CheckCircle,
  LayoutDashboard,
  Library,
  Sparkles,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Upload Notes", icon: Upload, active: true },
  { label: "My Library", icon: Library, active: false },
  { label: "AI Summaries", icon: Sparkles, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const STATS = [
  { label: "Total Notes", value: 15, icon: BookOpen, accent: "text-amber-600", ring: "ring-amber-200", rotate: "-rotate-1" },
  { label: "PDFs Uploaded", value: 10, icon: FileText, accent: "text-emerald-600", ring: "ring-emerald-200", rotate: "rotate-1" },
  { label: "AI Summaries", value: 10, icon: CheckCircle, accent: "text-rose-600", ring: "ring-rose-200", rotate: "-rotate-1" },
];

function PunchHoles() {
  return (
    <div className="absolute left-3 top-8 bottom-8 flex flex-col justify-between">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="w-3 h-3 rounded-full bg-slate-950 ring-2 ring-slate-700" />
      ))}
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-950 opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-40 transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:top-16 md:h-[calc(100%-4rem)]`}
      >
        <div className="relative h-full pl-10 pr-4 py-8 border-r border-slate-800">
          <PunchHoles />

          {/* Margin rule, notebook-style */}
          <div className="absolute left-9 top-0 bottom-0 w-px bg-rose-600" />

          <div className="flex items-center justify-between mb-8 md:hidden">
            <span className="font-serif text-lg text-white">Menu</span>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4 pl-1">
            Teacher tools
          </p>

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
              <a
                key={label}
                href="#"
                className={`group flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-r-md border-l-2 transition
                  ${active
                    ? "bg-slate-800 border-amber-400 text-white"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/60"}`}
              >
                <Icon size={17} className={active ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"} />
                <span className="text-sm font-medium">{label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-amber-400" />}
              </a>
            ))}
          </nav>

          <div className="mt-10 pl-3 pr-3 py-4 rounded-md bg-slate-800/60 border border-dashed border-slate-700">
            <p className="text-xs text-slate-400 leading-relaxed">
              Notes are summarized automatically once uploaded — check{" "}
              <span className="text-amber-400 font-medium">AI Summaries</span> when it's ready.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Navbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-slate-300 hover:text-white md:hidden">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-amber-400 flex items-center justify-center">
            <BookOpen size={16} className="text-slate-900" />
          </div>
          <div className="leading-tight">
            <h1 className="font-serif text-lg text-white tracking-tight">AI Notes Portal</h1>
            <p className="hidden sm:block text-[11px] text-slate-500 font-mono -mt-0.5">for classroom teachers</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-slate-400 hover:text-white">
          <Bell size={19} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-semibold text-sm flex items-center justify-center">
            T
          </div>
          <span className="hidden sm:block text-sm text-slate-200 font-medium">Teacher</span>
        </div>
      </div>
    </header>
  );
}

function Upload2() {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-stone-100">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="max-w-5xl mx-auto p-6 md:p-10">

          {/* Welcome */}
          <div className="relative bg-slate-900 rounded-xl text-white p-8 mb-8 overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1.5 bg-amber-400" />
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
              Teacher dashboard
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">Welcome back 👋</h2>
            <p className="mt-3 text-slate-300 max-w-lg">
              Upload your notes and let AI generate a clear summary automatically, powered by Groq.
            </p>
          </div>

          {/* Stat cards, index-card style */}
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

          {/* Upload Card */}
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
        </div>
      </main>
    </div>
  );
}

export default Upload2;
