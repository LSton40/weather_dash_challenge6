# Weather Report

## Project Description

The Weather Report App was designed to allow a user to search for the weather conditions in any major world city, providing the temperature, humidity, wind speed, UV index, and current weather conditions. The UV Index is color-coded to indicate the severity of the index: green for safe and mild, yellow for moderate, and red for potentially harmful. Each search result also gives a 5-day forecast of high temperature, wind speed, humidity, and weather conditions.

The app presently stores up to 5 cities in its search history, allowing the user to return to a recently, previously searched city at a single click. By default, the page loads to the last search result the user entered from their given computer.

## Development

This project required the use of an OpenWeather API that takes a city name as input and outputs the specified list of current conditions as well as a five day forecast. However, no single API offered by OpenWeather gives all of these features. Although the One Call API provides most of the information, it only takes longitude and latitude as input. It was thus required to use the Geocoding API, which could take in a city name and give the coordinates in return. Luxon.js is used to collect and format the current time and calculate the one-day increments for the forecast dates.

Development of the HTML and JavaScript is largely straightforward in presenting the current conditions and forecast: nested fetch-then functions taking the city input data, outputting the coordinates which are passed to the next API, then printing the location's output values for the current day and forecast to their respective HTML elements.

The biggest challenge in this development, at my current level of training, was creating a functional list of search history buttons that would persist on the page upon reload. Once the assignments were made, it was a bigger challenge to make the search history go in a specific order--most recent search at the top, descending down the list--to prevent repetitions so that only one instance of a given city name appears on the list at any given time, and to disable and/or hide the buttons when no city name was present. A combination of loops and passing functions was able to accomplish these results, however.

Any future development on this project would involve refactoring the CSS--this project involved function over style--and considering greater flexibility of affordances: adding additional weather information and a user interface that permits greater or fewer details of weather conditions as well as different spans of forecast time. Also, the user should be able to select their preferred units--imperial versus metric, at the very least. Finally, the current input only permits a city name. But since city and town names are rarely unique in the world, the user should be able to optionally specify the state, province, or country in which the target city is found, ideally with only optional comma separation to account for user oversight. The final challenge would be to include an autocorrect feature in cases of user misspellings, which would still return results.


## Link to App
https://lston40.github.io/weather_dash_challenge6/

## Screenshot
![_C__Users_ldsut_bootcamp_challenges_weather_dash_challenge6_index html](https://user-images.githubusercontent.com/103286445/178409162-f3ea476d-48de-483c-b8e4-b073682eb27c.png)



## Credits
This Weather Report App uses the OpenWeather One Call API 3.0 (https://openweathermap.org/api/one-call-3) and Geocoding API (https://openweathermap.org/api/geocoding-api). 
More information about these and other OpenWeather APIs are available at https://openweathermap.org/api.
