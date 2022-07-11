
var weatherAPIkey = '17b9c273c20b59965736168d4e888831'
var long;
var latt;
var city;

var $cityName = $('#cityName');
var $ul = $('#searchHistory');
var $searchBut = $('#searchBut');

var tempToday = document.querySelector('#temp').innerHTML;
// $('#temp').text();


var DateTime = luxon.DateTime;
var date = DateTime.now().toLocaleString();







for (i=1; i < 6; i++) {
    var keyRetrieve = $('#button'+i).id;
    $('#button'+i).text(localStorage.getItem(keyRetrieve));
};


function findCity(city){
    city.preventDefault();
    city = $('#citySelect').val();


    // localStorage.setItem(city, city);
    // $('#button1').text(localStorage.getItem(city));



    for (i=0; i < $('.buttons').length; i++) {
        $('.buttons')[i].text($('#buttons'+i-1).text());
        $('#button1').text(city);
        localStorage.setItem(keyRetrieve, $('.buttons')[i].text());
    }

    
    // for (i=0; i<5; i++) {
        
    //     // localStorage.setItem(city, city);
    //     // $('#button1').text(localStorage.getItem(city));


    //     // $('#button2').text($('#button1').text());

    //     if ($('#button1').text() !== $('#button'+i).text()) {

    //         $('#button1').text(localStorage.getItem(city));
    //         // $('#button2').text($('#button1').text());
    //     }


    // }
  


    console.log(city);

    var geoCoder = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherAPIkey}`;

    fetch(geoCoder)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log(data);

        long = data[0].lon;
        latt = data[0].lat;

        console.log(long);
        console.log(latt);

        var todaysWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${long}&units=imperial&appid=${weatherAPIkey}`;
        // var foreCast = `http://api.openweathermap.org/data/2.5/forecast?lat=${latt}&lon=${long}&units=imperial&cnt=5&appid=${weatherAPIkey}`;

        fetch(todaysWeather)
            .then(function(response) {
                return response.json();
            })
            .then(function(output){
                console.log(output);
                console.log(output.current)

                $('#cityName').text(city);
                $('#todaysDate').text(DateTime.now().toLocaleString());
                $('#temp').text(`Temp: ${output.current.temp}ºF`);
                $('#windSp').text(`Wind: ${output.current.wind_speed} MPH`);
                $('#humid').text(`Humidity: ${output.current.humidity}%`);
                $('#uvIndex').text(`UV Index: ${output.current.uvi}`);
                $('#weatherIcon0').attr('src', `http://openweathermap.org/img/wn/${output.current.weather[0].icon}@2x.png`)

                console.log(output.daily[1].temp.day)

                // .text(`Temp: ${output.daily[1].temp.day}ºF`);
                // .text(`Wind: ${output.daily[1].wind_speed} MPH`);
                // .text(`Humidity: ${output.daily[1].humidity}%`);

                // .text(`Temp: ${output.daily[2].temp.day}ºF`);
                // .text(`Wind: ${output.daily[2].wind_speed} MPH`);
                // .text(`Humidity: ${output.daily[2].humidity}%`);

                // .text(`Temp: ${output.daily[3].temp.day}ºF`);
                // .text(`Wind: ${output.daily[3].wind_speed} MPH`);
                // .text(`Humidity: ${output.daily[3].humidity}%`);

                // .text(`Temp: ${output.daily[4].temp.day}ºF`);
                // .text(`Wind: ${output.daily[4].wind_speed} MPH`);
                // .text(`Humidity: ${output.daily[4].humidity}%`);

                // .text(`Temp: ${output.daily[5].temp.day}ºF`);
                // .text(`Wind: ${output.daily[5].wind_speed} MPH`);
                // .text(`Humidity: ${output.daily[5].humidity}%`);


                for (i=1; i < 6; i++) {
                    $('#dateFore'+i).text(`Date: ${DateTime.now().plus({days:i}).toLocaleString()}`);
                    $('#weatherIcon'+i).attr('src', `http://openweathermap.org/img/wn/${output.daily[i].weather[0].icon}.png`)
                    $('#tempFore'+i).text(`Temp: ${output.daily[i].temp.day}ºF`);
                    $('#windFore'+i).text(`Wind: ${output.daily[i].wind_speed} MPH`);
                    $('#humidFore'+i).text(`Humidity: ${output.daily[i].humidity}%`);

                }
        
            })
        

            //     fetch(foreCast)
            //         .then(function(response) {
            //         return response.json()
            //         })
            //         .then(function(data){
            //             console.log(data);
            //     //         console.log(data.list.speed);
            //     //         // for (i=0; i< x.length; i++) {
            //     //         //     //data.list.speed, 
            //     //         //     //data.list.humidity, 
            //     //         //     //data.list.temp, 
        
            //     //         // }
            //         })
            });


    };




$('#searchBut').on('click', findCity);


