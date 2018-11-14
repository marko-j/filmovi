const film = document.getElementById('obrazac');
const naslovFilma = document.getElementById('naslov');
const godinaFilma = document.getElementById('god');
const slikaFilma = document.getElementById('pic');

film.addEventListener('submit', (e) => {

  e.preventDefault()

  const parametri = {

    naziv: naslovFilma.value,

    godina: godinaFilma.value,

    slika: slikaFilma.value,
  };
  fetch('https://baza-filmova.herokuapp.com/dodaj-film', {

    method: 'post',

    headers: {

      'Accept': 'application/json, text/plain, */*',

      'Content-Type': 'application/json',

    },

    body: JSON.stringify(parametri)

  })

    .then(res => res.text())

    .then(res => console.log(res))
})