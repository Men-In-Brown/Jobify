---
layout: page
icon: fa-book
title: Submissions
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment Viewer</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
    <select id="studentDropdown" onchange="showSelectedStudentEmail()">
        <option value="" disabled selected>Select Student</option>
    </select>
    <p>Selected Student Email: <span id="selectedStudentEmail"></span></p>
    <div id="assignmentsContainer">
        <!-- Assignment details will be shown here -->
    </div>
</body>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        fetch('http://localhost:8087/api/grade/')
            .then(response => response.json())
            .then(data => {
                const dropdown = document.getElementById('studentDropdown');
                data.forEach(student => {
                    const option = document.createElement('option');
                    option.value = student.email;
                    option.textContent = student.email;
                    dropdown.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    });
    function showSelectedStudentEmail() {
        var selectedStudentEmail = document.getElementById("studentDropdown").value;
        document.getElementById("selectedStudentEmail").textContent = selectedStudentEmail;
        showAssignments(selectedStudentEmail);
    }
    function showAssignments(studentEmail) {
        var assignmentsContainer = document.getElementById("assignmentsContainer");
        assignmentsContainer.innerHTML = ""; // Clear previous assignment details
        if (studentEmail) {
            fetch('http://localhost:8087/api/grade/email/' + studentEmail)
                .then(response => response.json())
                .then(assignments => {
                    if (assignments.length > 0) {
                        var table = document.createElement("table");
                        var header = table.createTHead();
                        var row = header.insertRow(0);
                        var cell = row.insertCell(0);
                        cell.textContent = "Assignment Title";
                        assignments.forEach(function(assignment) {
                            var row = table.insertRow(-1);
                            var cell = row.insertCell(0);
                            cell.textContent = assignment.title;
                        });
                        assignmentsContainer.appendChild(table);
                    } else {
                        assignmentsContainer.textContent = "No assignments submitted by this student.";
                    }
                })
                .catch(error => {
                    console.error('Error fetching assignment data:', error);
                });
        }
    }
</script>
</html>
