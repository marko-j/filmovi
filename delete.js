link = document.getElementById('pic');


function pregledaj(){
    slika = document.getElementById('preview');
    slike = document.createElement('img');
    slike.src = document.getElementById('pic').value;
    slika.appendChild(slike);    
}

link.addEventListener('input', pregledaj);

