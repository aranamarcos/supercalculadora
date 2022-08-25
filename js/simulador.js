// **********************************************************************
// OPCIONES DE DESCUENTOS
// **********************************************************************


// Constructor de opciones de descuento
// --------------------------------------------------------------------------

class Descuentos {
    
    //Segun el tipo de descuento y con 2 variables, creo el descuento
    constructor(tipoDescuento, dto_x, dto_y) {
        this.nroOpcionDescuento = 0;
        this.tipoDescuento  = tipoDescuento;
        switch(tipoDescuento){
                // Sin descuento
            case 0:
                this.descripcionDescuento = "";
                this.descripcionExtendidaDescuento = "sin descuento";
                break;
            case 1:
                // Descuentos del tipo X% (ejemplo: 50%, 50% de descuento)
                this.descripcionDescuento = dto_x + "%";
                this.descripcionExtendidaDescuento = this.descripcionDescuento + " (" + dto_x + "% de descuento)"
                break;
            case 2:
                // Descuentos del tipo X*Y (ejemplo: 2x1, lleva 2 paga 1)
                this.descripcionDescuento = dto_x + "x" + dto_y;
                this.descripcionExtendidaDescuento = this.descripcionDescuento + " (lleva " + dto_x + " paga " + dto_y + ")";
                break;
            case 3:
                // Descuentos del tipo 2do al X% (ejemplo: 2do al 70%, 70% de descuento en la segunda unidad)
                this.descripcionDescuento = "2do al " + dto_x + "%";
                this.descripcionExtendidaDescuento = this.descripcionDescuento + " (" + dto_x + "% de descuento en la segunda unidad)";
                break;
            }
        this.dto_x  = dto_x || 0;
        this.dto_y  = dto_y || 0;
    }
}


// DOM: Menu desplegable de descuentos en el HTML
// --------------------------------------------------------------------------

function dom_mostrarOpcionesDescuentos() {
    
    let dom_menuDescuentos = document.getElementsByClassName("dom_menuDescuentos");
    
    for(let i = 0; i < dom_menuDescuentos.length; i++) {
        descuentosArr.forEach((cadaDescuento, j) => {
            dom_menuDescuentos[i].innerHTML += `
            <option value="${j+1}">${cadaDescuento.descripcionExtendidaDescuento}</option>
            `});
        };
        
    }
    
    
// Ejecucion principal de opciones de descuentos
// --------------------------------------------------------------------------
    
let descuentosArr = [];

// Creacion de descuentos por default
descuentosArr.push(new Descuentos(0, 0, 0)); // sin descuento
descuentosArr.push(new Descuentos(1, 10, 0)); // 10% 
descuentosArr.push(new Descuentos(1, 20, 0)); // 20%
descuentosArr.push(new Descuentos(1, 30, 0)); // 30%
descuentosArr.push(new Descuentos(2, 2, 1)); // 2x1
descuentosArr.push(new Descuentos(2, 3, 2)); // 3x2
descuentosArr.push(new Descuentos(2, 4, 3)); // 4x3
descuentosArr.push(new Descuentos(3, 80, 0)); // 2da al 80%
descuentosArr.push(new Descuentos(3, 70, 0)); // 2da al 70%
descuentosArr.push(new Descuentos(3, 50, 0)); // 2da al 50%

// Le asigno un numero a cada item del array descuentosArr para usarlo como numero de opcion a seleccionar
descuentosArr.forEach((cadaDescuento, i) => cadaDescuento.nroOpcionDescuento = i );

// Muestro los descuentos en el html
dom_mostrarOpcionesDescuentos();
    



// **********************************************************************
// COMPARADOR DE PRODUCTOS
// **********************************************************************


// Constructor de comparacion de productos
// --------------------------------------------------------------------------

class Comparador {

    //Constuctor de items a comparar
    constructor(nombre, precio, cantidadPeso) {
        this.nombre  = nombre.toLowerCase() || 0;
        this.precio  = parseFloat(precio).toFixed(2) || 0;
        this.cantidadPeso = parseInt(cantidadPeso) || 0;
        this.precioMinimaUnidad = 0;
        this.cantidad = 0;
    }

