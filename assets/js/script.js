var cardContainerEl = document.querySelector('#cards-container')

var APIKey = 'e2e8aa238c17cef17b8835fdca0cfb44'
var city = 'Fort Myers, US'
var ftmyersID = '4155995'
var lat = '26.6217'
var lon = '-81.8406'
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
var queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'


function init() {
    getAPI1()
    getAPI2()
}

function getAPI1() {
    fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
        // console.log(data)
        var lat = data.coord.lat
        var lon = data.coord.lon
    })    
}

function getAPI2() {
    fetch(queryURL2)
    .then(function (response){
        return response.json()
    })
    .then(function (data) {
        // console.log(data)
        dataArr = data.daily
        for (var i = 0; i < 6; i++) {
            // console.log(dataArr[i])
            // dt[i] = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
            // humidity[i] = dataArr[i].humidity
            // temp_day[i] = dataArr[i].temp.day
            // uvi[i] = dataArr[i].uvi
            // weather_main[i] = dataArr[i].weather[0].main
            // weather_desc[i] = dataArr[i].weather[0].description
            // icon[i] = dataArr[i].weather[0].icon
            // wind_speed[i] = dataArr[i].wind_speed

            var cardEl = document.createElement('div')
            cardEl.classList = 'list-item flex-row justify-space-between align-center'

            var weatherEl = document.createElement('ul')
            weatherEl.classList = 'flex-row align-center';
            weatherEl.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
            
            var weatherLi = document.createElement('li')
            weatherLi.innerHTML = 'Humidity: ' + dataArr[i].humidity
            weatherEl.appendChild(weatherLi)

            var weatherLi = document.createElement('li')
            weatherLi.innerHTML = 'Temperature: ' + dataArr[i].temp.day
            weatherEl.appendChild(weatherLi)

            var weatherLi = document.createElement('li')
            weatherLi.innerHTML = 'UV-Index: ' + dataArr[i].uvi
            weatherEl.appendChild(weatherLi)

            var weatherLi = document.createElement('li')
            weatherLi.innerHTML = 'Wind Speed: ' + dataArr[i].wind_speed
            weatherEl.appendChild(weatherLi)

            var weatherLi = document.createElement('li')
            weatherLi.innerHTML = 'Weather: ' + dataArr[i].weather[0].main + " - " + dataArr[i].weather[0].description
            weatherEl.appendChild(weatherLi)
            
            
            // weatherEl.appendChild(weatherLi)
            cardEl.appendChild(weatherEl)
            cardContainerEl.appendChild(cardEl)
        }
    })
}





init()