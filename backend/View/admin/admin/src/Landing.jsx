import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Sparkles,
  BookOpen,
  Mic,
  BrainCircuit,
  Globe,
  Play,
  Menu,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#08111f] text-white">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#08111f]/70 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-end justify-between"  >

          {/* Logo */}

          {/* <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-500/30">
              AI
            </div>

            <div >

              <h2 className="text-xl font-bold">
                TNP Learning
              </h2>

              <p className="text-xs text-slate-400">
                AI Learning Platform
              </p>

            </div>
          </Link> */}



{/* <Link
  to="/"
  className="flex items-center gap-3 -ml-8"
>
  <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-500/30">
    AI
  </div>

  <div>
    <h2 className="text-xl font-bold">TNP Learning</h2>
    <p className="text-xs text-slate-400">
      AI Learning Platform
    </p>
  </div>
</Link> */}
          {/* Menu */}

          <nav className="hidden lg:flex items-center gap-8 text-[15px]"  style={{gap:'105px'}}>

            <Link
              to="/getcourse"
              className="hover:text-violet-400 transition"
              
            >
              Courses
            </Link>

            <Link
              to="/roadmap"
              className="hover:text-violet-400 transition"
            >
              AI Roadmap
            </Link>

            <Link
              to="/url-analysis"
              className="hover:text-violet-400 transition"
            >
              URL Analysis
            </Link>

            <Link
              to="/voicetovoice"
              className="hover:text-violet-400 transition"
            >
              Voice Summary
            </Link>

            <Link
              to="/subscription"
              className="hover:text-violet-400 transition"
            >
              Pricing
            </Link>

          </nav>

          {/* Buttons */}

          <div className="hidden lg:flex gap-4" style={{marginLeft:'700px'}}>

            <button className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 transition">
              Login
            </button>

            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:scale-105 transition">
              Get Started
            </button>

          </div>

          <button className="lg:hidden">
            <Menu />
          </button>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm">

              <Sparkles size={16} />

              AI Powered Learning Platform

            </span>

            <h1 className="mt-8 text-5xl lg:text-7xl font-bold leading-tight">

              Learn Smarter

              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                with AI

              </span>

            </h1>

            <p className="mt-8 text-slate-400 text-lg leading-8 max-w-xl">

              Learn programming through premium courses,
              AI generated summaries,
              personalized learning roadmaps,
              PDF analysis,
              URL analysis,
              and voice explanations.

            </p>

            {/* Search */}

            <div className="mt-10">

              <div className="relative max-w-xl">

                <Search
                  size={22}
                  className="absolute left-5 top-5 text-slate-500"
                />

                <input
                  type="text"
                  placeholder="Search React, Node, MongoDB, AI..."
                  className="w-full bg-[#111827] border border-slate-700 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-violet-500"
                />

              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link to="/student">

                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition">

                  Browse Courses

                </button>

              </Link>

              <Link to="/roadmap">

                <button className="px-8 py-4 rounded-2xl border border-slate-700 hover:bg-slate-800 transition">

                  Generate Roadmap

                </button>

              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>

                <h2 className="text-4xl font-bold text-violet-400">
                  500+
                </h2>

                <p className="text-slate-400 mt-2">
                  Courses
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-violet-400">
                  10K+
                </h2>

                <p className="text-slate-400 mt-2">
                  Students
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-violet-400">
                  24/7
                </h2>

                <p className="text-slate-400 mt-2">
                  AI Assistant
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative hidden lg:flex justify-center">

            {/* Main Card */}

            <div className="w-[420px] rounded-3xl bg-[#111827] border border-slate-700 shadow-2xl overflow-hidden">

              <div className="h-56 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 flex items-center justify-center">

                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg">

                  <Play
                    fill="white"
                    size={40}
                  />

                </div>

              </div>

              <div className="p-8">

                <span className="text-xs text-violet-400 font-semibold">

                  AI COURSE

                </span>

                <h2 className="text-2xl font-bold mt-3">

                  Full Stack Development

                </h2>

                <p className="text-slate-400 mt-3">

                  React • Node • MongoDB • AI • Deployment

                </p>

                <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600">

                  Start Learning

                </button>

              </div>

            </div>

            {/* Floating Cards */}

            <div className="absolute -left-8 top-16 bg-[#111827] border border-slate-700 rounded-2xl p-5 shadow-xl">

              <BrainCircuit className="text-violet-400" />

              <h4 className="mt-3 font-semibold">

                AI Summary

              </h4>

            </div>

            <div className="absolute right-0 top-72 bg-[#111827] border border-slate-700 rounded-2xl p-5 shadow-xl">

              <Mic className="text-pink-400" />

              <h4 className="mt-3 font-semibold">

                Voice Notes

              </h4>

            </div>

            <div className="absolute left-20 bottom-0 bg-[#111827] border border-slate-700 rounded-2xl p-5 shadow-xl">

              <Globe className="text-cyan-400" />

              <h4 className="mt-3 font-semibold">

                URL Analysis

              </h4>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}