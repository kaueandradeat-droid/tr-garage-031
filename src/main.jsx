import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

const PRODUCT_KEY = 'tr-garage-031-products';
const RATING_KEY = 'tr-garage-031-ratings';
const ADMIN_PASSWORD = 'trgarage031';
const emojis = ['😡', '😕', '😐', '🙂', '🔥'];

const initialProducts = [
  {
    id: 'product-1',
    name: 'Kit de Chaves Combinadas',
    price: 'R$ 89,90',
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41e7b5b?auto=format&fit=crop&w=900&q=85',
    description: 'Conjunto de chaves para manutenção automotiva.',
    link: 'https://www.google.com/search?q=kit+de+chaves+combinadas+automotivo',
  },
  {
    id: 'product-2',
    name: 'Filtro de Ar Premium',
    price: 'R$ 45,50',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85',
    description: 'Filtro de ar para proteção e bom desempenho do motor.',
    link: 'https://www.google.com/search?q=filtro+de+ar+automotivo',
  },
  {
    id: 'product-3',
    name: 'Lanterna LED de Trabalho',
    price: 'R$ 65,00',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',
    description: 'Iluminação forte para oficina, garagem e estrada.',
    link: 'https://www.google.com/search?q=lanterna+led+automotiva',
  },
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function Logo() {
  return <div className="logo" aria-label="TR GARAGE 031"><strong>TR</strong><span>GARAGE 031</span></div>;
}

function Header({ onAdmin }) {
  return (
    <header className="hero">
      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=90"
        alt="Carro clássico brilhante dentro de uma garagem"
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <Logo />
        <p className="hero-kicker">PEÇAS · FERRAMENTAS · ACESSÓRIOS</p>
        <button className="admin-entry" type="button" onClick={onAdmin}>Área administrativa</button>
      </div>
    </header>
  );
}

function Rating({ ratings, onRate }) {
  const [thankYou, setThankYou] = useState(false);

  const rate = (emoji) => {
    onRate({ id: `${Date.now()}-${Math.random()}`, emoji, createdAt: new Date().toISOString() });
    setThankYou(true);
  };

  return (
    <section className="rating section-card">
      <p className="eyebrow">Sua opinião importa</p>
      <h2>O que você achou da TR GARAGE 031?</h2>
      {thankYou ? <p className="thank-you">Valeu pela avaliação!</p> : (
        <div className="emoji-row">
          {emojis.map((emoji) => <button key={emoji} type="button" onClick={() => rate(emoji)} aria-label={`Avaliar ${emoji}`}>{emoji}</button>)}
        </div>
      )}
      <span className="rating-count">{ratings.length ? `${ratings.length} avaliação${ratings.length === 1 ? '' : 'ões'}` : ''}</span>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-data">
        <h3>{product.name}</h3>
        <strong>{product.price}</strong>
        <a className="open-button" href={product.link} target="_blank" rel="noreferrer">ABRIR</a>
      </div>
    </article>
  );
}

function Footer({ onAdmin }) {
  return (
    <footer>
      <p>Siga a TR GARAGE 031</p>
      <div className="social-row">
        <a href="https://instagram.com/trgarage031" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://tiktok.com/@trgarage0313" target="_blank" rel="noreferrer">TikTok</a>
      </div>
      <button className="admin-footer-link" type="button" onClick={onAdmin}>Admin</button>
    </footer>
  );
}

function ProductForm({ editing, onSave, onCancel }) {
  const empty = { name: '', price: '', image: '', description: '', link: '' };
  const [form, setForm] = useState(editing || empty);

  useEffect(() => setForm(editing || empty), [editing]);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, id: form.id || `product-${Date.now()}` });
    if (!editing) setForm(empty);
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Nome<input name="name" value={form.name} onChange={change} placeholder="Nome do produto" required /></label>
        <label>Preço<input name="price" value={form.price} onChange={change} placeholder="R$ 00,00" required /></label>
      </div>
      <label>Foto (URL)<input name="image" type="url" value={form.image} onChange={change} placeholder="https://..." required /></label>
      <label>Link do produto<input name="link" type="url" value={form.link} onChange={change} placeholder="https://..." required /></label>
      <label>Descrição <span className="muted">(para uso futuro)</span><textarea name="description" value={form.description} onChange={change} placeholder="Descrição interna" rows="3" /></label>
      <div className="form-actions"><button className="primary-button" type="submit">{editing ? 'Salvar alterações' : 'Adicionar produto'}</button>{editing && <button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button>}</div>
    </form>
  );
}

