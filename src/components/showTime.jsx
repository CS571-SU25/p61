import { useEffect, useState } from 'react';

function ShowTime() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(formattedTime);
    }

    updateTime(); // Set initial time

    // Calculate milliseconds until the next full minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

    // Set a one-time timeout to sync to the start of the next minute
    const timeout = setTimeout(() => {
      updateTime(); // Sync at exact minute
      const interval = setInterval(updateTime, 60000); // Then update every 60s

      // Save interval to cleanup
      setIntervalId(interval);
    }, msUntilNextMinute);

    // Cleanup both timeout and interval
    let intervalId;
    const setIntervalId = (id) => {
      intervalId = id;
    };

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '20px',
      color: 'white',
      fontSize: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '5px 10px',
      borderRadius: '6px',
      zIndex: 100
    }}>
      {localTime || 'Loading...'}
    </div>
  );
}

export default ShowTime;
