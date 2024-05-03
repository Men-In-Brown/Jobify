---
layout: post
title: Sign Up
permalink: /signuptest
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Your Account Type</title>
</head>
<body>
    <h2>Choose Your Account Type</h2>
    <a href="/signup?role=employer"><button>Employer</button></a>
    <a href="/signup?role=teacher"><button>Teacher</button></a>
    <a href="/signup?role=student"><button>Student</button></a>
</body>
    <script>
        // Extract role from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        // Redirect to the corresponding signup page based on the selected role
        switch (role) {
            case 'employer':
                window.location.href = '/employer_signup.md';
                break;
            case 'teacher':
                window.location.href = '/teacher_signup.md';
                break;
            case 'student':
                window.location.href = '/student_signup.md';
                break;
            default:
                window.location.href = '/index.html';
        }
    </script>
</html>