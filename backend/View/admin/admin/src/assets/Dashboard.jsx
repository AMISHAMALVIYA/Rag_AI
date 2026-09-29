import { useState } from "react";
import {
  Search, Bell, LayoutGrid, BookOpen, ClipboardList, LineChart,
  CalendarDays, MessageSquare, Flame, Clock, ChevronRight, Play,
} from "lucide-react";

const COURSES = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    dept: "CS 201",
    instructor: "Prof. R. Aldana",
    color: "#E8A33D",
    progress: 72,
    height: 210,
    nextDeadline: "Problem Set 6 — due Thu",
    lastActivity: "Watched: Balanced Trees (34 min)",
  },
  {
    id: "ling",
    title: "Intro to Linguistics",
    dept: "LING 110",
    instructor: "Dr. F. Okonkwo",
    color: "#5FD8C4",
    progress: 45,
    height: 185,
    nextDeadline: "Reading response — due Mon",
    lastActivity: "Read: Phonology Ch. 4",
  },
  {
    id: "chem",
    title: "Organic Chemistry II",
    dept: "CHEM 232",
    instructor: "Prof. L. Marchetti",
    color: "#D9667A",
    progress: 58,
    height: 230,
    nextDeadline: "Lab report — due Wed",
    lastActivity: "Submitted: Lab 5 prelab quiz",
  },
  {
    id: "art",
    title: "Modern Art History",
    dept: "ARTH 150",
    instructor: "Dr. S. Byrne",
    color: "#8B7FD6",
    progress: 88,
    height: 165,
    nextDeadline: "Essay draft — due Fri",
    lastActivity: "Viewed: Bauhaus slideshow",
  },
  {
    id: "econ",
    title: "Microeconomics",
    dept: "ECON 101",
    instructor: "Prof. T. Vance",
    color: "#6FA8DC",
    progress: 31,
    height: 195,
    nextDeadline: "Quiz 3 — due Tue",
    lastActivity: "Watched: Elasticity (21 min)",
  },
];

const AGENDA = [
  { day: "Mon", items: [{ time: "9:00", label: "Linguistics — reading response due" }] },
  { day: "Tue", items: [{ time: "14:00", label: "Microeconomics — Quiz 3" }] },
  { day: "Wed", items: [{ time: "11:30", label: "Organic Chem — lab report due" }, { time: "16:00", label: "Office hours: Prof. Aldana" }] },
  { day: "Thu", items: [{ time: "23:59", label: "DSA — Problem Set 6 due" }] },
  { day: "Fri", items: [{ time: "10:00", label: "Art History — essay draft due" }] },
];

const NAV = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Courses" },
  { icon: ClipboardList, label: "Assignments" },
  { icon: LineChart, label: "Grades" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: MessageSquare, label: "Messages" },
];

