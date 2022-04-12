var APIKey = 'e2e8aa238c17cef17b8835fdca0cfb44'
var city = 'Fort Myers, US'
var ftmyersID = '4155995'
var lat = '26.6217'
var lon = '-81.8406'
// var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'



function init() {
    getAPI()
}

// var requestUrl = 'https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1d&startTime=1617249600000&endTime=1617854400000'

function getAPI() {
    fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
        console.log(data)
        var timeNow =  new Date(data.current.dt*1000).toLocaleDateString("en-US")
        var date0 = new Date(data.daily[0].dt*1000).toLocaleDateString("en-US")
        var date1 = new Date(data.daily[1].dt*1000).toLocaleDateString("en-US")
        var date2 = new Date(data.daily[2].dt*1000).toLocaleDateString("en-US")
        var date3 = new Date(data.daily[3].dt*1000).toLocaleDateString("en-US")
        var date4 = new Date(data.daily[4].dt*1000).toLocaleDateString("en-US")
        var date5 = new Date(data.daily[5].dt*1000).toLocaleDateString("en-US")
        console.log(timeNow, date0, date1, date2, date3, date4, date5)
    })
}


init()