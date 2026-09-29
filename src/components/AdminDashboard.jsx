import { useState } from 'react';
import AdminProductForm from './AdminProductForm';
import AdminProductsList from './AdminProductsList';
import AdminRatingsList from './AdminRatingsList';
import './AdminDashboard.css';

function AdminDashboard({
  products,
  ratings,
  onLogout,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Painel Administrativo - TR GARAGE 031</h1>
        <button onClick={onLogout} className="logout-btn">Sair</button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Produtos
        </button>
        <button
          className={`tab-btn ${activeTab === 'ratings' ? 'active' : ''}`}
          onClick={() => setActiveTab('ratings')}
        >
          ⭐ Avaliações ({ratings.length})
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && (
          <div className="products-tab">
            <AdminProductForm
              onSubmit={(data) => {
                if (editingProduct) {
                  onUpdateProduct(editingProduct.id, data);
                  setEditingProduct(null);
                } else {
                  onAddProduct(data);
                }
              }}
              editingProduct={editingProduct}
              onCancel={() => setEditingProduct(null)}
            />
            <AdminProductsList
              products={products}
              onEdit={setEditingProduct}
              onDelete={onDeleteProduct}
            />
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="ratings-tab">
            <AdminRatingsList ratings={ratings} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
