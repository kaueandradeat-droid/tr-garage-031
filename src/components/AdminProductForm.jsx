import { useState, useEffect } from 'react';
import './AdminProductForm.css';

function AdminProductForm({ onSubmit, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    link: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm({
        name: '',
        price: '',
        image: '',
        description: '',
        link: '',
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.price && form.image && form.link) {
      onSubmit(form);
      setForm({
        name: '',
        price: '',
        image: '',
        description: '',
        link: '',
      });
    }
  };

  return (
    <div className="product-form-container">
      <h2>{editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Produto *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex.: Kit de Chaves"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Preço *</label>
            <input
              id="price"
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Ex.: R$ 89,90"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL da Imagem *</label>
            <input
              id="image"
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="link">Link do Produto *</label>
          <input
            id="link"
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição (para uso futuro)</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descreva o produto..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
          </button>
          {editingProduct && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminProductForm;
