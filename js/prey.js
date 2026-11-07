// ===== Burger menu =====
const burger = document.getElementById("burger");
const navMenu = document.querySelector("nav ul");

// Toggle the mobile menu when the burger icon is clicked
burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close the menu when any nav link is clicked
document.querySelectorAll("nav ul a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});


// ===== Prayer search =====

// Run the search when the search button is clicked
document.getElementById("searchBtn").addEventListener("click", getPrayerTimes);

// Convert a 24-hour time string (e.g. "17:45") to 12-hour format (e.g. "5:45 PM")
// This helper is new; the rest of the code below is unchanged
function to12Hour(time24) {
  // The API may append a timezone like "(EET)", so extract only HH:MM
  const match = time24.match(/(\d{1,2}):(\d{2})/);
  if (!match) return time24; // fall back to the original value if the format is unexpected

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? "م" : "ص";

  // 0 -> 12 AM, 13..23 -> 1..11 PM, 12 stays 12 PM
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
}

// Fetch and display prayer times for the entered city
async function getPrayerTimes() {
  const city = document.getElementById("city").value.trim();
  const results = document.querySelector(".prayer-box");
  const notFound = document.querySelector(".not-found");
  const cityName = document.querySelector(".city-name");
  const container = document.querySelector(".pray-container");

  // Do nothing if the input is empty
  if (!city) return;

  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`;

    const res = await fetch(url);
    const data = await res.json();

    // Throw an error if the city was not found
    if (!data || !data.data) throw new
      Error("city not found");
    const timings = data.data.timings;

    // Fill the prayer times (converted to 12-hour format)
    document.getElementsByClassName("fajr")[0].textContent = to12Hour(timings.Fajr);
    document.getElementsByClassName("duhr")[0].textContent = to12Hour(timings.Dhuhr);
    document.getElementsByClassName("asr")[0].textContent = to12Hour(timings.Asr);
    document.getElementsByClassName("maghrib")[0].textContent = to12Hour(timings.Maghrib);
    document.getElementsByClassName("isha")[0].textContent = to12Hour(timings.Isha);

    cityName.textContent = `مواقيت الصلاة في ${city}`;
    results.classList.add("active");
    notFound.style.display = "none";

    // Let the container expand to fit the results
    container.style.height = "auto";

    // Animate the prayer boxes one after another
    document.querySelectorAll(".prayer").forEach((box, i) => {
      setTimeout(() => {
        box.classList.add("active");
      }, i * 150);
    });
  } catch (err) {
    // Hide results and show the "not found" message on any error
    results.classList.remove("active");
    notFound.style.display = "block";
    container.style.height = "auto";
  }

}

// ===== Dark mode =====

let body = document.body;
let isDark = false; // start with light mode

// Toggle dark/light colors
function toggleColors() {
  body.classList.toggle("dark");

  // Save the chosen theme in local storage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Restore the saved theme when the page reloads
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});