const apiBaseUrl = 'https://schaal.stu.nighthawkcodingsociety.com/api/internships'; // Base URL for the REST API

// Function to fetch the selected internship
async function fetchSelectedInternship(internshipID) {
    try {
        const response = await fetch(`${apiBaseUrl}/${internshipID}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch internship: ${response.statusText}`);
        }
        const internship = await response.json(); // Get JSON data from the response
        return internship;
    } catch (error) {
        console.error('Error fetching internship:', error);
        return null;
    }
}

// Fetch and display the selected internship on page load
document.addEventListener('DOMContentLoaded', async () => {
    const storedInternshipID = localStorage.getItem('currentInternshipID');
    if (storedInternshipID) {
        const selectedInternship = await fetchSelectedInternship(storedInternshipID);
        if (selectedInternship) {
            displayInternship(selectedInternship);
        } else {
            const card = document.getElementById('internship-details');
            card.innerHTML = `<p>Failed to fetch internship details.</p>`;
        }
    } else {
        const card = document.getElementById('internship-details');
        card.innerHTML = `<p>No internship selected.</p>`;
    }
});

// Function to display internship data in a card
function displayInternship(internship) {
    const card = document.getElementById('internship-details');
    card.innerHTML = `
        <h2>${internship.name}</h2>
        <p><strong>Location:</strong> ${internship.location}</p>
        <p><strong>Industry:</strong> ${internship.industry}</p>
        <p><strong>Size:</strong> ${internship.size}</p>
        <p><strong>Description:</strong> ${internship.description}</p>
        <p><strong>Website:</strong> <a href="${internship.website}" target="_blank">${internship.website}</a></p>
        <p><strong>Year Founded:</strong> ${internship.foundedYear}</p>
        <p><strong>CEO:</strong> ${internship.ceo}</p>
    `;
}

document.getElementById('send-application').addEventListener('click', function() {
    var coverLetter = document.getElementById('cover-letter').files.length;
    var resume = document.getElementById('resume').files.length;
    console.log("Pressed");
    if (coverLetter === 0 || resume === 0) {
        console.log("no uploads");
        alert('Please upload both your cover letter and resume.');
    } else {
        window.location.href = 'sent';
    }
});