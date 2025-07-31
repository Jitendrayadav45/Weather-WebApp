document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const background = document.getElementById("background");

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; // your API key

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    // 🌤 Change background image by weather type
    const description = weather[0].main.toLowerCase();
    let bgURL = "";

    if (description.includes("cloud")) {
      bgURL = "https://source.unsplash.com/1600x900/?clouds";
    } else if (description.includes("rain")) {
      bgURL = "https://source.unsplash.com/1600x900/?rain";
    } else if (description.includes("clear")) {
      bgURL = "https://source.unsplash.com/1600x900/?clear,sky,sun";
    } else if (description.includes("snow")) {
      bgURL = "https://source.unsplash.com/1600x900/?snow";
    } else if (description.includes("mist") || description.includes("fog")) {
      bgURL = "https://source.unsplash.com/1600x900/?fog,mist";
    } else {
      bgURL = "https://source.unsplash.com/1600x900/?weather";
    }

    background.style.backgroundImage = `url('${bgURL}')`;
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});


