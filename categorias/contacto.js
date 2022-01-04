class clientes {
    constructor (id, nombre, apellido, edad, email) {
        this.id =  id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
    }


devolverDatos() {
    return `
        <div class="card" id="datos${this.id}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${this.nombre} ${this.apellido}</h5>
                <p class="card-text">${this.edad}</p>
                <p class="card-text">${this.email}</p>
                <button type="button" id="boton${this.id}" class="btn btn-dark"><i class="fas fa-shopping-cart"></i></button>
            </div>
        </div>
    `
   }
}

let id = 1;
let cliente = []

$(() => {
    
    $('#formCliente').submit((e) => {
        e.preventDefault()
        console.log (e.target)

        let datForm = new FormData(e.target)

        let formularioCliente = new clientes (id, datForm.get("nombre"), datForm.get("apellido"), datForm.get("edad"), datForm.get("email"))

        cliente.push(formularioCliente)
        console.log(cliente)
        
        localStorage.setItem ('cliente', JSON.stringify(cliente))


        $('#formCliente').trigger("reset");
        id++

    })

    
    $('#boton1').click(() => {
        console.log(cliente)
        cliente.forEach( vehiculo => {
            $('#divBoton').append(vehiculo.devolverDatos());
        })
    })
})


