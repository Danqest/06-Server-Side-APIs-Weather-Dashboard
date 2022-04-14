// var rowEl = document.querySelector('.row')
var containerEl = document.querySelector('.container')
var container2El = document.querySelector('.container2')
var cardGroup = document.querySelector('.card-group')
var subtitle2 = document.querySelector('.subtitle2')

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
        for (var i = 0; i < 1; i++) {
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
            cardEl.classList = 'card text-center'

            var cardBody = document.createElement('div')
            cardBody.classList = 'card-body'

            var cardTitle = document.createElement('h2')
            cardTitle.classList = 'card-title'
            cardTitle.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
            cardBody.appendChild(cardTitle)

            var cardSubtitle = document.createElement('h3')
            cardSubtitle.classList = 'card-subtitle mb-2 text-muted'
            cardSubtitle.innerHTML = city
            cardBody.appendChild(cardSubtitle)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Humidity: ' + dataArr[i].humidity
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Temperature: ' + dataArr[i].temp.day
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'UV-Index: ' + dataArr[i].uvi
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Wind Speed: ' + dataArr[i].wind_speed
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Weather: ' + dataArr[i].weather[0].main + " - " + dataArr[i].weather[0].description
            cardBody.appendChild(weatherLi)
            
            
            // weatherEl.appendChild(weatherLi)
            cardEl.appendChild(cardBody)
            containerEl.appendChild(cardEl)
        }
        for (var i = 1; i < 6; i++) {

            var cardEl = document.createElement('div')
            cardEl.classList = 'card'

            var cardBody = document.createElement('div')
            cardBody.classList = 'card-body'

            var cardTitle = document.createElement('h2')
            cardTitle.classList = 'card-title'
            cardTitle.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
            cardBody.appendChild(cardTitle)

            // var cardSubtitle = document.createElement('h3')
            // cardSubtitle.classList = 'card-subtitle mb-2 text-muted'
            // cardSubtitle.innerHTML = city
            // cardBody.appendChild(cardSubtitle)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Humidity: ' + dataArr[i].humidity
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Temperature: ' + dataArr[i].temp.day
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'UV-Index: ' + dataArr[i].uvi
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Wind Speed: ' + dataArr[i].wind_speed
            cardBody.appendChild(weatherLi)

            var weatherLi = document.createElement('p')
            weatherLi.innerHTML = 'Weather: ' + dataArr[i].weather[0].main + " - " + dataArr[i].weather[0].description
            cardBody.appendChild(weatherLi)
            
            
            // weatherEl.appendChild(weatherLi)
            cardEl.appendChild(cardBody)
            cardGroup.appendChild(cardEl)
            // container2El.appendChild(cardGroup)
        }
        subtitle2.innerHTML = '5-Day Forecast for ' + city
    })
}





init()