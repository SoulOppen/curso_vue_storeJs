function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
  this.toString = function () {
    return `${this.nombre} $${this.precio}`;
  };
}
function Carrito() {
  this.carrito = [];
  this.endBuy = false;
  this.agregar = function (producto, cantidad) {
    let index = this.carrito.findIndex((item) => item.sku == producto);
    console.log(index);
    if (index >= 0) {
      this.carrito[index].count += cantidad;
    } else {
      this.carrito = [...this.carrito, {sku: producto, count: cantidad}];
    }
  };
  this.calcular = function () {
    return this.carrito.reduce(
      (acc, item) => acc + item.sku.precio * item.count,
      0
    );
  };
  this.end = function () {
    this.endBuy = true;
  };
  this.show = function () {
    return this.carrito
      .map(
        (item) =>
          `Cantidad:${item.count}-Nombre:${item.sku.nombre}-Precio Unitario:$${item.sku.precio}`
      )
      .join("\n");
  };
}
const productoAgregar = (list) => {
  let agregar = parseInt(prompt("Ingrese el número de producto a agregar"));
  if (isNaN(agregar)) {
    window.alert("Se necesita un numero");
    productoAgregar(list);
  } else if (agregar <= 0 || agregar > list.length) {
    window.alert(
      "Se necesita un valor positivo entero dentro de las posibilidades"
    );
    productoAgregar(list);
  } else {
    return agregar;
  }
};
const productoCantidad = () => {
  let cantidad = parseInt(prompt("Ingrese la cantidad de Unidades"));
  if (isNaN(cantidad)) {
    window.alert("Se necesita un numero");
    productoCantidad();
  } else if (cantidad <= 0) {
    window.alert("Se necesita un valor positivo entero");
    productoCantidad();
  } else {
    return cantidad;
  }
};
const seguirCompra = () => {
  let answer = prompt("Desea seguir agregando producto (s/n)");
  if (answer.toLowerCase() == "s" || answer.toLowerCase() == "n") {
    return answer;
  } else {
    window.alert("Respuesta no valida");
    seguirCompra();
  }
};
const productList = [
  new Producto("Leche", 1000),
  new Producto("Pan de molde", 2000),
  new Producto("Queso", 1200),
  new Producto("Mermelada", 890),
  new Producto("Azúcar", 1300),
];
const store = new Carrito();
while (!store.endBuy) {
  window.alert(
    `Productos Disponibles:\n${productList
      .map((item, index) => `${index + 1}.-${item.toString()}`)
      .join("\n")}`
  );
  let producto = productoAgregar(productList);
  let cantidad = productoCantidad();
  store.agregar(productList[producto - 1], cantidad);
  window.alert(
    `${cantidad} ${productList[producto - 1].nombre}(s) agregado(s) con exito`
  );
  let seguir = seguirCompra();
  if (seguir == "n") {
    store.end();
  }
}
window.alert(`${store.show()}`);
window.alert(`Total de compra $${store.calcular()}`);
