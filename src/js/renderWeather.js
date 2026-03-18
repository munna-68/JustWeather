import { getWeather } from "./fetchWeather";

// icons for the weather conditions
import clearDayIcon from "../icons/precipitation-icons/clear-day.svg";
import partlyCloudyDayIcon from "../icons/precipitation-icons/party-cloudy-day.svg";
import cloudyIcon from "../icons/precipitation-icons/cloudy.svg";
import foggyIcon from "../icons/precipitation-icons/foggy.svg";
import windyIcon from "../icons/precipitation-icons/windy.svg";
import rainyIcon from "../icons/precipitation-icons/rainy.svg";
import snowIcon from "../icons/precipitation-icons/snow.png";

const resolvedAddress = document.querySelector(".location-name");
const temp = document.querySelector(".temp-value");
const feelsLike = document.querySelector(".feels-like-value");
const conditions = document.querySelector(".condition-name");
const currentConditionIcon = document.querySelector(".icon-condition-large");
const date = document.querySelector(".date-text");
const time = document.querySelector(".time-text");

const humidity = document.querySelector(".humidity-card .metric-value");
const humidityProgressBar = document.querySelector(
  ".humidity-card .progress-bar-fill",
);

const cloudCover = document.querySelector(".cloud-cover-card .metric-value");
const cloudCoverProgressBar = document.querySelector(
  ".cloud-cover-card .progress-bar-fill",
);

const uvIndex = document.querySelector(".uv-value");
const uvStatus = document.querySelector(".uv-status");

const precipitationConditions = document.querySelector(".precipitation-status");
const precipitationIcon = document.querySelector(".icon-precipitation-large");

const locationButton = document.querySelector(".location-btn");
const searchInput = document.querySelector(".search-input");

const WEATHER_ICON_MAP = {
  clear: clearDayIcon,
  partlyCloudy: partlyCloudyDayIcon,
  cloudy: cloudyIcon,
  foggy: foggyIcon,
  windy: windyIcon,
  rainy: rainyIcon,
  snow: snowIcon,
};

function getConditionIconSrc(conditionText = "") {
  const normalizedCondition = String(conditionText).toLowerCase();

  switch (true) {
    case normalizedCondition.includes("snow"):
      return WEATHER_ICON_MAP.snow;
    case normalizedCondition.includes("rain"):
      return WEATHER_ICON_MAP.rainy;
    case normalizedCondition.includes("fog") ||
      normalizedCondition.includes("mist"):
      return WEATHER_ICON_MAP.foggy;
    case normalizedCondition.includes("wind"):
      return WEATHER_ICON_MAP.windy;
    case normalizedCondition.includes("partly") &&
      normalizedCondition.includes("cloud"):
      return WEATHER_ICON_MAP.partlyCloudy;
    case normalizedCondition.includes("cloud") ||
      normalizedCondition.includes("overcast"):
      return WEATHER_ICON_MAP.cloudy;
    case normalizedCondition.includes("clear"):
      return WEATHER_ICON_MAP.clear;
    default:
      return WEATHER_ICON_MAP.clear;
  }
}

function getUvStatus(uvIndexValue) {
  if (uvIndexValue <= 2) return "Low";
  if (uvIndexValue <= 5) return "Moderate";
  if (uvIndexValue <= 7) return "High";
  if (uvIndexValue <= 10) return "Very High";
  return "Extreme";
}

export async function renderWeather() {
  const weatherData = await getWeather();

  if (!weatherData?.currentConditions) {
    alert("Failed to fetch weather data");
    return;
  }

  const currentConditionsData = weatherData.currentConditions;
  const conditionText = currentConditionsData.conditions || "";
  const iconSrc = getConditionIconSrc(conditionText);

  resolvedAddress.textContent = weatherData.resolvedAddress;
  temp.textContent = Math.round(currentConditionsData.temp);

  let feelsLikeValue = Math.round(currentConditionsData.feelslike);
  feelsLike.textContent = `${feelsLikeValue}°F`;
  conditions.textContent = conditionText;
  currentConditionIcon.src = iconSrc;
  currentConditionIcon.alt = conditionText || "Current weather condition";

  precipitationIcon.src = iconSrc;
  precipitationIcon.alt = conditionText || "Precipitation condition";
  precipitationConditions.textContent = conditionText;

  let humidityValue = Math.round(currentConditionsData.humidity);
  humidity.textContent = humidityValue;
  humidityProgressBar.style.width = `${humidityValue}%`;

  cloudCover.textContent = Math.round(currentConditionsData.cloudcover);
  cloudCoverProgressBar.style.width = `${Math.round(currentConditionsData.cloudcover)}%`;

  uvIndex.textContent = Math.round(currentConditionsData.uvindex);
  uvStatus.textContent = getUvStatus(currentConditionsData.uvindex);
}
