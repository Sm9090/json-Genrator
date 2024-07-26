import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CourseContext = createContext<any>(null);

export const useCourseContext = () => useContext(CourseContext);

export interface Course {
  id: string;
  name: string;
  duration: string;
  createdAt: Date;
  teachers?: Teacher[];
}

export interface Teacher {
  id: string;
  name: string;
  qualification: string;
  students?: { id: string; name: string }[];
}

export const CourseProvider = ({ children }: any) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [teacherId, setTeacherId] = useState<string>("");
  const [teachers ,setTeachers] = useState<Teacher[]>([])
  const [courses, setCourses] = useState<Course[]>([
    {
      id: uuidv4(),
      name: "React",
      duration: "3 months",
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Node js",
      duration: "3 months",
      createdAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "MongoDb",
      duration: "3 months",
      createdAt: new Date(),
    },
  ]);

  console.log(courses[0])

  const addTeachersArray = (
    instructorName: string,
    instructorQualification: string,
    // students: { id: string; name: string }[]
  ) => {
    const newTeacher = {
      id: uuidv4(),
      name: instructorName,
      qualification: instructorQualification,
      // students: students,
    };
    setTeachers([...teachers, newTeacher]);
    setCourses((prevCourses) =>
      prevCourses.map((course) => 
        course.name === selectedCourse
          ? {
              ...course,
              teachers: course.teachers
                ? [...course.teachers, newTeacher]
                : [newTeacher],
            }
          : course
      )
    );
  };

  const addStudentToTeacher = (
    teacherId: string,
    student: { id: string; name: string }
  ) => {
    console.log(student ,'student')
    setCourses((prevCourses: Course[]) =>
      prevCourses.map((course: Course) =>
        course.name === selectedCourse
          ? {
              ...course,
              teachers: course.teachers?.map((teacher: Teacher) =>
                teacher.id === teacherId
                  ? {
                      ...teacher,
                      students: teacher.students
                        ? [...teacher.students, student]
                        : [student],
                    }
                  : teacher
              ),
            }
          : course
      )
    );
  };

  return (
    <CourseContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        isVisible,
        setIsVisible,
        courses,
        addTeachersArray,
        addStudentToTeacher,
        teachers
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
