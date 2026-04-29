function ReviewCard({ dormName, ratings, reviewText, date }) {
  return (
    <article className="review-card" aria-label={`Review for ${dormName}`}>
      <div className="review-card-header">
        <span className="review-dorm-name">{dormName}</span>
        <div className="review-meta">
          <span className="review-overall">⭐ {ratings.overall}/5</span>
          {date && <span className="review-date">{date}</span>}
        </div>
      </div>
      <div className="review-ratings-grid" aria-label="Category ratings">
        <span>🔊 Noise: {ratings.noise}/5</span>
        <span>🎉 Social: {ratings.social}/5</span>
        <span>🚿 Bathroom: {ratings.bathroom}/5</span>
        <span>📶 WiFi: {ratings.wifi}/5</span>
      </div>
      <p className="review-text">"{reviewText}"</p>
    </article>
  )
}

export default ReviewCard