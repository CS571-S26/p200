import { Container } from 'react-bootstrap'
 
function AboutPage() {
  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">About Rate My Dorm</h1>
          <p className="page-subtitle">Built by Badgers, for Badgers.</p>
        </div>
 
        <div className="about-content">
          <div className="feature-card" style={{ maxWidth: '700px' }}>
            <div className="feature-icon">🎓</div>
            <h3>Our Mission</h3>
            <p>
              Choosing a dorm as an incoming freshman can be stressful, especially when
              there's limited information out there. Rate My Dorm gives UW–Madison students
              a place to share honest reviews about on-campus housing so future Badgers can
              make informed decisions.
            </p>
          </div>
 
          <div className="feature-card mt-4" style={{ maxWidth: '700px' }}>
            <div className="feature-icon">⭐</div>
            <h3>How It Works</h3>
            <p>
              Browse any dorm to see ratings across five categories: noise level, social scene,
              bathroom situation, WiFi quality, and overall vibes. Leave your own review to help
              the next class of freshmen find their perfect home away from home.
            </p>
          </div>
 
          <div className="feature-card mt-4" style={{ maxWidth: '700px' }}>
            <div className="feature-icon">🏠</div>
            <h3>Built for UW–Madison</h3>
            <p>
              This app was built specifically for UW–Madison students. Every dorm listed is
              an actual on-campus residence hall, with real location and distance info from
              Bascom Hill.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
 
export default AboutPage
 