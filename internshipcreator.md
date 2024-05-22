---
layout: page
title: Internship Creator (for Employers)
---

<meta charset="UTF-8">
<title>Internship Creator (for Employers)</title>
<script src="{{ site.baseurl }}/assets/js/internship-creator.js"></script>
<h1>Internship Creator (for Employers)</h1>
<!-- Form with onsubmit handler pointing to submitForm function -->
<form onsubmit="submitForm(event)"> <!-- Prevent default form submission -->
    <!-- Form fields -->
    <div>
        <label for="name">Company Name:</label>
        <input type="text" id="name" name="name" required>
    </div>
    <div>
        <label for="ceo">CEO:</label>
        <input type="text" id="ceo" name="ceo" required>
    </div>
    <div>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" required>
    </div>
    <div>
        <label for="year-founded">Year Founded:</label>
        <input type="number" id="year-founded" name="year_founded">
    </div>
    <div>
        <label for="industry">Industry:</label>
        <input type="text" id="industry" name="industry" required>
    </div>
    <div>
        <label for="location">Location:</label>
        <input type="text" id="location" name="location" required>
    </div>
    <div>
        <label for="size">Company Size:</label>
        <input type="number" id="size" name="size" required min="1">
    </div>
    <div>
        <label for="website">Website:</label>
        <input type="url" id="website" required>
    </div>
    <div>
        <button type="submit">Create Internship</button>
    </div>
</form>