var containerEl = document.querySelector('.container')
var container2El = document.querySelector('.container2')
var cardGroup = document.querySelector('.card-group')
var subtitle = document.querySelector('.subtitle')
var subtitle2 = document.querySelector('.subtitle2')
var searchTerm = document.querySelector('.form-control')
var formEl = document.querySelector('#search-form')
var containerHist = document.querySelector('#history-container')
var city = ""
var APIKey = 'e2e8aa238c17cef17b8835fdca0cfb44'
var storedSearches = []

// function to initialize on page load/refresh
function init() {
    initloadBtns()
}

// // run local storage search if any, populate with historical searched items
function initloadBtns() {
    storedSearches = JSON.parse(localStorage.getItem('successful-searches'))
    if (storedSearches != null) {
        for (let i = 0; i < storedSearches.length; i++) {
            var histBtn = document.createElement('btn')
            histBtn.classList = 'btn btn-outline-success me-2'
            histBtn.setAttribute('type', 'button')
            histBtn.setAttribute('id', storedSearches[i])
            histBtn.innerHTML = storedSearches[i]
            let city = storedSearches[i]
            histBtn.addEventListener('click', (function () {
                clearForm()
                getAPI(city)
                searchTerm.value = ''
            }))
            containerHist.appendChild(histBtn)
        }
    }
}

// populate with one search item upon successful search as a button 
function loadBtns(city) {
    // check if value already exists in local storage
    // if not, add to local storage and populate button
    storedSearches = JSON.parse(localStorage.getItem('successful-searches'))
    
    // if no stored search history
    if (storedSearches === null) {
        // populate first new search history city
        var histBtn = document.createElement('btn')
        histBtn.classList = 'btn btn-outline-success me-2'
        histBtn.setAttribute('type', 'button')
        histBtn.setAttribute('id', city)
        histBtn.innerHTML = city
        containerHist.appendChild(histBtn)
        histBtn.addEventListener('click', function () {
            var city = histBtn.innerHTML.trim()
            clearForm()
            getAPI(city)
            searchTerm.value = ''
        })
        storedSearches = []
        storedSearches[0] = city
        // save historical search to local storage
        localStorage.setItem('successful-searches', JSON.stringify(storedSearches))
    }
    else if (storedSearches != null) {
        // check if value already exists in local storage
        if (storedSearches.includes(city) === false) {
            // if not, append to city storage array and save it to localstorage.
            storedSearches.push(city)
            localStorage.setItem('successful-searches', JSON.stringify(storedSearches))
            // make saved city button
            var histBtn = document.createElement('btn')
            histBtn.classList = 'btn btn-outline-success me-2'
            histBtn.setAttribute('type', 'button')
            histBtn.setAttribute('id', city)
            histBtn.innerHTML = city
            containerHist.appendChild(histBtn)
            histBtn.addEventListener('click', function () {
                var city = histBtn.innerHTML.trim()
                clearForm()
                getAPI(city)
                searchTerm.value = ''
            })
        }
    }
}

