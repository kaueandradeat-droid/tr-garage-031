import { useState } from 'react';
import './RatingSection.css';

function RatingSection({ onRate }) {
  const [rated, setRated] = useState(false);

  const emojis = ['😡', '😕', '😐', '🙂', '🔥'];

  const handleRate = (emoji) => {
    onRate(emoji);
    setRated(true);
    setTimeout(() => setRated(false), 2000);
  };

  return (
    <section className="rating-section">
      <div className="rating-container">
        <p className="rating-question">O que você achou da TR GARAGE 031?</p>
        
        {!rated ? (
          <div className="emoji-buttons">
            {emojis.map(emoji => (
              <button
                key={emoji}
                className="emoji-btn"
                onClick={() => handleRate(emoji)}
                aria-label={`Avaliar com ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : (
          <p className="rating-thank-you">Valeu pela avaliação! 🙏</p>
        )}
      </div>
    </section>
  );
}

export default RatingSection;
