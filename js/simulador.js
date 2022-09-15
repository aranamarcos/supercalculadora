
// Estructura del JS

// DECLARACION - variables globales
// CONSTRUCTOR - opciones de descuento
// CONSTRUCTOR - productos para el carrito
// CONSTRUCTOR - comparacion de productos
// DOM - menu desplegable de descuentos
// DOM - mostrar el carrito
// DOM - mostrar noticias
// DOM - respuesta de la comparacion
// EVENTOS - comparar productos
// EVENTOS - borrar datos del modal comparacion
// EVENTOS - agregar producto al carrito
// EVENTOS - borrar carrito
// EVENTOS - seleccionar item del carrito con checkbox
// API - noticias
// EJECUCION principal



// DECLARACION - variables globales
// --------------------------------------------------------------------------

// Recupero el carrito y el id guardado en localStorage
let carritoArr = JSON.parse(localStorage.getItem("carrito")) || [];
let idCarrito = JSON.parse(localStorage.getItem("idCarrito")) || 0;

let descuentosArr = [];
let noticiasArr = [];


// CONSTRUCTOR - opciones de descuento
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
};


// CONSTRUCTOR - productos para el carrito
// --------------------------------------------------------------------------

class Productos {

    //Constuctor de cada item que cargo en el carrito
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre  = nombre || "-";
        this.precio  = precio || 0;
        this.cantidad = cantidad || 0;
        this.subTotal = precio * cantidad;
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
                this.total = ((this.cantidad * this.precio) + this.descuento);
                this.descripcionDescuentosAplicados += "(" + dto_x + "%) ";
                break;
            case 2:
                // Calcula los descuentos del tipo X*Y (ejemplo: 2x1, lleva 2 paga 1)
                this.descuento += ((-1) * Math.trunc(this.cantidad / dto_x) * (dto_x - dto_y) * this.precio);
                this.total = ((this.cantidad * this.precio) + this.descuento);
                this.descripcionDescuentosAplicados += "(" + dto_x + "x" + dto_y + ") ";
                break;
            case 3:
                // Calcula los descuentos del tipo 2do al X% (ejemplo: 2do al 70%, 70% de descuento en la segunda unidad)
                this.descuento += ((-1) * Math.trunc(this.cantidad / 2) * this.precio * (dto_x / 100));
                this.total = ((this.cantidad * this.precio) + this.descuento);
                this.descripcionDescuentosAplicados += "(2do al " + dto_x + "%) ";
                break;
        }
    }
}


// CONSTRUCTOR - comparacion de productos
// --------------------------------------------------------------------------

class Comparador {

    //Constuctor de items a comparar
    constructor(id, nombre, precio, cantidadPeso) {
        this.id = id;
        this.nombre = nombre;
        this.precio  = precio || 0;
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
        };
    };
};


// DOM - menu desplegable de descuentos
// --------------------------------------------------------------------------

const dom_mostrarOpcionesDescuentos = () => {
    
    let dom_menuDescuentos = document.getElementsByClassName("dom_menuDescuentos");
    
    for(let i = 0; i < dom_menuDescuentos.length; i++) {
        descuentosArr.forEach((cadaDescuento, j) => {
            dom_menuDescuentos[i].innerHTML += `
            <option value="${j+1}">${cadaDescuento.descripcionExtendidaDescuento}</option>`
        });
    };
};


// DOM - mostrar el carrito
// --------------------------------------------------------------------------

