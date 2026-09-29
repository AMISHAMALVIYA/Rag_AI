import { FileText, Users, Plus, MoreHorizontal } from "lucide-react";

export const COURSE_COLORS = {
  emerald: { tab: "bg-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50", bar: "bg-emerald-500" },
  amber: { tab: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50", bar: "bg-amber-500" },
  rose: { tab: "bg-rose-400", text: "text-rose-700", bg: "bg-rose-50", bar: "bg-rose-500" },
  sky: { tab: "bg-sky-400", text: "text-sky-700", bg: "bg-sky-50", bar: "bg-sky-500" },
};

export const COURSES = [
  { id: 1, title: "Biology Fundamentals", subject: "Biology", notes: 5, students: 32, color: "emerald", progress: 80 },
  { id: 2, title: "Physics: Mechanics", subject: "Physics", notes: 3, students: 28, color: "amber", progress: 60 },
  { id: 3, title: "World History", subject: "History", notes: 4, students: 25, color: "rose", progress: 45 },
  { id: 4, title: "Algebra II", subject: "Math", notes: 3, students: 30, color: "sky", progress: 70 },
];

export function CourseCard({ course }) {
  const c = COURSE_COLORS[course.color];
  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition">
      <div className={`h-2 ${c.tab}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <span className={`text-[11px] font-mono uppercase tracking-wide ${c.text}`}>
              {course.subject}
            </span>
            <h3 className="font-serif text-lg text-slate-900 mt-1 truncate">{course.title}</h3>
          </div>
          <button className="text-stone-300 hover:text-stone-500 shrink-0">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
          <span className="flex items-center gap-1">
            <FileText size={13} /> {course.notes} notes
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} /> {course.students} students
          </span>
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-stone-400 mb-1 font-mono">
            <span>Summary coverage</span>
            <span>{course.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
            <div className={`h-full ${c.bar}`} style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Course({ courses = COURSES, onAddCourse }) {
  return (
    <>
      <div className="relative bg-slate-900 rounded-xl text-white p-8 mb-8 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1.5 bg-amber-400" />
        <p className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
          Teacher dashboard
        </p>
        <h2 className="font-serif text-3xl md:text-4xl">Courses</h2>
        <p className="mt-3 text-slate-300 max-w-lg">
          Organize your notes by course and track how much of each has an AI summary.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-rose-600 rounded-full" />
        <h3 className="font-serif text-lg text-slate-900">Your courses</h3>
        <span className="text-xs text-stone-400 font-mono">({courses.length})</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        <button
          onClick={onAddCourse}
          className="border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center gap-2 text-stone-400 hover:text-amber-600 hover:border-amber-400 transition p-5 min-h-[168px]"
        >
          <Plus size={22} />
          <span className="text-sm font-medium">Add course</span>
        </button>
      </div>
    </>
  );
}

export default Course;
