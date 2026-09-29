// import { useEffect, useState } from "react";
// import axios from "axios";

// function DisplayCourse() {
//   const [courses, setCourses] = useState([]);

//   const getCourses = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/getcourse"
//       );

//       setCourses(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getCourses();
//   }, []);

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen">

//       <h1 className="text-3xl font-bold mb-8">
//         All Courses
//       </h1>

//       <div className="grid md:grid-cols-3 gap-6">

//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden"
//           >
//             {/* <img
//               src={
//                 course.courseImage ||
//                 `http://localhost:3000/uploads/${course.thumbnail}`
//               }
//               alt={course.courseName}
//               className="h-52 w-full object-cover"
//             /> */}


//             <div className="h-52 w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 rounded-t-xl overflow-hidden">
//   <img
//     src={
//       course.courseImage ||
//       `http://localhost:3000/uploads/${course.thumbnail}`
//     }
//     alt={course.courseName}
//     className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
//   />
// </div>

//             <div className="p-5">

//               <h2 className="text-xl font-bold">
//                 {course.courseName}
//               </h2>

//               <p className="text-gray-500 mt-2 line-clamp-3">
//                 {course.courseDescription}
//               </p>

//               <div className="flex justify-between mt-4">
//                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
//                   {course.courseCategory}
//                 </span>

//                 <span className="font-semibold">
//                   ₹ {course.coursePrice}
//                 </span>
//               </div>

//               <div className="flex justify-between mt-4 text-sm text-gray-600">

//                 <span>{course.courseLevel}</span>

//                 <span>{course.courseDuration}</span>

//               </div>

//               <button className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl">
//                 View Course
//               </button>

//             </div>
//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

// export default DisplayCourse;









import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Sparkles,
  Clock3,
  BookOpen,
  Star,
} from "lucide-react";

function DisplayCourse() {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getcourse");
      setCourses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0B1120] via-[#151B38] to-[#2A1458] py-16">
        <div className="max-w-7xl mx-auto px-8">

          <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm">
            <Sparkles size={16} />
            AI Powered Learning
          </span>

          <h1 className="text-5xl font-bold text-white mt-6 leading-tight">
            Learn Smarter with
            <span className="text-violet-400"> AI Courses</span>
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl">
            Discover premium courses with AI Summary, Voice Notes,
            Roadmaps and interactive learning.
          </p>

          <div className="mt-8 relative max-w-lg">
            <Search
              className="absolute left-4 top-4 text-slate-500"
              size={20}
            />

            <input
              placeholder="Search Courses..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">

        <h2 className="text-3xl font-bold text-white mb-8">
          Trending Courses
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {courses.map((course) => (

            <div
              key={course._id}
              className="rounded-3xl overflow-hidden bg-[#111827] border border-slate-800 hover:border-violet-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-600/20 transition duration-300"
            >

              {/* Image */}

              <div className="relative h-56 bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-900 flex items-center justify-center">

                <img
                  src={
                    course.courseImage ||
                    `http://localhost:3000/uploads/${course.thumbnail}`
                  }
                  alt={course.courseName}
                  className="max-h-[75%] max-w-[75%] object-contain transition duration-300 hover:scale-110"
                />

                <span className="absolute top-4 left-4 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {course.courseCategory}
                </span>

              </div>

              {/* Body */}

              <div className="p-6">

                <h3 className="text-xl font-bold text-white">
                  {course.courseName}
                </h3>

                <p className="text-slate-400 mt-3 text-sm line-clamp-2">
                  {course.courseDescription}
                </p>

                {/* Stats */}

                <div className="flex items-center gap-5 mt-5 text-slate-400 text-sm">

                  <span className="flex items-center gap-1">
                    <BookOpen size={16} />
                    {course.courseLevel}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={16} />
                    {course.courseDuration}
                  </span>

                </div>

                {/* Price */}

                <div className="flex justify-between items-center mt-6">

                  <div>

                    <p className="text-slate-400 text-sm">
                      Course Price
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      ₹{course.coursePrice}
                    </h3>

                  </div>

                  <div className="flex items-center text-yellow-400">
                    <Star fill="currentColor" size={18} />
                    <span className="ml-1 text-white">
                      4.9
                    </span>
                  </div>

                </div>

                {/* AI Features */}

                <div className="flex flex-wrap gap-2 mt-6">

                  <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-xs">
                    AI Summary
                  </span>

                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                    Roadmap
                  </span>

                  <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">
                    Voice
                  </span>

                </div>

                <button className="w-full mt-7 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl font-semibold transition">
                  Buy Course
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default DisplayCourse;