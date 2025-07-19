import { useEffect, useState } from 'react';

function WeatherBackground({ children }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const weatherTypes = ['clear', 'cloudy', 'rainy', 'snowy'];
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setWeather(randomWeather);

    // Apply full screen styles directly to <body> and <html>
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
  }, []);

const backgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: weather ? `url(images/${weather}.png)` : 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  color: 'white',
};

  return (
    <div style={backgroundStyle}>
      {children}
    </div>
  );
}

export default WeatherBackground;
