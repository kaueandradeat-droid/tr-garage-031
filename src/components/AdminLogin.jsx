import { useState } from 'react';
import './AdminLogin.css';

const ADMIN_PASSWORD = 'trgarage031';

function AdminLogin({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onAuthenticate();
      setPassword('');
      setError('');
    } else {
      setError('Senha incorreta.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <h1 className="login-title">TR GARAGE 031</h1>
        <p className="login-subtitle">Painel Administrativo</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Senha de acesso:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              autoFocus
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
