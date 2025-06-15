// Productos con precios
const productos = [
    { nombre: "Vino Nacional rojo", precio: 650 },
    { nombre: "Vino Nacional blanco", precio: 750 },
    { nombre: "Vino Nacional azul", precio: 950 },
    { nombre: "Vino Nacional Edición Luis Suárez rojo", precio: 650 },
    { nombre: "Vino Nacional Edición Luis Suárez blanco", precio: 750 },
    { nombre: "Vino Nacional Edición Luis Suárez azul", precio: 950 },
    { nombre: "Vino Nacional Edición GPC rojo", precio: 650 },
    { nombre: "Vino Nacional Edición GPC blanco", precio: 750 },
    { nombre: "Vino Nacional Edición GPC azul", precio: 950 },
    { nombre: "Vino Nacional Edición Abdón Porte rojo", precio: 650 },
    { nombre: "Vino Nacional Edición Abdón Porte blanco", precio: 750 },
    { nombre: "Vino Nacional Edición Abdón Porte azul", precio: 950 }
];

// Cargar carrito desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// DOM
const listaVinos = document.getElementById('lista-vinos');
const carritoContenido = document.getElementById('carrito-contenido');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');

// Función para mostrar productos disponibles
function mostrarProductos() {
    listaVinos.innerHTML = '';
    productos.forEach((producto, index) => {
        const div = document.createElement('div');

        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button data-index="${index}">Agregar al carrito</button>
        `;
        listaVinos.appendChild(div);
    });
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    let total = 0;
    let ul = document.createElement('ul');

    carrito.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;
        ul.appendChild(li);
        total += item.precio;
    });

    carritoContenido.innerHTML = '';
    carritoContenido.appendChild(ul);
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total}`;
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.marginTop = '10px';
    carritoContenido.appendChild(totalDiv);
}

// Función para agregar producto al carrito
function agregarAlCarrito(index) {
    carrito.push(productos[index]);
    guardarCarrito();
    actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}

// Evento para los botones "Agregar al carrito"
listaVinos.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        agregarAlCarrito(index);
    }
});

// Evento para vaciar carrito
btnVaciarCarrito.addEventListener('click', vaciarCarrito);


mostrarProductos();
actualizarCarrito();