---
layout: page
title: Apply to a Company
permalink: /apply
---

<link rel="stylesheet" type="text/css" href="{{ site.baseurl }}/assets/css/invest.css">

<div class="container">
    <h1>Application Confirmation</h1>
    <p id="companyName">Company:</p>
    <p id="companyMission">Mission:</p>
    <form id="investmentForm">
        <button type="button" class="submit-btn" onclick="submitForm()">Apply</button>
        <button type="button" class="submit-btn" onclick="window.location.href = 'AB_companyfindr.html'">Cancel</button>
    </form>
</div>

<script src="{{ site.baseurl }}/assets/js/invest.js"></script>