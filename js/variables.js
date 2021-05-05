const productos = [
    { id: 1, titulo: "Fuark Fit", tituloDetalle: "Blanco", precio: 2190, imagen: "../../assets/images/Cart/01-Fuark-tshirt-white.jpg"},
    { id: 2, titulo: "Fuark Training", tituloDetalle: "Slim fit negro", precio: 2350, imagen: "../../assets/images/Cart/02-Fuark-tshirt-black-withlogo.jpg"},
    { id: 3, titulo: "Fuark Rustic", tituloDetalle: "Azul oscuro", precio: 2590, imagen: "../../assets/images/Cart/03-Fuark-tshirt-black-withlogo02.jpg"},
    { id: 4, titulo: "Fuark Arnold", tituloDetalle: "Musculosa Blanco", precio: 1350, imagen: "../../assets/images/Cart/04-Fuark-muscle-white-arnold1.jpg"},
    { id: 5, titulo: "Fuark Performance FK", tituloDetalle: "Gris", precio: 2350, imagen: "../../assets/images/Cart/05-Fuark-tshirt-grey-premium.jpg"},
    { id: 6, titulo: "Fuark W FK", tituloDetalle: "Blanco", precio: 2800, imagen: "../../assets/images/Cart/06-Fuark-muscle-blue-logo2w.jpg"},
    { id: 7, titulo: "Kit FK Woman", tituloDetalle: "Rosa", precio: 6500, imagen: "../../assets/images/Cart/07-Fuark-muscle-darkblue-logo1w.jpg"},
    { id: 8, titulo: "Fuark W Performance", tituloDetalle: "Blanco", precio: 3200, imagen: "../../assets/images/Cart/08-Fuark-muscle-white-logo3w.jpg"},
    { id: 9, titulo: "Fuark Planet", tituloDetalle: "Negro", precio: 2800, imagen: "../../assets/images/Cart/09-Fuark-muscle-lightblue-logo2w.jpg"},
    { id: 10, titulo: "Fuark Rustic", tituloDetalle: "Negro", precio: 2900, imagen: "../../assets/images/Cart/10-Fuark-muscle-colorjean-logo1w.jpg"},
];

let miCarrito = [];
const KEY_CARRITO_STORAGE = "miCarrito";