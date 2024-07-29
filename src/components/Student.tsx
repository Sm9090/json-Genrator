import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Teacher, useCourseContext } from "../context/ContextProvider";
import Assignment from "./Assignment";

function Student() {
  const [studentName, setStudentName] = useState<string>("");
  const { addStudentToTeacher, teachers ,setSpecficTeacher } = useCourseContext();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>(teachers[0]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [checking, setChecking] = useState<boolean>(false);


  const handleAddStudent = () => {
    if(studentName){
    const newStudent = { id: uuidv4(), name: studentName };
    addStudentToTeacher(selectedTeacher?.id, newStudent);
    setStudentName("");
    setMessage("");
    setChecking(true);
    }else{
      setMessage('Please student name required')
      setChecking(false)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const teacher = teachers.find((teacher: Teacher) => teacher.name === value);
    setSelectedTeacher(teacher);
    setSpecficTeacher(teacher.id)
  };

  return (
    <div className="rounded-md flex-1 border w-full p-2 shadow-md">
      <h2 className="text-[24px] text-center">Student Detail</h2>
      <div className="my-2 space-y-4">
        <div className="w-full">
          <label>Teachers</label>
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
        {message && <p className="text-red-500">{message}</p>}
        <div className="space-x-2">
          <button
            className="items-end border py-2 px-4 rounded-md border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
            onClick={handleAddStudent}
          >
            Add Student
          </button>
          <button
            className={`items-end border py-2 px-4 rounded-md ${
              !checking
                ? "border-gray-400 text-gray-400 hover:bg-gray-50 "
                : "border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
            }`}
            disabled={!checking as boolean}
            onClick={() => setIsVisible(true)}
          >
            Add Assignment
          </button>
        </div>
        <div className="ml-20">
          {isVisible && <Assignment />}
        </div>
      </div>
    </div>
  );
}

export default Student;
