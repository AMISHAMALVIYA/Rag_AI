import {
  LayoutDashboard,
  BookOpen,
  Bot,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-indigo-700 text-white fixed left-0 top-0 shadow-xl">

      <div className="p-6 border-b border-indigo-500">

        <h1 className="text-2xl font-bold">
          AI Notes
        </h1>

        <p className="text-sm text-indigo-200">
          Student Portal
        </p>

      </div>

      <div className="mt-6">

        <Link
          to="/student"
          className="flex items-center gap-3 px-6 py-4 hover:bg-indigo-600 duration-300"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/student/notes"
          className="flex items-center gap-3 px-6 py-4 hover:bg-indigo-600 duration-300"
        >
          <BookOpen size={22} />
          Notes
        </Link>

        <Link
          to="/student/summary"
          className="flex items-center gap-3 px-6 py-4 hover:bg-indigo-600 duration-300"
        >
          <Bot size={22} />
          AI Summary
        </Link>

        <Link
          to="/student/chat"
          className="flex items-center gap-3 px-6 py-4 hover:bg-indigo-600 duration-300"
        >
          <MessageSquare size={22} />
          AI Chat
        </Link>

        <Link
          to="/student/profile"
          className="flex items-center gap-3 px-6 py-4 hover:bg-indigo-600 duration-300"
        >
          <User size={22} />
          Profile
        </Link>

      </div>

      <div className="absolute bottom-0 w-full">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700"
        >
          <LogOut size={22} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default StudentSidebar;