    precioMinimaUni(tipoDescuento, dto_x, dto_y){
        switch(tipoDescuento) {
            case 0:
                // Sin descuento
                this.cantidad = 1;
                this.precioMinimaUnidad = this.precio / this.cantidadPeso;
            case 1:
                // Calcula los descuentos del tipo X% (ejemplo: 50%, 50% de descuento)
                this.cantidad = 1;
                this.precioMinimaUnidad = (this.precio - this.precio * (dto_x / 100)) / this.cantidadPeso
                break;
            case 2:
                // Calcula los descuentos del tipo X*Y (ejemplo: 2x1, lleva 2 paga 1)
                this.cantidad = dto_x;
                this.precioMinimaUnidad =  ((this.precio * dto_x) - (dto_x - dto_y) * this.precio) / (this.cantidadPeso * dto_x);
                break;
            case 3:
                // Calcula los descuentos del tipo 2do al X% (ejemplo: 2do al 70%, 70% de descuento en la segunda unidad)
                this.cantidad = 2;
                this.precioMinimaUnidad = ((2 * this.precio) - this.precio * (dto_x / 100)) / (this.cantidadPeso * 2);
                break;
        }
    }
}


// Eventos COMPARAR: Boton comparar productos
// --------------------------------------------------------------------------

// Campos de ingreso de datos
let domCompara_campoNombreA = document.getElementById("domCompara_campoNombreA");
let domCompara_campoNombreB = document.getElementById("domCompara_campoNombreB");
let domCompara_campoPesoA = document.getElementById("domCompara_campoPesoA");
let domCompara_campoPesoB = document.getElementById("domCompara_campoPesoB");
let domCompara_campoPrecioA = document.getElementById("domCompara_campoPrecioA");
let domCompara_campoPrecioB = document.getElementById("domCompara_campoPrecioB");
let domCompara_campoDescuentoA = document.getElementById("domCompara_campoDescuentoA");
let domCompara_campoDescuentoB = document.getElementById("domCompara_campoDescuentoB");
// Boton de comparacion
let domCompara_botonComparar = document.getElementById("domCompara_botonComparar");
// Espacio en HTML para insertar la respuesta
let dom_respuestaComparacion = document.getElementById("dom_respuestaComparacion");


domCompara_botonComparar.onclick=(()=>{
    
    let comparaArr = [];
    let ahorroComparacion = 0;
    
    // Creo un nuevo item por cada opcion y los cargo en el array comparaArr
    comparaArr.push(new Comparador(domCompara_campoNombreA.value, domCompara_campoPrecioA.value, domCompara_campoPesoA.value));
    comparaArr.push(new Comparador(domCompara_campoNombreB.value, domCompara_campoPrecioB.value, domCompara_campoPesoB.value));
    
    // Calculo el precio de la unidad minima para cada producto
    comparaArr[0].precioMinimaUni(descuentosArr[domCompara_campoDescuentoA.selectedIndex].tipoDescuento, descuentosArr[domCompara_campoDescuentoA.selectedIndex].dto_x, descuentosArr[domCompara_campoDescuentoA.selectedIndex].dto_y);
    comparaArr[1].precioMinimaUni(descuentosArr[domCompara_campoDescuentoB.selectedIndex].tipoDescuento, descuentosArr[domCompara_campoDescuentoB.selectedIndex].dto_x, descuentosArr[domCompara_campoDescuentoB.selectedIndex].dto_y);
    

    // Muestro la respuesta en HTML
    if(comparaArr[0].precioMinimaUnidad == comparaArr[1].precioMinimaUnidad) {
        dom_respuestaComparacion.innerHTML = "<p>Elegi el que mas te guste, las 2 opciones cuestan lo mismo</p>";
    } else {
        // Ordeno el array por el mas economico primero y calculo el ahorro
        comparaArr.sort((a,b) => a.precioMinimaUnidad - b.precioMinimaUnidad);
        ahorroComparacion = ((comparaArr[0].cantidadPeso * comparaArr[0].cantidad) * (comparaArr[1].precioMinimaUnidad - comparaArr[0].precioMinimaUnidad))
        // Muestro por HTML
        dom_respuestaComparacion.innerHTML = `
        <br>
        <hr>
        <p>La opcion mas economica es <strong>${comparaArr[0].nombre}</strong></p>
        <p>Llevando ${comparaArr[0].cantidad} paquete(s) estas ahorrando <strong>$${ahorroComparacion.toFixed(2)}</strong></p>
        `;
    }
});




