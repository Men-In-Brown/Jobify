---
toc: true
comments: false
layout: page
title: Invest in an Company
permalink: /invest
---

<link rel="stylesheet" type="text/css" href="{{ site.baseurl }}/assets/css/invest.css">

<div class="container">
    <h1>Investment Company Confirmation</h1>
    <p id="companyName">Company:</p>
    <p id="companyMission">Mission:</p>
    <form id="investmentForm">
        <div class="checkbox-container">
            <label class="checkbox-label"><input type="checkbox" id="understandCheckbox" name="understandCheckbox" class="checkbox-input">I understand that this is not a real investment and that I am not paying actual money to the owner of this company. This is simply to use to show support the company owner for this company.</label>
        </div><br>
        <button type="button" class="submit-btn" onclick="submitForm()">Invest</button>
        <button type="button" class="submit-btn" onclick="window.location.href = 'AB_companyfindr.html'">Cancel</button>
    </form>
</div>

<script src="{{ site.baseurl }}/assets/js/invest.js"></script>