import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import dorms from '../data/dorms'
 
const categories = [
  { key: 'noise', label: '🔊 Noise Level' },
  { key: 'social', label: '🎉 Social Scene' },
  { key: 'bathroom', label: '🚿 Bathroom Situation' },
  { key: 'wifi', label: '📶 WiFi Quality' },
  { key: 'overall', label: '⭐ Overall Vibes' },
]
 
function StarInput({ label, value, onChange }) {
  const [hovered, setHovered] = useState(0)
 
  return (
    <div className="star-input-row">
      <span className="star-input-label">{label}</span>
      <div className="star-input-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star-btn ${star <= (hovered || value) ? 'filled' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  )
}
 
function ReviewForm() {
  const [selectedDorm, setSelectedDorm] = useState('')
  const [ratings, setRatings] = useState({ noise: 0, social: 0, bathroom: 0, wifi: 0, overall: 0 })
  const [reviewText, setReviewText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault()
 
    if (!selectedDorm) {
      setError('Please select a dorm.')
      return
    }
    if (Object.values(ratings).some(r => r === 0)) {
      setError('Please rate all categories.')
      return
    }
    if (reviewText.trim() === '') {
      setError('Please write a review.')
      return
    }
 
    setError('')
    setSubmitted(true)
    setSelectedDorm('')
    setRatings({ noise: 0, social: 0, bathroom: 0, wifi: 0, overall: 0 })
    setReviewText('')
    setTimeout(() => setSubmitted(false), 4000)
  }
 
  return (
    <div className="review-form-wrapper">
      <h3 className="review-form-title">Leave a Review</h3>
 
      {submitted && (
        <Alert variant="success" className="review-success">
          Thanks for your review! 🎉
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="review-error">
          {error}
        </Alert>
      )}
 
      <Form onSubmit={handleSubmit}>
        {/* Dorm Selector */}
        <Form.Group className="mb-3">
          <Form.Label className="review-text-label">Select a Dorm</Form.Label>
          <Form.Select
            value={selectedDorm}
            onChange={(e) => setSelectedDorm(e.target.value)}
            className="review-select"
          >
            <option value="">-- Choose a dorm --</option>
            {dorms.map((dorm) => (
              <option key={dorm.id} value={dorm.name}>
                {dorm.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
 
        {/* Star Ratings */}
        {categories.map(({ key, label }) => (
          <StarInput
            key={key}
            label={label}
            value={ratings[key]}
            onChange={(val) => setRatings((prev) => ({ ...prev, [key]: val }))}
          />
        ))}
 
        {/* Written Review */}
        <Form.Group className="mt-3">
          <Form.Label className="review-text-label">Your Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Tell future students what living here was really like..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="review-textarea"
          />
        </Form.Group>
 
        <Button type="submit" className="review-submit-btn mt-3">
          Submit Review
        </Button>
      </Form>
    </div>
  )
}
 
export default ReviewForm