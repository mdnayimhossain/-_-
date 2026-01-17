if (!localStorage.users) {
  localStorage.users = JSON.stringify([]);
}

const studentData = {
  attendance: "90%",
  cgpa: "3.75",
  courses: ["Web", "DBMS"],
  routine: "Sun–Thu",
  exams: "Mid: Oct",
  notices: ["Class starts 9AM"]
};
