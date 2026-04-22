import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DormCard from '../components/DormCard'
import SearchBar from '../components/SearchBar'
import dorms from '../data/dorms'
 
function DormsPage() {
  const [search, setSearch] = useState('')
 
  const filtered = dorms.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase())
  )
 
  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">UW–Madison Dorms</h1>
          <p className="page-subtitle">{dorms.length} dorms reviewed by students, for students. Click any dorm to see reviews.</p>
        </div>
 
        <SearchBar value={search} onChange={setSearch} />
 
        {filtered.length === 0 ? (
          <p className="no-results">No dorms match your search.</p>
        ) : (
          <Row className="dorms-grid mt-4">
            {filtered.map((dorm) => (
              <Col key={dorm.id} xs={12} md={6} lg={4} className="mb-4">
                <DormCard
                  id={dorm.id}
                  name={dorm.name}
                  location={dorm.location}
                  rating={dorm.rating}
                  distance={dorm.distance}
                  tags={dorm.tags}
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