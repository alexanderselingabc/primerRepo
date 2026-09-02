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
	homeMostrarSection()
	homeMostrarBienvenida(usuario.nombre)
	homeMostrarMenu(usuario.rol)
}


function homeMostrarSection() {
	document.querySelector("#mainHome").style.display = "block"
	document.querySelector("#mainLogin").style.display = "none"
}
function homeMostrarBienvenida(nombre) {
	document.querySelector("#bienvenida").textContent = `Bienvenid@ ${nombre}`;
}
function homeMostrarMenu(rol) {
	document.querySelectorAll("nav li").forEach(elemento => {
		if (elemento.classList.contains(rol)) {
			elemento.style.display = "block";
		} else {
			// elemento.style.display = "none";
		}
	});
}
// -------------------common----------------------
function ocultarFuncionesDeUsuario() {
	document.querySelectorAll(".paciente").forEach(elemento => {
		elemento.style.display = "none";
	});
	document.querySelectorAll(".admin").forEach(elemento => {
		elemento.style.display = "none";
	});
}
function asignarLoginAlFormulario() {
	document.querySelector("#form-login").addEventListener("submit", event => {
		iniciarSesion(event)
	});
}
function redirigirA(page) {
	window.location.href = page;
}
// -----------------------------------------
// esto se va a ejecutar siempre
if (document.querySelector("#mainLogin")) {
	ocultarFuncionesDeUsuario();
	asignarLoginAlFormulario();
}