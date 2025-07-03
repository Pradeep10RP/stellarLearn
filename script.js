let isSignup = false;
function toggleForm() {
  isSignup = !isSignup;
  document.getElementById('form-title').innerText = isSignup ? "Signup" : "Login";
  document.getElementById('toggle-link').innerText = isSignup ? "Already have an account? Login" : "Don't have an account? Signup";
  document.getElementById('email').style.display = isSignup ? "block" : "none";
  document.getElementById('confirmPassword').style.display = isSignup ? "block" : "none";
}
function submitForm() {
  const userid = document.getElementById('userid').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const alertBox = document.getElementById('alert');

  if (!userid || !password || (isSignup && (!email || !confirmPassword))) {
    alertBox.innerText = "Please fill all fields.";
    return;
  }
  if (isSignup && password !== confirmPassword) {
    alertBox.innerText = "Passwords do not match.";
    return;
  }

  const url = isSignup ? "http://localhost:5000/signup" : "http://localhost:5000/login";
  const data = isSignup ? { userid, email, password } : { userid, password };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(res => {
      alertBox.innerText = res.message;
      if (res.message.startsWith("Welcome") || res.message === "Signup successful") {
        localStorage.setItem('userid', userid);
        window.location.href = 'quiz.html';
      }
    });
}
