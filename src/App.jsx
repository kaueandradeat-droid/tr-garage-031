import { useEffect, useMemo, useState } from 'react';
import { adminPassword, hasSupabaseConfig, supabase } from './lib/supabase';

const fallbackProducts = [
  {
    id: '1',
    name: 'Kit de Chaves Combinadas',
    description: 'Ferramenta essencial para manutenção e ajustes rápidos do veículo.',
    image_url:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
    link: 'https://www.google.com/search?q=kit+de+chaves+combinadas+automotivo',
  },
  {
    id: '2',
    name: 'Filtro de Ar Premium',
    description: 'Melhor fluxo de ar e proteção para o motor em uso diário.',
    image_url:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
    link: 'https://www.google.com/search?q=filtro+de+ar+automotivo+premium',
  },
  {
    id: '3',
    name: 'Sensor de Estacionamento',
    description: 'Aumento de segurança e precisão na hora de manobrar.',
    image_url:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    link: 'https://www.google.com/search?q=sensor+de+estacionamento+carro',
  },
  {
    id: '4',
    name: 'Lanterna LED de Trabalho',
    description: 'Iluminação forte e resistente para oficina e uso off-road.',
    image_url:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    link: 'https://www.google.com/search?q=lanterna+led+trabalho+automotivo',
  },
];

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="image-wrap">
        <img src={product.image_url || 'https://placehold.co/600x400/0F172A/FFFFFF?text=TR+GARAGE'} alt={product.name} />
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a href={product.link} target="_blank" rel="noreferrer">
          Abrir
        </a>
      </div>
    </article>
  );
}

