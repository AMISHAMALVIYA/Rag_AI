// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./assets/Login";

// import Upload2 from "./assets/Upload2";

// import StudentDashboard from "./assets/StudentDashboard2";

// import Main from "./assets/Main";
// import AiSummary from "./assets/AiSummary";
// import Admin from './assets/Admin'
// import AddCourse from "./assets/addCourse";
// import Dashboard from "./assets/Dashboard";
// import NotePortal from "./assets/NotePortal";

// import Course from "./assets/Course";
// import TeacherDashboard from './assets/TeacherDashboard'
// import GetCourse from "./assets/getCousre";
// import PeerReel from "./assets/Peerreel";
// import Layout from "./assets/Layout"

// function App() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         <Route
//           path="/"
//           element={<Login />}
//         />

      



//  <Route
//           path="/upload"
//           element={< Upload2/>}
//         />
//         <Route
//           path="/student"
//           element={<PeerReel/>}
//         />
//      <Route path="/teacher" element={<Layout />}>
//            <Route
//           path="/teacherdasboard"
//           element={<TeacherDashboard/>}
//         />
//   <Route
//           path="/courses"
//           element={<Course/>}
//         />
//         </Route>
//         <Route
//           path="/admin"
//           element={<Admin/>}
//         />


//   <Route
//   path="/student/summary"
//           element={<AiSummary/>}
//         />

//       </Routes>

//     </BrowserRouter>

//   );

// }

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./assets/Login";
import Upload2 from "./assets/Upload2";
import AiSummary from "./assets/AiSummary";
import Admin from "./assets/Admin";
import Course from "./assets/Course";
import TeacherDashboard from "./assets/TeacherDashboard";
import PeerReel from "./assets/Peerreel";
import Layout from "./assets/Layout";
import Utube from "./assets/Utube";
import VoicetoVoice from "./assets/VoicetoVoice";
import Subscription from "./assets/Subcription";
import { CourseCard } from "./assets/Courses (1)";
import AddCourse from "./assets/addCourse";
import Web from "./assets/Web";
import DisplayCourse from "./DisplayCourse";
import Landing from "./Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login/>} />

        {/* Student */}
        <Route path="/student" element={<Web />} />
        <Route path="/student/summary" element={<AiSummary />} />
<Route path="/getcourse"  element={<DisplayCourse/>} />
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Teacher */}
        <Route path="/teacher" element={<Layout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="teacherdasboard" element={<TeacherDashboard />} />
          <Route path="upload" element={<Upload2 />} />
   <Route path="add" element={<AddCourse />} />

        </Route>
        <Route path ="url-analysis"  element={<Utube/>}/>
        <Route path ="voicetovoice"  element={<VoicetoVoice/>}/>
<Route path = "browse"   element= {<Subscription/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;