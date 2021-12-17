var loginButton = document.getElementById('header-login-button');
var formContainer = document.getElementById('form-container');
var loginFormToSignupFormToggle = document.getElementById('login-form-button-to-signup');
var signupFormToLoginFormToggle = document.getElementById('signup-form-button-to-login');
var closeFormButton = document.getElementsByClassName('close-form-button');

var loginForm = document.getElementById('login-form');
var signupForm = document.getElementById('signup-form');

loginButton.onclick = function () {
	loginForm.classList.add("visible");
	formContainer.classList.add("blurred");
}

loginFormToSignupFormToggle.onclick = function () {
	signupForm.classList.add("visible");
	loginForm.classList.remove("visible")
}

signupFormToLoginFormToggle.onclick = function () {
	signupForm.classList.remove("visible");
	loginForm.classList.add("visible")
}

closeFormButton[0].onclick = function () {
	loginForm.classList.remove("visible");
	formContainer.classList.remove("blurred");
}

closeFormButton[1].onclick = function () {
	signupForm.classList.remove("visible");
	formContainer.classList.remove("blurred");
}

async function registrationDataSend(e) {
	e.preventDefault();

	let regFormNameInput = document.getElementById('signupForm-name-input');
	let regFormEmailInput = document.getElementById('signupForm-email-input');
	let regFormPhoneInput = document.getElementById('signupForm-phone-input');
	let regFormPasswordInput = document.getElementById('signupForm-password-input');
	let regFormPasswordRepeatInput = document.getElementById('signupForm-passwordRepeat-input');

	if (!(regFormPasswordRepeatInput.value == regFormPasswordInput.value)) {
		alert("Пароли не совпадают");
		return;
	}

	if (regFormNameInput.classList.contains("invalid")) {
		regFormNameInput.classList.remove("invalid");
	}
	if (regFormEmailInput.classList.contains("invalid")) {
		regFormEmailInput.classList.remove("invalid");
	}
	if (regFormPhoneInput.classList.contains("invalid")) {
		regFormPhoneInput.classList.remove("invalid");
	}
	if (regFormPasswordInput.classList.contains("invalid")) {
		regFormPhoneInput.classList.remove("invalid");
	}
	if (regFormPasswordRepeatInput.classList.contains("invalid")) {
		regFormPasswordRepeatInput.classList.remove("invalid");
	}

	let registerForm = new FormData(this);

	// let response = await fetch('https://httpbin.org/post', {
	// 	method: 'POST',
	// 	body: formData
	// });

	// if (response.ok) {
	// 	let result = await response.json();
	// 	console.log(result.form);
	// }
	// else {
	// 	alert('Ошибка HTTP: ' + response.status);
	// }

	fetch('register.php', {
		method: 'POST',
		body: registerForm
	}
	)
		.then(response => response.json())
		.then((result) => {
			console.log(result);
			if (result.errors) {
				//вывод ошибок валидации на форму
				result.errors.forEach(function callback(currentValue) {
					if (currentValue == "name") {
						regFormNameInput.classList.add("invalid");
					}
					if (currentValue == "email") {
						regFormEmailInput.classList.add("invalid");
					}
					if (currentValue == "phone") {
						regFormPhoneInput.classList.add("invalid");
					}
					if (currentValue == "password") {
						regFormPasswordInput.classList.add("invalid");
					}
					if (currentValue == "passwordRepeat") {
						regFormpasswordRepeatInput.classList.add("invalid");
					}
				})
			} else if (!result.email_check[0]) {
				console.log("Пользователь уже существует");
			}
			else{
				//успешная регистрация, обновляем страницу
			}
		})
		// .catch(error => console.log(error));
}

// loginForm.addEventListener("submit", authorizationDataSend);
signupForm.addEventListener("submit", registrationDataSend);