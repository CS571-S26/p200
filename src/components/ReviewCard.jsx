function ReviewCard({ dormName, ratings, reviewText }) {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <span className="review-dorm-name">{dormName}</span>
        <span className="review-overall">⭐ {ratings.overall}/5</span>
      </div>
      <div className="review-ratings-grid">
        <span>🔊 Noise: {ratings.noise}/5</span>
        <span>🎉 Social: {ratings.social}/5</span>
        <span>🚿 Bathroom: {ratings.bathroom}/5</span>
        <span>📶 WiFi: {ratings.wifi}/5</span>
      </div>
      <p className="review-text">"{reviewText}"</p>
    </div>
  )
}
 
export default ReviewCard
 