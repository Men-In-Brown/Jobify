---
layout: post
title: Log In
permalink: /login_student
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Login</title>
</head>
<body>
    <h2>Student Login</h2>
    <form id="studentLoginForm">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Login</button>
    </form>
    <p id="loginMessage"></p>
    <script>
        document.getElementById("studentLoginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            fetch('https://localhost:8091/api/student/login', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/student_dashboard'; // Redirect to student dashboard on successful login
                } else {
                    document.getElementById("loginMessage").innerText = data.message;
                }
            })
            .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
