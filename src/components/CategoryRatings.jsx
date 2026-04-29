const categories = [
  { key: 'noise', label: '🔊 Noise Level' },
  { key: 'social', label: '🎉 Social Scene' },
  { key: 'bathroom', label: '🚿 Bathroom' },
  { key: 'wifi', label: '📶 WiFi Quality' },
  { key: 'overall', label: '⭐ Overall Vibes' },
]

function CategoryRatings({ reviews }) {
  if (reviews.length === 0) return null

  const averages = categories.map(({ key, label }) => {
    const avg = reviews.reduce((sum, r) => sum + r.ratings[key], 0) / reviews.length
    return { key, label, avg }
  })

  return (
    <div className="category-ratings">
      <h3 className="category-ratings-title">Average Ratings</h3>
      {averages.map(({ key, label, avg }) => (
        <div key={key} className="category-row" role="group" aria-label={`${label}: ${avg.toFixed(1)} out of 5`}>
          <span className="category-label">{label}</span>
          <div className="category-bar-track" aria-hidden="true">
            <div
              className="category-bar-fill"
              style={{ width: `${(avg / 5) * 100}%` }}
            />
          </div>
          <span className="category-score">{avg.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}

export default CategoryRatings