import { useEffect, useState } from 'react';

function RotatingTagline() {
  const taglines = [
    "Your campus. Your mood. Your moment.",
    "What’s buzzing at UW–Madison? Find it here.",
    "Your campus. Your voice. Your Buzz.",
    "Don’t just be a student. Be in the know.",
    "From Bascom Hill to State Street, this is your feed.",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setFade(false);

      // After fade-out, switch text and fade in
      setTimeout(() => {
        setIndex(prev => (prev + 1) % taglines.length);
        setFade(true);
      }, 500); // duration must match fade CSS
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      style={{
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {taglines[index]}
    </p>
  );
}

export default RotatingTagline;
