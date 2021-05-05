$(()=> {
    console.info("El DOM ha sido cargado correctamente, puede empezar a utilizar la página.");
})

window.addEventListener("load", ()=>{
    console.info("Evento load cargado.")
    mostrarProductos();
    inicializarCarrito()
})

// Funciones del carrito

function mostrarProductos() {
    let divShopItem = "";
    for (const item of productos) {
        divShopItem += `<div class="shop-item">
                            <span class="shop-item-title">${item.titulo}</span>
                            <span class="shop-item-title--detail">${item.tituloDetalle}</span>
                            <img class="shop-item-image" src="${item.imagen}">
                            <div class="shop-item-details">
                                <span class="shop-item-price">\$${item.precio}</span>
                                <button class="btn btn-primary shop-item-button" type="button" onclick="clickComprar(${item.id})">COMPRAR</button>
                            </div>
                        </div>`
    }   
    $("#shop-items").prepend(divShopItem)
}

function inicializarCarrito() {
    const carritoLocalStorage = traerDeLocalStorage()
    if (!carritoLocalStorage) {
        console.warn("El carrito está vacío");
        miCarrito = []
        return
    } 
    miCarrito = carritoLocalStorage
    renderizarCarrito()
}

function clickComprar(id) {
    const producto = buscarProductoPorId(id)
    agregarProductoAlCarrito(producto.id)
}

function buscarProductoPorId(id) {
    return productos.find(producto=>producto.id === id)
}

function indiceItemCarrito(id) {
    return miCarrito.findIndex(item=>item.id === id)
}

function agregarProductoAlCarrito(id) {
    const itemSeleccionado = buscarProductoPorId(id)
    if (!itemSeleccionado){
        console.log("No se puede agregar el producto al carrito. Razón: no existe")
        return
    }
    const indexItemSeleccionado = indiceItemCarrito(id)
    if (indexItemSeleccionado >= 0) {
        miCarrito[indexItemSeleccionado].cantidad++
    } else {
        miCarrito.push({
            id,
            cantidad: 1
        })
    }
    renderizarCarrito()
    guardarEnLocalStorage()

    // Notificación de que el item fue agregado al carrito
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Agregado al carrito'
      })
}

function renderizarCarrito() {
    const cartItems = $(".cart-items") //contenedor de items
    cartItems.empty()
    const arrayTotales = []

    miCarrito.forEach(item => {
        const producto = buscarProductoPorId(item.id)
        const itemPrecioCantidad = producto.precio*item.cantidad
        const filaItemSeleccionado = `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${producto.imagen}" width="100" height="100">
                <span class="cart-item-title">${producto.titulo}</span>
            </div>
            <span class="cart-price cart-column">${itemPrecioCantidad}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" onchange="cambiarCantidad(event, ${item.id})" value="${item.cantidad}">
                <button class="btn btn-danger" type="button" onclick="clickBorrar(${item.id})">QUITAR</button>
            </div>
        </div>`

        
        arrayTotales.push(itemPrecioCantidad)
        cartItems.append(filaItemSeleccionado)
        
    });
    renderizarTotal(arrayTotales)
}




function renderizarTotal(arrayTotales) {
    
    /* Operador ternario. Si mi array de valores no tiene nada, devuelvo 0 y sino, calculo el precio total de mis items acumulados. */
    const totalFinal = arrayTotales.length == 0 ? 0 : arrayTotales.reduce((acumulador, precioActual) => acumulador + precioActual)
    
    precioEnDolares(totalFinal)
        .then((precioEnDolares) => {
            $(".cart-totalUS-price").text(`U$S ${precioEnDolares.toFixed(2)}`)
        })
        .catch((error) => {
            console.log(error)
        })
    $(".cart-total-price").text(`\$${totalFinal}`)
}





function precioEnDolares(precioEnPesos) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://mercados.ambito.com/dolar/%22+tipo+%22/variacion",
            success: data => {
                const precioDolares = precioEnPesos/parseFloat(data.venta)
                resolve(precioDolares)
            },
            error: errorData => {
                reject("Error al calcular el precio en dólares")
                console.log(errorData)
            }
        })
    })
}


$("#btn-toggle").on("click", (event) => {
    $("#miCarrito-Section").slideToggle(800, ()=> {
        $("#btn-toggle").text( $("#btn-toggle").text() == 'Ocultar carrito' ? "Mostrar carrito" : "Ocultar carrito")
    })
})




function clickBorrar(id) {
    const itemEnCarritoSeleccionado = indiceItemCarrito(id)
    if (itemEnCarritoSeleccionado == -1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',
            footer: 'El item no existe en el carrito.'
          })
        return
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estás seguro?',
        text: "Vas a quitar el producto del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borralo nomás!',
        cancelButtonText: 'No, pará!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Borrado!',
            'Quitaste el producto del carrito',
            'success'
            )
            miCarrito.splice(itemEnCarritoSeleccionado, 1)
            renderizarCarrito()
            guardarEnLocalStorage()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Uff, menos mal...',
            'El producto no se ha quitado del carrito',
            'error'
          )
        }
      })
}


function guardarEnLocalStorage() {
    localStorage.setItem(KEY_CARRITO_STORAGE, JSON.stringify(miCarrito));
}

function traerDeLocalStorage() {
    return JSON.parse(localStorage.getItem(KEY_CARRITO_STORAGE))
}

function borrarDeLocalStorage() {
    localStorage.removeItem(KEY_CARRITO_STORAGE);
}

function clickVaciarCarrito() {

    if (miCarrito.length === 0) {     
        Swal.fire({
            icon: 'warning',
            title: 'El carrito ya está vacío',
            text: 'Agregá algún producto al carrito.',
        })
        return
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Vaciar el carrito???',
        text: "Estás seguro? de verdad?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrá dale!',
        cancelButtonText: 'No, pará!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Y ahí se fue el carrito!',
            'El carrito quedó vacío... Como mi corazón :\'( ',
            'success'
            )
            vaciarCarrito()
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Safamos!',
            'El carrito sigue con los productos seleccionados',
            'error'
          )
        }
      })
}

function vaciarCarrito() {
    miCarrito = [];
    renderizarCarrito()
    borrarDeLocalStorage()
}

function cambiarCantidad(event, id) {
    let nuevaCantidad = event.target.value
    const indiceItem = indiceItemCarrito(id)

    if (nuevaCantidad <= 0) {
        nuevaCantidad = 1
    }

    miCarrito[indiceItem].cantidad = parseInt(nuevaCantidad)
    renderizarCarrito()
}

$(".btn-purchase").on("click", function() {

    if (miCarrito.length === 0) {     
        Swal.fire({
            icon: 'warning',
            title: 'El carrito está vacío',
            text: 'Agregá algún producto al carrito.',
        })
        return
    }
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Último paso...',
        text: "Estás a punto de realizar la compra",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, lo quiero ya!',
        cancelButtonText: 'No, me arrepentí',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Compra realizada!',
                text: '¡Acabaste de realizar tu compra!',
                imageUrl: 'https://i.gifer.com/1ehD.gif',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Compraste!!',
                timer: '4000'
              })
            vaciarCarrito()
            renderizarCarrito()
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Epa!',
                'Qué pasó? estabas tan cerca!',
                'error'
            )
        }
      })
})