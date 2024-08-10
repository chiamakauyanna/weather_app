const apiKey = '8eba94c70d9a23c6f6ccf7f0c180ed65'; 

const cityName = document.querySelector('#city-name');
const date = document.querySelector('#date');
const weatherIcon = document.querySelector('#weather-icon');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const windSpeed = document.querySelector('#wind-speed');
const getWeatherBtn = document.querySelector('#get-weather');
const inputElement = document.querySelector('#city');

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            showWeather(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const showWeather = (data) => {
    cityName.textContent = data.name;
    date.textContent = moment().format('MMM Do YYYY, h:mm:ss a');
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
}

getWeatherBtn.addEventListener('click', () => {
    const city = inputElement.value.trim(); // Trim whitespace
    getWeather(city);
});
