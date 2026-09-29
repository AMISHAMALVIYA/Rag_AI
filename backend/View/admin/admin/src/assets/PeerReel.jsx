import { useState, useRef } from "react";
import { Phone, PhoneOff, Sparkles, Play, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const COURSES = [
  { grad: "from-violet-500 to-pink-500", subj: "DSA", title: "Graphs Without the Panic", seller: "Meher", price: "₹99", badge: "BESTSELLER" },
  { grad: "from-amber-400 to-orange-600", subj: "JEE PHYSICS", title: "Rotation: The 12 Traps", seller: "Kunal", price: "₹49", badge: "LIVE", live: true },
  { grad: "from-emerald-400 to-teal-700", subj: "DESIGN", title: "Figma to Portfolio in 7 Days", seller: "Aarohi", price: "₹149", badge: "NEW" },
  { grad: "from-blue-400 to-indigo-800", subj: "RESUME", title: "ATS-Proof Resumes for Freshers", seller: "Ishaan", price: "₹0", badge: "FREE" },
  { grad: "from-rose-400 to-red-800", subj: "CHEMISTRY", title: "Organic Named Reactions, Fast", seller: "Priya", price: "₹79", badge: "BESTSELLER" },
  { grad: "from-purple-400 to-fuchsia-800", subj: "SYSTEM DESIGN", title: "Scaling a Chat App: 45 min", seller: "Rehan", price: "₹129", badge: "NEW" },
];

function CourseCard({ c }) {
  return (
    <div className="flex-none w-56 rounded-2xl overflow-hidden bg-[#151B33] border border-white/10 hover:-translate-y-1.5 hover:border-violet-400/40 transition-all duration-200 cursor-pointer">
      <div className={`h-32 relative bg-gradient-to-br ${c.grad}`}>
        <span className={`absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/50 ${c.live ? "text-red-400" : "text-white"}`}>
          {c.live ? "● LIVE" : c.badge}
        </span>
      </div>
      <div className="p-3.5">
        <div className="text-[11px] font-mono text-slate-400 mb-1">{c.subj}</div>
        <h4 className="text-sm font-semibold mb-2 leading-snug">{c.title}</h4>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>by {c.seller}</span>
          <span className="text-amber-400 font-semibold">{c.price}</span>
        </div>
      </div>
    </div>
  );
}

function Row({ title, courses }) {
  return (
    <section className="px-6 md:px-10 py-8 max-w-[1400px] mx-auto">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        <span className="text-xs text-slate-400">See all →</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none]">
        {courses.map((c, i) => <CourseCard key={i} c={c} />)}
      </div>
    </section>
  );
}

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
  return text || "No response.";
}

