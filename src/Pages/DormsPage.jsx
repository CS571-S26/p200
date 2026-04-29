import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DormCard from '../components/DormCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import dorms from '../data/dorms'

function DormsPage({ favorites, toggleFavorite, compareList, toggleCompare, reviews }) {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const filtered = dorms
    .filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase())
      const matchesLocation = location === '' || d.location === location
      return matchesSearch && matchesLocation
    })
    .sort((a, b) => {
      if (sortBy === 'rating-high') return b.rating - a.rating
      if (sortBy === 'rating-low') return a.rating - b.rating
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">UW–Madison Dorms</h1>
          <p className="page-subtitle">
  {filtered.length} of {dorms.length} dorms shown. Click any dorm to see reviews.
</p>
        </div>

        <SearchBar value={search} onChange={setSearch} />
        <FilterBar location={location} setLocation={setLocation} sortBy={sortBy} setSortBy={setSortBy} />

        {compareList.length > 0 && (
          <div className="compare-banner" role="status" aria-live="polite">
            {compareList.length === 1
              ? '1 dorm selected for comparison — select one more!'
              : `${compareList.length} dorms selected — `}
            {compareList.length === 2 && (
              <a href="#/compare" className="compare-banner-link">View comparison →</a>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="no-results" role="status">No dorms match your search.</p>
        ) : (
          <Row className="dorms-grid mt-3">
            {filtered.map((dorm) => (
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

export default DormsPage