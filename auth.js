function showSignup() {
  loginBox.hidden = true;
  signupBox.hidden = false;
}

function showLogin() {
  loginBox.hidden = false;
  signupBox.hidden = true;
  forgotBox.hidden = true;
}

function showForgot() {
  loginBox.hidden = true;
  forgotBox.hidden = false;
}

function signup() {
  const users = JSON.parse(localStorage.users);
  users.push({
    name: sName.value,
    id: sId.value,
    phone: sPhone.value,
    email: sEmail.value,
    pass: sPass.value,
    role: sRole.value
  });
  localStorage.users = JSON.stringify(users);
  alert("Signup successful");
  showLogin();
}

function login() {
  const users = JSON.parse(localStorage.users);
  const user = users.find(
    u => u.id === loginId.value && u.pass === loginPass.value
  );

  if (!user) return alert("Invalid credentials");

  localStorage.currentUser = JSON.stringify(user);
  location.href = "dashboard.html";
}

function forgot() {
  alert("Password recovery demo only");
}
