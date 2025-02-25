document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const errorsField = document.getElementById("form-errors");
    const toggleSwitch = document.getElementById("theme-toggle");
    const body = document.body;
    
    const errorMessages = {
        name: "Name must be between 2 and 50 characters.",
        email: "Please enter a valid email address.",
        comments: "Comments must be between 10 and 300 characters. Only letters, numbers, and basic punctuation allowed."
    };
    
    const formErrors = [];

    function validateField(input, errorMessage, pattern = null) {
        const errorOutput = document.getElementById(`${input.id}-error`);
        if (!input.checkValidity() || (pattern && !pattern.test(input.value))) {
            input.classList.add("invalid");
            errorOutput.textContent = errorMessage;
            formErrors.push({ field: input.name, message: errorMessage });
            return false;
        } else {
            input.classList.remove("invalid");
            errorOutput.textContent = "";
            return true;
        }
    }

    function maskInput(event, pattern) {
        if (!pattern.test(event.key)) {
            event.preventDefault();
            const errorOutput = document.getElementById(`${event.target.id}-error`);
            errorOutput.textContent = "Invalid character entered!";
            event.target.classList.add("flash-error");
            setTimeout(() => {
                errorOutput.textContent = "";
                event.target.classList.remove("flash-error");
            }, 2000);
        }
    }

    function updateCharacterCount() {
        const infoOutput = document.getElementById("comments-info");
        const remaining = 300 - commentsInput.value.length;
        infoOutput.textContent = `Remaining characters: ${remaining}`;
        if (remaining < 50) {
            infoOutput.style.color = "orange";
        } else if (remaining <= 0) {
            infoOutput.style.color = "red";
        } else {
            infoOutput.style.color = "black";
        }
    }

    commentsInput.addEventListener("keypress", (event) => maskInput(event, /^[A-Za-z0-9 .,!?'-]+$/));
    commentsInput.addEventListener("input", updateCharacterCount);

    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent form submission for debugging
        formErrors.length = 0;  // Clear previous errors

        const isValid = [
            validateField(nameInput, errorMessages.name),
            validateField(emailInput, errorMessages.email),
            validateField(commentsInput, errorMessages.comments, /^[A-Za-z0-9 .,!?'-]+$/)
        ].every(Boolean);

        // Store errors in hidden input
        errorsField.value = JSON.stringify(formErrors);

        console.log("Updated form-errors value:", errorsField.value); // Debugging log

        form.submit();
    });

    // Theme Toggle Functionality
    if (toggleSwitch) {
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-mode");
            toggleSwitch.checked = true;
        }

        toggleSwitch.addEventListener("change", function () {
            if (toggleSwitch.checked) {
                body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }
});
