import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import dorms from '../data/dorms'
import ReviewForm from '../components/ReviewForm'
import ReviewCard from '../components/ReviewCard'

function DormDetailPage({ reviews, addReview }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const dorm = dorms.find((d) => d.id === parseInt(id))

  if (!dorm) {
    return (
      <Container className="dorms-page">
        <h2>Dorm not found.</h2>
        <Button onClick={() => navigate('/dorms')} className="review-submit-btn mt-3">
          ← Back to Dorms
        </Button>
      </Container>
    )
  }

  const dormReviews = reviews.filter((r) => r.dormId === dorm.id)

  return (
    <div className="dorms-page">
      <Container>
        <Button
          variant="link"
          className="back-btn"
          onClick={() => navigate('/dorms')}
        >
          ← Back to all dorms
        </Button>

        {/* Dorm Header */}
        <div className="detail-header">
          <div>
            <h1 className="page-title">{dorm.name}</h1>
            <p className="page-subtitle">📍 {dorm.location} &nbsp;·&nbsp; 🚶 {dorm.distance} from Bascom Hill</p>
          </div>
          <div className="detail-rating">
            <span className="detail-rating-number">{dorm.rating.toFixed(1)}</span>
            <span className="detail-rating-label">/ 5.0</span>
          </div>
        </div>

        {/* Tags */}
        <div className="dorm-tags mb-4">
          {dorm.tags && dorm.tags.map((tag) => (
            <span key={tag} className="badge dorm-tag">{tag}</span>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="reviews-list-section">
          <h2 className="section-title">
            Student Reviews
            <span className="review-count"> ({dormReviews.length})</span>
          </h2>

          {dormReviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet — be the first to review {dorm.name}!</p>
            </div>
          ) : (
            <div className="reviews-list">
              {dormReviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="review-section">
          <ReviewForm dormId={dorm.id} dormName={dorm.name} addReview={addReview} />
        </div>
      </Container>
    </div>
  )
}

export default DormDetailPage