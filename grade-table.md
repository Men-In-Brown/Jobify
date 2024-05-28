---
layout: page
title: Grades
permalink: /grade-table
---

<label for="sortProperty">Sort by:</label>
<select id="sortProperty">
    <option value="email">Email</option>
    <option value="name">Name</option>
    <option value="assignment">Assignment</option>
    <option value="maxPoints">Max Points</option>
    <option value="score">Score</option>
</select>
<button onclick="sortGrades()">Sort</button>

<h2>Sorted Grades</h2>
<table id="gradesTable">
    <thead>
        <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Assignment</th>
            <th>Max Points</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<script src="{{ site.baseurl }}/assets/js/grades.js"></script>