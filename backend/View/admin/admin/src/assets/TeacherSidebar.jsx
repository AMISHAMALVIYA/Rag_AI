// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   GraduationCap,
//   Upload,
//   Library,
//   Sparkles,
//   Settings,
//   ChevronRight,
//   X,
// } from "lucide-react";

// const NAV_ITEMS = [
//   { label: "Dashboard", icon: LayoutDashboard, to: "/", end: true },

//   { label: "Upload Notes", icon: Upload, to: "/upload" },
//     { label: "Courses", icon: GraduationCap, to: "/courses" },
//   { label: "My Library", icon: Library, to: "/library" },
//   { label: "AI Summaries", icon: Sparkles, to: "/summaries" },
//   { label: "Settings", icon: Settings, to: "/settings" },
// ];

// function PunchHoles() {
//   return (
//     <div className="absolute left-3 top-8 bottom-8 flex flex-col justify-between">
//       {Array.from({ length: 8 }).map((_, i) => (
//         <span key={i} className="w-3 h-3 rounded-full bg-slate-950 ring-2 ring-slate-700" />
//       ))}
//     </div>
//   );
// }

// export default function Sidebar({ open, onClose }) {
//   return (
//     <>
//       {open && (
//         <div
//           className="fixed inset-0 bg-slate-950 opacity-50 z-30 md:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-40 transform transition-transform duration-200
//         ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:top-16 md:h-[calc(100%-4rem)]`}
//       >
//         <div className="relative h-full pl-10 pr-4 py-8 border-r border-slate-800">
//           <PunchHoles />
//           <div className="absolute left-9 top-0 bottom-0 w-px bg-rose-600" />

//           <div className="flex items-center justify-between mb-8 md:hidden">
//             <span className="font-serif text-lg text-white">Menu</span>
//             <button onClick={onClose} className="text-slate-500 hover:text-white">
//               <X size={20} />
//             </button>
//           </div>

//           <p className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4 pl-1">
//             Teacher tools
//           </p>

//           <nav className="space-y-1">
//             {NAV_ITEMS.map(({ label, icon: Icon, to, end }) => (
//               <NavLink
//                 key={label}
//                 to={to}
//                 end={end}
//                 onClick={onClose}
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-r-md border-l-2 transition text-3xl
//                   ${isActive
//                     ? "bg-slate-800 border-amber-400 text-white"
//                     : "border-transparent text-slate-500 hover:text-white hover:bg-slate-800/60"}`
//                 }  style={{fontSize:"35px"}}
//               >
//                 {({ isActive }) => (
//                   <>
//                     <Icon size={17} className={isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"} />
//                     <span className="text-sm font-medium">{label}</span>
//                     {isActive && <ChevronRight size={14} className="ml-auto text-amber-400" />}
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="mt-10 pl-3 pr-3 py-4 rounded-md bg-slate-800/60 border border-dashed border-slate-700">
//             <p className="text-xs text-slate-400 leading-relaxed">
//               Notes are summarized automatically once uploaded — check{" "}
//               <span className="text-amber-400 font-medium">AI Summaries</span> when it's ready.
//             </p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }












import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Upload,
  Library,
  Sparkles,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/teacher", end: true },

  { label: "Upload Notes", icon: Upload, to: "/teacher/upload" },

  { label: "Add Course", icon: GraduationCap, to: "/teacher/add" },

  { label: "Browse", icon: Library, to: "/browse" },

  { label: "URL Analysis", icon: Sparkles, to: "/url-analysis" },

  { label: "Voice to Voice", icon: Settings, to: "/voicetovoice" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-40 transform transition-transform duration-300
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:top-16 md:h-[calc(100%-4rem)]`}
      >
        <div className="h-full px-6 py-8 flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h2 className="text-2xl font-bold text-white">Menu</h2>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X size={28} />
            </button>
          </div>

          {/* Title */}
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 font-semibold mb-6">
            Teacher Tools
          </p>

          {/* Navigation */}
          <nav className="space-y-3">
            {NAV_ITEMS.map(({ label, icon: Icon, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-slate-800 text-white shadow-md"
                      : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={28}
                      className={
                        isActive
                          ? "text-amber-400"
                          : "text-slate-400 group-hover:text-white"
                      }
                    />

                    <span className="text-xl font-semibold flex-1">
                      {label}
                    </span>

                    {isActive && (
                      <ChevronRight
                        size={22}
                        className="text-amber-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Card */}
          <div className="mt-auto bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              AI Assistant
            </h3>

            <p className="text-sm text-slate-400 leading-6">
              Notes are summarized automatically after upload.
              <br />
              Visit{" "}
              <span className="text-amber-400 font-semibold">
                AI Summaries
              </span>{" "}
              to view them.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}