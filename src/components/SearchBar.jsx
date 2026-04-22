import { Form } from 'react-bootstrap'
 
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <Form.Control
        type="text"
        placeholder="🔍 Search dorms by name or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-bar"
      />
    </div>
  )
}
 
export default SearchBar
 