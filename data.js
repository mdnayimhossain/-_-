// Initialize localStorage if not exists
if (!localStorage.users) {
  localStorage.users = JSON.stringify([]);
}

// Sample student data
const studentData = {
  attendance: "90%",
  cgpa: "3.75",
  courses: ["Web Development", "Database Management", "Software Engineering"],
  routine: "Sunday to Thursday: 9:00 AM - 5:00 PM",
  exams: "Midterm: October 15, 2026 | Final: December 20, 2026",
  notices: [
    "Class starts at 9:00 AM sharp",
    "Assignment submission deadline: January 25, 2026",
    "Exam schedule has been published",
    "Library will remain closed on Friday"
  ],
  marks: {
    "Web Development": 85,
    "Database Management": 78,
    "Software Engineering": 92
  }
};

// Sample teacher data
const teacherData = {
  classes: ["Web Development - Section A", "Database Management - Section B"],
  students: [
    { id: "ST001", name: "John Doe", attendance: "95%", marks: "85", grade: "A" },
    { id: "ST002", name: "Jane Smith", attendance: "90%", marks: "78", grade: "B+" },
    { id: "ST003", name: "Mike Johnson", attendance: "88%", marks: "92", grade: "A+" },
    { id: "ST004", name: "Sarah Williams", attendance: "92%", marks: "80", grade: "A-" }
  ]
};

// Sample staff data
const staffData = {
  totalUsers: 150,
  students: 100,
  teachers: 40,
  staff: 10,
  recentActivities: [
    "5 new students registered today",
    "Teacher attendance: 38/40 present",
    "3 notices published this week"
  ]
};
