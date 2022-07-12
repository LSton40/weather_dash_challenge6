//OpenWeather API Key
var weatherAPIkey = '17b9c273c20b59965736168d4e888831'

//Date variables using Luxon
var DateTime = luxon.DateTime;
var date = DateTime.now().toLocaleString();

//Retains search history on buttons on page load
for (i=1; i < 6; i++) {
    var keyRetrieve = $('#button'+i).attr('id');
    $('#button'+i).text(localStorage.getItem(keyRetrieve));
};

//Defaults to weather display of last search on page load
findCity($('#button1').text());

//Takes search input as city selection, stores search history in local storage, shown on search history buttons
function typeCity(event){
    event.preventDefault();
    var city = $('#citySelect').val();
    
    for (i=5; i > 0; i--) {
        var keySet = $('#button'+i).attr('id');
        $('#button'+i).text($('#button'+(i-1)).text()); 
        localStorage.setItem(keySet, $('#button'+i).text());
    }
    $('#button1').text(city);
    localStorage.setItem($('#button1').attr('id'), $('#button1').text());

    findCity(city);
};

//Search history button function to pass button's stored city name to the weather search
function searchHistory() {
    findCity(this.textContent);
};

//Function that finds the weather of a given city using the OpenWeather API
function findCity(city){

    //Translates city name to geo coordinates
    var geoCoder = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherAPIkey}`;
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
                $('#temp').text(`Temp: ${output.current.temp}ºF`);
                $('#windSp').text(`Wind: ${output.current.wind_speed} MPH`);
                $('#humid').text(`Humidity: ${output.current.humidity}%`);
                $('#uvIndex').text(`UV Index: ${output.current.uvi}`);
                $('#weatherIcon0').attr('src', `http://openweathermap.org/img/wn/${output.current.weather[0].icon}@2x.png`)

                //Generates 5 day weather forecast for target city
                for (i=1; i < 6; i++) {
                    $('#dateFore'+i).text(`Date: ${DateTime.now().plus({days:i}).toLocaleString()}`);
                    $('#weatherIcon'+i).attr('src', `http://openweathermap.org/img/wn/${output.daily[i].weather[0].icon}.png`)
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
