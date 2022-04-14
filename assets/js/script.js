var containerEl = document.querySelector('.container')
var container2El = document.querySelector('.container2')
var cardGroup = document.querySelector('.card-group')
var subtitle2 = document.querySelector('.subtitle2')
var searchTerm = document.querySelector('.form-control')
var formEl = document.querySelector('#search-form')
var containerHist = document.querySelector('#history-container')

var APIKey = 'e2e8aa238c17cef17b8835fdca0cfb44'


function getAPI(city) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
        if (data.cod != '404') {
            city = data.name
            var lat = data.coord.lat
            var lon = data.coord.lon
            var queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'
            fetch(queryURL2)
            .then(function (response){
                return response.json()
            })
            .then(function (data) {
                dataArr = data.daily
                for (var i = 0; i < 1; i++) {          

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
                    
                    
                    cardEl.appendChild(cardBody)
                    containerEl.appendChild(cardEl)
                }

                var cardGroup = document.createElement('div')
                cardGroup.classList = 'card-group'
                container2El.appendChild(cardGroup)

                for (var i = 1; i < 6; i++) {

                    var cardEl = document.createElement('div')
                    cardEl.classList = 'card'

                    var cardBody = document.createElement('div')
                    cardBody.classList = 'card-body'

                    var cardTitle = document.createElement('h2')
                    cardTitle.classList = 'card-title'
                    cardTitle.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
                    cardBody.appendChild(cardTitle)

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
                    
                    
                    cardEl.appendChild(cardBody)
                    cardGroup.appendChild(cardEl)
                }
                subtitle2.innerHTML = '5-Day Forecast for ' + city
                var histBtn = document.createElement('btn')
                histBtn.classList = 'btn btn-outline-success me-2'
                histBtn.setAttribute('type', 'button')
                histBtn.innerHTML = city
                containerHist.appendChild(histBtn)
                histBtn.addEventListener('click', function () {
                    var city = histBtn.innerHTML.trim()
                    clearForm()
                    getAPI(city)
                    searchTerm.value = ''
                    histBtn.remove()
                })
            })
        } else alert("City not found!")
        
    })   
    
}

function clearForm() {
    const cardEl = document.querySelector('.card')
    if (cardEl != undefined) {
        cardEl.remove()
    }
    const cardGroup = document.querySelector('.card-group')
    if (cardGroup != undefined) {
        cardGroup.remove()
    }
    
}

function searchCityHist() {
    var city = histBtn.innerHTML.trim()
    clearForm()
    getAPI(city)
    searchTerm.value = ''
}

function searchCityBox() {
    event.preventDefault();
    var city = searchTerm.value.trim()
    if (city){
        clearForm()
        getAPI(city)
        searchTerm.value = ''
    } else {
        alert('Please enter a location.')
    }
}

formEl.addEventListener('submit', searchCityBox)