const grid = new Muuri('.grid', {
    layout: {
        rounding: false
      }
});

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
items.forEach((item)=>{
    item.addEventListener('click', (evento)=>{
        document.querySelector('.card').innerHTML = item.innerHTML
        document.querySelector('.overlay').classList.remove('ocultar')
    });
});

overlay.addEventListener('click', (e)=>{
    e.target.id === 'overlay' || e.target.id === 'cerrar' ? overlay.classList.add('ocultar') : '';
});