const apiBaseUrl = 'https://schaal.stu.nighthawkcodingsociety.com/api/internships'; // Base URL for the REST API

let currentInternshipID; // Variable to keep track of the currently displayed internship

// Function to fetch all internships
async function fetchInternships() {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch internships: ${response.statusText}`);
        }

        const internships = await response.json(); // Get JSON data from the response
        return internships;
    } catch (error) {
        console.error('Error fetching internships:', error);
        return null;
    }
}

// Function to display internship data in a card
function displayInternship(internship) {
    const card = document.querySelector('.card');
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

// Fetch and display a random internship on page load
fetchInternships().then((internships) => {
    if (internships && internships.length > 0) {
        const randomIndex = Math.floor(Math.random() * internships.length);
        const randomInternship = internships[randomIndex];
        displayInternship(randomInternship);
    } else {
        const card = document.querySelector('.card');
        card.innerHTML = `<p>No internships available.</p>`;
    }
});

// Handle keydown events for navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { // If right arrow key is pressed
        fetchInternships().then((internships) => {
            if (internships && internships.length > 0) {
                const randomIndex = Math.floor(Math.random() * internships.length);
                const randomInternship = internships[randomIndex];
                console.log(randomInternship);
                currentInternshipID = randomInternship.id;
                console.log(currentInternshipID);
                displayInternship(randomInternship);
            }
        });
    } else if (e.key === 'ArrowLeft') {
        localStorage.setItem('currentInternshipID', currentInternshipID);
        // Redirect to another directory
        window.location.href = 'join';
    }
});

// Debugging: Log the locally stored internship on page load
document.addEventListener('DOMContentLoaded', (event) => {
    const storedInternship = localStorage.getItem('currentInternship');
    if (storedInternship) {
        console.log('Stored internship:', JSON.parse(storedInternship));
    } else {
        console.log('No internship stored in local storage.');
    }
});
