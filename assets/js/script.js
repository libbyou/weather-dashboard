//user types in location
//location gets put into local storage and is displayed as a clickable li on the page
//geocoding api takes location get long and lat
//long and lat is then put into the api for getting weather
//today's weather is found and appended to top section of page
//five day forecast is called and appended to the bottom section

var searchBtn = $('.search-btn')
var cityInputEl = $('#city-input')

function saveCity(event) {
    event.preventDefault();
    cityInputVal=cityInputEl.val();
       
  }


saveButton.on('click', saveCity);
