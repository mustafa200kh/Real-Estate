// Start Sign up Menu

// Get Sign Up Button
let openSign = document.querySelectorAll(".sign-up");

// Get Sign Up Menu
let signMenu = document.querySelector(".sign-up-menu");

// Get Close Sign Up Menu Button
let closeSign = document.querySelector(".close-signup-menu");

// When You Want To Sign
openSign.forEach((e) => {
  e.onclick = function () {
    signMenu.classList.toggle("display");
  };
});

// When You Want To Close Sign Menu
closeSign.onclick = function () {
  signMenu.classList.toggle("display");
};
// Validate Sign Up
let signForm = document.getElementById("sign");
let fName = document.querySelector("#firstname");
let lName = document.querySelector("#lastname");
let email = document.querySelector("#email");
let phoneNumber = document.querySelector("#phone");
let pass = document.querySelector("#password");
let c_Pass = document.querySelector("#confirmPass");

let subscribeBtn = document.querySelector(".subs");
let subscribeFiled = document.getElementById("email-s");

// Subscribe Field
subscribeBtn.onclick = function () {
  signMenu.classList.toggle("display");
  email.value = subscribeFiled.value;
};
// End Subscribe Field

signForm.addEventListener("submit", (e) => {
  if (!checkInputFileds()) {
    e.preventDefault();
  }
});

function checkInputFileds() {
  let fNameRes = false;
  let lNameRes = false;
  let emailRes = false;
  let phoneRes = false;
  let passRes = false;
  let cPassRes = false;

  // Check The First Name
  if (fName.value === "") {
    setErrorMessage(fName, "firstname cannot be blank");
  } else {
    setSuccessMessage(fName);
    fNameRes = true;
  }

  //Check The Last Name
  if (lName.value === "") {
    setErrorMessage(lName, "lastname cannot be blank");
  } else {
    setSuccessMessage(lName);
    lNameRes = true;
  }

  // Check The Email
  const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value === "") {
    setErrorMessage(email, "email cannot be blank");
  } else if (!emailRe.test(email.value)) {
    setErrorMessage(email, "email is not valid");
  } else {
    setSuccessMessage(email);
    emailRes = true;
  }

  // Check The Phone
  const phoneRe = /\d{3,}/;
  if (phoneNumber.value === "") {
    setErrorMessage(phoneNumber, "phone cannot be blank");
  } else if (!phoneRe.test(phoneNumber.value)) {
    setErrorMessage(phoneNumber, "Phone is not valid");
  } else {
    setSuccessMessage(phoneNumber);
    phoneRes = true;
  }
  // Check The Password
  if (pass.value === "") {
    setErrorMessage(pass, "password cannot be blank");
  } else if (pass.value.length < 6) {
    setErrorMessage(pass, "password is too short");
  } else {
    setSuccessMessage(pass);
    passRes = true;
  }

  // Check If Re Intered Password Is Correct
  if (c_Pass.value !== pass.value || c_Pass.value === "") {
    setErrorMessage(c_Pass, "password is not correct");
  } else {
    setSuccessMessage(c_Pass);
    cPassRes = true;
  }
  if (fNameRes && lNameRes && emailRes && phoneRes && passRes && cPassRes) {
    return true;
  }
  // Return true Cause All Data Is Vaild
  return false;
}
function setErrorMessage(element, message) {
  if (element.parentElement.classList.contains("correct")) {
    element.parentElement.classList.remove("correct");
  }
  element.parentElement.classList.add("fail");
  let small = element.parentElement.querySelector("small");
  small.innerHTML = message;
}
function setSuccessMessage(element) {
  if (element.parentElement.classList.contains("fail")) {
    element.parentElement.classList.remove("fail");
    let small = element.parentElement.querySelector("small");
    small.innerHTML = "";
  }
  element.parentElement.classList.add("correct");
}
