const SURF_SPOTS = [
{
name: "Mumbai Surf Club",
lat: 19.0760,
lon: 72.8777
},
{
name: "Shaka Surf Club (Mangalore)",
lat: 12.9141,
lon: 74.8560
},
{
name: "Kadal Surf Club (Udupi)",
lat: 13.3409,
lon: 74.7421
},
{
name: "Mambo Surf Club (Mulki)",
lat: 13.0910,
lon: 74.7928
},
{
name: "Appu Surf Club (Kovalam)",
lat: 8.4000,
lon: 76.9784
}
];

function renderSpotButtons(){

const container = document.getElementById("spotButtons");

SURF_SPOTS.forEach(spot => {

const btn = document.createElement("button");

btn.className = "spot-btn";
btn.innerText = spot.name;

btn.onclick = () => {
loadForecast(spot.lat, spot.lon);
};

container.appendChild(btn);

});

}













function loadSpot(){

const lat = document.getElementById("lat").value;
const lon = document.getElementById("lon").value;

loadForecast(lat,lon);

}

async function loadForecast(lat,lon){

const url =
`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height&forecast_days=3`;

const res = await fetch(url);
const data = await res.json();

const waves = data.hourly.wave_height;
const times = data.hourly.time;

function getMorningAvg(day){

let total = 0;
let count = 0;

for(let i=0;i<times.length;i++){

if(
times[i].startsWith(day) &&
(times[i].includes("06:00") || times[i].includes("09:00"))
){

total += waves[i];
count++;

}

}

return count ? (total/count).toFixed(2) : "--";

}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);

function format(d){
return d.toISOString().split("T")[0];
}

const t = getMorningAvg(format(today));
const tm = getMorningAvg(format(tomorrow));
const da = getMorningAvg(format(dayAfter));

function getSurfRating(wave){

wave = parseFloat(wave);

if(isNaN(wave))
return "--";

if(wave < 0.6) return "⭐ Poor";
if(wave < 0.9) return "⭐⭐ Fair";
if(wave < 1.2) return "⭐⭐⭐ Good";
if(wave < 1.6) return "⭐⭐⭐⭐ Great";

return "⭐⭐⭐⭐⭐ Epic";

}

// Dashboard
document.getElementById("t-wave").innerText = t + " m";
document.getElementById("tm-wave").innerText = tm + " m";
document.getElementById("da-wave").innerText = da + " m";

document.getElementById("t-rating").innerText = getSurfRating(t);
document.getElementById("tm-rating").innerText = getSurfRating(tm);
document.getElementById("da-rating").innerText = getSurfRating(da);
}

loadForecast();


const SPOTS_URL =
"https://gist.githubusercontent.com/naotokui/01c384bf58ca43261eafe6a5e2ad6e85/raw/surfspots.json";

async function loadSurfSpots(){

const res = await fetch(SPOTS_URL);
const spots = await res.json();

const indiaSpots = spots.filter(spot =>
spot.country && spot.country.includes("India")
);

populateDropdown(indiaSpots);

}

function populateDropdown(spots){

const select = document.getElementById("spotSelect");

spots.forEach(spot => {

const option = document.createElement("option");

option.value = `${spot.lat},${spot.lng}`;
option.textContent = spot.name;

select.appendChild(option);

});

}

document.getElementById("spotSelect")
.addEventListener("change", function(){

if(!this.value) return;

const coords = this.value.split(",");

const lat = coords[0];
const lon = coords[1];

loadForecast(lat,lon);

});

window.onload = function(){

renderSpotButtons();

// default = Arnala
loadForecast(19.449187,72.748365);

};


