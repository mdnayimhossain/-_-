// Initialize localStorage for users
if (!localStorage.users) {
    localStorage.users = JSON.stringify([]);
}

// Check if user is logged in (for dashboard)
function checkLogin() {
    if (!localStorage.currentUser) {
        window.location.href = "index.html";
        return null;
    }
    return JSON.parse(localStorage.currentUser);
}

// Login function
function login() {
    const users = JSON.parse(localStorage.users);
    const loginId = document.getElementById('loginId').value;
    const loginPass = document.getElementById('loginPass').value;
    const loginRole = document.getElementById('loginRole').value;

    const user = users.find(
        u => u.id === loginId && u.pass === loginPass && u.role === loginRole
    );

    if (!user) {
        alert("Invalid credentials or role");
        return false;
    }

    localStorage.currentUser = JSON.stringify(user);
    window.location.href = "dashboard.html";
    return true;
}

// Signup function
function signup() {
    const users = JSON.parse(localStorage.users);
    const sName = document.getElementById('sName').value;
    const sId = document.getElementById('sId').value;
    const sPhone = document.getElementById('sPhone').value;
    const sEmail = document.getElementById('sEmail').value;
    const sPass = document.getElementById('sPass').value;
    const sRole = document.getElementById('sRole').value;

    if (!sName || !sId || !sPhone || !sEmail || !sPass) {
        alert("Please fill in all fields");
        return false;
    }

    // Check if user already exists
    if (users.some(u => u.id === sId)) {
        alert("User with this ID already exists");
        return false;
    }

    users.push({
        name: sName,
        id: sId,
        phone: sPhone,
        email: sEmail,
        pass: sPass,
        role: sRole
    });

    localStorage.users = JSON.stringify(users);
    alert("Signup successful! Please login.");
    
    // Clear form
    document.getElementById('sName').value = '';
    document.getElementById('sId').value = '';
    document.getElementById('sPhone').value = '';
    document.getElementById('sEmail').value = '';
    document.getElementById('sPass').value = '';
    
    return true;
}

// Logout function
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    }
}
