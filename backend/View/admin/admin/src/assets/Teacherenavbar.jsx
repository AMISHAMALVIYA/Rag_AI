import { BookOpen, Bell, Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
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
          <Bell size={25} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
          <div>
            <button  style={{color:"white",marginLeft:"50px",marginRight:"50px",fontSize:"25px"}}>add Cousre</button>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-semibold text-sm flex items-center justify-center">
            T
          </div>
          <span className="hidden sm:block text-sm text-slate-200 font-medium"  style={{fontSize:"25px"}}>Teacher</span>
        </div>
      </div>
    </header>
  );
}
