var APIKey = 'e2e8aa238c17cef17b8835fdca0cfb44'
var city = 'Fort Myers, US'
var ftmyersID = '4155995'
var lat = '26.6217'
var lon = '-81.8406'
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
var queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'
var dt = []
var humidity = []
var temp_day = []
var uvi = []
var weather_main = []
var weather_desc = []
var icon = []
var wind_speed = []


function init() {
    getAPI1()
    getAPI2()
    populate()
}

// var requestUrl = 'https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1d&startTime=1617249600000&endTime=1617854400000'

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
        for (var i = 0; i < dataArr.length; i++) {
            console.log(dataArr[i])
            dt[i] = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
            humidity[i] = dataArr[i].humidity
            temp_day[i] = dataArr[i].temp.day
            uvi[i] = dataArr[i].uvi
            weather_main[i] = dataArr[i].weather[0].main
            weather_desc[i] = dataArr[i].weather[0].description
            icon[i] = dataArr[i].weather[0].icon
            wind_speed[i] = dataArr[i].wind_speed
        }
    })
}

function populate() {
    for (var i = 0; i < dt.length; i++) {
        
    }
}




init()