var containerEl = document.querySelector('.container')
var container2El = document.querySelector('.container2')
var cardGroup = document.querySelector('.card-group')
var subtitle = document.querySelector('.subtitle')
var subtitle2 = document.querySelector('.subtitle2')
var searchTerm = document.querySelector('.form-control')
var formEl = document.querySelector('#search-form')
var containerHist = document.querySelector('#history-container')

var APIKey = 'e2e8aa238c17cef17b8835fdca0cfb44'
var storedSearches = []

function init() {
    initloadBtns()
}

function initloadBtns() {
    var storedSearches = JSON.parse(localStorage.getItem('successful-searches'))
    if (storedSearches === null) {
        storedSearches = []
    }
    // else if (storedSearches != null) {
    //     for (var i = 0; i < storedSearches.length; i++) {
    //         var btnID = document.querySelector(('#'+storedSearches[i]))
    //         if (btnID === null) {
    //             var histBtn = document.createElement('btn')
    //             histBtn.classList = 'btn btn-outline-success me-2'
    //             histBtn.setAttribute('type', 'button')
    //             // histBtn.setAttribute('id', city)
    //             histBtn.innerHTML = storedSearches[i]
    //             containerHist.appendChild(histBtn)
    //             histBtn.addEventListener('click', function () {
    //                 var city = histBtn.innerHTML.trim()
    //                 clearForm()
    //                 getAPI(city)
    //                 searchTerm.value = ''
    //             })
                
    //         }
            
    //     }
    // }  
}

function loadBtns(city) {
    // check if value already exists in local storage
    // if not, add to local storage, erase prior buttons, and populate all buttons
    // if does, erase prior buttons and populate all buttons again
    var storedSearches = JSON.parse(localStorage.getItem('successful-searches'))
    if (storedSearches === null) {
        console.log('null')
        // add to local storage, erase prior buttons, and populate all buttons
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
        // storedSearches.push(city)
        storedSearches[0] = city
        localStorage.setItem('successful-searches', JSON.stringify(storedSearches))
    }
    else if ((city in checkValues.values()) == (false || null)) {
        console.log('not in localstorage')

    }







    storedSearches = JSON.parse(localStorage.getItem('successful-searches'))
    if (storedSearches === null) {
        storedSearches = histSearches
    }
    else if (storedSearches != null) {
        for (var i = 0; i < storedSearches.length; i++) {
            console.log(storedSearches[i])
            var btnID = document.querySelector(('#'+storedSearches[i]))
            if (btnID === null) {
                var histBtn = document.createElement('btn')
                histBtn.classList = 'btn btn-outline-success me-2'
                histBtn.setAttribute('type', 'button')
                histBtn.setAttribute('id', city)
                histBtn.innerHTML = storedSearches[i]
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
}

function getAPI(city) {
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
        if (data.cod != '404') {
            city = data.name
            var storedSearches = JSON.parse(localStorage.getItem('successful-searches'))
            if (storedSearches != null) {
                console.log(storedSearches)
                if (!storedSearches.includes(city)) {
                    storedSearches.push(city)
                    localStorage.setItem('successful-searches', JSON.stringify(storedSearches))
                }
            }
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

                    var img = document.createElement('img')
                    img.classList = "img-fluid rounded-start"
                    img.setAttribute('src', ('./assets/images/'+dataArr[i].weather[0].main+'.png'))
                    cardBody.appendChild(img)

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
                    cardEl.classList = 'card text-center'

                    var cardBody = document.createElement('div')
                    cardBody.classList = 'card-body'

                    var cardTitle = document.createElement('h2')
                    cardTitle.classList = 'card-title'
                    cardTitle.innerHTML = new Date(dataArr[i].dt*1000).toLocaleDateString('en-US')
                    cardBody.appendChild(cardTitle)

                    var img = document.createElement('img')
                    img.classList = "img-fluid rounded-start"
                    img.setAttribute('src', ('./assets/images/'+dataArr[i].weather[0].main+'.png'))
                    cardBody.appendChild(img)

                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Humidity: ' + dataArr[i].humidity
                    cardBody.appendChild(weatherLi)

                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Temperature: ' + dataArr[i].temp.day
                    cardBody.appendChild(weatherLi)

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

                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Wind Speed: ' + dataArr[i].wind_speed
                    cardBody.appendChild(weatherLi)

                    var weatherLi = document.createElement('p')
                    weatherLi.innerHTML = 'Weather: ' + dataArr[i].weather[0].main + " - " + dataArr[i].weather[0].description
                    cardBody.appendChild(weatherLi)
                    
                    
                    cardEl.appendChild(cardBody)
                    cardGroup.appendChild(cardEl)
                }
                subtitle.innerHTML = 'Current Conditions:'
                subtitle2.innerHTML = '5-Day Forecast for ' + city

                loadBtns(city)
            })
        } else alert(city + " not found! Please try a valid location.")
        
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

// function searchCityHist() {
//     var city = histBtn.innerHTML.trim()
//     clearForm()
//     getAPI(city)
//     searchTerm.value = ''
// }

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

init()