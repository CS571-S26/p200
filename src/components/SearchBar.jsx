import { Form } from 'react-bootstrap'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <Form.Label htmlFor="dorm-search" className="visually-hidden">Search dorms</Form.Label>
      <Form.Control
        id="dorm-search"
        type="search"
        placeholder="🔍 Search dorms by name or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-bar"
        aria-label="Search dorms by name or location"
      />
    </div>
  )
}

export default SearchBar