function AIPanel({ icon, iconBg, iconColor, title, desc, children }) {
  return (
    <div className="bg-[#10152A] border border-white/10 rounded-2xl p-7 flex flex-col">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg} ${iconColor}`}>{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>
      {children}
    </div>
  );
}

function SummaryPanel() {
  const [input, setInput] = useState(
    "This course covers rotational mechanics for JEE: moment of inertia derivations, the parallel and perpendicular axis theorems, rolling without slipping problems, and the 12 most common trap questions from the last 8 years of JEE Advanced, with worked solutions for each."
  );
  const [output, setOutput] = useState("Summary will appear here.");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) { setOutput("Paste some course text first."); return; }
    setLoading(true);
    setOutput("");
    try {
      const out = await callClaude(
        `You are writing a short, honest 3-4 sentence summary for a student marketplace listing, based on this course description/transcript. Cover: what topics it covers, difficulty level, and who it's best for. Be concrete, no marketing fluff.\n\nCourse text:\n${input}`
      );
      setOutput(out);
    } catch (e) {
      setOutput("Couldn't reach the AI right now. Try again in a moment.");
    }
    setLoading(false);
  };

  return (
    <AIPanel icon={<Sparkles size={18} />} iconBg="bg-violet-500/15" iconColor="text-violet-400"
      title="Course summary, before you pay"
      desc="Paste a course description or lecture transcript. The AI gives you a short, honest summary of what it actually covers — so you're not buying blind.">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full min-h-[90px] bg-[#151B33] border border-white/10 rounded-xl p-3 text-sm mb-3 focus:outline-none focus:border-violet-400"
      />
      <div className="flex justify-end mb-3">
        <button onClick={run} disabled={loading}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 text-white disabled:opacity-50">
          {loading ? "Summarizing..." : "Summarize ✦"}
        </button>
      </div>
      <div className="bg-[#151B33] border border-white/10 rounded-xl p-4 text-sm text-slate-300 min-h-[90px] whitespace-pre-wrap">
        {loading ? (
          <span className="flex items-center gap-2 text-violet-400">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-violet-400/30 border-t-violet-400 animate-spin" />
            Summarizing...
          </span>
        ) : output}
      </div>
      <div className="text-[11px] text-slate-500 mt-2">
        Demo only — pulls text you paste in, not a live YouTube fetch (browsers can't read YouTube captions directly).
      </div>
    </AIPanel>
  );
}

function YoutubePanel() {
  const [url, setUrl] = useState("https://youtube.com/watch?v=example");
  const [desc, setDesc] = useState("Binary Search Tree interview questions, 45 min walkthrough");
  const [output, setOutput] = useState("Breakdown will appear here.");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!desc.trim()) { setOutput("Add a short description of the video first."); return; }
    setLoading(true);
    setOutput("");
    try {
      const out = await callClaude(
        `A student is considering watching this YouTube video as study material:\nURL: ${url}\nDescription: ${desc}\n\nBased only on the description (you cannot watch the video), give a short structured breakdown with three labeled lines: "Likely topics:", "Difficulty:", "Best for:". Keep each line to one short sentence. Be upfront that this is inferred from the description, not the video itself.`
      );
      setOutput(out);
    } catch (e) {
      setOutput("Couldn't reach the AI right now. Try again in a moment.");
    }
    setLoading(false);
  };

  return (
    <AIPanel icon={<Play size={18} />} iconBg="bg-pink-500/15" iconColor="text-pink-400"
      title="YouTube URL → AI breakdown"
      desc="Drop in a YouTube link and a short title/description of it. The AI turns it into a structured breakdown: topics, difficulty, and who it's for.">
      <input value={url} onChange={(e) => setUrl(e.target.value)}
        className="w-full bg-[#151B33] border border-white/10 rounded-xl p-3 text-sm mb-2.5 focus:outline-none focus:border-pink-400" />
      <input value={desc} onChange={(e) => setDesc(e.target.value)}
        className="w-full bg-[#151B33] border border-white/10 rounded-xl p-3 text-sm mb-3 focus:outline-none focus:border-pink-400" />
      <div className="flex justify-end mb-3">
        <button onClick={run} disabled={loading}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 text-white disabled:opacity-50">
          {loading ? "Breaking down..." : "Break it down ✦"}
        </button>
      </div>
      <div className="bg-[#151B33] border border-white/10 rounded-xl p-4 text-sm text-slate-300 min-h-[90px] whitespace-pre-wrap">
        {loading ? (
          <span className="flex items-center gap-2 text-pink-400">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-pink-400/30 border-t-pink-400 animate-spin" />
            Breaking it down...
          </span>
        ) : output}
      </div>
      <div className="text-[11px] text-slate-500 mt-2">
        Demo only — describe the video and the AI structures it; it can't watch the video itself.
      </div>
    </AIPanel>
  );
}

