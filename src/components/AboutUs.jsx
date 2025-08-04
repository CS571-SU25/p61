import { useEffect } from 'react';

export default function AboutUs() {

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.overflow = 'hidden';

    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100vh';
    document.documentElement.style.width = '100vw';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  return (
    <div style={{
      backgroundColor: '#FF5E5B', // red background
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>BADGERBUZZ</h1>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 5vw',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        
        {/* Text Section */}
        <div style={{
          flex: 1,
          minWidth: '300px',
          paddingRight: '2rem',
          boxSizing: 'border-box'
        }}>
          <h2>About Us</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            BadgerBuzz is a student-focused platform designed to keep you connected with everything happening around UW–Madison. Whether it's campus events, trending topics, or local updates, we bring the buzz to your screen. Built by a student, for students — your voice, your vibe, your Badger community.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '1rem' }}>
              Developed by <strong>Sumit Singha</strong><br />
              Contact me @{' '}
              <a href="mailto:singha2@wisc.edu" style={{ color: '#FFD700', textDecoration: 'underline' }}>
                singha2@wisc.edu
              </a>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '300px',
          boxSizing: 'border-box'
        }}>
          <img
            src="images/Bucky_Badger.png"
            alt="Bucky Badger"
            style={{
              maxWidth: '300px',
              width: '100%',
              border: '4px solid white',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          />
        </div>

      </div>
    </div>
  );
}
