//const children = document.getElementById("kontener").getElementsByTagName("div");
licznik = document.getElementById("kontener").getElementsByTagName("div").length; // licznik kart
document.getElementById("info").textContent = "Liczba kart: " + licznik;

function selectCard(event) {
    if (event.target.classList.contains("selected")) {
        event.target.classList.remove("selected");
    } else {
        event.target.classList.add("selected");
    }
}


function addCard() {
    const kontener = document.getElementById("kontener");
    const karta = document.createElement('div');
    karta.textContent = `Karta ${++licznik}`;
    karta.className = "karta";
    karta.onclick = selectCard;
    kontener.appendChild(karta);
    document.getElementById("info").textContent = "Liczba kart: " + licznik;

    karta.addEventListener("dblclick", function (event) {
        kontener.insertBefore(karta, kontener.firstElementChild)
    })

    const btn = document.createElement("button");
    btn.textContent = "Usuń";
    btn.onclick = () => { kontener.removeChild(karta); }
    karta.appendChild(btn);
}