import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./Studentsidebar";

const API_URL = "http://localhost:5004";

function StudentDashboard() {


  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes`);
      console.log(res.data); // Debug
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
   
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {notes.map((note) => {
          const pdfUrl = `${API_URL}/uploads/${note.pdf}`;

          return (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h2 className="text-xl font-bold">
                {note.Title}
              </h2>

              <p className="text-blue-600">
                {note.Subject}
              </p>

              <p className="mt-3 text-gray-600">
                {note.Description}
              </p>

              <p className="mt-2">
                <b>Teacher:</b> {note.Teacher_name}
              </p>

              <div className="flex gap-3 mt-5">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  View PDF
                </a>

                <a
                  href={pdfUrl}
                  download
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
 
  );
}

export default StudentDashboard;