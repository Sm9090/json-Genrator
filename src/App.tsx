import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import Teacher from "./components/Teacher";

interface Course {
  id: string;
  name: string;
  duration: string;
  createdAt: Date;
  teachers?: { id: string; name: string; qualification: string }[];
}

function App() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
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

  const handleClickEvent = () => {
    setIsVisible(true);
  };

  const addTeachersArray = (
    instructorName: string,
    instructorQualification: string
  ) => {
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
  };

  const generatedJson = {
    courses,
  };

  return (
    <Box className="items-center w-screen p-2">
      <Typography variant="h4" gutterBottom>
        JSON Generator App
      </Typography>
      <Box className="flex gap-1 ">
        <Box className="rounded-md flex-1 border w-full p-2">
          <Typography variant="h5" gutterBottom>
            Courses
          </Typography>
          <Box className="space-y-2">
            <FormControl fullWidth variant="outlined" className="mb-4">
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value as string)}
                label="Course"
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              className="items-end"
              onClick={handleClickEvent}
            >
              Add Child
            </Button>
            <Box className="ml-20">{isVisible && <Teacher setTeacher={addTeachersArray} />}</Box>
          </Box>
        </Box>
        <Box className="flex-1 bg-white p-4 rounded-md border">
          <Typography variant="h6">Generated JSON</Typography>
          <ReactJson src={generatedJson} theme="monokai" collapsed={false} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
