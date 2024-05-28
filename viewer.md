---
layout: page
title: Assignment viewer
permalink: /Viewer
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Assignment viewer</title>
    <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf_viewer.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf_viewer.min.js"></script>
</head>
<body>
    <h1>Uploaded Files</h1>
    <select id="fileDropdown">
        <option value="" disabled selected>Select File</option>
    </select>
    <p><span id="selectedFileName" hidden></span></p>
    <div id="fileContainer"></div>
</body>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const url = "http://localhost:8091";
        const fileContainer = document.getElementById("fileContainer");
        function fetchFiles() {
            fetch(url + "/api/fileupload/")
                .then(response => response.json())
                .then(data => {
                    const dropdown = document.getElementById('fileDropdown');
                    dropdown.innerHTML = '<option value="" disabled selected>Select File</option>'; // Clear existing options and add default option
                    data.forEach(file => {
                        const option = document.createElement('option');
                        option.value = file.path; // Use the file path as the value
                        option.textContent = file.assignment + " - " + file.name; // Display the file name
                        dropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching file data:', error);
                });
        }
        function loadPDF(url) {
            const loadingTask = pdfjsLib.getDocument(url);
            loadingTask.promise.then(function(pdf) {
                const numPages = pdf.numPages;
                // Loop through all pages
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pdf.getPage(pageNum).then(function(page) {
                        const scale = 1.5;
                        const viewport = page.getViewport({ scale: scale });
                        // Prepare canvas using PDF page dimensions
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        // Append the canvas to the fileContainer
                        fileContainer.appendChild(canvas);
                        // Render the PDF page into the canvas context
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                    });
                }
            }, function(reason) {
                console.error(reason);
                fileContainer.innerHTML = `<p>Error loading PDF file.</p>`;
            });
        }
        document.getElementById('fileDropdown').addEventListener('change', function () {
            const selectedFilePath = this.value;
            document.getElementById('selectedFileName').textContent = selectedFilePath;
            // Determine the file type based on its extension
            const fileExtension = selectedFilePath.split('.').pop().toLowerCase();
            let fileElement;
            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                // Create an image element if the file is an image
                fileElement = `<img src="${url}${selectedFilePath}" alt="Selected File" style="max-width: 100%;">`;
                fileContainer.innerHTML = fileElement;
            } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                // Create a video element if the file is a video
                fileElement = `
                    <video controls style="max-width: 100%;">
                        <source src="${url}${selectedFilePath}" type="video/${fileExtension}">
                        Your browser does not support the video tag.
                    </video>`;
                fileContainer.innerHTML = fileElement;
            } else if (['txt'].includes(fileExtension)) {
                // Fetch and display text file content
                fetch(url + selectedFilePath)
                    .then(response => response.text())
                    .then(text => {
                        fileElement = `<pre style="white-space: pre-wrap;">${text}</pre>`;
                        fileContainer.innerHTML = fileElement;
                    })
                    .catch(error => {
                        fileElement = `<p>Error loading text file.</p>`;
                        fileContainer.innerHTML = fileElement;
                    });
            } else if (['pdf'].includes(fileExtension)) {
                // Load the PDF using PDF.js
                loadPDF(url + selectedFilePath);
            } else {
                fileElement = `<p>Selected file type is not supported for preview.</p>`;
                fileContainer.innerHTML = fileElement;
            }
        });
        // Fetch the files when the page loads
        fetchFiles();
    });
</script>
</html>
