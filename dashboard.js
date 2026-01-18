// Simple debug logging
console.log("dashboard.js loaded");

// Check if user is logged in
if (!localStorage.currentUser) {
    console.log("No user found, redirecting to login");
    window.location.href = "index.html";
} else {
    console.log("User found in localStorage");
    
    // Parse user data
    const user = JSON.parse(localStorage.currentUser);
    console.log("User role:", user.role);
    
    // Initialize dashboard after DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded, initializing dashboard");
        initializeDashboard(user);
    });
    
    // Also try to initialize if DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log("DOM already loaded, initializing now");
        setTimeout(() => initializeDashboard(user), 100);
    }
}

function initializeDashboard(user) {
    console.log("Initializing dashboard for user:", user.name);
    
    // Get DOM elements
    const title = document.getElementById('title');
    const userInfo = document.getElementById('userInfo');
    const menu = document.getElementById('menu');
    const content = document.getElementById('content');
    
    // Update title
    if (title) {
        title.textContent = user.role.toUpperCase() + " DASHBOARD";
    }
    
    // Update user info
    if (userInfo) {
        userInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Role:</strong> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    }
    
    // Define menu items based on role
    const menuItems = {
        student: [
            "Attendance", 
            "Marks",
            "Grades", 
            "CGPA",
            "Courses", 
            "Class Routine", 
            "Exam Routine", 
            "Notices"
        ],
        teacher: [
            "Give Attendance", 
            "Give Marks", 
            "Give Grades",
            "Manage CGPA", 
            "View Students", 
            "Student Info", 
            "Publish Notices"
        ],
        staff: [
            "Add User", 
            "Modify User", 
            "Remove User",
            "View All Users", 
            "User Information", 
            "Add Notice", 
            "Delete Notice"
        ]
    };
    
    // Clear existing menu and add new buttons
    if (menu) {
        menu.innerHTML = ''; // Clear existing
        
        // Add menu buttons
        menuItems[user.role].forEach(item => {
            const button = document.createElement('button');
            button.textContent = item;
            button.onclick = function() {
                loadContent(item, user.role);
            };
            menu.appendChild(button);
        });
    }
    
    // Show welcome message
    if (content) {
        content.innerHTML = `
            <div class="welcome-box">
                <h2>Welcome, ${user.name}!</h2>
                <div class="role-badge">${user.role.toUpperCase()}</div>
                <p>Select an option from the menu to get started</p>
                <p><small>Role: ${user.role} | ID: ${user.id}</small></p>
            </div>
        `;
    }
    
    console.log("Dashboard initialized successfully");
}

// Content loading function
function loadContent(page, role) {
    console.log("Loading page:", page, "for role:", role);
    
    const content = document.getElementById('content');
    if (!content) return;
    
    let html = `<h3>${page}</h3>`;
    
    // Load different content based on role
    if (role === 'student') {
        html += getStudentContent(page);
    } else if (role === 'teacher') {
        html += getTeacherContent(page);
    } else if (role === 'staff') {
        html += getStaffContent(page);
    }
    
    content.innerHTML = html;
}

// Student content
function getStudentContent(page) {
    const studentData = window.studentData || {
        attendance: "90%",
        cgpa: "3.75",
        courses: ["Web Development", "Database Management", "Software Engineering"],
        marks: {
            "Web Development": 85,
            "Database Management": 78,
            "Software Engineering": 92
        }
    };
    
    switch(page) {
        case 'Attendance':
            return `<p><strong>Your Attendance:</strong> ${studentData.attendance}</p>`;
        case 'Marks':
            let marksHtml = '<p><strong>Your Marks:</strong></p><ul>';
            for (let course in studentData.marks) {
                marksHtml += `<li>${course}: ${studentData.marks[course]}/100</li>`;
            }
            return marksHtml + '</ul>';
        case 'CGPA':
            return `<p><strong>Your CGPA:</strong> ${studentData.cgpa}</p>`;
        case 'Courses':
            return `<p><strong>Your Courses:</strong></p><ul>` +
                   studentData.courses.map(c => `<li>${c}</li>`).join('') +
                   '</ul>';
        default:
            return `<p>This is the ${page} page for students.</p>`;
    }
}

// Teacher content
function getTeacherContent(page) {
    const teacherData = window.teacherData || {
        students: [
            { name: "John Doe", id: "ST001" },
            { name: "Jane Smith", id: "ST002" }
        ]
    };
    
    switch(page) {
        case 'View Students':
            let studentsHtml = '<p><strong>Your Students:</strong></p><ul>';
            teacherData.students.forEach(s => {
                studentsHtml += `<li>${s.name} (${s.id})</li>`;
            });
            return studentsHtml + '</ul>';
        default:
            return `<p>This is the ${page} page for teachers.</p>`;
    }
}

// Staff content
function getStaffContent(page) {
    switch(page) {
        case 'View All Users':
            return `
                <p><strong>System Statistics:</strong></p>
                <ul>
                    <li>Total Users: 150</li>
                    <li>Students: 100</li>
                    <li>Teachers: 40</li>
                    <li>Staff: 10</li>
                </ul>
            `;
        default:
            return `<p>This is the ${page} page for staff.</p>`;
    }
}

// Make functions globally available
window.loadPage = function(page) {
    const user = JSON.parse(localStorage.currentUser);
    loadContent(page, user.role);
};

window.logout = function() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    }
};
