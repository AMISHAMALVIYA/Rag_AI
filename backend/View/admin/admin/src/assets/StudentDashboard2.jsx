import StudentSidebar from "./StudentSidebar";
import StudentDashboard from "./StudentDashboard"

function StudentDashboard2() {
  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-64 w-full min-h-screen bg-slate-100">

        <div className="bg-white shadow p-5 flex justify-between">

          <h1 className="text-3xl font-bold">
            Student Dashboard
          </h1>

          <div>

            Welcome,
            <span className="font-bold ml-2">
              {JSON.parse(localStorage.getItem("user")).username}
            </span>

          </div>

        </div>

        <div className="p-8">

       <StudentDashboard/>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard2;