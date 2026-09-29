import { useEffect, useState } from "react";
import axios from "axios";

function GetCourse() {
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    teacherId: "",
    courseName: "",
    courseDescription: "",
    courseCategory: "",
    courseLevel: "",
    courseDuration: "",
    coursePrice: "",
    status: "Active",
  });

  const [thumbnail, setThumbnail] = useState(null);

  const API = "http://localhost:3000";

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await axios.get(`${API}/get/courses`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("teacherId", form.teacherId);
    formData.append("courseName", form.courseName);
    formData.append("courseDescription", form.courseDescription);
    formData.append("courseCategory", form.courseCategory);
    formData.append("courseLevel", form.courseLevel);
    formData.append("courseDuration", form.courseDuration);
    formData.append("coursePrice", form.coursePrice);
    formData.append("status", form.status);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await axios.post(`${API}/insert-course`, formData);

      alert("Course Added");

      setForm({
        teacherId: "",
        courseName: "",
        courseDescription: "",
        courseCategory: "",
        courseLevel: "",
        courseDuration: "",
        coursePrice: "",
        status: "Active",
      });

      setThumbnail(null);
      getCourses();
    } catch (err) {
      console.log(err);
    }
  };

  const cardGrid = {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    marginTop: 20,
  };

  const cardStyle = {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
  };

  const imgStyle = {
    width: "100%",
    height: 180,
    objectFit: "cover",
    display: "block",
  };

  const cardBody = {
    padding: 16,
  };

  const badge = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f5f7fb" }}>
      <h2 style={{ marginBottom: 16 }}>Add Course</h2>

      <form onSubmit={saveCourse} style={{ display: "grid", gap: 12, maxWidth: 640 }}>
        <input
          type="text"
          name="teacherId"
          placeholder="Teacher ID"
          value={form.teacherId}
          onChange={handleChange}
        />

        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={form.courseName}
          onChange={handleChange}
        />

        <textarea
          name="courseDescription"
          placeholder="Description"
          value={form.courseDescription}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="text"
          name="courseCategory"
          placeholder="Category"
          value={form.courseCategory}
          onChange={handleChange}
        />

        <input
          type="text"
          name="courseLevel"
          placeholder="Level"
          value={form.courseLevel}
          onChange={handleChange}
        />

        <input
          type="text"
          name="courseDuration"
          placeholder="Duration"
          value={form.courseDuration}
          onChange={handleChange}
        />

        <input
          type="number"
          name="coursePrice"
          placeholder="Price"
          value={form.coursePrice}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        <button type="submit" style={{ width: 140, padding: "10px 16px" }}>
          Save Course
        </button>
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2 style={{ marginBottom: 16 }}>Course List</h2>

      <div style={cardGrid}>
        {courses.length === 0 ? (
          <div>No courses found</div>
        ) : (
          courses.map((course) => (
            <article key={course._id} style={cardStyle}>
              <img
                src={`${API}/uploads/${course.thumbnail}`}
                alt={course.courseName || "Course Thumbnail"}
                style={imgStyle}
              />
              <div style={cardBody}>
                <h3 style={{ margin: "0 0 10px" }}>{course.courseName}</h3>
                <p style={{ margin: "0 0 14px", color: "#475569", lineHeight: 1.6 }}>
                  {course.courseDescription}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  <span style={{ ...badge, background: "#eff6ff", color: "#1d4ed8" }}>
                    {course.courseCategory}
                  </span>
                  <span style={{ ...badge, background: "#ecfdf5", color: "#047857" }}>
                    {course.courseLevel}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ color: "#334155" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Teacher</div>
                    <div>{course.teacherId}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Price</div>
                    <div style={{ fontWeight: 700 }}>₹{course.coursePrice}</div>
                  </div>
                </div>

                <div style={{ marginTop: 16, color: course.status === "Active" ? "#047857" : "#b91c1c", fontWeight: 700 }}>
                  {course.status}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default GetCourse;