document.addEventListener("DOMContentLoaded", () => {
  const carritoBtn = document.getElementById("carrito-btn");
  const modalCatalogo = document.getElementById("modal-catalogo");
  const cerrarModal = document.getElementById("cerrar-modal");
  const carritoDetalle = document.getElementById("carrito-detalle");
  const carritoLista = document.getElementById("carrito-lista");
  const carritoContador = document.getElementById("carrito-contador");
  const carritoCantidad = document.getElementById("carrito-cantidad");
  const carritoTotal = document.getElementById("carrito-total");
  const carritoDescuento = document.getElementById("carrito-descuento");
  const btnVaciar = document.getElementById("carrito-vaciar");
  const btnComprar = document.getElementById("carrito-comprar");

  let carrito = [];

  carritoBtn.addEventListener("click", () => {
    modalCatalogo.classList.remove("oculto");
    carritoDetalle.classList.remove("oculto");
  });

  cerrarModal.addEventListener("click", () => {
    modalCatalogo.classList.add("oculto");
    carritoDetalle.classList.add("oculto");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!modalCatalogo.classList.contains("oculto")) {
        modalCatalogo.classList.add("oculto");
      }
      if (!carritoDetalle.classList.contains("oculto")) {
        carritoDetalle.classList.add("oculto");
      }
    }
  });

  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
  }

  function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - S/ ${item.precio.toFixed(2)}`;
      carritoLista.appendChild(li);
      total += item.precio;
    });

    let totalConDescuento = total;
    let descuento = 0;

    if (carrito.length >= 3) {
  descuento = total * 0.10;
  totalConDescuento = total - descuento;

  carritoDescuento.textContent = `🎉 ¡Descuento aplicado del 10%! Ahorro: S/ ${descuento.toFixed(2)}`;
  carritoDescuento.style.display = "block";
  console.log("✅ Descuento aplicado:", descuento);
  console.log("Carrito contiene:", carrito.length, "productos");
} else {
  carritoDescuento.textContent = "";
  carritoDescuento.style.display = "none";
}

    carritoContador.textContent = carrito.length;
    carritoCantidad.textContent = carrito.length;
    carritoTotal.textContent = totalConDescuento.toFixed(2);
  }

  btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });

  btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const mensaje = carrito.map(item => `${item.nombre} - S/ ${item.precio.toFixed(2)}`).join("\n");
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const totalFinal = carrito.length >= 3 ? total * 0.90 : total;

    alert(`Gracias por tu compra:\n\n${mensaje}\n\nTotal a pagar: S/ ${totalFinal.toFixed(2)}`);

    carrito = [];
    actualizarCarrito();
  });

  // Escuchar desde iframe
  window.addEventListener("message", (event) => {
    if (event.data && event.data.tipo === "agregar-carrito") {
      const { nombre, precio } = event.data.producto;
      agregarAlCarrito(nombre, precio);
    }
  });
});
document.addEventListener("keydown", (e) => {
 if (e.key === "Escape") {
  modalCatalogo.classList.add("oculto");
  carritoDetalle.classList.add("oculto");
}
});
