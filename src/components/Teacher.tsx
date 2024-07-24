import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";


function Teacher({ setTeacher}: any) {
  const [instructorName, setInstructorName] = React.useState<string>("");
  const [instructorQualification, setInstructorQualifications] =
    React.useState<string>("");
  const handleClickEvent = () => {
    setTeacher(instructorName, instructorQualification)
    setInstructorName("");
    setInstructorQualifications("");
  };

  return (
    <Box className=" rounded-md  flex-1 border w-full p-2">
      <Typography variant="h5" gutterBottom>
        Instructor Detail
      </Typography>
      <Box className="space-y-2">
        <TextField
          fullWidth
          variant="outlined"
          label="Instructor Name"
          onChange={(e) => setInstructorName(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Qualifications"
          onChange={(e) => setInstructorQualifications(e.target.value)}
        />
        <Button variant="contained" className="items-end" onClick={handleClickEvent}>
          Add Detail
        </Button>
        <Button variant="outlined" className="items-end">
          Add Student
        </Button>
      </Box>
    </Box>
  );
}

export default Teacher;
