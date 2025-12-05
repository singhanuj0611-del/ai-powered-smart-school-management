import React, { useMemo, useState } from "react";
import { students } from "../data/mockData";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade =
        selectedGrade === "all" || student.grade === selectedGrade;
      return matchesSearch && matchesGrade;
    });
  }, [searchTerm, selectedGrade]);

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    borderRadius: "18px",
    padding: "22px",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 18px 40px rgba(6, 12, 30, 0.45)"
  };

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <header>
        <h2 style={{ margin: 0, fontSize: "26px" }}>Student Management</h2>
        <p style={{ opacity: 0.65, marginTop: "6px" }}>
          Keep the roster tidy, discover students instantly, and update grades
          in a snap.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          ...cardStyle,
          padding: "18px"
        }}
      >
        <input
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{
            borderRadius: "14px",
            padding: "14px 16px",
            border: "none",
            outline: "none",
            background: "rgba(18, 40, 90, 0.55)",
            color: "#f8f9ff",
            fontSize: "15px",
            letterSpacing: "0.02em",
            transition: "box-shadow 0.3s ease"
          }}
          onFocus={(event) => {
            event.target.style.boxShadow =
              "0 0 0 2px rgba(132, 201, 255, 0.65)";
          }}
          onBlur={(event) => {
            event.target.style.boxShadow = "none";
          }}
        />
        <select
          value={selectedGrade}
          onChange={(event) => setSelectedGrade(event.target.value)}
          style={{
            borderRadius: "14px",
            padding: "14px 16px",
            border: "none",
            background: "rgba(18, 40, 90, 0.55)",
            color: "#f8f9ff",
            fontSize: "15px",
            letterSpacing: "0.02em",
            cursor: "pointer"
          }}
        >
          <option value="all">All Grades</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
        </select>
      </section>

      <section
        style={{
          ...cardStyle,
          display: "grid",
          gap: "12px"
        }}
      >
        {filteredStudents.map((student) => (
          <article
            key={student.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              alignItems: "center",
              padding: "16px",
              borderRadius: "14px",
              background: "rgba(12, 32, 78, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "transform 0.25s ease"
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateX(6px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateX(0px)";
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "18px" }}>{student.name}</h3>
              <p style={{ margin: "6px 0 0", opacity: 0.6 }}>{student.id}</p>
            </div>
            <span style={{ fontWeight: 500, opacity: 0.8 }}>
              Grade {student.grade}
            </span>
            <span
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                background:
                  student.status === "Active"
                    ? "rgba(90, 255, 194, 0.18)"
                    : "rgba(255, 210, 90, 0.2)",
                color: student.status === "Active" ? "#96ffd9" : "#ffd764",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}
            >
              {student.status}
            </span>
          </article>
        ))}
        {filteredStudents.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No students found. Try adjusting your filters.
          </p>
        )}
      </section>
    </div>
  );
};

export default StudentManagement;

