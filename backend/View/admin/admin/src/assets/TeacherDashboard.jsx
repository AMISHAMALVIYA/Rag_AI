// // 

// import { Link } from "react-router-dom";
// import {
//   Upload,
//   FileText,
//   BookOpen,
//   CheckCircle,
//   Clock,
//   ArrowUpRight,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//  XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const STATS = [
//   {
//     label: "Total Notes",
//     value: 15,
//     icon: BookOpen,
//     accent: "text-amber-600",
//     ring: "ring-amber-200",
//     rotate: "-rotate-1",
//   },
//   {
//     label: "PDFs Uploaded",
//     value: 10,
//     icon: FileText,
//     accent: "text-emerald-600",
//     ring: "ring-emerald-200",
//     rotate: "rotate-1",
//   },
//   {
//     label: "AI Summaries",
//     value: 10,
//     icon: CheckCircle,
//     accent: "text-rose-600",
//     ring: "ring-rose-200",
//     rotate: "-rotate-1",
//   },
// ];

// const RECENT_NOTES = [
//   {
//     title: "Photosynthesis Basics",
//     subject: "Biology",
//     date: "Jul 18",
//     status: "Summarized",
//   },
//   {
//     title: "Newton's Laws of Motion",
//     subject: "Physics",
//     date: "Jul 17",
//     status: "Summarized",
//   },
//   {
//     title: "French Revolution Overview",
//     subject: "History",
//     date: "Jul 15",
//     status: "Processing",
//   },
//   {
//     title: "Algebraic Expressions",
//     subject: "Math",
//     date: "Jul 14",
//     status: "Summarized",
//   },
//   {
//     title: "Cell Structure Notes",
//     subject: "Biology",
//     date: "Jul 12",
//     status: "Summarized",
//   },
// ];

// const WEEKLY_DATA = [
//   { day: "Mon", uploads: 2 },
//   { day: "Tue", uploads: 1 },
//   { day: "Wed", uploads: 3 },
//   { day: "Thu", uploads: 0 },
//   { day: "Fri", uploads: 2 },
//   { day: "Sat", uploads: 1 },
//   { day: "Sun", uploads: 1 },
// ];

// function StatCards() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
//       {STATS.map(({ label, value, icon: Icon, accent, ring, rotate }) => (
//         <div
//           key={label}
//           className={`bg-white rounded-xl border border-dashed border-stone-300 p-8 ring-1 ${ring} ${rotate} hover:rotate-0 transition-all shadow-md hover:shadow-lg`}
//         >
//           <Icon className={`${accent} mb-4`} size={36} />

//           <h3 className="text-stone-500 text-base font-medium">{label}</h3>

//           <p className="text-4xl font-bold text-slate-900 mt-2">
//             {value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// function CustomTooltip({ active, payload, label }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">
//         {label}: <strong>{payload[0].value}</strong> uploads
//       </div>
//     );
//   }
//   return null;
// }

// export default function Dashboard() {
//   return (
//     <div className="w-full min-h-screen px-10 py-8">


//       {/* Hero Section */}

//       <div className="relative bg-slate-900 rounded-2xl text-white p-12 mb-10 overflow-hidden shadow-lg">
//         <div className="absolute right-0 top-0 h-full w-2 bg-amber-400" />

//         <p className="uppercase tracking-[4px] text-sm text-amber-400 mb-3">
//           Teacher Dashboard
//         </p>

//         <h2 className="text-5xl font-bold">
//           Welcome Back 👋
//         </h2>

//         <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
//           Here's how your notes library is performing this week. Upload new
//           notes, track AI summaries, and manage your teaching resources.
//         </p>

//         <Link
//           to="/upload"
//           className="inline-flex items-center gap-2 mt-8 bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
//         >
//           <Upload size={18} />
//           Upload New Notes
//         </Link>
//       </div>

//       {/* Stats */}

//       <StatCards />

//       {/* Bottom Layout */}

//       <div className="grid lg:grid-cols-5 gap-8">

//         {/* Chart */}

//         <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-md p-8">

//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-1.5 h-6 bg-amber-400 rounded-full"></div>

//             <h3 className="text-2xl font-semibold">
//               Uploads This Week
//             </h3>
//           </div>

//           <p className="text-sm text-stone-400 mb-6">
//             7-day activity
//           </p>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={WEEKLY_DATA} barSize={28}>
//                 <CartesianGrid
//                   vertical={false}
//                   stroke="#e5e7eb"
//                 />

