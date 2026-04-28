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

if(times[i].startsWith(day) &&
times[i].includes("06") ||
times[i].includes("09")){

total += waves[i];
count++;

}

}

return (total/count).toFixed(2);

}

const today = new Date();
const yesterday = new Date(today);
const tomorrow = new Date(today);

yesterday.setDate(today.getDate()-1);
tomorrow.setDate(today.getDate()+1);

function format(d){

return d.toISOString().split("T")[0];

}

const y = getMorningAvg(format(yesterday));
const t = getMorningAvg(format(today));
const tm = getMorningAvg(format(tomorrow));

document.getElementById("yesterday").innerText = y+" m";
document.getElementById("today").innerText = t+" m";
document.getElementById("tomorrow").innerText = tm+" m";

}

loadForecast();

function getSurfRating(wave){

if(wave < 0.6)
return "⭐ Poor";

if(wave < 0.9)
return "⭐⭐ Fair";

if(wave < 1.2)
return "⭐⭐⭐ Good";

if(wave < 1.6)
return "⭐⭐⭐⭐ Great";

return "⭐⭐⭐⭐⭐ Epic";

}

document.getElementById("y-wave").innerText = y + " m";
document.getElementById("t-wave").innerText = t + " m";
document.getElementById("tm-wave").innerText = tm + " m";

document.getElementById("y-rating").innerText = getSurfRating(y);
document.getElementById("t-rating").innerText = getSurfRating(t);
document.getElementById("tm-rating").innerText = getSurfRating(tm);