


import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import TeacherSidebar from "./TeacherSidebar";
import Teachrenavbar from "./Teacherenavbar"

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <Teachrenavbar onMenuClick={() => setSidebarOpen(true)} />
      <TeacherSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="w-full p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}