const dom_mostrarCarrito = () => {

    let dom_seccionCarrito = document.getElementById("dom_seccionCarrito");
    let dom_totalCarrito = document.getElementById("dom_totalCarrito");
    let dom_footerTotalCarrito = document.getElementById("dom_footerTotalCarrito");
    let totalCarrito = 0
    
    dom_seccionCarrito.innerHTML = "";

    // Cada item del carrito
    carritoArr.forEach((producto) => {

        dom_seccionCarrito.innerHTML += `
        <tr>
        <td><input value="" class="form-check-input" type="checkbox" id="domCarritoCheckbox-${producto.id}"></td>
        <td id="domCarritoContenidoItem-${producto.id}">
            <p class="m-0"><strong>${producto.nombre}</strong><p>
            <p class="m-0 textoDetalleCarrito">${Math.round(producto.cantidad *100)/100} x $${Math.round(producto.precio *100)/100} = $${Math.round(producto.subTotal *100)/100}</p>
            ${producto.descuento != 0 ? `<p class="m-0 textoDetalleCarrito">Descuentos: ${producto.descripcionDescuentosAplicados} = $${Math.round(producto.descuento *100)/100}</p>` : ""}        
        </td>
        <td><strong>$${Math.round(producto.total *100)/100}</strong></td>
        </tr>`
        });

    // Precio total del carrito
    totalCarrito = carritoArr.reduce((acumulador, producto) => acumulador + producto.total, 0)
    dom_totalCarrito.innerHTML = `$ ${Math.round((totalCarrito)*100)/100}`;
    dom_footerTotalCarrito.innerHTML = `<i class="bi bi-cart4"></i> $ ${(Math.round((carritoArr.reduce((acumulador, producto) => acumulador + producto.total, 0))*100)/100).toFixed()}`
};


// DOM - mostrar noticias
// --------------------------------------------------------------------------

const dom_mostrarNoticias = () => {

    let dom_carrouselNoticias = document.getElementById("dom_carrouselNoticias");
    let dom_carrouselNoticias_button = document.getElementById("dom_carrouselNoticias_button");

    noticiasArr.forEach((noticia, index) => {

        dom_carrouselNoticias.innerHTML += `
        <div class="carousel-item ${index == 0 ? "active" : ""}">
            <div class="card">
                <div class="row g-0">
                    <div class="col-4 d-flex justify-content-center align-items-center noticia">
                        <img src="${noticia.urlToImage}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-8 d-flex align-items-center noticia">
                        <div class="card-body">
                            <h5 class="card-title">${noticia.title}</h5>
                            <p class="card-text">${noticia.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }); 
};


// DOM - respuesta de la comparacion
// --------------------------------------------------------------------------
const dibujarRespuestaComparacion = ((ahorro, ProdRecomendado)=> {

    let dom_respuestaComparacion = document.getElementById("dom_respuestaComparacion");    
    let dom_headerProdA = document.getElementById("domCompara_headerProdA");
    let dom_headerProdB = document.getElementById("domCompara_headerProdB");

    
    // Si recibo -1 reiniciar el estado del DOM (inputs, texto de respuesta y colores de titulos)
    if(ahorro == -1) {
        document.getElementById("formCompara_ProdA").reset();
        document.getElementById("formCompara_ProdB").reset();

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
        <p class="text-center">Llevando ${ProdRecomendado.cantidad} paquete(s) estas ahorrando <strong>$${Math.round(ahorro *100)/100}</strong></p>
        `;
    };    
});


// EVENTOS - comparar productos
// --------------------------------------------------------------------------

let domCompara_botonComparar = document.getElementById("domCompara_botonComparar");

// Evento click comparar productos
domCompara_botonComparar.onclick=(()=>{

    let domCompara_campoPesoA = parseFloat(document.getElementById("domCompara_campoPesoA").value);
    let domCompara_campoPesoB = parseFloat(document.getElementById("domCompara_campoPesoB").value);
    let domCompara_campoPrecioA = parseFloat(document.getElementById("domCompara_campoPrecioA").value);
    let domCompara_campoPrecioB = parseFloat(document.getElementById("domCompara_campoPrecioB").value);
    let domCompara_campoDescuentoA = document.getElementById("domCompara_campoDescuentoA").selectedIndex;
    let domCompara_campoDescuentoB = document.getElementById("domCompara_campoDescuentoB").selectedIndex;


    if(domCompara_campoPesoA > 0 && domCompara_campoPesoB > 0 && domCompara_campoPrecioA > 0 && domCompara_campoPrecioB > 0){
        
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
        ahorroComparacion = (comparaArr[0].cantidadPeso * comparaArr[0].cantidad) * (comparaArr[1].precioMinimaUnidad - comparaArr[0].precioMinimaUnidad);
        dibujarRespuestaComparacion(ahorroComparacion, comparaArr[0]);

    } else {
        // Muestro mensaje para que el usuario verifique los datos
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor revise los campos ingresados.',
        })
    };
});


