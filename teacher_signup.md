---
layout: post
title: Sign Up
permalink: /signup_teacher
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Signup</title>
</head>
<body>
    <h2>Teacher Signup</h2>
    <form id="teacherSignupForm">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br>
        <label for="dob">Date of Birth:</label><br>
        <input type="date" id="dob" name="dob" required><br>
        <button type="submit">Sign Up</button>
    </form>
    <p id="signupMessage"></p>
    <script>
        document.getElementById("teacherSignupForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            fetch('https://localhost:8091/api/teacher/signup', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/teacher_dashboard'; // Redirect to teacher dashboard on successful signup
                } else {
                    document.getElementById("signupMessage").innerText = data.message;
                }
            })
            .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
