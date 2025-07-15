let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaVinos = document.getElementById('lista-vinos');
const carritoContenido = document.getElementById('carrito-contenido');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');
const formCompra = document.getElementById('form-compra');
const inputBuscar = document.getElementById('buscar');

async function cargarProductos() {
    try {
        const res = await fetch('productos.json');
        productos = await res.json();
        mostrarProductos();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

function mostrarProductos(lista = productos) {
    listaVinos.innerHTML = '';
    lista.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button data-index="${productos.indexOf(producto)}">Agregar al carrito</button>
        `;
        listaVinos.appendChild(div);
    });
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    let total = 0;
    let ul = document.createElement('ul');

    carrito.forEach(item => {
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

function agregarAlCarrito(index) {
    carrito.push(productos[index]);
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

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

listaVinos.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        agregarAlCarrito(index);
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

    vaciarCarrito();
    formCompra.reset();
});

cargarProductos();
actualizarCarrito();