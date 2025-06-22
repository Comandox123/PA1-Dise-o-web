class CarritoConDescuento {
    constructor(porcentajeDescuento) {
        this.listaItems = [];
        this.porcentajeDescuento = porcentajeDescuento;
    }

    agregar(nombre, precio) {
        this.listaItems.push({ nombre, precio });
    }

    vaciar() {
        this.listaItems = [];
    }

    get cantidadItems() {
        return this.listaItems.length;
    }

    get totalPagar() {
        let total = this.listaItems.reduce((acc, item) => acc + item.precio, 0);
        if (this.listaItems.length >= 3) {
            total *= (1 - this.porcentajeDescuento / 100);
        }
        return total;
    }
}
