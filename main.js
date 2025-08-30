//burger menu
const burger = document.getElementById("burger");
const navMenu = document.querySelector("nav ul");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

//close and open menu
document.querySelectorAll("nav ul a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

fetch("adhkar.json")
  .then(response => response.json())
  .then(data => {
    const main = document.querySelector(".main");
    //night
    const mainMassa = document.querySelector(".main-masaa");

    main.innerHTML = "";
    //night
    mainMassa.innerHTML = "";


    // 👈 هنا اخترنا أذكار الصباح
    data.adhkar_sabah.forEach(adhkars => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <p class="card-text">${adhkars.text}</p>
        <div class="count">تكرار: <span>${adhkars.repeat}</span></div>
        <div class="source">${adhkars.source}</div>
      `;

      main.appendChild(card);
    });

    //night adhkar
        data.adhkar_masaa.forEach(adhkars => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <p class="card-text">${adhkars.text}</p>
        <div class="count">تكرار: <span>${adhkars.repeat}</span></div>
        <div class="source">${adhkars.source}</div>
      `;

      mainMassa.appendChild(card);
    });

  })
  .catch(err => console.error("خطأ في تحميل الملف:", err));


let body = document.body;
let isDark = false;// start with light mode
// change the background color

function toggleColors() {
  //if it's already dark ,switch back to light
  if (isDark) {
    body.style.background = "#f4f1ea";
  } else {
    //if it's light ,switch to dark
        body.style.background = "#1a1f1c";
  }
  //flip the state (true <->false)
  isDark = !isDark;
}
