async function loadForecast(){

const url =
"https://marine-api.open-meteo.com/v1/marine?latitude=19.449187&longitude=72.748365&hourly=wave_height&forecast_days=3";

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