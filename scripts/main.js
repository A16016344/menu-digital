const grid = new Muuri('.grid', {
    layout: {
        rounding: false
      }
});

var nombre = recuperarInfo("nombre")
var direccion = recuperarInfo("direccion_completa")

nombre === "" ? (document.querySelector(".registro").style.position = "fixed", document.querySelector(".enlace-registro").innerText = "Registrar datos de envio"): '';

window.onload = function(){
    console.log(`Se ha cargado la pagina`);
    grid.filter(`[data-categoria="cargando"]`);
    grid.filter(`[data-categoria]`)
};

const categorias = document.querySelectorAll("#categorias a");
categorias.forEach((categoria) => {
    categoria.addEventListener('click', (opcion) => {
        opcion.preventDefault();
        categorias.forEach((categoria) => categoria.classList.remove("activo"));
        opcion.target.classList.add("activo");

        const categoria = opcion.target.innerHTML.toLowerCase();
        console.log(categoria);
        categoria === "todos" ? grid.filter(`[data-categoria]`) : grid.filter(`[data-categoria="${categoria}"]`);
    });
});

document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
    const busqueda = evento.target.value.toLowerCase()
    grid.filter((item) => item.getElement().innerHTML.toLowerCase().includes(busqueda));
})

const items = document.querySelectorAll(".item-contenido");
const overlay = document.querySelector('.overlay');
const card = document.querySelector('.card')
var paquete = "";
items.forEach((item)=>{
    item.addEventListener('click', (evento)=>{
        card.innerHTML = item.innerHTML;
        card.innerHTML.includes("paquete") ? paquete = `Paquete%20${card.querySelector(".paquete").innerText.split(" ").join("%20")}` : "";
        card.innerHTML.includes("Ingredientes a escoger") ? paquete += `%20_Ingredientes:_` : "";
        card.innerHTML.includes("ocultar") ? paquete = card.querySelector(".ocultar").innerText.split(" ").join("%20") : "";
        document.querySelector('.overlay').classList.remove('ocultar');
        document.querySelector('#pedir').href = `https://wa.me/529993639814?&text=*Nombre%3A*%20${nombre}%0A*Dirección%3A*%20${direccion}%0A*Pedido%3A*%20${paquete}`
    });
});

overlay.addEventListener('click', (e)=>{
    e.target.id === 'overlay' || e.target.id === 'cerrar' ? overlay.classList.add('ocultar') : '';
});

function recuperarInfo(dato) {
    if (localStorage.getItem(dato)){
        return localStorage.getItem(dato).split(" ").join("%20");
    } else {
        return "";
    }

}

(function() {
    // TODO add service worker code here
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  })();