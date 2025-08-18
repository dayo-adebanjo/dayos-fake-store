import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'

function HomePage() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="home">
      <SearchBar query={query} setQuery={setQuery} />
      <div className="product-grid">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default HomePage