// **********************************************************************
// CARRITO DE COMPRA
// **********************************************************************

let carritoArr = [];
let idCarrito = 0;

// Recupero carrito del localStorage
if(localStorage.getItem("carrito")!=null){
    carritoArr = JSON.parse(localStorage.getItem("carrito"));
    idCarrito = parseInt(localStorage.getItem("idCarrito"));
}

ejecucionCarrito();


// Ejecucion funciones carrito
// --------------------------------------------------------------------------

function ejecucionCarrito() {
    
    // Ejecuto funcion
    dom_mostrarCarrito();
    agregarProductoCarrito();
    chequearTicket();
    borrarCarrito();
}

// Constructor de productos para el carrito, y calculo de descuentos
// --------------------------------------------------------------------------

class Productos {

    //Constuctor de cada item que cargo en el carrito
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre  = nombre.toLowerCase() || 0;
        this.precio  = parseFloat(precio).toFixed(2) || 0;
        this.cantidad = parseInt(cantidad) || 0;
        this.subTotal = this.precio * this.cantidad;
        this.descuento = 0;
        this.descripcionDescuentosAplicados = "";
        this.total = this.subTotal
        this.checkbox = false;
    }

    aplicarDescuento(tipoDescuento, dto_x, dto_y){
        switch(tipoDescuento) {
            case 1:
                // Calcula los descuentos del tipo X% (ejemplo: 50%, 50% de descuento)
                this.descuento += ((-1) * this.cantidad * this.precio * (dto_x / 100));
                this.total = (this.cantidad * this.precio) + this.descuento;
                this.descripcionDescuentosAplicados += "(" + dto_x + "%) ";
                break;
            case 2:
                // Calcula los descuentos del tipo X*Y (ejemplo: 2x1, lleva 2 paga 1)
                this.descuento += ((-1) * Math.trunc(this.cantidad / dto_x) * (dto_x - dto_y) * this.precio);
                this.total = (this.cantidad * this.precio) + this.descuento;
                this.descripcionDescuentosAplicados += "(" + dto_x + "x" + dto_y + ") ";
                break;
            case 3:
                // Calcula los descuentos del tipo 2do al X% (ejemplo: 2do al 70%, 70% de descuento en la segunda unidad)
                this.descuento += ((-1) * Math.trunc(this.cantidad / 2) * this.precio * (dto_x / 100));
                this.total = (this.cantidad * this.precio) + this.descuento;
                this.descripcionDescuentosAplicados += "(2do al " + dto_x + "%) ";
                break;
        }
    }
}


// DOM: Mostrar el carrito en el HTML
// --------------------------------------------------------------------------

function dom_mostrarCarrito(){

    let dom_seccionCarrito = document.getElementById("dom_seccionCarrito");
    let dom_totalCarrito = document.getElementById("dom_totalCarrito");
    
    dom_seccionCarrito.innerHTML = "";

    // Cada item del carrito
    carritoArr.forEach((producto) => {

        dom_seccionCarrito.innerHTML += `
        <div class="itemCarrito d-flex" id="domCarritoContenidoItem-${producto.id}">
            <div class="itemCarrito_check"><input value="" class="form-check-input" type="checkbox" id="domCarritoCheckbox-${producto.id}"></div>
            <div class="itemCarrito_descripcion">
                <strong>${producto.nombre}</strong>
                <p>(${producto.cantidad} uni) $${producto.precio} c/u = $${producto.subTotal}</p>
                <p>Descuentos: ${producto.descripcionDescuentosAplicados} = $${producto.descuento}</p>
            </div>
            <div class="itemCarrito_total"><strong>$${producto.total}</strong></div>
        </div>
        `;
    });

    // Precio total del carrito
    dom_totalCarrito.innerHTML = `$ ${carritoArr.reduce((acumulador, producto) => acumulador + producto.total, 0)}`;

}; 

    
// Eventos CARRITO: Boton agregar producto al carrito
// --------------------------------------------------------------------------

