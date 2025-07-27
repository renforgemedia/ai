document.addEventListener('DOMContentLoaded', function () {
    // Select the form
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success');

    // Basic form validation
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const website = document.getElementById('website').value.trim(); // Optional

        // Basic validation
        if (!name || !email || !phone) {
            displayError("Please fill out all required fields.");
            return;
        }

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('website', website);

        // Submit the form using fetch
        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (data.result === 'success') {
                displaySuccess("Your message has been sent!");
                form.reset();
            } else {
                throw new Error(data.error || 'Form submission failed.');
            }
        })
        .catch(error => {
            displayError("There was a problem sending your message. Please try again later.");
            console.error('Error:', error);
        });
    });

    // Function to display error messages
    function displayError(message) {
        successMessage.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }

    // Function to display success messages
    function displaySuccess(message) {
        successMessage.innerHTML = `<div class="alert alert-success">${message}</div>`;
    }

    // Clear success message when user focuses on the name field
    document.getElementById('name').addEventListener('focus', function () {
        successMessage.innerHTML = '';
    });
});
