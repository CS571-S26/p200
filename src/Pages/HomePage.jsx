import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
 
function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <Container className="hero-content">
          <p className="hero-eyebrow">UW–Madison Student Housing</p>
          <h1 className="hero-title">Find Your <span className="hero-highlight">Perfect Dorm</span></h1>
          <p className="hero-subtitle">
            Real reviews from real Badgers. No guessing, no regrets — just honest takes
            on noise, bathrooms, WiFi, and vibes from students who actually lived there.
          </p>
          <Button as={Link} to="/dorms" className="hero-cta">
            Browse All Dorms →
          </Button>
        </Container>
      </div>
 
      <Container className="features-section">
        <h2 className="section-title">Why Rate My Dorm?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Category Ratings</h3>
            <p>Noise, social scene, bathrooms, WiFi — not just one vague score.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Badger-Sourced</h3>
            <p>Reviews only from UW–Madison students who actually lived there.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Location Info</h3>
            <p>See how far each dorm is from Bascom Hill and what area it's in.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Leave a Review</h3>
            <p>Help future freshmen by sharing your honest experience.</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
 
export default HomePage