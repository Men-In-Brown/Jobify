async function searchInternships() {
    const searchQuery = document.getElementById('searchQuery').value;
    const url = `https://schaal.stu.nighthawkcodingsociety.comapi/internships/search?query=${encodeURIComponent(searchQuery)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }   
        const internships = await response.json();
        displayInternships(internships);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayInternships(internships) {
    const list = document.getElementById('internshipList');
    list.innerHTML = ''; // Clear existing items

    internships.forEach(internship => {
        const listItem = document.createElement('li');
        listItem.textContent = internship.name;
        list.appendChild(listItem);
    });
}