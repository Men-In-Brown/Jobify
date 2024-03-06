let companies;
let currentcompanyIndex = -1;
let _companyName, _companyMission;

window.onload = function() {
    const apiUrl = "http://localhost:8085/api/companies";

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        companies = data;
        console.log("Companies data fetched successfully:", companies);

        // Now that you have the data, you can call functions dependent on 'companies'
        swipeCard();  // or any other function you want to call after getting the data
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
};

function getRandomCompany() {
    if (companies && companies.length > 0) {
        const randomIndex = Math.floor(Math.random() * companies.length);
        const randomCompany = companies[randomIndex];
        const { name, mission } = randomCompany;

        _companyName = name;
        _companyMission = mission;

        return { name, mission };
    } else {
        console.log("Companies data is not available yet.");
        return { name: "No company", mission: "No mission" };
    }
}

function displayCompany(company) {
    console.log("Displaying company:", company);
    document.getElementById("companyName").innerText = company.name;
    document.getElementById("companyMission").innerText = company.mission;
}

function storecompaniesLocal(companyName, companyMission) {
    console.log("Storing company locally - Name:", companyName, "Mission:", companyMission);
    localStorage.setItem('_companyName', companyName);
    localStorage.setItem('_companyMission', companyMission);
}

function swipeCard() {
    if (companies && companies.length > 0) {
        const company = getRandomCompany();
        console.log("Swiping card. Current company:", company);
        displayCompany(company);
    } else {
        console.log("Companies data is not available yet.");
    }
}

function invest() {
    console.log("Investing in company:", _companyName);
    storecompaniesLocal(_companyName, _companyMission);
    window.location.href = "invest";
}

function join() {
    console.log("Joining company:", _companyName);
    storecompaniesLocal(_companyName, _companyMission);
    window.location.href = "join";
}

// Event listeners for arrow key presses
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        console.log("ArrowUp key pressed.");
        swipeCard();
    } else if (event.key === "ArrowLeft") {
        console.log("ArrowLeft key pressed.");
        invest();
    } else if (event.key === "ArrowRight") {
        console.log("ArrowRight key pressed.");
        join();
    }
});

let touchStartX = 0;
let touchEndX = 0;

// Function to handle touch start
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

// Function to handle touch end
function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

// Function to determine swipe direction and call corresponding function
function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
        // Swipe right
        join();
    } else if (swipeDistance < -50) {
        // Swipe left
        invest();
    } else {
        // Swipe up
        swipeCard();
    }
}

// Event listeners for touch gestures
document.getElementById("companyCard").addEventListener("touchstart", handleTouchStart);
document.getElementById("companyCard").addEventListener("touchend", handleTouchEnd);

// Initial swipe to show the first company
swipeCard();

const companyCard = document.getElementById("companyCard");

// Function to handle touch start
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

// Function to handle touch end
function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
handleSwipe();
}

// Function to determine swipe direction and call corresponding function
function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

if (swipeDistance > 50) {
    // Swipe right
    join();
} else if (swipeDistance < -50) {
    // Swipe left
    invest();
} else {
    // Swipe up
    swipeCard();
}
}

// Event listeners for touch gestures on the company card
companyCard.addEventListener("touchstart", handleTouchStart);
companyCard.addEventListener("touchend", handleTouchEnd);

const leftSwipeArea = document.createElement("div");
leftSwipeArea.classList.add("invisible-swipe-area", "left-swipe-area");
leftSwipeArea.addEventListener("click", invest);

const rightSwipeArea = document.createElement("div");
rightSwipeArea.classList.add("invisible-swipe-area", "right-swipe-area");
rightSwipeArea.style.left = "auto"; // Reset left property to default
rightSwipeArea.style.right = "0";   // Set the right property to 0
rightSwipeArea.addEventListener("click", join);

const topSwipeArea = document.createElement("div");
topSwipeArea.classList.add("invisible-swipe-area", "top-swipe-area");
topSwipeArea.addEventListener("click", swipeCard);

// Append invisible div elements to the body
document.body.appendChild(leftSwipeArea);
document.body.appendChild(rightSwipeArea);
document.body.appendChild(topSwipeArea);

// Initial swipe to show the first company
swipeCard();