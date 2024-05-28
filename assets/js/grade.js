async function sortGrades() {
    const sortProperty = document.getElementById('sortProperty').value;
    const url = `http://localhost:8091/api/grade/${sortProperty}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const grades = await response.json();
        displayGrades(grades);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayGrades(grades) {
    const tableBody = document.getElementById('gradesTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    grades.forEach(grade => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${grade.email}</td>
            <td>${grade.name}</td>
            <td>${grade.assignment}</td>
            <td>${grade.maxPoints}</td>
            <td>${grade.score}</td>
        `;
        
        tableBody.appendChild(row);
    });
}