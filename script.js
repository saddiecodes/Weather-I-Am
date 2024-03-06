//Define global variables
const apiKey = "ee3ada3a53770308ef9a35a3b65b0744"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/";
const searchForm = $("#search-form");
const searchInput = $("#search-input");
const historyList = $("#history");
$(document).ready(function () {
    const apiKey = "ee3ada3a53770308ef9a35a3b65b0744";
    const apiUrl = "https://api.openweathermap.org/data/2.5/";
    const searchForm = $("#search-form");
    const searchInput = $("#search-input");
    const historyList = $("#history");
  
    searchForm.on("submit", function (event) {
      event.preventDefault();
      const cityName = searchInput.val().trim();
      if (cityName !== "") {
        // Fetch geocoding data to get latitude and longitude
        fetchGeocoding(cityName);
      }
    });
  
    historyList.on("click", "button", function () {
      const cityName = $(this).data("city");
      if (cityName) {
        fetchGeocoding(cityName);
      }
    });
    function fetchGeocoding(cityName) {
      const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
      $.ajax({
        url: geocodingUrl,
        method: "GET",
      }).then(function(geoResponse) {
        console.log(geoResponse)
        if (geoResponse.length > 0) {
          const { lat, lon } = geoResponse[0];
          // Fetch current weather data using latitude and longitude
        weatherData(lat, lon)  
        }
      });
    }
    function weatherData(lat, lon) {
    const weatherDataUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; 
    $.ajax({
      url: weatherDataUrl,
      method: "GET",
    }).then(function(response) {
      displayCurrentWeather(response) 
  

    });
    }
    function displayCurrentWeather(data) {
      console.log(data)
      let todaysWeatherElement = document.querySelector("#today")
      todaysWeatherElement.innerHTML = "" 
      console.log(todaysWeatherElement)
      let cityTitle = document.createElement("h1")
      cityTitle.textContent = data.city.name 
      todaysWeatherElement.appendChild(cityTitle)
      //Wind speed 
      let windSpeed = document.createElement("h1")
      windSpeed.textContent = data.list[0].wind.speed
      todaysWeatherElement.appendChild(windSpeed) 
      //Humditiy
      let humidityShow = document.createElement("h1")
      humidityShow.textContent = data.list[0].main.humidity
      todaysWeatherElement.appendChild(humidityShow)
      //Temperature
      let tempNow = document.createElement("h1")
      tempNow.textContent = data.list[0].main.temp
      todaysWeatherElement.appendChild(tempNow)
      //Date
      let dateNow = document.createElement("h1")
      dateNow.textContent = data.list[0].dt_txt
      todaysWeatherElement.appendChild(dateNow)
      displayFutureWeather(data)
    }
  // Future weather
  function displayFutureWeather (data) {
    console.log(data)
    var days=[3,10,17,24,31] 
    for (let index = 0; index < days.length; index++) {
      const element = days[index];
      //Wind Speed
      let windSpeed = document.createElement("h1")
      windSpeed.textContent = data.list[element].wind.speed
      todaysWeatherElement.appendChild(windSpeed) 
      //Add other elements to show on page
      
    }

  }
  });
// Set global variables, including Open Weather Maps API Key



     
      