function AdminLogin({ onLogin, error }) {
  const [password, setPassword] = useState('');

  return (
    <div className="admin-login">
      <div className="panel-box">
        <p className="eyebrow">Área administrativa</p>
        <h2>Login do administrador</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onLogin(password);
          }}
        >
          <label htmlFor="admin-password">Senha</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite a senha"
          />
          {error ? <small className="error-text">{error}</small> : null}
          <button type="submit" className="primary-btn full-width">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductForm({ form, setForm, onSubmit, onCancel, saving }) {
  return (
    <form className="product-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Ex.: Kit de chave inglesa"
            required
          />
        </div>

        <div>
          <label htmlFor="link">Link do produto</label>
          <input
            id="link"
            type="url"
            value={form.link}
            onChange={(event) => setForm((prev) => ({ ...prev, link: event.target.value }))}
            placeholder="https://..."
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="image_url">URL da imagem</label>
        <input
          id="image_url"
          type="url"
          value={form.image_url}
          onChange={(event) => setForm((prev) => ({ ...prev, image_url: event.target.value }))}
          placeholder="https://imagem.jpg"
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          rows="4"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Descreva rapidamente o produto"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn" disabled={saving}>
          {saving ? 'Salvando...' : form.id ? 'Salvar alterações' : 'Adicionar produto'}
        </button>
        {form.id ? (
          <button type="button" className="ghost-btn" onClick={onCancel}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('tr-garage-admin') === 'true');
  const [adminError, setAdminError] = useState('');
  const [activeView, setActiveView] = useState('home');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: '',
    description: '',
    image_url: '',
    link: '',
  });

  useEffect(() => {
    const syncViewFromHash = () => {
      const path = window.location.hash;
      if (path === '#/admin') {
        setActiveView('admin');
      } else {
        setActiveView('home');
      }
    };

    syncViewFromHash();
    window.addEventListener('hashchange', syncViewFromHash);
    return () => window.removeEventListener('hashchange', syncViewFromHash);
  }, []);

  const isSupabaseReady = useMemo(() => hasSupabaseConfig, []);

  const fetchProducts = async () => {
    if (!supabase) {
      setProducts(fallbackProducts);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase.from('products').select('*').order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProducts(data && data.length ? data : fallbackProducts);
    } catch (loadError) {
      console.error(loadError);
      setError('Não foi possível carregar os produtos no momento.');
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogin = (password) => {
    if (password === adminPassword) {
      sessionStorage.setItem('tr-garage-admin', 'true');
      setIsAuthenticated(true);
      setAdminError('');
      window.location.hash = '#/admin';
      return;
    }

    setAdminError('Senha incorreta.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tr-garage-admin');
    setIsAuthenticated(false);
    setForm({ id: null, name: '', description: '', image_url: '', link: '' });
    window.location.hash = '#';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!supabase) {
      setError('Configure as variáveis do Supabase para salvar produtos.');
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        image_url: form.image_url,
        link: form.link,
      };

      if (form.id) {
        const { error: updateError } = await supabase.from('products').update(payload).eq('id', form.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('products').insert([payload]);
        if (insertError) throw insertError;
      }

      setForm({ id: null, name: '', description: '', image_url: '', link: '' });
      await fetchProducts();
    } catch (submitError) {
      console.error(submitError);
      setError('Não foi possível salvar o produto. Verifique as informações e o banco do Supabase.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!supabase) {
      setError('Configure as variáveis do Supabase para excluir produtos.');
      return;
    }

    try {
      const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
      if (deleteError) throw deleteError;
      await fetchProducts();
    } catch (deleteErr) {
      console.error(deleteErr);
      setError('Não foi possível excluir este produto.');
    }
  };

  const renderHome = () => (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">TR</span>
          <div>
            <p className="brand-name">GARAGE 031</p>
            <small>Peças • Ferramentas • Acessórios</small>
          </div>
        </div>

        <nav className="nav-actions">
          <a href="#" className="nav-link active">Loja</a>
          <a href="#/admin" className="nav-link">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Performance e utilidade</p>
          <h1>Produtos automotivos para quem vive no carro.</h1>
          <p className="hero-copy">
            Ferramentas, acessórios e peças com foco em qualidade, durabilidade e estilo para o seu veículo.
          </p>
        </div>
      </section>

      <section className="catalog" aria-label="Catálogo de produtos">
        {loading ? <div className="loader">Carregando produtos...</div> : null}
        {error ? <div className="notice error">{error}</div> : null}

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );

  const renderAdmin = () => {
    if (!isAuthenticated) {
      return (
        <main className="page-shell compact-shell">
          <header className="topbar admin-topbar">
            <div className="brand-block">
              <span className="brand-mark">TR</span>
              <div>
                <p className="brand-name">GARAGE 031</p>
                <small>Área privada</small>
              </div>
            </div>
            <nav className="nav-actions">
              <a href="#" className="nav-link">Loja</a>
              <a href="#/admin" className="nav-link active">Admin</a>
            </nav>
          </header>

          <AdminLogin onLogin={handleLogin} error={adminError} />
        </main>
      );
    }

    return (
      <main className="page-shell">
        <header className="topbar admin-topbar">
          <div className="brand-block">
            <span className="brand-mark">TR</span>
            <div>
              <p className="brand-name">GARAGE 031</p>
              <small>Painel administrativo</small>
            </div>
          </div>

          <nav className="nav-actions">
            <a href="#" className="nav-link">Loja</a>
            <button type="button" className="nav-btn" onClick={handleLogout}>
              Sair
            </button>
          </nav>
        </header>

        <section className="admin-panel">
          <div className="panel-box">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Gerenciar produtos</p>
                <h2>{form.id ? 'Editar produto' : 'Adicionar novo produto'}</h2>
              </div>
            </div>

            <ProductForm form={form} setForm={setForm} onSubmit={handleSubmit} onCancel={() => setForm({ id: null, name: '', description: '', image_url: '', link: '' })} saving={saving} />
          </div>

          <div className="panel-box admin-list">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Produtos cadastrados</p>
                <h2>Lista</h2>
              </div>
            </div>

            {products.map((product) => (
              <div key={product.id} className="admin-item">
                <div className="admin-item-info">
                  <img src={product.image_url || 'https://placehold.co/200x120/0F172A/FFFFFF?text=TR'} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.description}</span>
                  </div>
                </div>

                <div className="admin-item-actions">
                  <button type="button" className="ghost-btn" onClick={() => handleEdit(product)}>
                    Editar
                  </button>
                  <button type="button" className="danger-btn" onClick={() => handleDelete(product.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  };

  return activeView === 'admin' ? renderAdmin() : renderHome();
}

export default App;
