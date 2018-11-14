/* global document, fetch, WebSocket, window, alert */

const kriterij = document.getElementById('pretraga');
let originalniNiz = [];
let noviNiz = [];
const paragraph = document.getElementById('pasus');
const ws = new WebSocket('ws://baza-filmova.herokuapp.com/filmovi');


function render(niz) {
  paragraph.innerHTML = '';
  for (let i = 0; i < niz.length; i += 1) {
    const okvir = document.createElement('div');
    const naziv = document.createElement('p');
    naziv.innerText += niz[i].naziv;
    okvir.appendChild(naziv);

    const dugme = document.createElement('button');
    dugme.innerText = 'x';
    okvir.appendChild(dugme);
    dugme.addEventListener('click', () => {
      obrisi(niz[i]._id);
    });

    const slika = document.createElement('img');
    slika.src += niz[i].slika;
    okvir.appendChild(slika);

    const godina = document.createElement('p');
    godina.innerText += niz[i].godina;
    okvir.appendChild(godina);

    paragraph.appendChild(okvir);
  }
}

function filtriraj() {
  noviNiz = originalniNiz.filter(film => film.naziv.toLowerCase().includes(kriterij.value.toLowerCase()));
  render(noviNiz);
}

function obrisi(id) {
  fetch('https://baza-filmova.herokuapp.com/obrisi-film/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),

  })
    .then(res => res.text())
    .then((res) => {
      alert(res);
      window.location.reload();
    });
}

fetch('https://baza-filmova.herokuapp.com/filmovi/')
  .then(response => response.json())
  .then((data) => {
    originalniNiz = data;
    render(originalniNiz);
  });

kriterij.addEventListener('keyup', filtriraj);

ws.addEventListener('connect', (e) => {
  console.log(`Server javlja: + ${e.data}`);
});
