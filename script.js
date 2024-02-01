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
    const weatherDataUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`; 
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
    }
    //current wind, humidity 
  });
     
      