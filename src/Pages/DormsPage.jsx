import { Container, Row, Col } from 'react-bootstrap'
import DormCard from '../components/DormCard'
import ReviewForm from '../components/ReviewForm'
import dorms from '../data/dorms'
 
function DormsPage() {
  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">UW–Madison Dorms</h1>
          <p className="page-subtitle">
            {dorms.length} dorms reviewed by students, for students.
          </p>
        </div>
 
        <Row className="dorms-grid">
          {dorms.map((dorm) => (
            <Col key={dorm.id} xs={12} md={6} lg={4} className="mb-4">
              <DormCard
                name={dorm.name}
                location={dorm.location}
                rating={dorm.rating}
                distance={dorm.distance}
                tags={dorm.tags}
              />
            </Col>
          ))}
        </Row>
 
        <div className="review-section">
          <ReviewForm />
        </div>
      </Container>
    </div>
  )
}
 
export default DormsPage