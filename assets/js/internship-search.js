async function searchInternships() {
    const searchQuery = document.getElementById('searchQuery').value;
    const url = `https://schaal.stu.nighthawkcodingsociety.com/api/internships/search?query=${encodeURIComponent(searchQuery)}`;
    
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
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = internship.name;
        row.appendChild(nameCell);

        const locationCell = document.createElement('td');
        locationCell.textContent = internship.location;
        row.appendChild(locationCell);

        const industryCell = document.createElement('td');
        industryCell.textContent = internship.industry;
        row.appendChild(industryCell);

        const sizeCell = document.createElement('td');
        sizeCell.textContent = internship.size;
        row.appendChild(sizeCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = internship.description;
        row.appendChild(descriptionCell);

        const websiteCell = document.createElement('td');
        const websiteLink = document.createElement('a');
        websiteLink.href = internship.website;
        websiteLink.textContent = internship.website;
        websiteLink.target = "_blank";
        websiteCell.appendChild(websiteLink);
        row.appendChild(websiteCell);

        const foundedYearCell = document.createElement('td');
        foundedYearCell.textContent = internship.foundedYear;
        row.appendChild(foundedYearCell);

        const ceoCell = document.createElement('td');
        ceoCell.textContent = internship.ceo;
        row.appendChild(ceoCell);

        list.appendChild(row);
    });
}
