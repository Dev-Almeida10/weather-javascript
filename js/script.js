// Selecting Elements
const apiKey = `${secrets.myApiKey}`;
const cityInput = document.getElementById('city');
const searchButton = document.getElementById('btn');

const temperature = document.getElementById('temperatura');
const cityLocation = document.getElementById('local');
const skyConditions = document.getElementById('descricao');
const humidity = document.getElementById('umidade');
const wind = document.getElementById('vento');

const boxMain = document.getElementById('box_main');
const information = document.querySelectorAll('.info');
const notFound = document.querySelector('.not_found');

// Functions
const getData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    const response = await fetch(apiUrl)
    const dataResponse = await response.json()

    return dataResponse
};

const weatherData = async (city) => {

    try {

        const dataApi = await getData(city);

        temperature.innerText = `${parseInt(dataApi.main.temp)}°C`;
        skyConditions.innerText = dataApi.weather[0].description;
        humidity.innerHTML = `${dataApi.main.humidity}<span>%</span>`;
        wind.innerHTML = `${parseInt(dataApi.wind.speed)}<span>km/h</span>`;
        cityLocation.innerText = dataApi.name


        const weatherIcon = dataApi.weather[0].icon;
        const imgIcon = document.getElementById('img_icon');
        const flagIcon = document.getElementById('flag_icon')

        flagIcon.src = `https://flagsapi.com/${dataApi.sys.country}/shiny/32.png`;

        const iconMap = {
            "01n": "img/clear_sky_night.png",
            "01d": "img/clear_sky_day.png",
            "02n": "img/few_clouds_night.png",
            "02d": "img/few_clouds_day.png",
            "10n": "img/rain_night.png",
            "10d": "img/rain_day.png",
            "13d": "img/snow.png",
            "13n": "img/snow.png",
            "09d": "img/shower_rain.png",
            "09n": "img/shower_rain.png",
            "11d": "img/thunderstorm.png",
            "11n": "img/thunderstorm.png",
            "50d": "img/mist.png",
            "50n": "img/mist.png",
        };

        imgIcon.src = iconMap[weatherIcon] || "img/scattered_clouds.png";



    } catch (error) {
        return 'error';
    }
};

// Click Event
searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    // error handling
    weatherData(city).then((result) => {

        if (result === 'error') {
            boxMain.style.height = '490px';
            information.forEach(info => info.classList.remove('active'));
            notFound.classList.add('active');
        }
        else {
            boxMain.style.height = '490px';
            notFound.classList.remove('active');
            information.forEach(info => info.classList.add('active'));
        }

    });

    cityInput.value = '';

});
