import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Student, useCourseContext } from "../context/ContextProvider";

function Assignment() {
  const [assignmentName, setAssignmentName] = useState<string>("");
  const { addAssignmentToStudent, students  } = useCourseContext();
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  const [message ,setMessage] = useState<string>("")

  const handleAddAssignment = () => {
    if(assignmentName){
    const newAssignment= { id: uuidv4(), name: assignmentName };
    addAssignmentToStudent(selectedStudent?.id, newAssignment);
    setAssignmentName("");
    setMessage('')
    }else{
      setMessage('Please fill the assignment name')
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value , 'values') 
    const student = students.find((student: Student) => student.name === value);
    setSelectedStudent(student);
  };

  return (
    <div className="rounded-md flex-1 border w-full p-2 shadow-md">
      <h2 className="text-[24px] text-center">Assignment Detail</h2>
      <div className="my-2 space-y-4">
        <div className="w-full">
          <label>Student</label>
          <select
            className=" text-lg p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
            value={selectedStudent.name}
            onChange={(e) => handleChange(e)}
          >
            {students.map((student: Student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
          <label htmlFor="assignmentName">Assignment Name</label>
          <input
            className="p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
            name="assignmentName"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
        </div>
        {message && <p className="text-red-500">{message}</p>}
        <button
          className="items-end border py-2 px-4 rounded-md border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
          onClick={handleAddAssignment}
        >
          Add Assignment
        </button>
      </div>
    </div>
  );
}

export default Assignment;
