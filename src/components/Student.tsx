import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Teacher, useCourseContext } from "../context/ContextProvider";

function Student() {
  const [studentName, setStudentName] = useState<string>("");
  const { addStudentToTeacher, teachers } = useCourseContext();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>({
    id: "",
    name: "",
    qualification: "",
  });

  const handleAddStudent = () => {
    const newStudent = { id: uuidv4(), name: studentName };
    addStudentToTeacher(selectedTeacher?.id, newStudent);
    setStudentName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const teacher = teachers.find((teacher: Teacher) => teacher.name === value);
    setSelectedTeacher(teacher);
  };

  return (
    <div className="rounded-md flex-1 border w-full p-2 shadow-md">
      <h2 className="text-[24px] text-center">Student Detail</h2>
      <div className="my-2 space-y-4">
        <div className="w-full">
          <label>Course</label>
          <select
            className=" text-lg p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
            value={selectedTeacher.name}
            onChange={(e) => handleChange(e)}
          >
            {teachers.map((teachers: Teacher) => (
              <option key={teachers.id} value={teachers.name}>
                {teachers.name}
              </option>
            ))}
          </select>
          <label htmlFor="studentName">Student Name</label>
          <input
            className="p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
            name="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <button
          className="items-end border py-2 px-4 rounded-md border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
          onClick={handleAddStudent}
        >
          Add Student
        </button>
      </div>
    </div>
  );
}

export default Student;
