function redirigirA(page) {
	window.location.href = page;
}

async function buscarUsuario(email, password) {
	const response = await fetch("../data/datos.json");
	const data = await response.json();

	return data.usuarios.find(usuario =>
		usuario.email === email &&
		usuario.password === password
	);
}

async function iniciarSesion(event) {
	event.preventDefault();

	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;

	const usuario = await buscarUsuario(email, password);


	const errores = document.querySelector(".errores");

	if (!usuario) {
		errores.style.display = "block";
		errores.textContent = "Usuario o contraseña incorrectos"
		return;
	}
	redirigirA("../index.html");
}


function darlefuncionaldiadalform() {
	const formulario = document.querySelector("#form-login");
	formulario.addEventListener("submit", event => {
		iniciarSesion(event)
	});
}




//-----------home-----------------//

function mostrarBienvenida(nombre) {
	document.querySelector("#bienvenida").textContent = `Bienvenido/a ${nombre}`;
}
function mostrarMenu(rol) {
	const elementos = document.querySelectorAll(".paciente");
	elementos.forEach(elemento => {
		elemento.style.display = rol === "paciente" ? "block" : "none";
	});
}
