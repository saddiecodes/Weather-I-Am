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
      let windSpeedLabel = $("<p>").addClass("card-text label").text();
      let windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.list[0].wind.speed + " m/s");
      todaysWeatherElement.append(windSpeedLabel, windSpeed);
      // //Humditiy
      let humidityLabel = $("<p>").addClass("card-text label").text("");
      let humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[0].main.humidity + "%");
      todaysWeatherElement.append(humidityLabel, humidity);
      // //Temperature
      let tempLabel = $("<p>").addClass("card-text label").text("");
      let temperature = $("<p>").addClass("card-text").text("Temperature: " + (data.list[0].main.temp - 1).toFixed(2) + "°C");
      todaysWeatherElement.append(tempLabel, temperature);
      //Date
      displayFutureWeather(data)
      let dateLabel = $("<p>").addClass("card-text label").text("");
      let date = $("<p>").addClass("card-text").text("Date:" + new Date(data.list[0].dt * 1000).toLocaleDateString());
      todaysWeatherElement.append(dateLabel, date);
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
             card.append(windSpeed);
    
            // Date
            let date = $("<h5>").addClass("card-title").text(new Date(data.list[element].dt * 1000).toLocaleDateString());
            card.append(date);
    
            // Weather icon
            let icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[element].weather[0].icon + ".png");
            card.append(icon);
    
            // Temperature
        
            let temperature = $("<p>").addClass("card-text").text("Temperature: " + (data.list[element].main.temp - 1 ).toFixed(2) + "°C");
            card.append(temperature);
    
            // Humidity
            let humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[element].main.humidity + "%");
            card.append(humidity);
  
            // Append the card to the container
            futureWeatherContainer.append(card);
        }
    }
    
}); 



     
      



     
      



     
      



     
      