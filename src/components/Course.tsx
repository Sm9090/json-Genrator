import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { JSONTree } from "react-json-tree";

const App: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [teachers, setTeachers] = useState<{ name: string, students: { name: string, assignments: any[] }[] }[]>([]);
  const [currentTeacher, setCurrentTeacher] = useState<string>("");
  const [currentStudent, setCurrentStudent] = useState<{ teacher: string, student: string }>({ teacher: "", student: "" });
  const [currentAssignment, setCurrentAssignment] = useState<{ teacher: string, student: string, assignment: string }>({ teacher: "", student: "", assignment: "" });

  const Courses = [
    { id: 1, name: "React", duration: "3 months", createdAt: new Date() },
    { id: 2, name: "Node", duration: "2 months", createdAt: new Date() },
    { id: 3, name: "MongoDB", duration: "1 month", createdAt: new Date() },
  ];

  const addTeacher = () => {
    console.log(currentTeacher)
    console.log(teachers)
    if (currentTeacher) {
      setTeachers([...teachers, { name: currentTeacher, students: [] }]);
      console.log(teachers)
      setCurrentTeacher("");
    }
  };
  console.log(teachers)

  const addStudent = () => {
    console.log(currentStudent ,'currentStudent')
    if (currentStudent.teacher && currentStudent.student) {
      setTeachers(teachers.map(teacher => {
        if (teacher.name === currentStudent.teacher) {
          return { ...teacher, students: [...teacher.students, { name: currentStudent.student, assignments: [] }] };
        }
        return teacher;
      }));
      setCurrentStudent({ teacher: "", student: "" });
    }
  };

  const addAssignment = () => {
    if (currentAssignment.teacher && currentAssignment.student && currentAssignment.assignment) {
      setTeachers(teachers.map(teacher => {
        if (teacher.name === currentAssignment.teacher) {
          return {
            ...teacher,
            students: teacher.students.map(student => {
              if (student.name === currentAssignment.student) {
                return { ...student, assignments: [...student.assignments, currentAssignment.assignment] };
              }
              return student;
            })
          };
        }
        return teacher;
      }));
      setCurrentAssignment({ teacher: "", student: "", assignment: "" });
    }
  };

  const generatedJson = {
    course: selectedCourse,
    teachers: teachers
  };

  const theme = {
    base00: 'white',
    base01: '#ddd',
    base02: '#ddd',
    base03: '#444',
    base04: '#444',
    base05: '#444',
    base06: '#444',
    base07: '#444',
    base08: '#444',
    base09: '#444',
    base0A: '#444',
    base0B: '#444',
    base0C: '#444',
    base0D: '#444',
    base0E: '#444',
    base0F: '#444'
  };

  return (
    <Box className="p-6 bg-gray-200 min-h-screen">
      <Typography variant="h4" gutterBottom>
        JSON Generator App
      </Typography>
      <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel>Course</InputLabel>
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value as string)}
          label="Course"
        >
          {Courses.map((course) => (
            <MenuItem key={course.id} value={course.name}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCourse && (
        <>
          <Box className="mb-4">
            <Typography variant="h6">Add Teacher</Typography>
            <TextField
              label="Teacher Name"
              variant="outlined"
              fullWidth
              value={currentTeacher}
              onChange={(e) => setCurrentTeacher(e.target.value)}
              className="mb-2"
            />
            <Button variant="contained" color="primary" onClick={addTeacher}>
              Add Teacher
            </Button>
          </Box>

          <Box className="mb-4">
            <Typography variant="h6">Add Student</Typography>
            <FormControl fullWidth variant="outlined" className="mb-2">
              <InputLabel>Teacher</InputLabel>
              <Select
                value={currentStudent.teacher}
                onChange={(e) => setCurrentStudent({ ...currentStudent, teacher: e.target.value as string })}
                label="Teacher"
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.name} value={teacher.name}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Student Name"
              variant="outlined"
              fullWidth
              value={currentStudent.student}
              onChange={(e) => setCurrentStudent({ ...currentStudent, student: e.target.value })}
              className="mb-2"
            />
            <Button variant="contained" color="primary" onClick={addStudent}>
              Add Student
            </Button>
          </Box>

          <Box className="mb-4">
            <Typography variant="h6">Add Assignment</Typography>
            <FormControl fullWidth variant="outlined" className="mb-2">
              <InputLabel>Teacher</InputLabel>
              <Select
                value={currentAssignment.teacher}
                onChange={(e) => setCurrentAssignment({ ...currentAssignment, teacher: e.target.value as string })}
                label="Teacher"
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.name} value={teacher.name}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" className="mb-2">
              <InputLabel>Student</InputLabel>
              <Select
                value={currentAssignment.student}
                onChange={(e) => setCurrentAssignment({ ...currentAssignment, student: e.target.value as string })}
                label="Student"
                disabled={!currentAssignment.teacher}
              >
                {teachers.find(teacher => teacher.name === currentAssignment.teacher)?.students.map((student) => (
                  <MenuItem key={student.name} value={student.name}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Assignment"
              variant="outlined"
              fullWidth
              value={currentAssignment.assignment}
              onChange={(e) => setCurrentAssignment({ ...currentAssignment, assignment: e.target.value })}
              className="mb-2"
            />
            <Button variant="contained" color="primary" onClick={addAssignment}>
              Add Assignment
            </Button>
          </Box>

          <Box className="bg-white p-4 rounded-md shadow-md">
            <Typography variant="h6">Generated JSON</Typography>
            <JSONTree data={generatedJson} theme={theme} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default App;