// EVENTOS - borrar datos del modal comparacion
// --------------------------------------------------------------------------

let domCompara_botonBorrar = document.getElementById("domCompara_botonBorrar");

domCompara_botonBorrar.onclick=(()=>{

    dibujarRespuestaComparacion(-1);
    
});


// EVENTOS - agregar producto al carrito
// --------------------------------------------------------------------------

const agregarProductoCarrito = () => {

    let domCarrito_botonAgregar = document.getElementById("domCarrito_botonAgregar");
    
    domCarrito_botonAgregar.onclick=(()=>{

        let domCarrito_campoNombre = document.getElementById("domCarrito_campoNombre").value;
        let domCarrito_campoPrecio = parseFloat(document.getElementById("domCarrito_campoPrecio").value);
        let domCarrito_campoCantidad = parseFloat(document.getElementById("domCarrito_campoCantidad").value);
        let domCarrito_campoDescuento1 = document.getElementById("domCarrito_campoDescuento1").selectedIndex;
        let domCarrito_campoDescuento2 = document.getElementById("domCarrito_campoDescuento2").selectedIndex;
        let formAgregarAlCarrito = document.getElementById("formAgregarAlCarrito");
        
        if(domCarrito_campoPrecio > 0 && domCarrito_campoCantidad > 0){

            formAgregarAlCarrito.reset();
        
            // Acumulador de numero de id y lo almaceno en local storage
            idCarrito++;
            localStorage.setItem("idCarrito", idCarrito);

            // Creo un nuevo item y lo cargo al array
            let itemProducto = new Productos(idCarrito, domCarrito_campoNombre, domCarrito_campoPrecio, domCarrito_campoCantidad);
            carritoArr.push(itemProducto);
            
            // Le aplico los 2 descuentos
            itemProducto.aplicarDescuento(descuentosArr[domCarrito_campoDescuento1].tipoDescuento, descuentosArr[domCarrito_campoDescuento1].dto_x, descuentosArr[domCarrito_campoDescuento1].dto_y);
            itemProducto.aplicarDescuento(descuentosArr[domCarrito_campoDescuento2].tipoDescuento, descuentosArr[domCarrito_campoDescuento2].dto_x, descuentosArr[domCarrito_campoDescuento2].dto_y);
            
            // Guardo en local storage
            localStorage.setItem("carrito", JSON.stringify(carritoArr));
            
            // Mostrar carrito en html
            dom_mostrarCarrito();
            checkboxCarrito();
    
            // Muestro confirmacion de item cargado al carrito
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Agregaste ${itemProducto.nombre} al carrito`,
                showConfirmButton: false,
                timer: 1000
            })

        } else {
            // Muestro mensaje para que el usuario verifique los datos
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor revise los campos ingresados.',
            })
        };

    });
};


// EVENTOS - borrar carrito
// --------------------------------------------------------------------------

const borrarCarrito = () => {

    let domCarrito_botonBorrar = document.getElementById("domCarrito_botonBorrar");
    
    domCarrito_botonBorrar.onclick=(()=>{

        // Reviso si hay al menos un item con check
        let encontrarCheck = carritoArr.some(item => item.checkbox == true);
        
        Swal.fire({
            title: encontrarCheck ? 'Estas seguro que queres borrar los productos seleccionados?' : 'Estas seguro que queres borrar todo el carrito?',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                // Si algun item tiene check borro los seleccionados, sino borro todo el carrito
                carritoArr = encontrarCheck ? carritoArr.filter(item => item.checkbox === false) : [];

                // Si el carrito queda vacio reinicio el idCarrito
                if(carritoArr.length === 0) {
                    idCarrito = 0;
                    localStorage.setItem("idCarrito", idCarrito);
                }

                localStorage.setItem("carrito", JSON.stringify(carritoArr));
                dom_mostrarCarrito();
                checkboxCarrito();

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Borrado`,
                    showConfirmButton: false,
                    timer: 1000
                })
            };
        });
    });
};


// EVENTOS - seleccionar item del carrito con checkbox
// --------------------------------------------------------------------------

