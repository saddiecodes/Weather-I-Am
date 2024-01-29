$(document).ready(function() {
    const apiKey = "ee3ada3a53770308ef9a35a3b65b0744";
    const apiUrl = "https://api.openweathermap.org/data/2.5/";
    const searchForm = $("#search-form");
    const searchInput = $("#search-input");
    const historyList = $("#history");

searchForm.on("submit", function(event) {
    event.preventDefault();
    const cityName = searchInput.val().trim();
    if (cityName !== "") {
      // Fetch geocoding data to get latitude and longitude
      fetchGeocoding(cityName);
    }
  });

historyList.on("click", "button", function() {
    const cityName = $(this).data("city"); 
    if (cityName) {
        fetchGeocoding(cityName); 
    }
}); 
