/*

let catalogo = []

class bebida {
    constructor (nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const bebida1 = new bebida ("Fernet", 580)

const bebida2 = new bebida ("Cerveza Andes", 350)

const bebida3 = new bebida ("Baileys", 2100)

const bebida3 = new bebida ("Gancia", 750)


let bebidas = [bebida1,bebida2,bebida3]

function saveLocal () {
let aJson = JSON.stringify (catalogo)
localStorage.setItem("catalogo", aJson)
}
saveLocal ()


let divBebida = document.getElementById('divBebida')

bebidas.forEach ((bebida,indice)  => { 
    divBebida.innerHTML += `
    <div class="card" id="bebida${indice + 1}" style="width: 18rem;">
          <img src="../imagenes/bebida${indice + 1}.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Bebida ${indice + 1}</h5>
          <p class="card-text">Nombre: ${bebida.nombre}</p>
          <p class="card-text">Precio: ${bebida.precio}</p>
          <p class="card-text">Elaboracion: ${bebida.elaboracion}</p>
          <p class="card-text">Vencimiento:: ${bebida.vencimiento}</p>
          <p class="card-text">Cantidad: ${bebida.cantidad}</p>
          <p class="card-text">Pedidos: ${bebida.pedidos}</p>
          <a href="#" class="btn btn-danger">Eliminar</a>
        </div>
    </div>
    `
})

catalogo.sort (function (c ,a ){
    return c.precio - a.precio ;
 });

 console.log (catalogo)


for (let atributo in bebida1)
console.log (`${atributo} ${bebida1[atributo]}`)

for (let atributo in bebida2)
console.log (`${atributo} ${bebida2[atributo]}`)

for (let atributo in bebida3)
console.log (`${atributo} ${bebida3[atributo]}`)

*/

let divBebidas =  document.getElementById ("divBebidas")
let button = document.getElementById ("button")
let modalBody = document.getElementById ("modalBody")
let botonFin  = document.getElementById ("botonFin")


fetch ('bebidas.json')
.then (promesa => promesa.json())
.then (dataProductos => {
  dataProductos.forEach((productoUno, indice) => {
      divBebidas.innerHTML += `
    <div class="card border-light mb-3" id="Bebida${indice}"style=" max-width: 16rem; margin:8px"">
    <div class="card-header">Nombre: ${productoUno.nombre}</div>
       <img src="./imagenesproductos/${productoUno.img}" class="card-img-top" alt="...">
        <div class="card-body">
         <h4 class="card-title">Precio: $${productoUno.precio}</h4>
         <p class="card-text">Stock: ${productoUno.stock}</p>
         <button id="boton${indice}" class="btn btn-outline-success  "><ion-icon name="cart-outline"></ion-icon></button>
        </div>
  </div>
      `
  });

dataProductos.forEach ((productoUno, indice) => {
   document.getElementById (`boton${indice}`).addEventListener ('click', () => {
          if (catalogo.find(Bebida => Bebida.nombre == productoUno.nombre)) {
               let index = catalogo.findIndex (Bebida => Bebida.nombre == productoUno.nombre)
                catalogo[index].cant++ 
                 localStorage.setItem ('carrito', JSON.stringify(catalogo))

              }  else {
                let nuevoProducto = new bebida (productoUno.nombre, productoUno.precio, productoUno.stock, productoUno.img)
                catalogo.push(nuevoProducto)
                localStorage.setItem('carrito', JSON.stringify(catalogo))
              }
        })
     })
})

button.addEventListener ('click', () => {
  let productosDelstorage = JSON.parse (localStorage.getItem('carrito'))
   productosDelstorage.forEach ((productoCarrito, indice) => {
    modalBody.innerHTML += `
    <div class="card border-success mb-3" id="productoCarrito ${indice} " style="max-width: 540px;">
      <div class="row g-0">
      <div class="col-md-4">
      <img src="./imagenesproductos/${productoCarrito.img}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${productoCarrito.nombre}</h5>
          <p class="card-text">Cantidad: ${productoCarrito.cant}</p>
          <p class="card-text">$${new Intl.NumberFormat("de-DE").format(productoCarrito.precio)}</p>
          <button id="botonEliminar${indice}" class="btn btn-outline-success "><ion-icon name="trash-outline"></ion-icon></ion-icon></button>
        </div>
      </div>
    </div>
   </div>
   
    `
     })             
   })