const checkboxCarrito = () => {

    carritoArr.forEach((producto) => {

        let domCarrito_checkbox = document.getElementById(`domCarritoCheckbox-${producto.id}`);
        let domCarrito_contenidoItem = document.getElementById(`domCarritoContenidoItem-${producto.id}`);

        // Marco el check segun lo guardado en el array
        domCarrito_checkbox.checked = producto.checkbox;
        // Aplico clase para modificar opacity
        domCarrito_contenidoItem.className = producto.checkbox ? "text-danger" : "";


        // Deteccion cambio de estado checkbox
        domCarrito_checkbox.onchange=(()=>{

            // Cambio el estado en el array y guardo en el storage
            producto.checkbox = domCarrito_checkbox.checked;
            localStorage.setItem("carrito", JSON.stringify(carritoArr));

            checkboxCarrito();
        });
    });
};


// API - noticias
// --------------------------------------------------------------------------

async function obtenerNoticias() {
    const URLnoticias = "https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=92e842bb69124b7cb758e43fe2f54d1d";
    const resp = await fetch(URLnoticias);
    const data = await resp.json();
    noticiasArr = data.articles;
    dom_mostrarNoticias();
}

// Lo mismo pero usando fetch

    // function obtenerNoticias() {
    //     const URLnoticias = "https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=92e842bb69124b7cb758e43fe2f54d1d";
    //     fetch(URLnoticias)
    //         .then(resultado => resultado.json())
    //         .then(noticias => {
    //             noticiasArr = noticias.articles;
    //             dom_mostrarNoticias();
    //         })
    // }


// EJECUCION principal
// --------------------------------------------------------------------------

// Si se recargo la pagina y el carrito tenia productos, pregunto si quiere iniciar un nuevo carrito o continuar con el anterior
if(carritoArr.length > 0) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
    
      swalWithBootstrapButtons.fire({
        title: 'Que queres hacer con tu carrito?',
        text: "Tenes productos en tu carrito, queres continuar con este, o borrarlo e iniciar uno nuevo?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Continuar con mi carrito',
        cancelButtonText: 'Borrar e iniciar uno nuevo',
        reverseButtons: true
      }).then((result) => {
        if (!result.isConfirmed) {
            carritoArr = [];
            localStorage.setItem("carrito", JSON.stringify(carritoArr));
            idCarrito = 0;
            localStorage.setItem("idCarrito", idCarrito);
            dom_mostrarCarrito();
        }
      })
};

dom_mostrarCarrito();
agregarProductoCarrito();
checkboxCarrito();
borrarCarrito();
obtenerNoticias();


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


    







// Use math.round(numero *100)/100 en vez de toFixed() para que no me ponga por default decimales aunque no los tenga (Ej 5.00 en vez de 5)

// ---------------------------------
// PENDIENTES
// --------------------------------- 

// Logica de comparacion - OK
// Total de la compra - OK
// Guardar carrito en local storage - OK
// Mensaje de item cargado al carrito - OK
// Eliminar productos del carrito - OK
// Tachar productos para chequear ticket - OK
// idCarrito: reiniciar cuando borro todo el carrito - OK
// Mejorar diseño - OK
// Ver decimales, que no aparezca por ej cantidad 5.00, sino 5. - OK
// cuando se cierra y se va a agregar un producto, preguntar si empezar un carrito nuevo o continuar - OK
// Ver total en el footer - OK
// Achicar y cambiar a color mas suave el detalle en el carrito - OK
// Si no le pongo nombre en cargar producto que hace, le pone un guion, otra cosa, o nada - OK
// limitar los caracteres de ingreso de nombre (20 caracteres) - OK 
// Ver total en dolares o publicar noticias con API - OK
// Linkear los enlaces del nav a los modal de cada seccion - OK

// Crear descuentosArr personalizadas
// Opcion de ordenar el carrito (por orden de carga, precio, o alfabeticamente)
// Modificar un producto que esta en el carrito
// dar formato a noticias
// Cerrar el menu de descuentos cuando se vuelve a abrir o se carga otro producto si no tiene uno fijo
// Cerrar el menu del nav al entrar a un enlace
// Acomodar la version pc para que se vea bien
// Cambiar tipografia
// Ayuda
// Opcion de tomar el 2do descuento sobre el anterior
// Opcion de fijar el segundo descuento
// 2do descuento en la parte de comparar productos
// Ordenar codigo. Las variables globales van arriba




