import React from "react";
import {
  Search,
  Bell,
  Moon,
  Settings,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
          />
        </div>

        {/* Notification */}
        <button className="relative w-11 h-11 rounded-xl bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Dark Mode */}
        <button className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition">
          <Moon size={20} />
        </button>

        {/* Settings */}
        <button className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition">
          <Settings size={20} />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2 hover:bg-gray-200 transition">

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />

          <div className="hidden md:block text-left">
            <h4 className="font-semibold text-gray-800">
              John Doe
            </h4>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-gray-500"
          />

        </button>

      </div>
    </header>
  );
};

export default Navbar;