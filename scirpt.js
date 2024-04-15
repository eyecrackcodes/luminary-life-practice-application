const body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar"), // Changed "body.querySelector" to "document.querySelector"
    toggle = document.querySelector(".toggle"), // Changed "body.querySelector" to "document.querySelector"
    searchBtn = document.querySelector(".search-box"), // Added missing comma
    modeSwitch = document.querySelector(".toggle-switch"),
    modeText = document.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.textContent = "Light Mode";
    } else {
        modeText.textContent = "Dark Mode";
    }
});

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach (sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -15;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove("active");
                    document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
                });
            };
        });
    }
    // Calculate age when Date of Birth input changes
document.getElementById("dob").addEventListener("change", function() {
    var dob = new Date(this.value);
    var age = calculateAge(dob);
    var ageInput = document.getElementById("age");
    ageInput.value = age;
});

// Display quote when Face Amount input is filled
document.getElementById("face-amount").addEventListener("input", function() {
    calculateQuote();
});

function calculateQuote() {
    // Fetching input values
    var dobInput = document.getElementById("dob");
    var ageInput = document.getElementById("age");
    var faceAmountInput = document.getElementById("face-amount");

    // Validating inputs
    if (!dobInput.value || !faceAmountInput.value) {
        document.getElementById("quote-result").innerHTML = "Please fill in all required fields.";
        return;
    }

    var dob = new Date(dobInput.value);
    var age = calculateAge(dob);

    if (age === null) {
        document.getElementById("quote-result").innerHTML = "Invalid date of birth.";
        return;
    }

    // Updating age input value
    ageInput.value = age;

    var rateClass = document.getElementById("rate-class").value;
    var gender = document.getElementById("gender").value;
    var faceAmount = parseInt(faceAmountInput.value);

    // Validating face amount
    if (isNaN(faceAmount) || faceAmount <= 0) {
        document.getElementById("quote-result").innerHTML = "Please enter a valid face amount.";
        return;
    }

    var annualPremium = calculateAnnualPremium(age, rateClass, gender, faceAmount);

    if (!isNaN(annualPremium)) {
        // Format the annual premium for display
        var formattedAnnualPremium = annualPremium.toLocaleString("en-US", { style: "currency", currency: "USD" });
        document.getElementById("quote-result").innerHTML = "Annual Premium: " + formattedAnnualPremium;
    } else {
        document.getElementById("quote-result").innerHTML = "An error occurred while calculating the premium.";
    }
}

function calculateAge(birthDate) {
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function calculateAnnualPremium(age, rateClass, gender, faceAmount) {
    var rates = {
        "male": [
            5, 5, 5, 6, 6, 6, 6, 6, 7, 7,
            7, 7, 7, 7, 7, 8, 8, 8, 8, 8,
            8, 8, 8, 8, 9, 9
        ],
        "female": [
            4, 4, 4, 4, 4, 4, 5, 5, 5, 5,
            5, 5, 6, 6, 6, 6, 6, 6, 7, 7,
            7, 7, 7, 7, 8, 8
        ]
    };

    var ageIndex = Math.min(age - 50, 25); // Maximum age is 75, so cap it at 25
    var rate = rates[gender][ageIndex];

    if (rateClass === "level") {
        rate -= 2;
    } else if (rateClass === "graded") {
        rate += 2;
    } else if (rateClass === "GI") {
        rate += 4;
    }

    // Apply the multiplier based on the rate class
    var rateMultiplier = 0.5; // Adjust this multiplier as needed
    var adjustedRate = rate * rateMultiplier;

    var annualPremium = adjustedRate * faceAmount / 1000;

    return annualPremium;
}
// Add event listeners to radio buttons for questions 1-7 in the medical questions section
document.querySelectorAll('#medical-questions input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        // Check if any of the radio buttons for questions 1-7 has been selected with the value "Yes"
        if (radio.checked && radio.value === 'yes' && radio.name.startsWith('question')) {
            // Display a popup window with the message
            alert('The Proposed Insured is not eligible for any coverage.');
        }
    });
});

document.querySelectorAll('#medical-questions input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        // Check if any of the radio buttons for questions 1-7 has been selected with the value "Yes"
        if (radio.checked && radio.value === 'yes' && radio.name.startsWith('question')) {
            // Display a popup window with the message
            alert('The Proposed Insured is not eligible for any coverage.');
        }
        
        // Check if question 8 or question 9 is answered with "Yes"
        if ((document.querySelector('input[name="diagnosed-status-2"]:checked') && document.querySelector('input[name="diagnosed-status-2"]:checked').value === 'yes') ||
            (document.querySelector('input[name="diagnosed-status-3"]:checked') && document.querySelector('input[name="diagnosed-status-3"]:checked').value === 'yes')) {
            // Display a popup window with the message
            alert('Only Graded Death Benefit is available.');
        }
    });
});
function validateRoutingNumber() {
    // Get the routing number input field
    var routingNumberInput = document.getElementById("routing-number");
    // Get the value of the routing number
    var routingNumber = routingNumberInput.value;
    
    // Simulate routing number validation (replace this with your actual validation logic)
    var isValid = simulateRoutingNumberValidation(routingNumber);
    
    // Display a pop-up message based on validation result
    if (isValid) {
        alert("Routing number validated");
    } else {
        alert("Invalid routing number. Please check and try again.");
    }
}

// Function to simulate routing number validation (replace this with your actual validation logic)
function simulateRoutingNumberValidation(routingNumber) {
    // For demonstration purposes, assume any routing number starting with "1" is considered valid
    return routingNumber.startsWith("1");
}


