SuperCalculadora - por Marcos Arana

---------------
<¿Que es?>

SuperCalculadora es una herramienta de ayuda cuando se van a realizar las compras en el supermercado.
Permite llevar un control de los gastos, calcular rapidamente distintos descuentos y promociones, y comparar entre dos opciones para elegir la mas economica.

---------------
<Funciones principales>

- Llevar un listado de lo que se esta comprando, calculando los valores totales con descuentos.
- Comparar 2 productos de distintos tamaños, precio, y descuentos, para elegir el mas economico.
- Crear sus propios descuentos personalizados.

---------------
<Ventajas>

- Saber cuanto va a gastar antes de llegar a la caja.
- Poder comprobar si le cobraron correctamente y si hay diferencias encontrarlas rapidamente.
- Ahorrar tiempo al realizar de forma facil los calculos de cualquier tipo de descuentos (ejemplo: 30%, 3x2, 2do al 70%, etc).
- Poder elegir la opcion mas economica entre diferentes productos.

---------------
<Instructivo de uso>

La pagina tiene 4 secciones.
A las 3 primeras se puede acceder desde el menu superior (desplegable en la version mobile) o bien desde los botones centrales ubicados en la pagina principal. A la ultima seccion, "Configuracion", solo se accede desde el menu superior.

1) Agregar al Carrito
Es donde se toma nota de cada articulo que va comprando en el supermercado.
Se debe ingresar un nombre de producto (ejemplo: yerba), el precio, y la cantidad a comprar.
Adicionalmente, en "aplicar descuento", se abren 2 menu desplegables para aplicar hasta 2 descuentos diferentes (ejemplo, en el primero le aplico un 2do al 80 que corresponde a la promocion del producto, y adicionalmente en el segundo le pongo 20% por descuento con la tarjeta de credito). Cada descuento se aplica sobre el precio total sin descuentos, y luego se restan ambos descuentos. Si no encuentra el descuento que necesita puede ir a crear uno personalizado en la seccion "configuracion".
Para confirmar la carga se debe presionar el boton "Agregar al Carrito" ubicado en la parte inferior.
De esta forma ese producto ya queda cargado en el carrito.

2) Ver Carrito: 
Es donde se puede ver el detalle de los producto que esta comprando y que fueron previamente cargados en la seccion "agregar al carrito".
En la parte inferior hay un boton rojo para borrar productos, si hay alguno seleccionado lo borra, si no hay ninguno seleccionado borra todo el carrito.
En la parte superior derecha de color verde se puede observar el total del carrito (suma de todos los productos).
En la tabla:
-1er columna, aparece un cuadrado al lado de cada producto, se usa como seleccion para marcar los productos que quiero borrar, una vez seleccionados se presiona el boton rojo.
-2da columna, "producto" se puede ver en negrita el nombre de cada producto, y debajo de cada uno el detalle del gasto (cantidad de unidades multiplicado por precio unitario y el total, y debajo los descuentos aplicados si los tuviera).
-3er columna, "total" se ve el precio final del producto (precio por cantidad menos descuentos).
-4ta columna, "+/-", el titulo de la columna es un boton que habilita un boton "+" y "-" en cada uno de los productos, estos sirven para sumar o restar 1 unidad de su producto (el nuevo total se recalcula automaticamente).

3) Comparar productos: 
Es donde puede comparar 2 productos de diferentes tamaños, precios, y descuentos, para saber cual es la opcion mas economica y cuanto puede ahorrar.
Hay 2 columnas, producto A y producto B, donde se cargan los datos de los 2 productos a comparar.
Cantidad por envase sirve para comparar 2 productos de diferente tamaño, si son iguales puede ingresar 1 en cada uno. Algunos ejemplos: Ejemplo 1: Si esta comparando queso crema de 300 gramos contra uno de 400 gramos, ingrese 300 y 400. Ejemplo 2: Si esta comparando un paquete de galletitas individual contra uno familiar que trae 3 paquetes adentro, ingrese 1 y 3. Ejemplo 3: Si los dos paquetes son iguales, ingrese 1 y 1.
A continuacion debe ingresar el precio y seleccionar un descuento si corresponde.
Para finalizar la comparacion presione el boton "Comparar", va a aparecer un mensaje con la opcion mas economica y cuanto esta ahorrando.
Para borrar todos los datos de la comparacion presione el boton rojo.

4) Configuracion: 
Es donde puede crear descuentos personalizados o borrar descuentos. Esta seccion solo esta visible en la parte superior de la pagina (menu desplegable en version mobile).
A esta seccion solo se puede acceder desde el menu superior (menu desplegable para la version mobile) en la pagina principal.
-Crear descuento: Selecciona el tipo de descuento a crear (porcentaje de descuento, lleva X paga Y, o X% de descuento en la segunda unidad). Esto le habilita un campo para que cargue el porcentaje de descuento o el lleva X paga Y que necesite para su descuento personalizado. Para crearlo presione el boton verde.
-Borrar descuento: En el menu desplegable seleccione el descuento que quiere borrar y presione el boton rojo.
En la parte inferior tiene un boton azul para volver a los descuentos originales cargados por defecto (10%, 20%, 30%, 2x1, 3x2, 4x3, 2do al 50%, 2do al 70%, 2do al 80%).

En la parte inferior de la pagina principal puede ver el valor total de su carrito.
El carrito queda guardado en memoria, puede salir de la pagina y volver a entrar y va a poder continuar con su carrito (va a aparecer un mensaje al iniciar preguntando si quiere continuar con su carrito o iniciar uno nuevo)

---------------
<Programacion>

Para el proyecto se utilizaron...

- Bootstrap y Sass para el diseño.
- Operadores condicionales (if, else, switch), y ciclos (for, forEach)
- Funciones, con y sin parametros, funciones flecha.
- Variables locales y globales.
- Clases con distintas propiedades y metodos, y constructores para crear items del carrito y opciones de descuentos.
- Arrays, con distintos metodos y propiedades (lenght, push, indexOf, splice, etc).
- Metodos de busqueda y transformacion (forEach, find, filter, reduce, sort), para ordenar, buscar, y modificar.
- Manejo de DOM para crear las interacciones dinamicas, tales como mostrar el carrito, las respuestas a la comparacion de productos, sumar o restar unidades de forma dinamica, etc.
- Control de eventos en botones, menu desplegables, y checkbox, con onClick y onChange.
- Almacenamiento en localStorage, usando JSON, para almacenar y recuperar el carrito y las opciones de descuentos.
- Operadores avanzados (++, operador ternario, or ||, etc).
- Validacion de datos ingresados.
- Asincronia comunicando con API usando fetch y Async Await.

Sobre la API...
Se uso la API de https://newsapi.org/ para traer noticias que se muestran en un carousel en el menu principal.
IMPORTANTE:
Para usar la API de forma gratuita se utilizo el plan Developer.
Este plan restringe cualquier origen que no sea localhost, por lo que solo se mostraran cuando se corra en localhost. 
Se recomienda que para ver el funcionamiento se corra desde localhost.
La API funcionaria correctamente sin modificaciones desde un dominio con un plan de pago. 

---------------
<Pendientes para futuras versiones>

- Poder ordenar el carrito (por orden de carga, precio, o alfabeticamente)
- Agregar una opcion para que elegir como calcular el 2do descuento, si sobre el subtotal o sobre el subtotal menos el primer descuento.
- Dejar una opcion para que quede fijo el segundo descuento si se necesita, por ejemplo por si tengo un descuento que aplica a todos los productos no tener que ingresarlo todas las veces que cargo un producto.
- Poder calcular con un 2do descuento en la parte de comparar productos