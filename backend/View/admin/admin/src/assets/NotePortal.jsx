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
  Clock,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const STATS = [
  { label: "Total Notes", value: 15, icon: BookOpen, accent: "text-amber-600", ring: "ring-amber-200", rotate: "-rotate-1" },
  { label: "PDFs Uploaded", value: 10, icon: FileText, accent: "text-emerald-600", ring: "ring-emerald-200", rotate: "rotate-1" },
  { label: "AI Summaries", value: 10, icon: CheckCircle, accent: "text-rose-600", ring: "ring-rose-200", rotate: "-rotate-1" },
];

const RECENT_NOTES = [
  { title: "Photosynthesis Basics", subject: "Biology", date: "Jul 18", status: "Summarized" },
  { title: "Newton's Laws of Motion", subject: "Physics", date: "Jul 17", status: "Summarized" },
  { title: "French Revolution Overview", subject: "History", date: "Jul 15", status: "Processing" },
  { title: "Algebraic Expressions", subject: "Math", date: "Jul 14", status: "Summarized" },
  { title: "Cell Structure Notes", subject: "Biology", date: "Jul 12", status: "Summarized" },
];

const WEEKLY_DATA = [
  { day: "Mon", uploads: 2 },
  { day: "Tue", uploads: 1 },
  { day: "Wed", uploads: 3 },
  { day: "Thu", uploads: 0 },
  { day: "Fri", uploads: 2 },
  { day: "Sat", uploads: 1 },
  { day: "Sun", uploads: 1 },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { label: "Upload Notes", icon: Upload, view: "upload" },
  { label: "My Library", icon: Library, view: null },
  { label: "AI Summaries", icon: Sparkles, view: null },
  { label: "Settings", icon: Settings, view: null },
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

function Sidebar({ open, onClose, activeView, onNavigate }) {
  return (
    <>
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
            {NAV_ITEMS.map(({ label, icon: Icon, view }) => {
              const active = view === activeView;
              return (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (view) onNavigate(view);
                    onClose();
                  }}
                  className={`group flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-r-md border-l-2 transition
                    ${active
                      ? "bg-slate-800 border-amber-400 text-white"
                      : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/60"}`}
                >
                  <Icon size={17} className={active ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"} />
                  <span className="text-sm font-medium">{label}</span>
                  {active && <ChevronRight size={14} className="ml-auto text-amber-400" />}
                </a>
              );
            })}
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

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs rounded-md px-3 py-2 font-mono">
        {label}: {payload[0].value} uploads
      </div>
    );
  }
  return null;
}

function DashboardView({ onGoUpload }) {
  return (
    <>
      <div className="relative bg-slate-900 rounded-xl text-white p-8 mb-8 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1.5 bg-amber-400" />
        <p className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
          Teacher dashboard
        </p>
        <h2 className="font-serif text-3xl md:text-4xl">Welcome back 👋</h2>
        <p className="mt-3 text-slate-300 max-w-lg">
          Here's how your notes library is doing this week.
        </p>
        <button
          onClick={onGoUpload}
          className="mt-5 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-5 py-2.5 rounded-lg transition"
        >
          <Upload size={17} />
          Upload new notes
        </button>
      </div>

      <StatCards />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Weekly uploads chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-amber-400 rounded-full" />
            <h3 className="font-serif text-lg text-slate-900">Uploads this week</h3>
          </div>
          <p className="text-xs text-stone-400 font-mono mb-4 pl-3">7-day activity</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA} barSize={22}>
                <CartesianGrid vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#78716c" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#78716c" }} axisLine={false} tickLine={false} width={20} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fef3c7" }} />
                <Bar dataKey="uploads" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent notes, ruled-paper list */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-rose-600 rounded-full" />
              <h3 className="font-serif text-lg text-slate-900">Recent notes</h3>
            </div>
            <a href="#" className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
              View library <ArrowUpRight size={13} />
            </a>
          </div>
          <p className="text-xs text-stone-400 font-mono mb-2 pl-3">latest 5 entries</p>

          <div className="divide-y divide-dashed divide-stone-200">
            {RECENT_NOTES.map((note) => (
              <div key={note.title} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={16} className="text-stone-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{note.title}</p>
                    <p className="text-xs text-stone-400">{note.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden sm:flex items-center gap-1 text-xs text-stone-400 font-mono">
                    <Clock size={12} /> {note.date}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      note.status === "Summarized"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {note.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function UploadView() {
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

function NotePortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          {activeView === "dashboard" ? (
            <DashboardView onGoUpload={() => setActiveView("upload")} />
          ) : (
            <UploadView />
          )}
        </div>
      </main>
    </div>
  );
}

export default NotePortal;