function agregarProductoCarrito(){

    let domCarrito_campoNombre = document.getElementById("domCarrito_campoNombre");
    let domCarrito_campoPrecio = document.getElementById("domCarrito_campoPrecio");
    let domCarrito_campoCantidad = document.getElementById("domCarrito_campoCantidad");
    let domCarrito_campoDescuento1 = document.getElementById("domCarrito_campoDescuento1");
    let domCarrito_campoDescuento2 = document.getElementById("domCarrito_campoDescuento2");
    let domCarrito_botonAgregar = document.getElementById("domCarrito_botonAgregar");
    
    
    domCarrito_botonAgregar.onclick=(()=>{
        
        // Acumulador de numero de id
        idCarrito++;
        localStorage.setItem("idCarrito", idCarrito);
        
        // Creo un nuevo item y lo cargo al array
        let itemProducto = new Productos(idCarrito, domCarrito_campoNombre.value, domCarrito_campoPrecio.value, domCarrito_campoCantidad.value);
        carritoArr.push(itemProducto);
        
        // Le aplico los descuentos
        itemProducto.aplicarDescuento(descuentosArr[domCarrito_campoDescuento1.selectedIndex].tipoDescuento, descuentosArr[domCarrito_campoDescuento1.selectedIndex].dto_x, descuentosArr[domCarrito_campoDescuento1.selectedIndex].dto_y);
        itemProducto.aplicarDescuento(descuentosArr[domCarrito_campoDescuento2.selectedIndex].tipoDescuento, descuentosArr[domCarrito_campoDescuento2.selectedIndex].dto_x, descuentosArr[domCarrito_campoDescuento2.selectedIndex].dto_y);
        
        // Guardo en local storage
        localStorage.setItem("carrito", JSON.stringify(carritoArr));
        
        // Ejecutar funcion para mostrar el carrito en html y mostrar mensaje item cargado
        dom_mostrarCarrito();
        chequearTicket();
        alert(`Agregaste ${itemProducto.nombre} al carrito`);
    });

}


// Eventos CARRITO: Checkbox
// --------------------------------------------------------------------------

function chequearTicket(){

    carritoArr.forEach((producto) => {

        let domCarrito_botonAgregar = document.getElementById(`domCarritoCheckbox-${producto.id}`);
        let domCarrito_contenidoItem = document.getElementById(`domCarritoContenidoItem-${producto.id}`);

        // Marco el check segun lo guardado en el array
        domCarrito_botonAgregar.checked = producto.checkbox;

        // Aplico clase para modificar opacity
        if(producto.checkbox){
            domCarrito_contenidoItem.className = "itemCarrito d-flex opacity-50"
        } else {
            domCarrito_contenidoItem.className = "itemCarrito d-flex"
        }

        // Deteccion cambio de estado checkbox
        domCarrito_botonAgregar.onchange=(()=>{

            // Cambio el estado en el array y guardo en el storage
            producto.checkbox = domCarrito_botonAgregar.checked;
            localStorage.setItem("carrito", JSON.stringify(carritoArr));

            chequearTicket();
        });

    });
};



// Eventos CARRITO: Borrar carrito
// --------------------------------------------------------------------------

function borrarCarrito() {

    let domCarrito_botonBorrar = document.getElementById("domCarrito_botonBorrar");
    
    domCarrito_botonBorrar.onclick=(()=>{
        let encontrarCheck = carritoArr.some(item => item.checkbox == true);
        if(!encontrarCheck){
            carritoArr = [];
        }else{
            carritoArr.forEach((producto) => {
                if(producto.checkbox) {
                    carritoArr.splice(carritoArr.indexOf(producto), 1);
                }
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carritoArr));
        ejecucionCarrito();
    });
};



// ---------------------------------
// PENDIENTES
// --------------------------------- 

// Logica de comparacion - OK
// Total de la compra - OK
// Guardar carrito en local storage - OK
// Crear descuentosArr personalizadas
// Mensaje de item cargado al carrito - OK
// Eliminar productos del carrito - OK
// Empezar un carrito nuevo - OK
// Tachar productos para chequear ticket - OK
// Opcion de tomar el 2do descuento sobre el anterior
// Mejorar diseño
// Ayuda



