import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">Siga a TR GARAGE 031</p>
        <div className="social-buttons">
          <a
            href="https://instagram.com/trgarage031"
            target="_blank"
            rel="noreferrer"
            className="social-btn instagram"
            aria-label="Instagram TR GARAGE 031"
          >
            📷 Instagram
          </a>
          <a
            href="https://tiktok.com/@trgarage0313"
            target="_blank"
            rel="noreferrer"
            className="social-btn tiktok"
            aria-label="TikTok TR GARAGE 031"
          >
            🎵 TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
