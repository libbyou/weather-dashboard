//user types in location
//location gets put into local storage and is displayed as a clickable li on the page
//geocoding api takes location get long and lat
//long and lat is then put into the api for getting weather
//today's weather is found and appended to top section of page
//five day forecast is called and appended to the bottom section

var searchBtn = $('.search-btn')
var cityInput = $('#city-input')
var cityList = $('#city-list')
var weatherDisplay = $('#weather-display')


function saveCity(event) {
  event.preventDefault();
  var cityInputVal = cityInput.val();
  var cities = JSON.parse(localStorage.getItem('city'));
  // console.log("CITIES", cities)
  if (!cities) {
    cities = [];
    cities.push(cityInputVal);
  }

  if(cities.indexOf(cityInputVal) <= -1) {
    cities.push(cityInputVal);
  }

  // [] AUSTIN -> [AUSTIN]
  // [AUSTIN] + Denver => 

  localStorage.setItem("city", JSON.stringify(cities));
  printCityData();

  weatherAPI();
}

// Gets project data from local storage and displays it
function printCityData() {
  // clear current projects on the page
  cityList.empty();

  // get projects from localStorage
  var cities = JSON.parse(localStorage.getItem('city'));
  // console.log(cities)

  // loop through each project and create a row
  for (var i = 0; i < cities.length; i += 1) {
    var city = cities[i];

    // Create row and columns for project
    var cityBtnEl = $('<button>').text(city);
    // append elements to DOM to display them
    cityList.append(cityBtnEl);

    cityBtnEl.on('click', weatherAPI)

  }
}

searchBtn.on('click', saveCity);

function weatherAPI() {
  var searchByCity = $(this)[0].textContent
  var cityInputVal = searchByCity || cityInput.val();
  // console.log("THIS IS WHAT IM SEARCHING FOR ", cityInputVal)
  var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInputVal}&limit=1&appid=65fae4cb9ba20158dc83fa8ff1eb72af`

  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=65fae4cb9ba20158dc83fa8ff1eb72af`

      fetch(weatherApiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          // console.log("MAIN PARENT CONTAINER", weatherDisplay)
          weatherDisplay.empty()
          for (var i = 0; i < data.list.length; i+=8) {
            var day=data.list[i];
            // console.log("DAY", day);
            displayWeather(day);
          }
        })
    }
    )
}

function displayWeather (day) {

  var date = day.dt_txt;
  var temp = day.main.temp;
  var windSpeed = day.wind.speed;
  var humidity = day.main.humidity;
  var iconDescription = day.weather[0].icon;
  var iconUrL = `https://openweathermap.org/img/wn/${iconDescription}.png`
  var weatherContainer =$("<div>").addClass('weatherContainer').css({"border": "solid black 10px", "background-color": "red"});
  
  var iconEl=$('<img>').attr('src', iconUrL);
  var dateEl=$('<p>').text(date);
  var tempEl=$('<p>').text("Temperature: " + temp).addClass("temp");
  var windEl=$('<p>').text("Wind Speed: " + windSpeed);
  var humidityEl=$('<p>').text("Humidity: " + humidity);

  weatherDisplay.append(weatherContainer);
  weatherContainer.append(iconEl, dateEl, tempEl, windEl, humidityEl);


}