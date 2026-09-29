import './AdminProductsList.css';

function AdminProductsList({ products, onEdit, onDelete }) {
  return (
    <div className="products-list-container">
      <h2>Produtos Cadastrados</h2>
      {products.length === 0 ? (
        <p className="empty-message">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="products-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <p className="product-link">{product.link}</p>
              </div>
              <div className="product-actions">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(product)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(product.id)}
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductsList;
