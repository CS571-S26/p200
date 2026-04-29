import { Form, Row, Col } from 'react-bootstrap'

function FilterBar({ location, setLocation, sortBy, setSortBy }) {
  return (
    <div className="filter-bar">
      <Row className="g-3">
        <Col xs={12} sm={6}>
          <Form.Group controlId="location-filter">
            <Form.Label className="filter-label">Filter by Area</Form.Label>
            <Form.Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="filter-select"
              aria-label="Filter dorms by location"
            >
              <option value="">All Areas</option>
              <option value="Southeast">Southeast</option>
              <option value="Lakeshore">Lakeshore</option>
              <option value="Langdon">Langdon</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="sort-filter">
            <Form.Label className="filter-label">Sort By</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
              aria-label="Sort dorms"
            >
              <option value="name">Name (A–Z)</option>
              <option value="rating-high">Rating (High → Low)</option>
              <option value="rating-low">Rating (Low → High)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}

export default FilterBar