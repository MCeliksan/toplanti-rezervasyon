// Oda isimleri
const odalar = [
  "Toplantı Salonu",
  "Seminer Odası",
  "Görüşme Odası 1",
  "Görüşme Odası 2",
  "Multimedya Stüdyosu"
];

// Saat slotlarını oluştur
function saatSlotlariniGetir() {
  const slotlar = [];
  let saat = 8;
  let dakika = 30;

  while (saat < 22 || (saat === 22 && dakika === 0)) {
    let baslangic = `${saat.toString().padStart(2, '0')}:${dakika.toString().padStart(2, '0')}`;
    let sonrakiSaat = saat;
    let sonrakiDakika = dakika + 60;
    if (sonrakiDakika >= 60) {
      sonrakiSaat += Math.floor(sonrakiDakika / 60);
      sonrakiDakika = sonrakiDakika % 60;
    }
    let bitis = `${sonrakiSaat.toString().padStart(2, '0')}:${sonrakiDakika.toString().padStart(2, '0')}`;
    slotlar.push(`${baslangic} - ${bitis}`);

    saat = sonrakiSaat;
    dakika = sonrakiDakika;
  }

  return slotlar;
}

function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const sekmeAlani = document.createElement("div");
  sekmeAlani.id = "sekmeAlani";
  sekmeAlani.style.marginBottom = "20px";

  const icerikAlani = document.createElement("div");
  icerikAlani.id = "icerikAlani";

  odalar.forEach((odaAdi, index) => {
    const buton = document.createElement("button");
    buton.innerText = odaAdi;
    buton.className = "oda-buton";
    buton.onclick = () => odaSlotlariniGoster(odaAdi);
    sekmeAlani.appendChild(buton);
  });

  app.appendChild(sekmeAlani);
  app.appendChild(icerikAlani);

  // Varsayılan olarak ilk odayı göster
  odaSlotlariniGoster(odalar[0]);
}

function odaSlotlariniGoster(odaAdi) {
  const icerik = document.getElementById("icerikAlani");
  icerik.innerHTML = `<h2>${odaAdi}</h2>`;

  const saatler = saatSlotlariniGetir();

  saatler.forEach((slot) => {
    const div = document.createElement("div");
    div.className = "slot empty";
    div.innerText = slot;
    div.onclick = () => alert(`${odaAdi} - ${slot} için rezervasyon formu açılacak`);
    icerik.appendChild(div);
  });
}

window.onload = initApp;
