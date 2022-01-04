let divSnack =  document.getElementById ("divSnack")
let button = document.getElementById ("button")
let modalBody = document.getElementById ("modalBody")
let botonFin  = document.getElementById ("botonFin")


fetch ('snack.json')
.then (promesa => promesa.json())
.then (dataProductos => {
  dataProductos.forEach((productoUno, indice) => {
      divSnack.innerHTML += `
    <div class="card border-light mb-3" id="Snack${indice}"style=" max-width: 16rem; margin:8px">
    <div class="card-header">Nombre: ${productoUno.nombre}</div>
       <img src="./imagenesproductos/${productoUno.img}" class="card-img-top" alt="...">
        <div class="card-body">
         <h4 class="card-title">Precio: $${productoUno.precio}</h4>
         <p class="card-text">Stock: ${productoUno.stock}</p>
         <button id="boton${indice}" class="btn btn-outline-success "><ion-icon name="cart-outline"></ion-icon></button>
        </div>
  </div>
      `
  });

dataProductos.forEach ((productoUno, indice) => {
   document.getElementById (`boton${indice}`).addEventListener ('click', () => {
          if (catalogoDos.find(Snack => Snack.nombre == productoUno.nombre)) {
               let index = catalogoDos.findIndex (Snack => Snack.nombre == productoUno.nombre)
                catalogoDos[index].cant++ 
                 localStorage.setItem ('carrito', JSON.stringify(catalogoDos))

              }  else {
                let nuevoProducto = new snack (productoUno.nombre, productoUno.precio, productoUno.stock, productoUno.img)
                catalogoDos.push(nuevoProducto)
                localStorage.setItem('carrito', JSON.stringify(catalogoDos))
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



