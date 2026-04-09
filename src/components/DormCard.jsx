import { Card, Badge } from 'react-bootstrap'
 
function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)}</span>
    </div>
  )
}
 
function DormCard({ name, location, rating, distance, tags }) {
  return (
    <Card className="dorm-card">
      <Card.Body>
        <div className="card-header-row">
          <Card.Title className="dorm-name">{name}</Card.Title>
          <StarRating rating={rating} />
        </div>
        <Card.Subtitle className="dorm-location">📍 {location}</Card.Subtitle>
        <p className="dorm-distance">🚶 {distance} from Bascom Hill</p>
        <div className="dorm-tags">
          {tags && tags.map((tag) => (
            <Badge key={tag} className="dorm-tag">{tag}</Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}
 
export default DormCard