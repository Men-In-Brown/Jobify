---
layout: page
icon: fa-book
title: Grades
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grade Search</title>
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
    <h2>Select Student:</h2>
    <!-- Dropdown to display student names -->
    <select id="studentDropdown">
        <option value="" disabled selected>Select Student</option>
    </select>
    <select id="assignmentDropdown">
        <option value="" disabled selected>Select Assignment</option>
    </select>
    <!-- Display selected student ID -->
    <p><span id="selectedStudentEmail" hidden></span></p>
    <p><span id="selectedAssignmentName" hidden></span></p>
    <p><span id="selectedAssignmentMaxPoints" hidden></span></p>
    <div id="result"></div>
    <div id="resultTable"></div>
    <div id="totalGrade"></div> <!-- Container for displaying total grade -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const totalGradeElement = document.getElementById('totalGrade');
            function calculateTotalGrade(data) {
                let totalScore = 0;
                let maxPoints = 0;
                data.forEach(student => {
                    totalScore += parseFloat(student.score);
                    maxPoints += parseFloat(student.maxPoints);
                });
                const totalGrade = (totalScore / maxPoints) * 100;
                totalGradeElement.textContent = `Total Grade: ${totalGrade.toFixed(2)}%`;
            }
            function fetchStudents() {
                fetch('http://localhost:8091/api/grade/')
                    .then(response => response.json())
                    .then(data => {
                        const dropdown = document.getElementById('studentDropdown');
                        dropdown.innerHTML = ''; // Clear existing options
                        data.forEach(student => {
                            const option = document.createElement('option');
                            option.value = student.email;
                            option.textContent = student.name;
                            dropdown.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching student data:', error);
                    });
            }
            function fetchAssignments() {
                fetch('http://localhost:8091/api/assignments/')
                    .then(response => response.json())
                    .then(data => {
                        const dropdown = document.getElementById('assignmentDropdown');
                        dropdown.innerHTML = ''; // Clear existing options
                        if (!Array.isArray(data)) {
                            data = Object.values(data); // Convert object values to array if needed
                        }
                        data.forEach(assignment => {
                            const option = document.createElement('option');
                            option.value = assignment.id;
                            option.textContent = assignment.title;
                            dropdown.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching assignment data:', error);
                    });
            }
            document.getElementById('studentDropdown').addEventListener('change', function () {
                const selectedStudentEmail = this.value;
                document.getElementById('selectedStudentEmail').textContent = selectedStudentEmail;
                searchName();
                calculateTotalGrade(data);
            });
            document.getElementById('assignmentDropdown').addEventListener('change', function () {
                const selectedAssignmentId = this.value;
                const selectedAssignmentName = this.options[this.selectedIndex].text;
                document.getElementById('selectedAssignmentName').textContent = selectedAssignmentName;
                searchAssignment();
            });
            function searchName() {
                const studentEmail = document.getElementById('selectedStudentEmail').textContent;
                fetch(`http://localhost:8091/api/grade/email/${studentEmail}`)
                    .then(response => response.json())
                    .then(data => {
                        displayStudentResults(data);
                        calculateTotalGrade(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            function displayStudentResults(data) {
                var resultDiv = document.getElementById("result");
                resultDiv.innerHTML = '';
                if (data.length === 0) {
                    resultDiv.innerHTML = 'No grades found with the given selection.';
                } else {
                    const resultContainer = document.getElementById("resultTable");
                    resultContainer.innerHTML = ''; // Clear previous table data
                    // Construct Table header
                    const headerRow = document.createElement("tr");
                    const headers = ["Email", "Assignment", "Max Score", "Grade", "Update"];
                    headers.forEach(headerText => {
                        const th = document.createElement("th");
                        th.textContent = headerText;
                        headerRow.appendChild(th);
                    });
                    resultContainer.appendChild(headerRow);
                    // Add data rows
                    data.forEach(student => {
                        const row = document.createElement("tr");
                        const emailCell = document.createElement("td");
                        emailCell.textContent = student.email;
                        const assignmentCell = document.createElement("td");
                        assignmentCell.textContent = student.assignment;
                        const maxscoreCell = document.createElement("td");
                        maxscoreCell.textContent = student.maxPoints;
                        const gradeCell = document.createElement("td");
                        const gradeInput = document.createElement("input");
                        gradeInput.type = "text";
                        gradeInput.value = student.score;
                        gradeInput.addEventListener('input', function() {
                            student.score = this.value;
                        });
                        gradeCell.appendChild(gradeInput);
                        const updateCell = document.createElement("td");
                        const updateButton = document.createElement("button");
                        updateButton.textContent = "Update";
                        updateButton.addEventListener('click', function() {
                            const requestOptions = {
                                method: 'PUT',
                                headers: {
                                    "content-type": "application/json",
                                    'Authorization': 'Bearer my-token',
                                },
                            };
                            fetch(`http://localhost:8091/api/grade/update/${student.id}?newEmail=${student.email}&newAssignment=${student.assignment}&newMaxPoints=${student.maxPoints}&newScore=${student.score}`, requestOptions)
                                .then(response => {
                                    if (response.status !== 200) {
                                        const errorMsg = 'Invalid Input - Database Update error: ' + response.status;
                                        console.log(errorMsg);
                                        alert(errorMsg);
                                        return;
                                    }
                                    response.json().then(data => {
                                        resultDiv.innerHTML = response.status;
                                    });
                                })
                        });
                        updateCell.appendChild(updateButton);
                        row.appendChild(emailCell);
                        row.appendChild(assignmentCell);
                        row.appendChild(maxscoreCell);
                        row.appendChild(gradeCell);
                        row.appendChild(updateCell);
                        resultContainer.appendChild(row);
                    });
                }
            }
            function searchAssignment() {
                const assignmentId = document.getElementById('assignmentDropdown').value;
                fetch(`http://localhost:8091/api/assignments/${assignmentId}`)
                    .then(response => response.json())
                    .then(data => {
                        displayAssignmentResults(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            function displayAssignmentResults(data) {
                var resultDiv = document.getElementById("result");
                resultDiv.innerHTML = '';
                if (!data.submissions || Object.keys(data.submissions).length === 0) {
                    resultDiv.innerHTML = 'No submissions found for this assignment.';
                    resultContainer.innerHTML = '';
                    return;
                }
                const submissions = data.submissions;
                const resultContainer = document.getElementById("resultTable");
                resultContainer.innerHTML = ''; // Clear previous table data
                // Construct Table header
                const headerRow = document.createElement("tr");
                const headers = ["Email", "Assignment", "Max Score", "Grade", "Update"];
                headers.forEach(headerText => {
                    const th = document.createElement("th");
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                resultContainer.appendChild(headerRow);
                // Add data rows for each submission
                Object.keys(submissions).forEach(username => {
                    const submission = submissions[username];
                    const row = document.createElement("tr");
                    // Email column (using username as email)
                    const emailCell = document.createElement("td");
                    emailCell.textContent = username;
                    row.appendChild(emailCell);
                    // Assignment column
                    const assignmentCell = document.createElement("td");
                    assignmentCell.textContent = data.title; // Use assignment title from the API response
                    row.appendChild(assignmentCell);
                    // Max Score column
                    const maxScoreCell = document.createElement("td");
                    maxScoreCell.textContent = data.maxPoints; // Use maxPoints from the API response
                    row.appendChild(maxScoreCell);
                    // Grade column (set to -1 if ungraded)
                    const gradeCell = document.createElement("td");
                    const gradeInput = document.createElement("input");
                    gradeInput.type = "text";
                    gradeInput.value = -1; // Set default grade to -1
                    gradeInput.addEventListener('input', function() {
                        submission.score = this.value;
                    });
                    gradeCell.appendChild(gradeInput);
                    row.appendChild(gradeCell);
                    // Update button column
                    const updateCell = document.createElement("td");
                    const updateButton = document.createElement("button");
                    updateButton.textContent = "Update";
                    // Add click event listener to update button
                    updateButton.addEventListener('click', function() {
                        const requestOptions = {
                            method: 'PUT',
                            headers: {
                                "content-type": "application/json",
                                'Authorization': 'Bearer my-token',
                            },
                        };
                        fetch(`http://localhost:8091/api/grade/update/${student.id}?newEmail=${username}&newAssignment=${data.title}&newMaxPoints=${data.maxPoints}&newScore=${submission.score}`, requestOptions)
                            .then(response => {
                                if (response.status !== 200) {
                                    const errorMsg = 'Invalid Input - Database Update error: ' + response.status;
                                    console.log(errorMsg);
                                    alert(errorMsg);
                                    return;
                                }
                                response.json().then(data => {
                                    resultDiv.innerHTML = response.status;
                                });
                            })
                    });
                    updateCell.appendChild(updateButton);
                    row.appendChild(updateCell);
                    resultContainer.appendChild(row);
                });
            }
            // Initial fetch of data on page load
            fetchStudents();
            fetchAssignments();
        });
    </script>
</body>
</html>