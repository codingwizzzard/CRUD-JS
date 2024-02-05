let index = -1;
let gender;
let userName, email, course;

let userData = [];

class User {
    constructor() {
        this.userData = userData || [];
    }

    getUserValue() {
        userName = $("#name").val();
        email = $("#email").val();
        course = $("#selectOption").val();
        gender = $("input[name='gender']:checked").val();
    }

    show() {
        let output = "";

        this.userData.forEach((user, i) => {
            const hobbies = user.hobbies ? user.hobbies.join(', ') : '';
            const userInfo = `
                <tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.password || ''}</td>
                  <td>${user.gender}</td>
                  <td>${hobbies}</td>
                  <td>${user.course}</td>
                  <td>${user.address || ''}</td>
                  <td>
                    <button onclick="editButton(${i})" class="btn2 edit bg-primary border-0">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteButton(${i})" class="btn2 delete bg-danger border-0">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;

            output += userInfo;
        });

        document.querySelector("#userTableBody").innerHTML = output;
        userData = this.userData;
    }

    add() {
        this.getUserValue();
        const validationResult = validateForm();

        if (validationResult) {
            let password = document.getElementById('password').value;

            let hobbies = [];
            document.querySelectorAll('input[name="hobbies"]:checked').forEach((checkbox) => {
                hobbies.push(checkbox.value);
            });

            let address = document.getElementById('address').value;

            if (index < 0) {
                this.userData.push({
                    name: userName,
                    email: email,
                    gender: gender,
                    course: course,
                    password: password,
                    hobbies: hobbies,
                    address: address,
                });
                this.show();
            } else {
                this.userData.splice(index, 1, {
                    name: userName,
                    email: email,
                    gender: gender,
                    course: course,
                    password: password,
                    hobbies: hobbies,
                    address: address,
                });
                this.show();
                index = -1;
            }

            const formSectionElement = document.getElementById("registrationForm");
            const listSectionElement = document.getElementById("listSection");

            formSectionElement.style.display = "none";
            listSectionElement.style.display = "block";
        }
    }

    edit(userIndex) {
        this.userData.forEach((user, i) => {
            if (userIndex === i) {
                index = i;
                document.querySelector("#name").value = user.name;
                document.querySelector("#email").value = user.email;
                document.querySelector("#selectOption").value = user.course;

                if (user.gender === "male") {
                    document.querySelector("#male").checked = true;
                } else {
                    document.querySelector("#female").checked = true;
                }
            }
        });

        this.mainDisplay("login");
    }

    delete(index) {
        this.userData.splice(index, 1);
        this.show();
    }

    mainDisplay(page) {
        const formElement = document.getElementById("registrationForm");
        const listSectionElement = document.getElementById("listSection");

        if (page === "login") {
            formElement.style.display = "block";
            listSectionElement.style.display = "none";
        } else if (page === "list") {
            listSectionElement.style.display = "block";
            formElement.style.display = "none";
            this.show();
        }
    }
}

const u1 = new User();
u1.mainDisplay("login");

const registerBtn = document.querySelector("#registerBtn");
registerBtn.addEventListener("click", function () {

    document.getElementById("registrationForm").reset();

    clearErrors();

    u1.mainDisplay("login");
});

const listBtn = document.querySelector("#listBtn");
listBtn.addEventListener("click", function () {
    u1.mainDisplay("list");
});

function deleteButton(index) {
    u1.delete(index);
}

function editButton(userIndex) {
    u1.edit(userIndex);
}

function addUser() {
    u1.add();
}