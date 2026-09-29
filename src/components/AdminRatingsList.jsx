import './AdminRatingsList.css';

function AdminRatingsList({ ratings }) {
  return (
    <div className="ratings-list-container">
      <h2>Avaliações Recebidas</h2>
      {ratings.length === 0 ? (
        <p className="empty-message">Nenhuma avaliação recebida ainda.</p>
      ) : (
        <div className="ratings-list">
          <div className="ratings-summary">
            <p>Total de avaliações: <strong>{ratings.length}</strong></p>
            <div className="emoji-stats">
              {['😡', '😕', '😐', '🙂', '🔥'].map(emoji => {
                const count = ratings.filter(r => r.emoji === emoji).length;
                return (
                  <div key={emoji} className="emoji-stat">
                    <span className="emoji-icon">{emoji}</span>
                    <span className="emoji-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ratings-timeline">
            {ratings.map(rating => (
              <div key={rating.id} className="rating-item">
                <span className="rating-emoji">{rating.emoji}</span>
                <span className="rating-timestamp">{rating.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRatingsList;
