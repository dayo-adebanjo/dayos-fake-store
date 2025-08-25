function ProductCard({ product, onClick }) {

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image"><img className="prod-img" src={product.image} alt={product.title}/></div>
      <div className="product-metadata">
        <div className="product-title"><h3>{product.title}</h3></div>
        <div className="product-price"><p>${product.price.toFixed(2)}</p></div>
      </div>
      <div className="product-add-to-cart">
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard