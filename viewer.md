---
layout: page
title: Assignment viewer
permalink: /Viewer
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File Upload</title>
</head>
<body>
    <form id="uploadForm">
        <input type="text" id="uname" name="uname"><br>
        <input type="text" id="assignment" name="assignment">
        <!-- <select id="assignmentDropdown">
            <option value="" disabled selected>Select Assignment</option>
        </select>
        <p>Selected Assignment Name: <span id="selectedAssignmentName"></span></p> -->
        <input type="file" id="fileInput" name="file">
        <button type="button" onclick="uploadFile()">Upload</button>
    </form>
    <!-- <h1>Uploaded Files</h1>
    <ul id="fileList"></ul> -->
</body>

<script>
    // document.addEventListener('DOMContentLoaded', function () {
    //     fetch('http://localhost:8091/api/assignments/') 
    //         .then(response => response.json())
    //         .then(data => {
    //             const dropdown = document.getElementById('assignmentDropdown');
    //             data.forEach(assignment => {
    //                 const option = document.createElement('option');
    //                 option.textContent = assignment.title;
    //                 dropdown.appendChild(option);
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error fetching assignment data:', error);
    //         });
    //     document.getElementById('assignmentDropdown').addEventListener('change', function () {
    //         const selectedAssignmentName = this.textContent;
    //         const maxScore = this.value;
    //         document.getElementById('selectedAssignmentName').textContent = selectedAssignmentName;
    //         document.getElementById('selectedAssignmentMaxPoints').textContent = maxScore;
    //     });
    // });

    // fetch('/files/soham')
    //     .then(response => response.json())
    //     .then(files => {
    //         // Handle the list of files (e.g., display them in a list)
    //         console.log(files);
    //     })
    //     .catch(error => console.error('Error fetching files:', error));

    async function uploadFile() {
        const fileInput = document.getElementById('fileInput');
        const nameInput = document.getElementById('uname').value;
        const assignmentInput = document.getElementById('assignment').value;
        const formData = new FormData();

        // alert(document.getElementById('uname').value);
        // alert(document.getElementById('assignment').value);

        formData.append('file', fileInput.files[0]);
        formData.append('name', nameInput);
        formData.append('assignment', assignmentInput);

        try {
            const response = await fetch('http://localhost:8091/upload', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                // alert('File uploaded successfully');
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    }
</script>
</html>
