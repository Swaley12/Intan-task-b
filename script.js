// Function to check if a value exists in cookies (you can customize this logic)
function checkCookieValue(phoneNumber) {
    if (phoneNumber === '173527250') { // Modify this condition as needed
        window.location.href = 'showdata.html';
    } else {
        window.location.href = 'registration.html';
    }
}

// Function to handle the button click in index.html
function checkValue() {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const phoneNumber = phoneNumberInput.value;

    if (phoneNumber) {
        checkCookieValue(phoneNumber);
        localStorage.setItem("phoneNumber", phoneNumber);
    } else {
        alert('Please enter a valid phone number.');
    }
}

// Event listener for form submission in registration.html
document.getElementById('validationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phoneNumber = localStorage.getItem("phoneNumber");
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    // Retrieve the individual birthday values
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    const bday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    const registrationData = {
        phoneNumber: phoneNumber,
        name: name,
        email: email,
        bday: bday,
    };

    const jsonData = JSON.stringify(registrationData);

    // Store the JSON data in local storage
    localStorage.setItem('registrationData', jsonData);
    alert('Registration success!');
    window.location.href = 'showdata2.html';
});

// Function to display user data in showdata.html
function displayUserData() {
    const jsonData = localStorage.getItem('registrationData');

    if (jsonData) {
        const registrationData = JSON.parse(jsonData);
        document.getElementById('phoneNumber').textContent = registrationData.phoneNumber;
        document.getElementById('name').textContent = registrationData.name;
        document.getElementById('bday').textContent = registrationData.bday;
        const emailInput = document.getElementById("email");
        const email = registrationData.email;

        if (email === "") {
            emailInput.textContent = "-";
        } else {
            emailInput.textContent = email;
        }
    }
}

// Event listener for page load in showdata.html
document.addEventListener('DOMContentLoaded', function () {
    displayUserData();
});

// Call checkCookieValue when the page loads to initiate the redirection
if (window.location.pathname.endsWith('index.html')) {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
        checkCookieValue(phoneNumber);
    }
}
