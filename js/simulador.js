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
                this.descripcionExtendidaDescuento = "-";
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

function dom_mostrarOpcionesDescuentos(){
    
    let dom_menuDescuentos = document.getElementsByClassName("dom_menuDescuentos");
    
    for(let i = 0; i < dom_menuDescuentos.length; i++) {
        descuentosArr.forEach((cadaDescuento, j) => {
            dom_menuDescuentos[i].innerHTML += `
            <option value="${j+1}">${cadaDescuento.descripcionExtendidaDescuento}</option>`
        });
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
    constructor(id, nombre, precio, cantidadPeso) {
        this.id = id;
        this.nombre = nombre;
        this.precio  = precio.toFixed(2) || 0;
        this.cantidadPeso = cantidadPeso || 0;
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


// Eventos COMPARAR: Boton comparar productos y borrar
// --------------------------------------------------------------------------

let domCompara_botonComparar = document.getElementById("domCompara_botonComparar");

// Evento click comparar productos
domCompara_botonComparar.onclick=(()=>{

    let domCompara_campoPesoA = parseFloat(document.getElementById("domCompara_campoPesoA").value.replace(',','.'));
    let domCompara_campoPesoB = parseFloat(document.getElementById("domCompara_campoPesoB").value.replace(',','.'));
    let domCompara_campoPrecioA = parseFloat(document.getElementById("domCompara_campoPrecioA").value.replace(',','.'));
    let domCompara_campoPrecioB = parseFloat(document.getElementById("domCompara_campoPrecioB").value.replace(',','.'));
    let domCompara_campoDescuentoA = document.getElementById("domCompara_campoDescuentoA").selectedIndex;
    let domCompara_campoDescuentoB = document.getElementById("domCompara_campoDescuentoB").selectedIndex;


    if(domCompara_campoPesoA && domCompara_campoPesoB && domCompara_campoPrecioA && domCompara_campoPrecioB){
        
        let comparaArr = [];
        let ahorroComparacion = 0;
        
        // Creo un nuevo item por cada opcion y los cargo en el array comparaArr
        comparaArr.push(new Comparador(1, "Producto A", domCompara_campoPrecioA, domCompara_campoPesoA));
        comparaArr.push(new Comparador(2, "Producto B", domCompara_campoPrecioB, domCompara_campoPesoB));
        
        // Calculo el precio de la unidad minima para cada producto
        comparaArr[0].precioMinimaUni(descuentosArr[domCompara_campoDescuentoA].tipoDescuento, descuentosArr[domCompara_campoDescuentoA].dto_x, descuentosArr[domCompara_campoDescuentoA].dto_y);
        comparaArr[1].precioMinimaUni(descuentosArr[domCompara_campoDescuentoB].tipoDescuento, descuentosArr[domCompara_campoDescuentoB].dto_x, descuentosArr[domCompara_campoDescuentoB].dto_y);

        // Ordeno el array por el mas economico primero y calculo el ahorro
        comparaArr.sort((a,b) => a.precioMinimaUnidad - b.precioMinimaUnidad);
        ahorroComparacion = ((comparaArr[0].cantidadPeso * comparaArr[0].cantidad) * (comparaArr[1].precioMinimaUnidad - comparaArr[0].precioMinimaUnidad))
        dibujarRespuestaComparacion(ahorroComparacion, comparaArr[0]);

    } else {
        // Muestro mensaje para que el usuario verifique los datos
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor revise que todos los campos de cantidad y precio esten completos, y use solo numeros.',
        })
    };
});



// Eventos COMPARA: Boton borrar
// --------------------------------------------------------------------------

let domCompara_botonBorrar = document.getElementById("domCompara_botonBorrar");

domCompara_botonBorrar.onclick=(()=>{
    
    // Mensaje de confirmacion
    Swal.fire({
        title: 'Estas seguro que queres borrar?',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
    }).then((result) => {
        if (result.isConfirmed) {
            dibujarRespuestaComparacion(-1);
            document.getElementById("formCompara_ProdA").reset();
            document.getElementById("formCompara_ProdB").reset();
            Swal.fire('Borrado', '', 'success')
        }
    });
});


// Dibujar respuesta de comparacion
// --------------------------------------------------------------------------
const dibujarRespuestaComparacion = ((ahorro, ProdRecomendado)=> {

    let dom_respuestaComparacion = document.getElementById("dom_respuestaComparacion");    
    let dom_headerProdA = document.getElementById("domCompara_headerProdA");
    let dom_headerProdB = document.getElementById("domCompara_headerProdB");

    
    // Si envio -1 reiniciar el estado del DOM (texto de respuesta y colores de titulos)
    if(ahorro == -1) {
        dom_headerProdA.className = "card-header text-center";
        dom_headerProdB.className = "card-header text-center";
        dom_respuestaComparacion.innerHTML = "";

    // Si el ahorro es cero cualquier opcion es valida
    } else if (ahorro == 0) {
        dom_headerProdA.className = "card-header text-center text-bg-success";
        dom_headerProdB.className = "card-header text-center text-bg-success";
        dom_respuestaComparacion.innerHTML = "<br><hr><p>Elegi el que mas te guste, las 2 opciones cuestan lo mismo</p>";

    // Si hay una opcion recomendada
    } else {
        // Marcar de color verde en la opcion recomendada
        switch(ProdRecomendado.id) {
            case 1:
                // Producto A en verde
                dom_headerProdA.className = "card-header text-center text-bg-success";
                dom_headerProdB.className = "card-header text-center";
                break;
            case 2:
                // Producto B en verde
                dom_headerProdA.className = "card-header text-center";
                dom_headerProdB.className = "card-header text-center text-bg-success";
                break;
        };

        // Muestro texto de respuesta
        dom_respuestaComparacion.innerHTML = `
        <hr>
        <p class="text-center">La opcion mas economica es <strong>${ProdRecomendado.nombre}</strong></p>
        <p class="text-center">Llevando ${ProdRecomendado.cantidad} paquete(s) estas ahorrando <strong>$${ahorro.toFixed(2)}</strong></p>
        `;
    };    
});




// **********************************************************************
// CARRITO DE COMPRA
// **********************************************************************

let idCarrito = 0;
// Recupero el carrito y el id guardado en localStorage 
let carritoArr = JSON.parse(localStorage.getItem("carrito")) || [];

ejecucionCarrito();


// Ejecucion funciones carrito
// --------------------------------------------------------------------------

function ejecucionCarrito() {

    dom_mostrarCarrito();
    agregarProductoCarrito();
    // checkboxCarrito();
    borrarCarrito();
}

// Constructor de productos para el carrito, y calculo de descuentos
// --------------------------------------------------------------------------

class Productos {

    //Constuctor de cada item que cargo en el carrito
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre  = nombre || 0;
        this.precio  = precio.toFixed(2) || 0;
        this.cantidad = cantidad || 0;
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
        <tr>
        <td><div class="itemCarrito_check"><input value="" class="form-check-input" type="checkbox" id="domCarritoCheckbox-${producto.id}"></div></td>
        <td>
            <p class="m-0"><strong>${producto.nombre}</strong><p>
            <p class="m-0">${producto.cantidad} x $${producto.precio} = $${producto.subTotal}</p>
            <p class="m-0">Descuentos: ${producto.descripcionDescuentosAplicados} = $${producto.descuento}</p>
        </td>
        <td><strong>$${producto.total}</strong></td>
        </tr>
        `;
        // dom_seccionCarrito.innerHTML += `
        // <div class="itemCarrito d-flex" id="domCarritoContenidoItem-${producto.id}">
        //     <div class="itemCarrito_check"><input value="" class="form-check-input" type="checkbox" id="domCarritoCheckbox-${producto.id}"></div>
        //     <div class="itemCarrito_descripcion">
        //         <strong>${producto.nombre}</strong>
        //         <p>(${producto.cantidad} uni) $${producto.precio} c/u = $${producto.subTotal}</p>
        //         <p>Descuentos: ${producto.descripcionDescuentosAplicados} = $${producto.descuento}</p>
        //     </div>
        //     <div class="itemCarrito_total"><strong>$${producto.total}</strong></div>
        // </div>
        // `;
    });

    // Precio total del carrito
    dom_totalCarrito.innerHTML = `$ ${carritoArr.reduce((acumulador, producto) => acumulador + producto.total, 0)}`;
    
}; 

    
// Eventos CARRITO: Boton agregar producto al carrito
// --------------------------------------------------------------------------

