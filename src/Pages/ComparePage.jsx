import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dorms from '../data/dorms'

const categories = [
  { key: 'noise', label: '🔊 Noise Level' },
  { key: 'social', label: '🎉 Social Scene' },
  { key: 'bathroom', label: '🚿 Bathroom' },
  { key: 'wifi', label: '📶 WiFi Quality' },
  { key: 'overall', label: '⭐ Overall Vibes' },
]

function getAvg(reviews, dormId, key) {
  const r = reviews.filter((r) => r.dormId === dormId)
  if (r.length === 0) return null
  return (r.reduce((sum, rev) => sum + rev.ratings[key], 0) / r.length).toFixed(1)
}

function ComparePage({ compareList, reviews, toggleCompare }) {
  const selected = dorms.filter((d) => compareList.includes(d.id))

  if (selected.length < 2) {
    return (
      <div className="dorms-page">
        <Container>
          <div className="page-header">
            <h1 className="page-title">Compare Dorms</h1>
            <p className="page-subtitle">Select 2 dorms to compare them side by side.</p>
          </div>
          <div className="no-reviews">
            <p>You need to select 2 dorms to compare. Go to <Link to="/dorms">Browse Dorms</Link> and click "+ Compare" on any two dorms.</p>
          </div>
        </Container>
      </div>
    )
  }

  const [dormA, dormB] = selected

  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">Compare Dorms</h1>
          <p className="page-subtitle">Side-by-side comparison based on student reviews.</p>
        </div>

        <div className="compare-grid" role="table" aria-label="Dorm comparison table">
          {/* Header */}
          <div className="compare-row compare-header" role="row">
            <div className="compare-cell compare-label-cell" role="columnheader"></div>
            <div className="compare-cell compare-dorm-header" role="columnheader">
              <h2 className="compare-dorm-name">{dormA.name}</h2>
              <p className="compare-dorm-sub">📍 {dormA.location} · 🚶 {dormA.distance}</p>
              <button className="compare-remove-btn" onClick={() => toggleCompare(dormA.id)} aria-label={`Remove ${dormA.name} from comparison`}>✕ Remove</button>
            </div>
            <div className="compare-cell compare-dorm-header" role="columnheader">
              <h2 className="compare-dorm-name">{dormB.name}</h2>
              <p className="compare-dorm-sub">📍 {dormB.location} · 🚶 {dormB.distance}</p>
              <button className="compare-remove-btn" onClick={() => toggleCompare(dormB.id)} aria-label={`Remove ${dormB.name} from comparison`}>✕ Remove</button>
            </div>
          </div>

          {/* Overall rating row */}
          <div className="compare-row" role="row">
            <div className="compare-cell compare-label-cell" role="rowheader">Base Rating</div>
            <div className="compare-cell" role="cell">
              <span className="compare-score">{dormA.rating.toFixed(1)}</span>
            </div>
            <div className="compare-cell" role="cell">
              <span className="compare-score">{dormB.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Review count */}
          <div className="compare-row" role="row">
            <div className="compare-cell compare-label-cell" role="rowheader">Reviews</div>
            <div className="compare-cell" role="cell">{reviews.filter(r => r.dormId === dormA.id).length}</div>
            <div className="compare-cell" role="cell">{reviews.filter(r => r.dormId === dormB.id).length}</div>
          </div>

          {/* Category rows */}
          {categories.map(({ key, label }) => {
            const avgA = getAvg(reviews, dormA.id, key)
            const avgB = getAvg(reviews, dormB.id, key)
            const aWins = avgA && avgB && parseFloat(avgA) > parseFloat(avgB)
            const bWins = avgA && avgB && parseFloat(avgB) > parseFloat(avgA)

            return (
              <div key={key} className="compare-row" role="row">
                <div className="compare-cell compare-label-cell" role="rowheader">{label}</div>
                <div className={`compare-cell ${aWins ? 'compare-winner' : ''}`} role="cell">
                  <span className="compare-score">{avgA ?? '—'}</span>
                </div>
                <div className={`compare-cell ${bWins ? 'compare-winner' : ''}`} role="cell">
                  <span className="compare-score">{avgB ?? '—'}</span>
                </div>
              </div>
            )
          })}
        </div>

        <p className="compare-note">* Category ratings are based on student reviews. — means no reviews yet.</p>
        <Link to="/dorms" className="back-btn" style={{ display: 'inline-block', marginTop: '1rem' }}>← Back to Browse</Link>
      </Container>
    </div>
  )
}

export default ComparePage