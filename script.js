const API_KEY = "d85fb255885834d3d0eff08e5346b9ce";

function displayWeather(data) {
    console.log("API RESPONSE:", data); // Debug line

    if (data.cod !== 200) {
        document.getElementById("weather").innerHTML =
            `<p>❌ ${data.message}</p>`;
        return;
    }

    const icon = data.weather[0].icon;

    document.getElementById("weather").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
        <p><strong>${data.weather[0].description}</strong></p>
        <p>🌡 Temperature: ${Math.round(data.main.temp)}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
    `;
}

function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a valid city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(() => alert("Error fetching weather"));
}

function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => displayWeather(data))
            .catch(() => alert("Error fetching weather"));
    }, () => {
        alert("Location access denied.");
    });
}
