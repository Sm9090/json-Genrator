import React from "react";
import ReactJson from "react-json-view";
import Teacher from "./components/Teacher";
import { useCourseContext, CourseProvider } from "../src/context/ContextProvider";
import { Course } from "../src/context/ContextProvider";



function App() {
  const {
    selectedCourse,
    setSelectedCourse,
    isVisible,
    setIsVisible,
    courses,
  } = useCourseContext();
  const [message ,setMessage] = React.useState<string | null>(null)

  const handleClickEvent = () => {
    if(selectedCourse){
    setIsVisible(true);
    setMessage(null)
    }else{
      setMessage('Please select a course')
    }
  };

  const selectedjson = courses.find((course : Course) => course.name === selectedCourse);

  const generatedJson = {
    selectedCourse : selectedjson,
  };

  return (
    <div className="items-center w-screen p-2">
      <h1 className="text-[34px] font-bold text-center m-2">JSON Generator App</h1>
      <div className="flex gap-1 ">
        <div className="rounded-md flex-1 border w-full p-2">
          <h2 className="text-center text-[24px]">Courses</h2>
          <div className="space-y-2">
            <label>Course</label>
            <select
              className=" text-lg p-2 border block w-full rounded-md focus:border-blue-400 outline-none"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value as string)}
            >
              {courses.map((course : Course) => (
                <option key={course.id} >{course.name}</option>
              ))}
            </select>
            {message && <p className="text-red-500">{message}</p>}
            <button
              className="items-end border py-2 px-4 rounded-md border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-500"
              onClick={handleClickEvent}
            >
              Add Child
            </button>
            <div className="ml-20">
              {isVisible && <Teacher />}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-md border">
          <h2 className="text-[24px]">Generated JSON</h2>
          <ReactJson src={generatedJson} theme="monokai" collapsed={false} />
        </div>
      </div>
    </div>
  );
}

export default () => (
  <CourseProvider>
    <App />
  </CourseProvider>
);
