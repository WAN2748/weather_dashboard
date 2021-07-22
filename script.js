$(document).ready(function () {

    var city = "";
    var lat = "";
    var lon = "";

    function getWeather1(a,b) {
        var URL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

        $.ajax({
            url: URL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $(".card-deck").empty();

            var icon = response.current.weather[0].icon;
            var iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#city").append(iconImg);

            var uvi = parseInt(response.current.uvi);
            if (uvi <= 2) {
                $(".color").css({ "background-color": "green", "color": "white" });
            } else if (uvi >= 3 && uvi <= 5) {
                $(".color").css({ "background-color": "yellow", "color": "black" });
            } else if (uvi >= 6 && uvi <= 7) {
                $(".color").css({ "background-color": "orange" });
            } else if (uvi >= 8 && uvi <= 10) {
                $(".color").css({ "background-color": "red", "color": "white" });
            } else if (uvi >= 11) {
                $(".color").css({ "background-color": "violet", "color": "white" });
            }

            $("#temp").text("Temperature: " + response.current.temp + "° F");
            $("#humidity").text("Humidity: " + response.current.humidity + "%");
            $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
            $(".color").text(response.current.uvi);

            $("#current").css({"display":"block"});

            var daily = response.daily;

            for (i = 1; i < daily.length - 2; i++) {

                var date = moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
                var temp = daily[i].temp.day;
                var humid = daily[i].humidity;
                var icon = daily[i].weather[0].icon;
                var dailyDiv = $("<div class='card text-white bg-primary p-2'>")
                var pTemp = $("<p>");
                var pHum = $("<p>");
                var imgIcon = $("<img>");
                var hDate = $("<h6>");

                hDate.text(date);
                imgIcon.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
                imgIcon.addClass("img-fluid");
                imgIcon.css({"width": "100%"});
                pTemp.text("Temp: " + temp + "° F");
                pHum.text("Humidity: " + humid + "%");

                dailyDiv.append(hDate);
                dailyDiv.append(imgIcon);
                dailyDiv.append(pTemp);
                dailyDiv.append(pHum);
                $(".card-deck").append(dailyDiv);

                $("#five-day").css({"display":"block"});
            }

        })
    }

    function getWeather() {
        var URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e6c6ec420e00d4f63fa0c6ebe2b06cb3';

        $.ajax({
            url: URL,
            method: "GET"
        }).then(function (response) {

            lat = response.coord.lat;
            lon = response.coord.lon;

            $("#city").text(response.name);
            $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));
                        
            localStorage.setItem("city", response.name);

            getWeather1(lat,lon);

        })
    }

    function init(){
        city = localStorage.getItem("city");
        if (city !== null) {

            var cityList = $("<button>");
            cityList.addClass("list-group-item list-group-item-action");
            cityList.text(city);
            $("ul").prepend(cityList);
            getWeather()
        }
    }

    function searchBtn() {
        city = $("input").val().trim();

        var cityList = $("<button>");
        cityList.addClass("list-group-item list-group-item-action");
        cityList.text(city);

        $("ul").prepend(cityList);
        $("input").val("");

        getWeather();
    }
    init();

    $("#search-city").submit(function (event) {
        event.preventDefault();
        searchBtn();
    })

    $("#submit-btn").click(function (event) {
        event.preventDefault();
        searchBtn();
    })

    $("ul").on("click", "button", function () {
        city = $(this).text();
        console.log(city);

        getWeather();
    })

    $( document ).ajaxError(function() {
 
        var error = $("<p>");
        error.addClass("error");
        error.css({"color": "red"});
        error.text("Please try again with a valid city");

        $("ul").prepend(error);
  
        var p = $(this).find("button");
 
        p[1].remove();
  
        setTimeout(function () {
            error.remove();
            }, 2000);
      });

})
