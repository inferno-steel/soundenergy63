let modalAll = document.querySelectorAll(".modal");
let closeIcon = document.querySelectorAll(".modal__close");
let buttons = document.querySelectorAll('.button');
let headerContainer = document.querySelector('.header__container');
let body = document.querySelector('body');

/* remove scroll body */
function hiddenBodyModal () {
	modalAll.forEach((mod) => {	
		if (mod.classList.contains('modal', 'modal-active')) {
			body.style.overflow = "hidden";
		} else {
			body.style.overflow = "inherit";
		}
	})
}

/* return scroll body */
function visibleBodyModal () {
	modalAll.forEach((mod) => {
		if (mod.classList.contains('modal-active')) {
			body.style.overflow = "hidden";
		} else {
			body.style.overflow = "inherit";
		}
	})
}

function hiddenBodyBurger() {
	if (headerContainer.classList.contains('burger-menu-open')) {
		body.style.overflow = "hidden";
	} else {
		body.style.overflow = "inherit";
	}
} 

/* burger-menu */
document.querySelector('.header__burger-menu').addEventListener('click', function () {
    headerContainer.classList.toggle('burger-menu-open');	
	hiddenBodyBurger();
});

buttons.forEach((item) => {
	item.addEventListener('click', function () {
        document.querySelector('.modal').classList.add("modal-active");
		hiddenBodyModal();
    });
})

closeIcon.forEach((close) => {
	close.addEventListener('click', function () {
		modalAll.forEach((modal) => {
			modal.classList.remove('modal-active');
			visibleBodyModal();
		})
	});
})

document.addEventListener('click', function (e) {
	if (e.target == document.querySelector(".modal")){
		document.querySelector(".modal").classList.remove("modal-active");
		visibleBodyModal();
	}
})

document.addEventListener('click', function (e) {
	if (e.target == document.querySelector(".modal-completed")){
		document.querySelector(".modal-completed").classList.remove("modal-active");
		visibleBodyModal();
	}
})

/* Scroll menu */
const links = document.querySelectorAll(".menu__link");
for (let i = 0; i < links.length; i++) {
	links[i].onclick = function () {
		document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
	}
}

links.forEach((link) => {
	link.addEventListener("click", function () {
		document.querySelector('.header__container').classList.remove('burger-menu-open');
		hiddenBodyBurger();
	})
})

/* Validation form */
let form = document.querySelector('.modal__form');
let inputs = document.querySelectorAll('.modal__input');

let generateError = function (text) {
	let error = document.createElement('div');
	error.className = 'error';
	error.innerHTML = text;
	return error;
}

let removeValidation = function () {
	let errors = form.querySelectorAll('.error')
	for (let i = 0; i < errors.length; i++) {
		errors[i].remove();
	}
}

function checkInputs () {
    removeValidation()
	let res = true;
	inputs.forEach((input) => {
		if (input.value == "") {
			let error = generateError('Заполните это поле!');
			input.parentElement.appendChild(error);
			res = false;
		}
	})
	return res;
}

/* Submit a form */ 

form.addEventListener('submit',  async function (e) {
	e.preventDefault();
    if (checkInputs() == true) {
	} else {
		return false;
	}
    let data = {
		name: document.querySelector("#name").value,
		phone: document.querySelector("#phone").value,
	}
	let response = await fetch("mail.php", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})
	let result = await response.text()
    form.reset()
	for (let modal = 0; modal < modalAll.length; modal++) {
		modalAll[0].classList.remove("modal-active");
		modalAll[1].classList.add("modal-active");
		document.querySelector('.modal-completed__button').addEventListener('click', function () {
			modalAll[1].classList.remove("modal-active");
			visibleBodyModal();
		})
	}
})