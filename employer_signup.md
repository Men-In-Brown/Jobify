---
layout: post
title: Sign Up
permalink: /signup_employer
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employer Signup</title>
</head>
<body>
    <h2>Employer Signup</h2>
    <form id="employerSignupForm">
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
        document.getElementById("employerSignupForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            fetch('https://localhost:8091/api/person/signup', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/employer_dashboard'; // Redirect to employer dashboard on successful signup
                } else {
                    document.getElementById("signupMessage").innerText = data.message;
                }
            })
            .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
