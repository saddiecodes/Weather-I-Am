//Define global variables
const apiKey = "ee3ada3a53770308ef9a35a3b65b0744"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/";
const searchForm = $("#search-form");
const searchInput = $("#search-input");
const historyList = $("#history");
 const todaysWeatherElement = $("#today")
const futureWeatherContainer = $("#forecast");
$(document).ready(function () { 

//Function to handle city button clicks 
  $(".city-button").on("click", function() {
      const cityName = $(this).data("city");
      if (cityName) {
          // Fetch weather data for the selected city
          fetchGeocoding(cityName);
      }
  });

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
      todaysWeatherElement.innerHTML = "" 
      console.log(todaysWeatherElement)
      let cityTitle = document.createElement("h1")
      cityTitle.textContent = data.city.name 
      todaysWeatherElement.append(cityTitle)
      //Wind speed 
      let windSpeed = document.createElement("h1")
      windSpeed.textContent = data.list[0].wind.speed
      todaysWeatherElement.append(windSpeed) 
      //Humditiy
      let humidityShow = document.createElement("h1")
      humidityShow.textContent = data.list[0].main.humidity
      todaysWeatherElement.append(humidityShow)
      //Temperature
      let tempNow = document.createElement("h1")
      tempNow.textContent = data.list[0].main.temp
      tempNow.classList.add("temperature");
      todaysWeatherElement.append(tempNow)
      //Date
      let dateNow = document.createElement("h1")
      dateNow.textContent = data.list[0].dt_txt
      todaysWeatherElement.append(dateNow)
      displayFutureWeather(data)
    }
  // Future weather
  function displayFutureWeather (data) {
    console.log(data)
    var days=[3,10,17,24,31] 
    
        for (let index = 0; index < days.length; index++) {
            const element = days[index];
            // Create a new card for each day's forecast
            let card = $("<div>").addClass("col-lg-2 card mx-2");
            //Wind Speed
            let windSpeed = document.createElement("h1")
             windSpeed.textContent = data.list[element].wind.speed
             todaysWeatherElement.append(windSpeed) 
    
            // Date
            let date = $("<h5>").addClass("card-title").text(new Date(data.list[element].dt * 1000).toLocaleDateString());
            card.append(date);
    
            // Weather icon
            let icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[element].weather[0].icon + ".png");
            card.append(icon);
    
            // Temperature
            let temperature = $("<p>").addClass("card-text").text("Temperature: " + (data.list[element].main.temp - 273.15).toFixed(2) + "°C");
            card.append(temperature);
    
            // Humidity
            let humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[element].main.humidity + "%");
            card.append(humidity);
  
            // Append the card to the container
            futureWeatherContainer.append(card);
        }
    }
    
}); 



     
      