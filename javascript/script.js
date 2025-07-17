let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaVinos = document.getElementById('lista-vinos');
const carritoContenido = document.getElementById('carrito-contenido');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');
const formCompra = document.getElementById('form-compra');
const inputBuscar = document.getElementById('buscar');

// Cargar productos desde JSON
async function cargarProductos() {
    try {
        const res = await fetch('productos.json');
        productos = await res.json();
        mostrarProductos();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Mostrar productos en el HTML
function mostrarProductos(lista = productos) {
    listaVinos.innerHTML = '';
    lista.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button data-id="${producto.id}">Agregar al carrito</button>
        `;
        listaVinos.appendChild(div);
    });
}

// Agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === parseInt(id));
    if (!producto) return;

    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
}

// Mostrar contenido del carrito
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    let total = 0;
    let ul = document.createElement('ul');

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio} x${item.cantidad}`;
        ul.appendChild(li);
        total += item.precio * item.cantidad;
    });

    carritoContenido.innerHTML = '';
    carritoContenido.appendChild(ul);

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${total}`;
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.marginTop = '10px';
    carritoContenido.appendChild(totalDiv);
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Vaciar el carrito con SweetAlert2
function vaciarCarrito() {
    Swal.fire({
        title: "¿Vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
            Swal.fire("Carrito vaciado", "", "success");
        }
    });
}

// Eventos
listaVinos.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.getAttribute('data-id');
        agregarAlCarrito(id);
    }
});

btnVaciarCarrito.addEventListener('click', vaciarCarrito);

inputBuscar.addEventListener('input', e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    mostrarProductos(filtrados);
});

formCompra.addEventListener('submit', (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
        Swal.fire("Tu carrito está vacío", "", "warning");
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    Swal.fire({
        title: `¡Gracias por tu compra, ${nombre}!`,
        text: `Te enviamos la confirmación a ${email}`,
        icon: "success"
    });

    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    formCompra.reset();
});

// Inicialización
cargarProductos();
actualizarCarrito();