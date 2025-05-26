// arrays con vinos
let productos = [
    { nombre: "Vino Nacional rojo" },
    { nombre: "Vino Nacional blanco" },
    { nombre: "Vino Nacional azul" },
    { nombre: "Vino Nacional Edición Luis Suárez rojo" },
    { nombre: "Vino Nacional Edición Luis Suárez blanco" },
    { nombre: "Vino Nacional Edición Luis Suárez azul" },
    { nombre: "Vino Nacional Edición GPC rojo" },
    { nombre: "Vino Nacional Edición GPC blanco" },
    { nombre: "Vino Nacional Edición GPC azul" },
    { nombre: "Vino Nacional Edición Abdón Porte rojo" },
    { nombre: "Vino Nacional Edición Abdón Porte blanco" },
    { nombre: "Vino Nacional Edición Abdón Porte azul" }
];

// precios por color
for (let i = 0; i < productos.length; i++) {
    let nombre = productos[i].nombre.toLowerCase();

    if (nombre.includes("rojo")) {
        productos[i].precio = 650;
    } else if (nombre.includes("blanco")) {
        productos[i].precio = 750;
    } else if (nombre.includes("azul")) {
        productos[i].precio = 950;
    }
}

// carrito de compras
let carrito = [];

// mostrar vinos en consola
function mostrarVinos() {
    console.log("Vinos disponibles:");
    for (let i = 0; i < productos.length; i++) {
        console.log((i + 1) + ". " + productos[i].nombre + " - $" + productos[i].precio);
    }
}

// agregar vinos al carrito
function agregarAlCarrito() {
    let seleccion = prompt("Ingrese el número de vino que desea comprar (1 al 12):");
    let indice = parseInt(seleccion) - 1;

    if (indice >= 0 && indice < productos.length) {
    carrito.push(productos[indice]);
    alert("Agregaste: " + productos[indice].nombre + " al carrito.");
    } else {
    alert("Selección inválida.");
    }
}

// ver carrito

function verCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        let mensaje = "Carrito de compras:\n";
        let total = 0;
    
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        mensaje += producto.nombre + " - $" + producto.precio + "\n";
        total += producto.precio;
    }

        mensaje += "\nTotal: $" + total;
        alert(mensaje);
    }
}

// principal
alert("¡Bienvenido/a a Vino Nacional!");

let salir = false;

while (!salir) {
    let opcion = prompt("Elige una opción:\n1. Ver vinos\n2. Agregar un vino al carrito\n3. Ver carrito\n4. Salir");

    switch (opcion) {
        case "1":
            mostrarVinos();
            break;
        case "2":
            agregarAlCarrito();
            break;
        case "3":
            verCarrito();
            break;
        case "4":
            salir = true;
            alert("Gracias por visitar Vino Nacional. ¡Te esperamos nuevamente!");
            break;
        default:
            alert("Opción inválida. Intenta de nuevo.");
    }
}