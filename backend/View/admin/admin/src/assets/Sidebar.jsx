import React from "react";
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  FileBarChart2,
  AlertTriangle,
  FileText,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";

const menu = [
  {
    title: "MAIN MENU",
    items: [
      {
        icon: <LayoutDashboard size={20} />,
        name: "Dashboard",
        active: true,
      },
      {
        icon: <Package size={20} />,
        name: "Students",
      },
      {
        icon: <PlusSquare size={20} />,
        name: "Add Notes",
      },
      {
        icon: <FileBarChart2 size={20} />,
        name: "Assignment",
      },
      {
        icon: <AlertTriangle size={20} />,
        name: "Reports",
      },
      {
        icon: <FileText size={20} />,
        name: "Docs",
      },
    ],
  },
  {
    title: "ACCOUNT PAGES",
    items: [
      {
        icon: <User size={20} />,
        name: "Profile",
      },
      {
        icon: <LogIn size={20} />,
        name: "Login",
      },
      {
        icon: <UserPlus size={20} />,
        name: "Sign Up",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 shadow-sm">

      {/* Logo */}

      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">TnpLearning</span>
          <span className="text-gray-800">App</span>
        </h1>
      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-5 py-6">

        {menu.map((section, index) => (
          <div key={index} className="mb-8">

            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
              {section.title}
            </h3>

            <div className="space-y-2">

              {section.items.map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    item.active
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
                  }`}
                >
                  {item.icon}

                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* Bottom */}

      <div className="p-5 border-t">

        <div className="rounded-xl bg-orange-50 p-4">

          <h3 className="font-semibold text-gray-800">
            Upgrade to Pro
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Get premium dashboard features.
          </p>

          <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
            Upgrade
          </button>

        </div>

      </div>

    </div>
  );
};

export default Sidebar;