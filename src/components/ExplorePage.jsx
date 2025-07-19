import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Modal, Dropdown } from 'react-bootstrap';

function ExplorePage() {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Career Fair @ Gordon Commons",
      time: "Wed, July 24, 2:00 PM",
      location: "Gordon Dining & Event Center",
    },
    {
      id: 2,
      title: "Outdoor Yoga on Bascom",
      time: "Thu, July 25, 9:00 AM",
      location: "Bascom Hill",
    },
    {
      id: 3,
      title: "Badger Esports Tournament",
      time: "Fri, July 26, 6:00 PM",
      location: "Union South",
    },
  ];

  const moods = ['Excited', 'Chill', 'Curious', 'Busy'];

  return (
    <div style={{ position: 'relative' }}>
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
              onClick={() => {
                setSelectedMood(mood);
                setShowMoodModal(false);
              }}
              variant={selectedMood === mood ? 'primary' : 'outline-secondary'}
              className="m-1"
            >
              {mood}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Events List */}
      <Container style={{ paddingTop: '80px' }}>
        <h2 className="mb-4 text-center">Recommended Events</h2>
        <Row>
          {events.map(event => (
            <Col key={event.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{event.time}</Card.Subtitle>
                  <Card.Text>{event.location}</Card.Text>
                  <Button variant="primary">RSVP</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ExplorePage;
