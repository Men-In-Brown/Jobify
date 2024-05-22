// Utility function to convert FormData to a plain object
function formDataToJson(formData) {
    const json = {};
    formData.forEach((value, key) => {
        // If the key is repeated (e.g., for checkboxes or multi-selects), handle appropriately
        if (json[key]) {
            if (!Array.isArray(json[key])) {
                json[key] = [json[key]];
            }
            json[key].push(value);
        } else {
            json[key] = value;
        }
    });
    return json;
}
async function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target; // Get the form element
    const formData = new FormData(form); // Create FormData from the form
    const jsonData = formDataToJson(formData); // Convert to JSON object
    const jsonBody = JSON.stringify(jsonData); // Convert to JSON string
    try {
        const response = await fetch('http://localhost:8091/api/internships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set JSON content type
            },
            body: jsonBody, // Send JSON data
        });
        if (response.ok) {
            alert('Internship created successfully!');
        } else {
            const errorText = await response.text();
            console.error('Submission failed:', errorText);
            alert(`Submission failed: ${errorText}`);
        }
    } catch (error) {
        console.error('An error occurred during form submission:', error);
        alert('An error occurred. Please try again later.');
    }
}