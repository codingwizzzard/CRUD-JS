function clearErrors() {
    let errors = document.querySelectorAll('.formerror');
    errors.forEach(error => error.innerHTML = "");
}

function seterror(id, error) {
    let element = document.getElementById(id);
    let errorElement = document.getElementById(id + "Error");
    errorElement.innerHTML = error;
}

function validateForm() {
    clearErrors();
    let returnval = true;

    let name = document.getElementById('name').value;
    if (name.trim() == "" || name.length < 3 || !containsOnlyAlphabets(name)) {
        seterror("name", "*Name should be at least 3 characters long and only include alphabets!!!");
        returnval = false;
    }

    let email = document.getElementById('email').value;
    if (email.trim() === "" || !email.includes('@') || !email.endsWith('.com')) {
        seterror("email", "*Please enter a valid email address");
        returnval = false;
    }

    let password = document.getElementById('password').value;

    if (
        password.trim() === "" ||
        password.length < 6 ||
        !containsUppercase(password) ||
        !containsLowercase(password) ||
        !containsDigit(password) ||
        !containsSpecialCharacter(password)
    ) {
        seterror("password", "*Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!");
        returnval = false;
    }

    let gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        seterror("gender", "*Please select a gender");
        returnval = false;
    }

    let hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
    if (hobbies.length === 0) {
        seterror("hobbies", "*Please select at least one hobby");
        returnval = false;
    }

    let selectOption = document.getElementById('selectOption').value;
    if (selectOption === "") {
        seterror("select", "*Please select an option");
        returnval = false;
    }

    let address = document.getElementById('address').value;
    if (address.trim() === "") {
        seterror("address", "*Address cannot be empty");
        returnval = false;
    }

    return returnval;
}

function containsUppercase(password) {
    return password.toLowerCase() !== password;
}

function containsLowercase(password) {
    return password.toUpperCase() !== password;
}

function containsDigit(password) {
    return password.split('').some(char => '0123456789'.includes(char));
}

function containsSpecialCharacter(password) {
    var specialChars = '!@#$%^&*()_+';
    return [...password].some(char => specialChars.includes(char));
}

function containsOnlyAlphabets(str) {
    return /^[a-zA-Z]+$/.test(str);
}