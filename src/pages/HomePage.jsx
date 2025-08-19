import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'

function HomePage() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
  })
  }, [])

  const filteredProducts = products.filter(p =>
     query.trim() === '' || p.title.toLowerCase().startsWith(query.trim().toLowerCase())
  )

  return (
    <div className="home">
      <SearchBar query={query} setQuery={setQuery} />
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', fontSize: '12px' }}>Loading...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onRequestClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default HomePage