// api call to confirm city name, lat, and lon which will be used for forecasted data
function getAPI(city) {
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    // if returned json is not 404, search forecasted data
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
            // populate first content container with current & forecasted weather conditions
            .then(function (data) {
                dataArr = data.daily

                // for current conditions to be prominently displayed
                for (var i = 0; i < 1; i++) {          

                    var cardEl = document.createElement('div')
                    cardEl.classList = 'card text-center'

                    var cardBody = document.createElement('div')
                    cardBody.classList = 'card-body'

                    // date
                    var cardTitle = document.createElement('h2')
                    cardTitle.classList = 'card-title'
                    cardTitle.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
                    cardBody.appendChild(cardTitle)

                    // img representing weather
                    var img = document.createElement('img')
                    img.classList = "img-fluid rounded-start"
                    img.setAttribute('src', ('./assets/images/'+dataArr[i].weather[0].main+'.png'))
                    cardBody.appendChild(img)

                    var cardSubtitle = document.createElement('h3')
                    cardSubtitle.classList = 'card-subtitle mb-2 text-muted'
                    cardSubtitle.innerHTML = city
                    cardBody.appendChild(cardSubtitle)

                    // humidity
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Humidity: ' + dataArr[i].humidity
                    cardBody.appendChild(weatherLi)

                    // temp
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Temperature: ' + dataArr[i].temp.day
                    cardBody.appendChild(weatherLi)

                    // color coded uv index
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'UV-Index: ' + dataArr[i].uvi
                    if (dataArr[i].uvi < 3) {
                        weatherLi.style = 'background-color: green'
                        weatherLi.style.color = 'white'
                    }
                    else if (dataArr[i].uvi < 6) {
                        weatherLi.style = 'background-color: yellow'
                    } 
                    else if (dataArr[i].uvi < 11) {
                        weatherLi.style = 'background-color: red'
                        weatherLi.style.color = 'white'
                    }
                    else {
                        weatherLi.style = 'background-color: purple'
                        weatherLi.style.color = 'white'
                    }
                    cardBody.appendChild(weatherLi)

                    // wind speed
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Wind Speed: ' + dataArr[i].wind_speed
                    cardBody.appendChild(weatherLi)

                    // current weather and qualifying description
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Weather: ' + dataArr[i].weather[0].main + " - " + dataArr[i].weather[0].description
                    cardBody.appendChild(weatherLi)
                    
                    // add to container
                    cardEl.appendChild(cardBody)
                    containerEl.appendChild(cardEl)
                }

                // create group container for forecast to be displayed in
                var cardGroup = document.createElement('div')
                cardGroup.classList = 'card-group'
                container2El.appendChild(cardGroup)

                // for 5-day future forecasted conditions
                for (var i = 1; i < 6; i++) {

                    var cardEl = document.createElement('div')
                    cardEl.classList = 'card text-center'

                    var cardBody = document.createElement('div')
                    cardBody.classList = 'card-body'

                    // date
                    var cardTitle = document.createElement('h2')
                    cardTitle.classList = 'card-title'
                    cardTitle.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
                    cardBody.appendChild(cardTitle)

                    // weather emoji
                    var img = document.createElement('img')
                    img.classList = "img-fluid rounded-start"
                    img.setAttribute('src', ('./assets/images/'+dataArr[i].weather[0].main+'.png'))
                    cardBody.appendChild(img)

                    // humidity
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Humidity: ' + dataArr[i].humidity
                    cardBody.appendChild(weatherLi)

                    // temp
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Temperature: ' + dataArr[i].temp.day
                    cardBody.appendChild(weatherLi)

                    // color coded UV index
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'UV-Index: ' + dataArr[i].uvi
                    if (dataArr[i].uvi < 3) {
                        weatherLi.style = 'background-color: green'
                        weatherLi.style.color = 'white'
                    }
                    else if (dataArr[i].uvi < 6) {
                        weatherLi.style = 'background-color: yellow'
                    } 
                    else if (dataArr[i].uvi < 11) {
                        weatherLi.style = 'background-color: red'
                        weatherLi.style.color = 'white'
                    }
                    else {
                        weatherLi.style = 'background-color: purple'
                        weatherLi.style.color = 'white'
                    }
                    cardBody.appendChild(weatherLi)

                    // wind speed
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Wind Speed: ' + dataArr[i].wind_speed
                    cardBody.appendChild(weatherLi)

                    // weather & description
                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Weather: ' + dataArr[i].weather[0].main + " - " + dataArr[i].weather[0].description
                    cardBody.appendChild(weatherLi)
                    
                    
                    cardEl.appendChild(cardBody)
                    cardGroup.appendChild(cardEl)
                }
                subtitle.innerHTML = 'Current Conditions:'
                subtitle2.innerHTML = '5-Day Forecast for ' + city

                // create search history buttons
                loadBtns(city)
            })
            // if 404, return Not Found
        } else alert(city + " not found! Please try a valid location.")
        
    })   
    
}

// clear containers function
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

// clear containers on search with searchbox
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
// search button
formEl.addEventListener('submit', searchCityBox)

// execute on load
init()