import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price}</p>
        <a
          href={product.link}
          target="_blank"
          rel="noreferrer"
          className="product-btn"
        >
          ABRIR
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
