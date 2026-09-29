import ProductCard from './ProductCard';
import './ProductsList.css';

function ProductsList({ products }) {
  return (
    <main className="products-section">
      <div className="products-container">
        {products.length === 0 ? (
          <p className="no-products">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="products-list">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ProductsList;
