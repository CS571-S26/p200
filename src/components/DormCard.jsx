import { Card, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'star filled' : 'star'} aria-hidden="true">
          ★
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)}</span>
    </div>
  )
}

function DormCard({ id, name, location, rating, distance, tags, favorites, toggleFavorite, compareList, toggleCompare }) {
  const navigate = useNavigate()
  const isComparing = compareList && compareList.includes(id)

  return (
    <Card className="dorm-card" onClick={() => navigate(`/dorms/${id}`)} style={{ cursor: 'pointer' }}>
      <Card.Body>
        <div className="card-header-row">
          <Card.Title className="dorm-name">{name}</Card.Title>
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            {favorites && toggleFavorite && (
              <FavoriteButton dormId={id} favorites={favorites} toggleFavorite={toggleFavorite} />
            )}
            {toggleCompare && (
              <button
                className={`compare-btn ${isComparing ? 'compare-btn--active' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleCompare(id) }}
                aria-label={isComparing ? 'Remove from compare' : 'Add to compare'}
                aria-pressed={isComparing}
              >
                {isComparing ? '✓ Compare' : '+ Compare'}
              </button>
            )}
          </div>
        </div>
        <StarRating rating={rating} />
        <Card.Subtitle className="dorm-location">📍 {location}</Card.Subtitle>
        <p className="dorm-distance">🚶 {distance} from Bascom Hill</p>
        <div className="dorm-tags">
          {tags && tags.map((tag) => (
            <Badge key={tag} className="dorm-tag">{tag}</Badge>
          ))}
        </div>
        <p className="dorm-click-hint">Click to view reviews →</p>
      </Card.Body>
    </Card>
  )
}

export default DormCard