const API_KEY = "S3LZG586WWP9JBSCNR433MST6";
const DEFAULT_LOCATION = "New York, NY";

export async function getWeather(location = DEFAULT_LOCATION) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=us&include=current&elements=datetime,temp,feelslike,humidity,cloudcover,uvindex,precip,precipprob,conditions,icon&key=${API_KEY}`,
      {
        method: "GET",
        headers: {},
      },
    );

    if (!response.ok) {
      throw response;
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (errorResponse) {
    if (errorResponse.text) {
      const errorMessage = await errorResponse.text();
      console.error("Error details:", errorMessage);
    } else {
      console.error("Unknown error occurred.");
    }
  }
}
