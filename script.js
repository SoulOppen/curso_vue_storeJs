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
    return productoAgregar(list);
  } else if (agregar <= 0 || agregar > list.length) {
    window.alert(
      "Se necesita un valor positivo entero dentro de las posibilidades"
    );
    return productoAgregar(list);
  } else {
    return agregar;
  }
};
const productoCantidad = () => {
  let cantidad = parseInt(prompt("Ingrese la cantidad de Unidades"));
  if (isNaN(cantidad)) {
    window.alert("Se necesita un numero");
    return productoCantidad();
  } else if (cantidad <= 0) {
    window.alert("Se necesita un valor positivo entero");
    return productoCantidad();
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
    return seguirCompra();
  }
};
const impStore = (store) => {
  const $body = document.querySelector("tbody");
  $body.innerHTML = store.carrito
    .map((item) => {
      return `<tr><td>${item.sku.nombre}</td><td>${item.count}</td><td>$${
        item.sku.precio
      }</td><td>$${item.count * item.sku.precio}</td></tr>`;
    })
    .join("");
};
const main = (products) => {
  const total = document.getElementById("total");
  const store = new Carrito();
  while (!store.endBuy) {
    window.alert(
      `Productos Disponibles:\n${products
        .map((item, index) => `${index + 1}.-${item.toString()}`)
        .join("\n")}`
    );
    let producto = productoAgregar(products);
    let cantidad = productoCantidad();
    store.agregar(products[producto - 1], cantidad);
    window.alert(
      `${cantidad} ${products[producto - 1].nombre}(s) agregado(s) con exito`
    );
    window.alert(`${store.show()}`);
    let seguir = seguirCompra();
    if (seguir == "n") {
      store.end();
    }
  }
  window.alert(`Total de compra $${store.calcular()}`);
  impStore(store);
  total.innerText = `$${store.calcular()}`;
};
const $again = document.getElementById("buyAgain");
const productList = [
  new Producto("Leche", 1000),
  new Producto("Pan de molde", 2000),
  new Producto("Queso", 1200),
  new Producto("Mermelada", 890),
  new Producto("Azúcar", 1300),
];

document.addEventListener("DOMContentLoaded", main(productList));
$again.addEventListener("click", () => main(productList));
