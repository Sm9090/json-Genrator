import { useState } from "react";
import { useCourseContext } from "../context/ContextProvider";
import Student from "./Student";

function Teacher() {
  const [instructorName, setInstructorName] = useState<string>("");
  const [instructorQualification, setInstructorQualifications] =
    useState<string>("");
  // const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { addTeachersArray } = useCourseContext();

  const handleAddTeacher = () => {
    addTeachersArray(instructorName, instructorQualification);
    setInstructorName("");
    setInstructorQualifications("");
  };


  // console.log(students, "students");

  return (
    <div className="rounded-md flex-1 border w-full p-2 shadow-md">
      <h2 className="text-[24px] text-center">Instructor Detail</h2>
      <div className="my-2 space-y-4">
        <div className="w-full">
          <label htmlFor="instructorName">Instructor Name</label>
          <input
            className="p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
            name="instructorName"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="instructorQualification">
            Instructor Qualification
          </label>
          <input
            className="p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
            value={instructorQualification}
            onChange={(e) => setInstructorQualifications(e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <button
            className="items-end border py-2 px-4 rounded-md border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
            onClick={handleAddTeacher}
          >
            Add Detail
          </button>
          <button
            className="items-end border py-2 px-4 rounded-md border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
            onClick={() => setIsVisible(true)}
          >
            Add Student
          </button>
        </div>
        <div className="ml-20">
          {isVisible && <Student />}
        </div>
      </div>
    </div>
  );
}

export default Teacher;
