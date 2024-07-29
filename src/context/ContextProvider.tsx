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
  students?: Student[];
}

export interface Student {
  id: string;
  name: string;
  assignments?: Assignments[];
}

interface Assignments {
  id: string;
  name: string;
}

export const CourseProvider = ({ children }: any) => {
  const [specificTeacher, setSpecficTeacher] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(courses[0]?.name || null);
  
  React.useEffect(() => {
    const course = courses.find((course) => course.name === selectedCourse);
    if (course) {
      setTeachers(course.teachers || []);
    } else {
      setTeachers([]);
    }
  }, [selectedCourse, courses]);


  React.useEffect(() => {
    const teacher = teachers.find((teacher) => teacher.id === specificTeacher);
    if (teacher) {
      setStudents(teacher.students || []);
    } else {
      setStudents([]);
    }
  }, [teachers, specificTeacher]);

  // const addTeachersArray = (
  //   instructorName: string,
  //   instructorQualification: string
  //   // students: { id: string; name: string }[]
  // ) => {
  //   console.log('chala ya nhi' )
  //   const newTeacher = {
  //     id: uuidv4(),
  //     name: instructorName,
  //     qualification: instructorQualification,
  //     // students: students,
  //   };
  //   setCourses((prevCourses) =>
  //     prevCourses.map((course) =>
  //       course.name === selectedCourse
  //         ? {
  //             ...course,
  //             teachers: course.teachers
  //               ? [...course.teachers, newTeacher]
  //               : [newTeacher],
  //           }
  //         : course
  //     )
  //   );
  // };

  const addTeachersArray = React.useCallback(
    (instructorName: string, instructorQualification: string) => {
      console.log("chala ya nhi");
      const newTeacher = {
        id: uuidv4(),
        name: instructorName,
        qualification: instructorQualification,
      };

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
    },
    [selectedCourse]
  );
  const addStudentToTeacher = (
    teacherId: string,
    student: { id: string; name: string }
  ) => {
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

  const addAssignmentToStudent = (
    studentId: string,
    assignment: { id: string; name: string }
  ) => {
    setCourses((prevCourses: Course[]) =>
      prevCourses.map((course: Course) =>
        course.name === selectedCourse
          ? {
              ...course,
              teachers: course.teachers?.map((teacher: Teacher) => ({
                ...teacher,
                students: teacher.students?.map((student: Student) =>
                  student.id === studentId
                    ? {
                        ...student,
                        assignments: student.assignments
                          ? [...student.assignments, assignment]
                          : [assignment],
                      }
                    : student
                ),
              })),
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
        setSpecficTeacher,
        isVisible,
        setIsVisible,
        courses,
        addTeachersArray,
        addStudentToTeacher,
        addAssignmentToStudent,
        teachers,
        students,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