function Admin({ products, ratings, onSaveProduct, onDeleteProduct, onLogout, onBack }) {
  const [editing, setEditing] = useState(null);
  const [showRatings, setShowRatings] = useState(false);

  return (
    <main className="admin-page">
      <header className="admin-header"><Logo /><button className="secondary-button" onClick={onLogout}>Sair</button></header>
      <div className="admin-wrap">
        <div className="admin-title"><div><p className="eyebrow">Área privada</p><h1>Painel de produtos</h1></div><button className="text-link" onClick={onBack}>Ver loja</button></div>
        <section className="admin-box"><h2>{editing ? 'Editar produto' : 'Novo produto'}</h2><ProductForm editing={editing} onSave={(product) => { onSaveProduct(product); setEditing(null); }} onCancel={() => setEditing(null)} /></section>
        <section className="admin-box"><h2>Produtos cadastrados</h2>{products.length === 0 ? <p className="muted">Nenhum produto cadastrado.</p> : <div className="admin-products">{products.map((product) => <div className="admin-product" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{product.price}</span></div><div className="admin-actions"><button className="secondary-button" onClick={() => setEditing(product)}>Editar</button><button className="danger-button" onClick={() => onDeleteProduct(product.id)}>Excluir</button></div></div>)}</div>}</section>
        <section className="admin-box"><button className="ratings-toggle" onClick={() => setShowRatings(!showRatings)}><span>Avaliações recebidas ({ratings.length})</span><span>{showRatings ? '−' : '+'}</span></button>{showRatings && <div className="ratings-admin">{ratings.length === 0 ? <p className="muted">Nenhuma avaliação recebida ainda.</p> : <>{emojis.map((emoji) => <div className="rating-total" key={emoji}><span>{emoji}</span><strong>{ratings.filter((rating) => rating.emoji === emoji).length}</strong></div>)}</>}</div>}</section>
      </div>
    </main>
  );
}

function Login({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => { event.preventDefault(); if (password === ADMIN_PASSWORD) onLogin(); else setError('Senha incorreta.'); };
  return <main className="login-page"><div className="login-box"><Logo /><p className="eyebrow">Área administrativa</p><h1>Entrar</h1><form onSubmit={submit}><label>Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus required /></label>{error && <p className="error">{error}</p>}<button className="primary-button" type="submit">Entrar</button></form><button className="text-link" onClick={onBack}>Voltar para a loja</button></div></main>;
}

function App() {
  const [view, setView] = useState(window.location.hash === '#admin' ? 'login' : 'home');
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState(() => readStorage(PRODUCT_KEY, initialProducts));
  const [ratings, setRatings] = useState(() => readStorage(RATING_KEY, []));

  const saveProduct = (product) => { const exists = products.some((item) => item.id === product.id); const next = exists ? products.map((item) => item.id === product.id ? product : item) : [...products, product]; setProducts(next); saveStorage(PRODUCT_KEY, next); };
  const deleteProduct = (id) => { if (window.confirm('Excluir este produto?')) { const next = products.filter((item) => item.id !== id); setProducts(next); saveStorage(PRODUCT_KEY, next); } };
  const addRating = (rating) => { const next = [...ratings, rating]; setRatings(next); saveStorage(RATING_KEY, next); };
  const goAdmin = () => setView(authenticated ? 'admin' : 'login');
  const goHome = () => { setView('home'); window.location.hash = ''; };

  if (view === 'login') return <Login onLogin={() => { setAuthenticated(true); setView('admin'); }} onBack={goHome} />;
  if (view === 'admin') return <Admin products={products} ratings={ratings} onSaveProduct={saveProduct} onDeleteProduct={deleteProduct} onLogout={() => { setAuthenticated(false); goHome(); }} onBack={goHome} />;

  return <div className="site"><Header onAdmin={goAdmin} /><main className="public-content"><Rating ratings={ratings} onRate={addRating} /><section className="products"><div className="section-heading"><p className="eyebrow">Seleção TR GARAGE 031</p><h2>Produtos em destaque</h2></div>{products.map((product) => <ProductCard key={product.id} product={product} />)}</section></main><Footer onAdmin={goAdmin} /></div>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
