const SURF_SPOTS = [
{
name: "Mumbai Surf Club",
lat: 19.430845,  
lon: 72.754876
},
{
name: "Shaka Surf Club (Kodi Bengare)",
lat: 13.435200, 
lon: 74.693834
},
{
name: "Kadal Surf Club (Udupi)",
lat: 13.382146,
lon: 74.694525
},
{
name: "Mambo Jambo Surf (Mulki)",
lat: 13.086745, 
lon: 74.780479
},
{
name: "Appu Surf Club (Kovalam)",
lat: 12.790820,
lon: 80.253223
},
{
name: "Black Sand Surf School (Mumbai)",
lat: 19.448755,
lon: 72.748600
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

window.onload = function(){

renderSpotButtons();

const firstSpot = SURF_SPOTS[0];
loadForecast(firstSpot.lat, firstSpot.lon);

btn.classList.add("active");

};


