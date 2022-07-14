//OpenWeather API Key
var weatherAPIkey = '17b9c273c20b59965736168d4e888831'

//Date variables using Luxon
var DateTime = luxon.DateTime;
var date = DateTime.now().toLocaleString();


//Retains search history on buttons on page load
for (i=1; i < 6; i++) {
    var keyRetrieve = $('#button'+i).attr('id');
    $('#button'+i).text(localStorage.getItem(keyRetrieve));

    if (localStorage.getItem(keyRetrieve) == null || localStorage.getItem(keyRetrieve) == '') {
        $('#button'+i).attr('style', 'visibility: hidden;');   
    } 
};

//Defaults to weather display of last search on page load
findCity($('#button1').text());

//Takes search input as city selection
function typeCity(event){
    event.preventDefault();
    var city = $('#citySelect').val();

    //Prevents search using Search button if text field is blank
    if ($('#citySelect').val() === '') {
        return;
    }

    //Prevents same city from occurring multiple times in search history
    if ($('.buttons').text().indexOf(city) == -1) {
        return buttonSet(city);
    } else {
        return findCity(city);
    }
        
};

//Assign cities to search history upon search
function buttonSet(city) {
    for (i=5; i > 0; i--) {
        var keySet = $('#button'+i).attr('id');
        $('#button'+i).text($('#button'+(i-1)).text());
        localStorage.setItem(keySet, $('#button'+i).text());
    }
    
    $('#button1').text(city);
    localStorage.setItem($('#button1').attr('id'), $('#button1').text());

    for (i=1; i < 6; i++) {
        if ($('#button'+i).text() != '') {
            $('#button'+i).attr('style', 'visibility: visible;');
        };
    }
    findCity(city);
    }

//Search history button function to pass button's stored city name to the weather search
function searchHistory() {
    findCity(this.textContent);
};

//Function that finds the weather of a given city using the OpenWeather API
function findCity(city){

    $('.weatherGlyphs').remove();
    //Translates city name to geo coordinates
    var geoCoder = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherAPIkey}`;
    fetch(geoCoder)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        var long = data[0].lon;
        var latt = data[0].lat;

        //Retrieves today's weather information for target city
        var todaysWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${long}&units=imperial&appid=${weatherAPIkey}`;
        fetch(todaysWeather)
            .then(function(response) {
                return response.json();
            })
            .then(function(output){

                $('#cityName').text(city);
                $('#todaysDate').text(DateTime.now().toLocaleString());
                $('#todaysImage').append(`<img src="https://openweathermap.org/img/wn/${output.current.weather[0].icon}@2x.png" alt="Today's Weather Glyph" id="weatherIcon0" class="weatherGlyphs">`)
                $('#temp').text(`Temp: ${output.current.temp}ºF`);
                $('#windSp').text(`Wind: ${output.current.wind_speed} MPH`);
                $('#humid').text(`Humidity: ${output.current.humidity}%`);
                $('#uvIndex').text(`UV Index: `).append(`<span class="uvColors">${output.current.uvi}</span>`);

                if (output.current.uvi <= 2) {
                    $('.uvColors').attr('style', 'background-color: green; border-radius: 5px; padding: 3px 5px;')
                } else if (output.current.uvi >= 6) {
                    $('.uvColors').attr('style', 'background-color: red; border-radius: 5px; padding: 3px 5px; font-weight: bold; color: black')
                } else {
                    $('.uvColors').attr('style', 'background-color: yellow; border-radius: 5px; padding: 3px 5px; font-weight: bold; color: black')
                }

                //Generates 5 day weather forecast for target city
                $('#fiverForecast').text('5 Day Forecast')
                for (i=1; i < 6; i++) {
                    $('#dateFore'+i).text(`Date: ${DateTime.now().plus({days:i}).toLocaleString()}`);
                    $('#imageWrapper'+i).append(`<img src="https://openweathermap.org/img/wn/${output.daily[i].weather[0].icon}.png" alt="Tomorrow's Weather Glyph" class="weatherGlyphs">`)
                    $('#tempFore'+i).text(`Temp: ${output.daily[i].temp.day}ºF`);
                    $('#windFore'+i).text(`Wind: ${output.daily[i].wind_speed} MPH`);
                    $('#humidFore'+i).text(`Humidity: ${output.daily[i].humidity}%`);
                }
        
            })
    });
};

//Search Button event listener
$('#searchBut').on('click', typeCity);

//Search History Buttons event listener
$('.buttons').on('click', searchHistory);

