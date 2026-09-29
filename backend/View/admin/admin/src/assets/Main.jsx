// import React from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const Main = () => {
//   return (
//     <div className="flex bg-[#F8F9FC] min-h-screen">

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-72">

     

//         {/* Dashboard Body */}
//         <div className="p-6">

//           <h1 className="text-3xl font-bold text-gray-800 mb-6">
//             Dashboard
//           </h1>

//           {/* Top Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

//             <div className="bg-white rounded-xl shadow p-6">
//               <h2 className="text-gray-500">Sales</h2>
//               <p className="text-3xl font-bold mt-2">$152k</p>
//             </div>

//             <div className="bg-white rounded-xl shadow p-6">
//               <h2 className="text-gray-500">Purchase</h2>
//               <p className="text-3xl font-bold mt-2">$99k</p>
//             </div>

//             <div className="bg-white rounded-xl shadow p-6">
//               <h2 className="text-gray-500">Expense</h2>
//               <p className="text-3xl font-bold mt-2">$45k</p>
//             </div>

//             <div className="bg-white rounded-xl shadow p-6">
//               <h2 className="text-gray-500">Invoice Due</h2>
//               <p className="text-3xl font-bold mt-2">$18k</p>
//             </div>

//           </div>

//           {/* Chart Placeholder */}
//           <div className="bg-white rounded-xl shadow mt-8 p-6 h-96 flex items-center justify-center">
//             <h2 className="text-gray-400 text-xl">
//               Sales Chart Here
//             </h2>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Main;








import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  CreditCard, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function Main() {
  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Your main content goes here..</p>
      </header>

      {/* Top Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        {/* Total Sales */}
        <div className="bg-red-50/60 border border-red-100 rounded-xl p-5 flex items-start space-x-4">
          <div className="p-3 bg-red-500 text-white rounded-lg">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Students</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">25,000</h3>
            <p className="text-red-500 text-xs font-semibold mt-1 flex items-center">
              +5% <span className="text-gray-400 font-normal ml-1">since last month</span>
            </p>
          </div>
        </div>

        {/* Total Purchase */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-5 flex items-start space-x-4">
          <div className="p-3 bg-emerald-500 text-white rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Response</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">18,000</h3>
            <p className="text-emerald-600 text-xs font-semibold mt-1 flex items-center">
              +22% <span className="text-gray-400 font-normal ml-1">since last month</span>
            </p>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-cyan-50/60 border border-cyan-100 rounded-xl p-5 flex items-start space-x-4">
          <div className="p-3 bg-cyan-500 text-white rounded-lg">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Notes</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">$9,000</h3>
            <p className="text-cyan-600 text-xs font-semibold mt-1 flex items-center">
              +10% <span className="text-gray-400 font-normal ml-1">since last month</span>
            </p>
          </div>
        </div>

        {/* Invoice Due */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-5 flex items-start space-x-4">
          <div className="p-3 bg-amber-500 text-white rounded-lg">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Invoice Due</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">$25,000</h3>
            <p className="text-amber-600 text-xs font-semibold mt-1 flex items-center">
              +35% <span className="text-gray-400 font-normal ml-1">since last month</span>
            </p>
          </div>
        </div>

      </div>

      {/* Secondary Detailed Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Total Profit */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">$25,458</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Total Profit</p>
            </div>
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
            <span className="text-emerald-600 text-xs font-semibold flex items-center">
              <ArrowUpRight size={14} className="mr-0.5" /> +35% vs Last Month
            </span>
            <button className="text-red-500 text-xs font-semibold hover:underline">View</button>
          </div>
        </div>

        {/* Total Payment Returns */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">$45,458</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Total Payment Returns</p>
            </div>
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
            <span className="text-red-500 text-xs font-semibold flex items-center">
              <ArrowDownRight size={14} className="mr-0.5" /> -20% vs Last Month
            </span>
            <button className="text-red-500 text-xs font-semibold hover:underline">View</button>
          </div>
        </div>

        {/* Total Expenses (Secondary) */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">$34,458</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Total Expenses</p>
            </div>
            <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
              <FileText size={20} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
            <span className="text-amber-500 text-xs font-semibold flex items-center">
              <ArrowUpRight size={14} className="mr-0.5" /> 20% vs Last Month
            </span>
            <button className="text-red-500 text-xs font-semibold hover:underline">View</button>
          </div>
        </div>

      </div>

      {/* Bottom Chart / Info Row Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Sales vs Purchase Chart Section
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Overall Information Section
        </div>
      </div>
    </div>
  );
}