//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                 />

//                 <YAxis
//                   allowDecimals={false}
//                   axisLine={false}
//                   tickLine={false}
//                 />

//                 <Tooltip content={<CustomTooltip />} />

//                 <Bar
//                   dataKey="uploads"
//                   fill="#fbbf24"
//                   radius={[6, 6, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Recent Notes */}

//         <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 shadow-md p-8">

//           <div className="flex justify-between items-center mb-2">

//             <div className="flex items-center gap-3">

//               <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>

//               <h3 className="text-2xl font-semibold">
//                 Recent Notes
//               </h3>

//             </div>

//             <Link
//               to="/library"
//               className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
//             >
//               View Library
//               <ArrowUpRight size={16} />
//             </Link>

//           </div>

//           <p className="text-sm text-stone-400 mb-5">
//             Latest uploaded documents
//           </p>

//           <div className="divide-y divide-stone-200">

//             {RECENT_NOTES.map((note) => (

//               <div
//                 key={note.title}
//                 className="flex justify-between items-center py-5"
//               >
//                 <div className="flex items-center gap-4">

//                   <FileText
//                     size={20}
//                     className="text-stone-500"
//                   />

//                   <div>

//                     <h4 className="font-semibold text-slate-800">
//                       {note.title}
//                     </h4>

//                     <p className="text-sm text-stone-500">
//                       {note.subject}
//                     </p>

//                   </div>

//                 </div>

//                 <div className="flex items-center gap-6">

//                   <span className="flex items-center gap-1 text-sm text-stone-500">
//                     <Clock size={14} />
//                     {note.date}
//                   </span>

//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       note.status === "Summarized"
//                         ? "bg-emerald-100 text-emerald-700"
//                         : "bg-amber-100 text-amber-700"
//                     }`}
//                   >
//                     {note.status}
//                   </span>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }






import { Link } from "react-router-dom";
import { Upload, FileText, BookOpen, CheckCircle, Clock, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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

function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6">
      {STATS.map(({ label, value, icon: Icon, accent, ring, rotate }) => (
        <div key={label} className={`bg-white rounded-xl border border-dashed border-stone-300 p-5 ring-1 ${ring} xl:${rotate} hover:rotate-0 transition-all shadow-sm hover:shadow-md flex items-center justify-between`}>
          <div>
            <h3 className="text-stone-500 text-sm font-medium">{label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
          <Icon className={`${accent}`} size={28} />
        </div>
      ))}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs">
        {label}: <strong>{payload[0].value}</strong> uploads
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 rounded-xl text-white p-6 lg:p-8 mb-6 overflow-hidden shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="absolute right-0 top-0 h-full w-1.5 bg-amber-400" />
        <div className="max-w-xl">
          <p className="uppercase tracking-[3px] text-xs text-amber-400 mb-1.5 font-medium"> Teacher Dashboard </p>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight"> Welcome Back 👋 </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Here's how your notes library is performing this week. Upload new notes, track AI summaries, and manage resources.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link to="/upload" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm" >
            <Upload size={16} /> Upload New Notes
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatCards />

      {/* Bottom Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm p-5 lg:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-4 bg-amber-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-slate-800"> Uploads This Week </h3>
            </div>
            <p className="text-xs text-stone-400 mb-4"> 7-day activity </p>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA} barSize={24} margin={{ left: -25, right: 5 }}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78716c' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="uploads" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Notes */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-stone-200 shadow-sm p-5 lg:p-6">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-rose-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-slate-800"> Recent Notes </h3>
            </div>
            <Link to="/library" className="flex items-center gap-0.5 text-sm text-amber-600 hover:text-amber-700 font-medium" >
              View Library <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="text-xs text-stone-400 mb-4"> Latest uploaded documents </p>
          
          <div className="divide-y divide-stone-100 max-h-[240px] overflow-y-auto pr-1">
            {RECENT_NOTES.map((note) => (
              <div key={note.title} className="flex justify-between items-center py-3 first:pt-0 last:pb-0" >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={18} className="text-stone-400 flex-shrink-0" />
                  <div className="truncate">
                    <h4 className="font-medium text-sm text-slate-800 truncate"> {note.title} </h4>
                    <p className="text-xs text-stone-400"> {note.subject} </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  <span className="flex items-center gap-1 text-xs text-stone-400">
                    <Clock size={12} /> {note.date}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ note.status === "Summarized" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700" }`} >
                    {note.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
