import { renderWeather } from "./renderWeather";

const locationButton = document.querySelector(".location-btn");

export let location = "New York, NY";
let hasInitializedLocationButton = false;
let currentCoordinates = null;

function looksLikeCoordinates(value = "") {
  // regular expression to check if its a valid latitude, longitude
  return /^\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*$/.test(value);
}

// extract cityname from timeZone data
function getCityFromTimezone(timeZone = "") {
  if (!timeZone || !timeZone.includes("/")) {
    return "";
  }

  const cityPart = timeZone.split("/").pop();
  // replace underscores with spaces
  return cityPart ? cityPart.replace(/_/g, " ") : "";
}

// used openstreetmap api for reverse geocoding coordinates to location name
async function reverseGeocodeCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Reverse geocoding failed");
    }

    const data = await response.json();
    const address = data?.address || {};

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county;
    const country = address.country;

    if (city && country) {
      return `${city}, ${country}`;
    }

    return city || data?.name || data?.display_name || "";
  } catch {
    return "";
  }
}

export async function getDisplayLocation(weatherData) {
  const resolved = weatherData?.resolvedAddress || "";

  if (!looksLikeCoordinates(resolved)) {
    return resolved || weatherData?.address || location;
  }

  const latitude = weatherData?.latitude ?? currentCoordinates?.latitude;
  const longitude = weatherData?.longitude ?? currentCoordinates?.longitude;

  if (typeof latitude === "number" && typeof longitude === "number") {
    const geocoded = await reverseGeocodeCoordinates(latitude, longitude);
    if (geocoded) {
      return geocoded;
    }
  }

  const cityFromTimezone = getCityFromTimezone(weatherData?.timezone);
  if (cityFromTimezone) {
    return cityFromTimezone;
  }

  return "Current Location";
}

export function initLocationButton() {
  //prevent multiple function call
  if (hasInitializedLocationButton || !locationButton) {
    return;
  }

  hasInitializedLocationButton = true;

  locationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        currentCoordinates = { latitude, longitude };
        location = `${latitude},${longitude}`;
        renderWeather();
      },
      () => {
        alert(
          "Unable to access your location. Please allow location permission.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}
