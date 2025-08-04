import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Modal, Dropdown } from 'react-bootstrap';
import events from './EventsList';

function ExplorePage() {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const navigate = useNavigate();

  const moods = ['Excited', 'Chill', 'Curious', 'Productive'];

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const formatTime = (timeStr) => {
    if (timeStr.toLowerCase() === "all day") return "All day";

    const [startRaw, endRaw] = timeStr.split("–");
    const formatPart = (part) => {
      const match = part.trim().match(/(\d{1,2})(?:\:(\d{2}))?\s*(a|p)\.?m\.?/i);
      if (!match) return part;
      let [_, hour, minutes, meridian] = match;
      hour = hour.padStart(2, '0');
      minutes = minutes || '00';
      return `${hour}:${minutes} ${meridian.toUpperCase()}M`;
    };

    if (!endRaw) return formatPart(startRaw);
    return `${formatPart(startRaw)} - ${formatPart(endRaw)}`;
  };

  const filteredEvents = selectedMoods.length
    ? events.filter((e) => selectedMoods.includes(e.mood))
    : events;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Top Right Dropdown Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Settings
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowMoodModal(true)}>Select Mood</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/about-us')}>About Us</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Mood Modal */}
      <Modal show={showMoodModal} onHide={() => setShowMoodModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Your Mood</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {moods.map((mood) => (
            <Button
              key={mood}
              onClick={() => toggleMood(mood)}
              variant={selectedMoods.includes(mood) ? 'primary' : 'outline-secondary'}
              className="m-1"
              aria-pressed={selectedMoods.includes(mood)}
            >
              {mood}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Events List */}
      <Container style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <h1 className="text-center">Explore Events</h1>
        <h2 className="mb-4 text-center">Recommended Events</h2>
        <Row>
          {filteredEvents.map((event, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {formatTime(event.time)}
                  </Card.Subtitle>
                  <Card.Text>{event.location}</Card.Text>
                  <Button variant="primary" href="https://today.wisc.edu/events/day/2025-08-04" target="_blank">
                    RSVP
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Floating AI Chat Button */}
      <button
        onClick={() => navigate('/chat')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 18px',
          borderRadius: '50px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999
        }}
        aria-label="Talk to AI"
      >
        💬 Talk to AI
      </button>
    </div>
  );
}

export default ExplorePage;
