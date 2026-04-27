async function loadSurf(){

try{

const url="https://marine-api.open-meteo.com/v1/marine?latitude=19.45&longitude=72.75&current=wave_height";

const res=await fetch(url);
const data=await res.json();

const wave=data.current.wave_height;

document.getElementById("wave").innerText=wave+" m";

let score=0;

if(wave>1.2) score=4;
else if(wave>0.9) score=3;
else if(wave>0.6) score=2;
else score=1;

let rating="⭐ Poor";

if(score==4) rating="⭐⭐⭐⭐ Epic";
else if(score==3) rating="⭐⭐⭐ Good";
else if(score==2) rating="⭐⭐ Okay";

document.getElementById("rating").innerText=rating;

const now=new Date();

document.getElementById("updated").innerText=
"Last updated: "+now.toLocaleString();

}catch(e){

document.getElementById("rating").innerText="Error loading data";

}

}

loadSurf();

async function loadVersion(){

try{

const res = await fetch(
"https://api.github.com/repos/jatin-lmcc/surfsup/commits/main"
);

const data = await res.json();

const sha = data.sha.substring(0,7);

document.getElementById("version").innerText =
"Build " + sha;

}catch(e){

document.getElementById("version").innerText =
"Build info unavailable";

}

}

loadVersion();
