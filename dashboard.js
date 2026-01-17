const user = JSON.parse(localStorage.currentUser);
const menu = document.getElementById("menu");
const content = document.getElementById("content");
title.innerText = user.role.toUpperCase() + " DASHBOARD";

const menus = {
  student: [
    "Attendance", "Grades", "Marks", "CGPA",
    "Courses", "Class Routine", "Exam Routine", "Notices"
  ],
  teacher: [
    "Give Attendance", "Give Marks", "Give Grades",
    "CGPA", "Students", "Student Info", "Notices"
  ],
  staff: [
    "Add User", "Modify User", "Remove User",
    "All Users", "User Info", "Add Notice", "Delete Notice"
  ]
};

menus[user.role].forEach(m => {
  const b = document.createElement("button");
  b.innerText = m;
  b.onclick = () => loadPage(m);
  menu.appendChild(b);
});

function loadPage(page) {
  content.innerHTML = `<h3>${page}</h3><p>Functionality demo</p>`;
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}
