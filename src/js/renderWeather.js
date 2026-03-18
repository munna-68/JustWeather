export const getWeatherDomNodes = () => {
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

  const precipitationConditions = document.querySelector(
    ".precipitation-status",
  );
  const precipitationIcon = document.querySelector(".icon-precipitation-large");

  const locationButton = document.querySelector(".location-btn");
  const searchInput = document.querySelector(".search-input");

  return {
    resolvedAddress,
    temp,
    feelsLike,
    conditions,
    currentConditionIcon,
    date,
    time,
    humidity,
    humidityProgressBar,
    cloudCover,
    cloudCoverProgressBar,
    uvIndex,
    uvStatus,
    precipitationConditions,
    precipitationIcon,
    locationButton,
    searchInput,
  };
};
