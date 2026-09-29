import { useEffect, useState } from "react";
import axios from "axios";

function AddCourse() {
  const [form, setForm] = useState({
    teacherId: "",
    courseName: "",
    courseDescription: "",
    courseCategory: "",
    courseLevel: "Beginner",
    courseDuration: "",
    coursePrice: "",
    courseImage: "",
    status: "Active",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/course/get/courses"
      );

      setCourses(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await axios.post(
        "http://localhost:3000/insert/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Course Added Successfully");

      setForm({
        teacherId: "",
        courseName: "",
        courseDescription: "",
        courseCategory: "",
        courseLevel: "Beginner",
        courseDuration: "",
        coursePrice: "",
        courseImage: "",
        status: "Active",
      });

      setThumbnail(null);

      getCourses();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">

            <input
              name="teacherId"
              value={form.teacherId}
              onChange={handleChange}
              placeholder="Teacher ID"
              className="border rounded-xl p-3"
              required
            />

            <input
              name="courseName"
              value={form.courseName}
              onChange={handleChange}
              placeholder="Course Name"
              className="border rounded-xl p-3"
              required
            />

            <input
              name="courseCategory"
              value={form.courseCategory}
              onChange={handleChange}
              placeholder="Category"
              className="border rounded-xl p-3"
              required
            />

            <select
              name="courseLevel"
              value={form.courseLevel}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <input
              name="courseDuration"
              value={form.courseDuration}
              onChange={handleChange}
              placeholder="Duration (Ex: 8 Weeks)"
              className="border rounded-xl p-3"
            />

            <input
              name="coursePrice"
              type="number"
              value={form.coursePrice}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-xl p-3"
            />

            <input
              name="courseImage"
              value={form.courseImage}
              onChange={handleChange}
              placeholder="Course Image URL"
              className="border rounded-xl p-3 col-span-2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="border rounded-xl p-3 col-span-2"
            />

            <textarea
              rows={5}
              name="courseDescription"
              value={form.courseDescription}
              onChange={handleChange}
              placeholder="Course Description"
              className="border rounded-xl p-3 col-span-2"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          <button
            type="submit"
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;