function agregarProductoCarrito(){

    let domCarrito_botonAgregar = document.getElementById("domCarrito_botonAgregar");
    
    domCarrito_botonAgregar.onclick=(()=>{

        let domCarrito_campoNombre = document.getElementById("domCarrito_campoNombre").value;
        let domCarrito_campoPrecio = parseFloat(document.getElementById("domCarrito_campoPrecio").value.replace(',','.'));
        let domCarrito_campoCantidad = parseFloat(document.getElementById("domCarrito_campoCantidad").value.replace(',','.'));
        let domCarrito_campoDescuento1 = document.getElementById("domCarrito_campoDescuento1").selectedIndex;
        let domCarrito_campoDescuento2 = document.getElementById("domCarrito_campoDescuento2").selectedIndex;
        

        // Acumulador de numero de id
        idCarrito++;
        localStorage.setItem("idCarrito", idCarrito);
        
        // Creo un nuevo item y lo cargo al array
        let itemProducto = new Productos(idCarrito, domCarrito_campoNombre, domCarrito_campoPrecio, domCarrito_campoCantidad);
        carritoArr.push(itemProducto);
        
        // Le aplico los descuentos
        itemProducto.aplicarDescuento(descuentosArr[domCarrito_campoDescuento1].tipoDescuento, descuentosArr[domCarrito_campoDescuento1].dto_x, descuentosArr[domCarrito_campoDescuento1].dto_y);
        itemProducto.aplicarDescuento(descuentosArr[domCarrito_campoDescuento2].tipoDescuento, descuentosArr[domCarrito_campoDescuento2].dto_x, descuentosArr[domCarrito_campoDescuento2].dto_y);
        


        // Guardo en local storage
        localStorage.setItem("carrito", JSON.stringify(carritoArr));
        
        // Ejecutar funcion para mostrar el carrito en html
        dom_mostrarCarrito();
        // checkboxCarrito();

        // Muestro confirmacion de item cargado al carrito
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Agregaste ${itemProducto.nombre} al carrito`,
            showConfirmButton: false,
            timer: 1500
        })
    });
};


// Eventos CARRITO: Checkbox
// --------------------------------------------------------------------------

function checkboxCarrito(){

    carritoArr.forEach((producto) => {

        let domCarrito_checkbox = document.getElementById(`domCarritoCheckbox-${producto.id}`);
        let domCarrito_contenidoItem = document.getElementById(`domCarritoContenidoItem-${producto.id}`);

        // Marco el check segun lo guardado en el array
        domCarrito_checkbox.checked = producto.checkbox;

        // Aplico clase para modificar opacity
        domCarrito_contenidoItem.className = producto.checkbox ? "itemCarrito d-flex opacity-50" : "itemCarrito d-flex";

        // Deteccion cambio de estado checkbox
        domCarrito_checkbox.onchange=(()=>{

            // Cambio el estado en el array y guardo en el storage
            producto.checkbox = domCarrito_checkbox.checked;
            localStorage.setItem("carrito", JSON.stringify(carritoArr));

            checkboxCarrito();
        });

    });
};


// Eventos CARRITO: Borrar carrito
// --------------------------------------------------------------------------

function borrarCarrito() {

    let domCarrito_botonBorrar = document.getElementById("domCarrito_botonBorrar");
    
    domCarrito_botonBorrar.onclick=(()=>{
        let encontrarCheck = carritoArr.some(item => item.checkbox == true);
        
        Swal.fire({
            title: 'Estas seguro que queres borrar?',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
        }).then((result) => {
            if (result.isConfirmed) {

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

                Swal.fire('Borrado', '', 'success')
            };
        });
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

// idCarrito: iniciar en cero o recuperar de local storage



