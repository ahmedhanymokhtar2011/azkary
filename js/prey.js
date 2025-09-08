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


//prayer search

document.getElementById("searchBtn").addEventListener("click", getPrayerTimes);

//get prayer time fuction
async function getPrayerTimes() {
  const city = document.getElementById("city").value.trim();
  const results = document.querySelector(".prayer-box");
    const notFound = document.querySelector(".not-found");
  const cityName = document.querySelector(".city-name");
  const container = document.querySelector(".pray-container");

  //if condation
  if (!city) return;
  
  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`;

const res = await fetch(url);
const data = await res.json();
//not found message
    if (!data || !data.data) throw new
      Error("city not found");
    const timings = data.data.timings;

    //fill the data
    document.getElementsByClassName("fajr")[0].textContent = timings.Fajr;
    document.getElementsByClassName("duhr")[0].textContent = timings.Dhuhr;
    document.getElementsByClassName("asr")[0].textContent = timings.Asr;
    document.getElementsByClassName("maghrib")[0].textContent = timings.Maghrib;
    document.getElementsByClassName("isha")[0].textContent = timings.Isha;

    cityName.textContent = `مواقيت الصلاة في ${city}`;
    results.classList.add("active");
    notFound.style.display = "none";

    //animate container expend
    container.style.height = "auto";

    //animate prayers
    document.querySelectorAll(".prayer").forEach((box, i) => {
      setTimeout(() => {
        box.classList.add("active");
      }, i * 150);
    });
  } catch (err) {
    results.classList.remove("active");
    notFound.style.display = "block";
    container.style.height = "auto";
 }

}

//dark mode

let body = document.body;
let isDark = false;// start with light mode
//toggle color function
function toggleColors() {
  body.classList.toggle("dark");
  //save in local storage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

//when reloud page accept local storage
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  }
});
