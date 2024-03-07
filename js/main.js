const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const nameCity = document.querySelector("#city");
const nameCountry = document.querySelector("#country");

let msjError;

callAPI('Buenos Aires', 'AR');

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (nameCity.value === "" || nameCountry.value === "") {
    showError("Ambos campos son obligatorios");
    return;
  }

  callAPI(nameCity.value, nameCountry.value)
});

function callAPI(city, country) {
  const apiID = "d96842fc5db10d08fa8f7f2af3c31d30";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;

  fetch(URL)
    .then(data => {
      return data.json();
    })
    .then(dataJSON => {
      if (dataJSON.cod === "404") {
        showError("Hubo un error en los datos proporcionados.");
      }
      else {
        showWeather(dataJSON)
      }
    });
}


function showWeather (data) {
const {name, main:{temp, temp_max, temp_min}, weather:[arr]} = data

const degrees = kelvinToCentigrade(temp);
const max = kelvinToCentigrade(temp_max);
const min = kelvinToCentigrade(temp_min);

const content = document.createElement('div');
content.innerHTML = `
<h5>Clima en ${name}</h5>
<img class="icono" src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
<h2>${degrees}C</h2>
<p>Max: ${max}°C</p>
<p>Min: ${min}C</p>`

result.innerHTML = "";
result.appendChild(content)
};

function showError(msj) {
  if (msjError) {
    msjError.innerHTML = msj;
  } else {
    msjError = document.createElement("p");
    msjError.classList.add("alert-msj");
    msjError.innerHTML = msj;
    form.appendChild(msjError);
    setTimeout(() => {
      msjError.remove();
      msjError = null;
    }, 3000);
  }
};

function kelvinToCentigrade(temp) {
    return parseInt(temp -273.15);
};