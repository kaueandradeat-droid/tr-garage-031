import './Header.css';

function Header({ onAdminClick }) {
  return (
    <header className="header">
      <div className="header-image">
        <img
          src="https://images.unsplash.com/photo-1494976866556-6812c383a393?auto=format&fit=crop&w=1000&q=80"
          alt="Fusca em garagem"
        />
        <div className="header-overlay"></div>
      </div>

      <div className="header-content">
        <div className="logo">
          <h1 className="logo-tr">TR</h1>
          <div className="logo-text">
            <p className="logo-garage">GARAGE</p>
            <p className="logo-number">031</p>
          </div>
        </div>
        <button className="admin-btn" onClick={onAdminClick} aria-label="Acesso administrativo">
          ⚙️
        </button>
      </div>
    </header>
  );
}

export default Header;
