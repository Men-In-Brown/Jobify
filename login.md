---
layout: post
title: Login
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