const CARDS = document.getElementById('cards');
const BTNPREV = document.getElementById('prev');
const BTNNEXT = document.getElementById('next');
const SEARCH = document.getElementById('buscar');
const CHECKS = document.getElementById('check-container');


let personajes = [];
let url = "https://rickandmortyapi.com/api/character";
let urlNext = null;
let urlPrev = null;
let especie = [];


BTNNEXT.addEventListener('click', () => {
    traerDatos(urlNext);
})

BTNPREV.addEventListener('click', () => {
    traerDatos(urlPrev);
})

SEARCH.addEventListener('input', filtroDoble);
CHECKS.addEventListener('change', filtroDoble);


function filtrarTexto(Arraypersonajes, texto) {
    let arrayPesonajeFiltrado = Arraypersonajes.filter(personaje => personaje.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayPesonajeFiltrado;
}

function filtroCheckbox(arrayPersonajes) {
    let arregloCheck = Array.from(document.querySelectorAll("input[type='checkbox']"));
    let checkCheckeados = arregloCheck.filter(valor => valor.checked);
    let valueCheckedChek = checkCheckeados.map(checkbox => checkbox.value);
    let personaFiltro = arrayPersonajes.filter(eventos => valueCheckedChek.includes(eventos.species));
    console.log(personaFiltro);
    if (personaFiltro.length) {
        return personaFiltro;
    } else {
        return arrayPersonajes;
    }
}



function filtroDoble() {
    let primerFiltro = filtrarTexto(personajes, SEARCH.value);
    let segundoFiltro = filtroCheckbox(primerFiltro);
    doCards(segundoFiltro);
}


function mostrarCheckbox(arrayCheck) {
    CHECKS.innerHTML = "";
    arrayCheck.forEach(elemento => {
        let check = document.createElement('div');
        check.className = 'form-check form-switch';
        check.innerHTML = `<input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
        <label class="form-check-label text-white" for="${elemento}">${elemento}</label>`
        CHECKS.appendChild(check);
    })
}


traerDatos(url);

function traerDatos(url) {

    fetch(url)
        .then(response => response.json()
            .then(data => {

                personajes = data.results;
                especie = [];
                urlPrev = data.info.prev;
                if (urlPrev == null) {
                    BTNPREV.disabled = true;
                } else {
                    BTNPREV.disabled = false;
                }
                urlNext = data.info.next;

                if (urlNext == null) {
                    BTNNEXT.disabled = true;
                } else {
                    BTNNEXT.disabled = false;
                }
                doCards(personajes);

                personajes.forEach(personaje => !especie.includes(personaje.species) ? especie.push(personaje.species) : "");

                mostrarCheckbox(especie);

            })
        )
        .catch(error => console.log(error.message));

}






function doCards(arrayPersonajes) {

    CARDS.innerHTML = "";

    arrayPersonajes.forEach(personaje => {
        let card = document.createElement('div');
        card.className = 'card bg-transparent border border-white mb-4 mt-5 animate__animated animate__bounce animate__backInUp';
        card.style.width = '18rem';
        card.innerHTML = `<img src="${personaje.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${personaje.name}</h5>
          <p class="list-group-item">Status: ${personaje.status}</p>
          <p class="list-group-item">Gender: ${personaje.gender}</p>
          <p class="list-group-item">Species: ${personaje.species}</p>
        </div>
        `
        CARDS.appendChild(card);
    })


}