function VoicePanel() {
  const [status, setStatus] = useState("idle"); // idle | calling | connected
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startCall = () => {
    setStatus("calling");
    setTimeout(() => {
      setStatus("connected");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }, 1400);
  };

  const endCall = () => {
    clearInterval(timerRef.current);
    setStatus("idle");
    setSeconds(0);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="px-6 md:px-10 max-w-[1400px] mx-auto py-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-5">Talk to the seller first</h2>
      <div className="bg-[#10152A] border border-white/10 rounded-2xl p-7">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-amber-400/15 text-amber-400">
          <PhoneCall size={18} />
        </div>
        <h3 className="text-lg font-semibold mb-2">Voice-to-voice, one tap</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-lg">
          Got a question before you buy? Call the seller directly, student to student. No numbers exchanged, no scheduling — just tap and talk.
        </p>

        <div className="bg-[#151B33] border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-800 flex items-center justify-center font-bold text-white">You</div>
                {status === "connected" && (
                  <span className="absolute -inset-1.5 rounded-full border-2 border-red-500 animate-ping" />
                )}
              </div>
              <span className="text-xs text-slate-400">You</span>
            </div>

            <div className="flex gap-1 items-end h-5" style={{ visibility: status === "connected" ? "visible" : "hidden" }}>
              {[8, 14, 10, 16, 8].map((h, i) => (
                <span key={i} className="w-1 bg-violet-400 rounded-sm animate-pulse" style={{ height: h }} />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-800 flex items-center justify-center font-bold text-white">K</div>
                {status !== "idle" && (
                  <span className="absolute -inset-1.5 rounded-full border-2 border-red-500 animate-ping" />
                )}
              </div>
              <span className="text-xs text-slate-400">Kunal · seller</span>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {status === "idle" && "Ready to call"}
            {status === "calling" && "Calling Kunal..."}
            {status === "connected" && `Connected · ${mm}:${ss}`}
          </div>

          <div className="flex gap-3">
            {status === "idle" ? (
              <button onClick={startCall} className="w-11 h-11 rounded-full flex items-center justify-center bg-[#10152A] border border-white/10 hover:brightness-125">
                <Phone size={18} />
              </button>
            ) : (
              <button onClick={endCall} className="w-11 h-11 rounded-full flex items-center justify-center bg-red-500 text-white hover:brightness-110">
                <PhoneOff size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="text-[11px] text-slate-500 mt-3 text-center">
          UI preview of the calling flow — wiring up real audio between two people needs a signaling server, which isn't part of this static prototype.
        </div>
      </div>
    </div>
  );
}

export default function PeerReel() {
  return (
    <div className="min-h-screen bg-[#0A0E1C] text-slate-100 font-sans relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(600px 400px at 15% 0%, rgba(124,92,255,0.16), transparent 60%), radial-gradient(500px 350px at 90% 15%, rgba(244,71,140,0.13), transparent 60%)" }} />

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[#0A0E1C]/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-2.5 font-bold text-lg">
          <div className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm text-white">P</div>
          PeerReel
        </div>
        {/* <div className="hidden md:flex gap-8 text-sm text-slate-400">
          <a href="#" className="hover:text-white">Browse</a>
          <a href="#" className="hover:text-white">URL ANALYNIS</a>
          <a href="#" className="hover:text-white">VOICE TO  Voice  SUMMARY</a>
          <a href="#" className="hover:text-white">Sell a course</a>
        </div> */}

        <div className="hidden md:flex gap-8 text-sm text-slate-400">
  <Link to="/browse" className="hover:text-white"  style={{fontSize:"25px"}}>
    Subcription
  </Link>

  <Link to="/url-analysis" className="hover:text-white "  style={{fontSize:"25px"}}>
    URL Analysis
  </Link>

  <Link to="/voicetovoice" className="hover:text-white" style={{fontSize:"25px"}}>
    Voice to Voice Summary
  </Link>

  <Link to="/sell-course" className="hover:text-white"  style={{fontSize:"25px"}}>
    Roadmap 
  </Link>
</div>
        <div className="flex gap-3 items-center">
          <button className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 hover:border-violet-400">Log in</button>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 text-white">Start selling</button>
        </div>
      </nav>

      <section className="relative z-10 grid md:grid-cols-2 gap-10 px-6 md:px-10 py-12 md:py-20 max-w-[1400px] mx-auto items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 border border-amber-400/30 bg-amber-400/5 rounded-full px-3 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,59,92,0.8)]" />
            LIVE MARKETPLACE · BY STUDENTS, FOR STUDENTS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-5">
            Learn what your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">seniors</span>{" "}
            actually know.
          </h1>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
            PeerReel is where students sell short courses on the subjects they've already cracked — JEE shortcuts, DSA interviews, design portfolios. Get an AI summary before you buy, or just call the seller and ask.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <button className="px-6 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 text-white">Browse courses</button>
            <button className="px-6 py-3.5 rounded-full text-sm font-semibold border border-white/10">Become a seller →</button>
          </div>
          <div className="flex gap-9 mt-11">
            <div><div className="text-2xl font-bold">12,400+</div><div className="text-xs text-slate-400 mt-0.5">student sellers</div></div>
            <div><div className="text-2xl font-bold">₹49</div><div className="text-xs text-slate-400 mt-0.5">avg. course price</div></div>
            <div><div className="text-2xl font-bold">2.1M</div><div className="text-xs text-slate-400 mt-0.5">minutes watched</div></div>
          </div>
        </div>
        <div className="hidden md:block relative h-[380px]">
          <div className="absolute w-64 rounded-2xl overflow-hidden bg-[#151B33] border border-white/10 shadow-2xl top-28 right-0 rotate-[9deg] opacity-60">
            <div className="h-32 bg-gradient-to-br from-violet-500 to-pink-500" />
          </div>
          <div className="absolute w-64 rounded-2xl overflow-hidden bg-[#151B33] border border-white/10 shadow-2xl top-14 right-28 -rotate-6 opacity-85">
            <div className="h-32 bg-gradient-to-br from-amber-400 to-orange-600" />
            <div className="p-3.5"><div className="text-[11px] text-amber-400 font-mono">JEE PHYSICS</div><h4 className="text-sm mt-1">Rotation: The 12 Traps</h4><div className="text-xs text-slate-400 mt-1">by Kunal · IIT'25</div></div>
          </div>
          <div className="absolute w-64 rounded-2xl overflow-hidden bg-[#151B33] border border-white/10 shadow-2xl top-0 right-10 rotate-2">
            <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-700 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur">
                <Play size={16} fill="white" />
              </div>
            </div>
            <div className="p-3.5"><div className="text-[11px] text-amber-400 font-mono">DESIGN</div><h4 className="text-sm mt-1">Figma to Portfolio in 7 Days</h4><div className="text-xs text-slate-400 mt-1">by Aarohi · 3rd yr</div></div>
          </div>
        </div>
      </section>

      <Row title="Trending this week" courses={COURSES} />
      <Row title='Because you watched "Graphs Without the Panic"' courses={[...COURSES].reverse()} />

   

      
      

      <footer className="py-8 text-center text-slate-500 text-xs border-t border-white/10">
        PeerReel — a marketplace prototype. Not a real product yet.
      </footer>
    </div>
  );
}
