import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DormCard from '../components/DormCard'
import dorms from '../data/dorms'

function FavoritesPage({ favorites, toggleFavorite, compareList, toggleCompare, reviews }) {
  const favDorms = dorms.filter((d) => favorites.includes(d.id))

  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">Saved Dorms</h1>
          <p className="page-subtitle">
            {favDorms.length === 0
              ? 'You haven\'t saved any dorms yet.'
              : `${favDorms.length} dorm${favDorms.length > 1 ? 's' : ''} saved.`}
          </p>
        </div>

        {favDorms.length === 0 ? (
          <div className="no-reviews">
            <p>Browse dorms and tap 🤍 to save them here.</p>
            <Link to="/dorms" className="hero-cta btn mt-3" style={{ display: 'inline-block' }}>
              Browse Dorms →
            </Link>
          </div>
        ) : (
          <Row>
            {favDorms.map((dorm) => (
              <Col key={dorm.id} xs={12} md={6} lg={4} className="mb-4">
                <DormCard
                  id={dorm.id}
                  name={dorm.name}
                  location={dorm.location}
                  rating={dorm.rating}
                  distance={dorm.distance}
                  tags={dorm.tags}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default FavoritesPage