export async function getWeatherData() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=43.0762&longitude=-89.4000&current_weather=true'
    );
    const data = await response.json();
    const current = data.current_weather;

    const weatherMap = {
      0: 'clear',
      1: 'cloudy',
      2: 'cloudy',
      3: 'cloudy',
      45: 'cloudy',
      48: 'cloudy',
      51: 'rainy',
      53: 'rainy',
      55: 'rainy',
      56: 'rainy',
      57: 'rainy',
      61: 'rainy',
      63: 'rainy',
      65: 'rainy',
      66: 'rainy',
      67: 'rainy',
      71: 'snowy',
      73: 'snowy',
      75: 'snowy',
      77: 'snowy',
      80: 'rainy',
      81: 'rainy',
      82: 'rainy',
      85: 'snowy',
      86: 'snowy',
      95: 'rainy',
      96: 'rainy',
      99: 'rainy'
    };

    return {
      label: weatherMap[current.weathercode] || 'clear',
      temperature: current.temperature,
      windspeed: current.windspeed,
      time: current.time
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      label: 'clear',
      temperature: null,
      windspeed: null
    };
  }
}
