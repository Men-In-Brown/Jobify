let _companyName, _companyMission;

window.onload = function() {
    _companyName = localStorage.getItem("_companyName");
    _companyMission = localStorage.getItem("_companyMission");
    document.getElementById("companyName").innerHTML = "Company: " + _companyName;
    document.getElementById("companyMission").innerHTML = "Mission: " + _companyMission;
    if (_companyMission === null || _companyName === null) {
        console.log("ERROR: Company name or mission not found in localStorage");
    }
}

function submitForm() {
    // Fetch values from the form
    document.getElementById("companyName").innerHTML = "Company: " + _companyName;
    document.getElementById("companyMission").innerHTML = "Mission: " + _companyMission;
    console.log("_companyName:", _companyName);
    console.log("_companyMission:", _companyMission);

    // Validate the checkbox
    var understandCheckbox = document.getElementById("understandCheckbox").checked;
    if (!understandCheckbox) {
        alert("Please acknowledge that this is not a real investment.");
        return;
    }

    // Additional logic or actions can be added here based on the form submission
    // For example, you might want to send the data to a server or perform other actions.
}