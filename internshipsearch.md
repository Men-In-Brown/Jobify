---
layout: page
title: Advanced Internship Search
permalink: /internship-manual
---

<h1>Search Internships</h1>
<input type="text" id="searchQuery" placeholder="Enter search term...">
<button onclick="searchInternships()">Search</button>

<h2>Internship Results</h2>
<ul id="internshipList" class="internship-list">
    <!-- Internship names will be inserted here -->
</ul>

<script src="{{ site.baseurl }}/assets/js/internship-search.js"></script>