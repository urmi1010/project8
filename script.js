function refreshWeather(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector(".num");
    let humi = document.querySelector(".humidity");
    let des = document.querySelector(".description");
    let cityElement = document.querySelector("h1");
    let windElement = document.querySelector(".speed");
    let date = new Date(response.data.timezone * 1000);
    let iconElement = document.querySelector(".emoji");
    let iconCode = response.data.weather[0].icon;
    let timezone = response.data.timezone; 
    let timeElement = document.querySelector(".time");
    let utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    let time = new Date(utcTime + timezone * 1000);


    timeElement.textContent = formatDate(time);
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon">`;
    cityElement.textContent = response.data.name;
    temperatureElement.textContent =Math.round(response.data.main.temp);
    humi.textContent = `${response.data.main.humidity}%`;
    des.textContent = response.data.weather[0].description;
    windElement.textContent = response.data.wind.speed; 
    getForecast(response.data.name);
  }

function formatDate(date){
 let minutes = date.getMinutes();
 let hours = date.getHours();
 let days = [
  "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thrusday",
    "friday",
    "saturday",
    
];
let day = days[date.getDay()];

if (minutes < 10){
    minutes = `0${minutes}`;
}
return `${day} ${hours}:${minutes}`;
}
function weather(city) {
   let apiKey = "763564287e75c6cc7230d9e4eee699d0";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(refreshWeather);
}
 function formatDay(timezone){
let date = new Date(timezone*1000);
let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

return days[date.getDay()];
 }
function getForecast(city) {
  let apiKey ="763564287e75c6cc7230d9e4eee699d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;    
  axios(apiUrl).then(displayForecast);                            
}
let form = document.querySelector("form");
let cityInput = document.querySelector("#city");
let cityName = document.querySelector("h1");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  let userCity = cityInput.value.trim();
  if (userCity) {
    cityName.textContent= userCity;
    weather(userCity);
  } else {
        alert("Please enter a city name!");
  }
  cityInput.value = "";
});

function displayForecast(response){
  console.log(response.data);
        
    let forecastHtml ="";
   let daysAdded = [];
   

    response.data.list.forEach(function(day) {
      let dayName = formatDay(day.dt);
      if (!daysAdded.includes(dayName)) {
    daysAdded.push(dayName);
      let icon = day.weather[0].icon;
      let iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      forecastHtml= forecastHtml +`<div class="forecastday">
    <div class="forecastdate">${dayName}</div>
    <div class="forecasticon">
    <img src="${iconurl}"alt = "weather icon">
    </div>
    <div class="forecasttemperatures">
      <div class="forecasttemperature">
        <strong>${Math.round(day.main.temp_max)}°</strong> </div>
        <div class="forecasttemperature">${Math.round(day.main.temp_min)}°</div> 
    </div>
  </div>`;
  if (daysAdded.length === 4) return;
      }
    });
    let forecastElement = document.querySelector(".forecast");
    forecastElement.innerHTML=forecastHtml;
}