function RingStat({ value, max, label, color }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(244,241,232,0.12)" strokeWidth="7" />
        <circle
          cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={c} strokeDashoffset={c - c * pct} strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="41" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
          fontSize="16" fill="#F4F1E8">{value}</text>
      </svg>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#A6ACD1", lineHeight: 1.3 }}>
        {label}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selected, setSelected] = useState(COURSES[0].id);
  const active = COURSES.find((c) => c.id === selected);

  return (
    <div style={{
      minHeight: "100vh", background: "#171B34", color: "#F4F1E8",
      fontFamily: "'Space Grotesk', sans-serif", display: "flex",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .navbtn { transition: color .15s ease, background .15s ease; }
        .navbtn:hover { background: rgba(244,241,232,0.06); }
        .navbtn:focus-visible, .spine:focus-visible, .cta:focus-visible {
          outline: 2px solid #E8A33D; outline-offset: 2px;
        }
        .spine {
          transition: transform .18s ease, box-shadow .18s ease;
          cursor: pointer;
        }
        .spine:hover { transform: translateY(-10px); }
        .cta { transition: background .15s ease, transform .15s ease; }
        .cta:hover { transform: translateY(-1px); }
        @media (prefers-reduced-motion: reduce) {
          .spine, .cta, .navbtn { transition: none !important; }
          .spine:hover { transform: none; }
        }
        @media (max-width: 860px) {
          .sidebar { display: none !important; }
          .shelf { overflow-x: auto !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="sidebar" style={{
        width: 232, borderRight: "1px solid rgba(244,241,232,0.1)",
        padding: "28px 18px", display: "flex", flexDirection: "column", gap: 28,
      }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, letterSpacing: 0.2 }}>
          Marrow<span style={{ color: "#E8A33D" }}>.</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(({ icon: Icon, label, active }) => (
            <button key={label} className="navbtn" style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
              borderRadius: 8, border: "none", background: active ? "rgba(232,163,61,0.14)" : "transparent",
              color: active ? "#E8A33D" : "#C7CBE8", fontSize: 14, fontWeight: 500,
              cursor: "pointer", textAlign: "left", fontFamily: "inherit",
            }}>
              <Icon size={17} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: 14, borderRadius: 10, background: "#20254A" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", background: "#5FD8C4",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Fraunces', serif", fontWeight: 600, color: "#171B34",
            }}>M</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Maya Chen</div>
              <div style={{ fontSize: 11, color: "#A6ACD1" }}>Sophomore · Bio track</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#A6ACD1" }}>Term ends in 41 days</div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "28px 36px", maxWidth: 1180 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600 }}>
              Good evening, Maya
            </div>
            <div style={{ fontSize: 13, color: "#A6ACD1", marginTop: 2 }}>Tuesday, July 21 — 3 things need you today</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, background: "#20254A",
              borderRadius: 8, padding: "8px 12px", width: 220,
            }}>
              <Search size={15} color="#A6ACD1" />
              <span style={{ fontSize: 13, color: "#A6ACD1" }}>Search courses, files…</span>
            </div>
            <button className="navbtn" style={{
              background: "#20254A", border: "none", borderRadius: 8, padding: 9, cursor: "pointer",
            }}>
              <Bell size={17} color="#C7CBE8" />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 28, marginBottom: 34, flexWrap: "wrap" }}>
          <RingStat value={6} max={7} label={"Day streak"} color="#E8A33D" />
          <RingStat value={11} max={20} label={"Study hours this week"} color="#5FD8C4" />
          <RingStat value={3} max={5} label={"Assignments due this week"} color="#D9667A" />
        </div>

        {/* Bookshelf — signature element */}
        <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600 }}>Your shelf</div>
          <div style={{ fontSize: 12, color: "#A6ACD1" }}>{COURSES.length} courses in progress</div>
        </div>

        <div className="shelf" style={{
          display: "flex", alignItems: "flex-end", gap: 14, padding: "0 4px 18px 4px",
          borderBottom: "3px solid #2A3060", marginBottom: 26,
        }}>
          {COURSES.map((c) => (
            <div
              key={c.id}
              className="spine"
              tabIndex={0}
              role="button"
              aria-pressed={selected === c.id}
              onClick={() => setSelected(c.id)}
              onKeyDown={(e) => e.key === "Enter" && setSelected(c.id)}
              style={{
                position: "relative", width: 58, height: c.height,
                background: c.color, borderRadius: "4px 4px 2px 2px",
                boxShadow: selected === c.id ? `0 10px 22px -8px ${c.color}99` : "0 4px 10px -6px rgba(0,0,0,0.4)",
                outline: selected === c.id ? "2px solid #F4F1E8" : "none",
                outlineOffset: 2,
              }}
            >
              {/* bookmark ribbon = progress */}
              <div style={{
                position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
                width: 16, height: 8 + (c.progress / 100) * 8, background: "#171B34",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
              }} />
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "flex-end",
                justifyContent: "center", padding: "0 0 10px 0",
                writingMode: "vertical-rl", textOrientation: "mixed",
                fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 12.5,
                color: "#171B34", letterSpacing: 0.2, transform: "rotate(180deg)",
              }}>
                {c.title}
              </div>
            </div>
          ))}
        </div>

        {/* Detail + agenda row */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {/* Selected course detail */}
          <div style={{
            flex: "1 1 380px", background: "#20254A", borderRadius: 12, padding: 22,
            borderLeft: `4px solid ${active.color}`,
          }}>
            <div style={{ fontSize: 11, color: "#A6ACD1", letterSpacing: 0.5, textTransform: "uppercase" }}>
              {active.dept} · {active.instructor}
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, margin: "4px 0 16px" }}>
              {active.title}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#A6ACD1", marginBottom: 6 }}>
                <span>Progress</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{active.progress}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(244,241,232,0.1)" }}>
                <div style={{ height: "100%", width: `${active.progress}%`, borderRadius: 3, background: active.color }} />
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#C7CBE8", marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
              <Clock size={14} color="#A6ACD1" /> {active.nextDeadline}
            </div>
            <div style={{ fontSize: 13, color: "#A6ACD1", marginBottom: 20 }}>
              Last: {active.lastActivity}
            </div>

            <button className="cta" style={{
              display: "flex", alignItems: "center", gap: 8, background: active.color,
              color: "#171B34", border: "none", borderRadius: 8, padding: "10px 16px",
              fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>
              <Play size={14} fill="#171B34" /> Continue course
            </button>
          </div>

          {/* Agenda */}
          <div style={{ flex: "1 1 320px", background: "#20254A", borderRadius: 12, padding: 22 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, marginBottom: 14 }}>
              This week
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {AGENDA.map((d) => (
                <div key={d.day} style={{ display: "flex", gap: 14 }}>
                  <div style={{
                    width: 34, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: "#A6ACD1", paddingTop: 2,
                  }}>{d.day}</div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    {d.items.map((it, i) => (
                      <div key={i} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        fontSize: 13, borderBottom: "1px solid rgba(244,241,232,0.07)", paddingBottom: 8,
                      }}>
                        <span style={{ color: "#F4F1E8" }}>{it.label}</span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#A6ACD1",
                          display: "flex", alignItems: "center", gap: 4,
                        }}>
                          {it.time} <ChevronRight size={12} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
