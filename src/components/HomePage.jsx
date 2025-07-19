import { Button } from "react-bootstrap";
import WeatherBackground from './WeatherBackground';
import RotatingTagline from "./RotatingTagline";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    
  return (
    <WeatherBackground>
      <div className="home-content" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1>BadgerBuzz</h1>
        <RotatingTagline/>
        <Button variant="secondary" onClick={() => navigate('/explore')}>LET'S EXPLORE</Button>
      </div>
    </WeatherBackground>
  );
}

export default HomePage;
