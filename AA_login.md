---
layout: post
title: Login
units: "1,2,3,4,5,6,7,8,9"
course: csa
---

<link rel="stylesheet" type="text/css" href="{{ site.baseurl }}/assets/css/login.css">

<div id="login-container">
    <div id="login-header">
        Login
    </div>
    <div id="login-form">
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button onclick="login()">Login</button>
    </div>
</div>

<script src="{{ site.baseurl }}/assets/js/login.js"></script>