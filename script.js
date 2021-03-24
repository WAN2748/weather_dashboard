var nameInputEl = document.querySelector('#inputname');
var userFormEl = document.querySelector('#search-city');
var repoContainerEl = document.querySelector('#weather-container');
var repoSearchTerm = document.querySelector('#selected-city');



var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = nameInputEl.value.trim();

    if (cityname) {
        getUserCity(cityname);

        repoContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert('Please enter a City for weather');
    }
};


var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=e6c6ec420e00d4f63fa0c6ebe2b06cb3';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCity(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherMap');
        });
};




userFormEl.addEventListener('submit', formSubmitHandler);