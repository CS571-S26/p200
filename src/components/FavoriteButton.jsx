function FavoriteButton({ dormId, favorites, toggleFavorite }) {
  const isFav = favorites.includes(dormId)

  return (
    <button
      className={`fav-btn ${isFav ? 'fav-btn--active' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(dormId)
      }}
      aria-label={isFav ? 'Remove from saved dorms' : 'Save this dorm'}
      aria-pressed={isFav}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  )
}

export default FavoriteButton