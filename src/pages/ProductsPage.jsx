import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'

const mapParamToApiCategory = (slug) => { //TODO - what is this doing
  switch ((slug || '').toLowerCase()) {
    case 'women': return "women's clothing"
    case 'men': return "men's clothing"
    case 'jewelry': return 'jewelery'      // API spelling
    case 'electronics': return 'electronics'
    default: return ''                      // All
  }
}

function ProductsPage({showSearch}) {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || ''
  const apiCategory = mapParamToApiCategory(categoryParam)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
  })
  }, [])

  const titleMatches = (title, q) =>
     q.trim() === '' || title.toLowerCase().startsWith(q.trim().toLowerCase())

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => (apiCategory ? p.category === apiCategory : true))
      .filter(p => titleMatches(p.title, query))
  }, [products, apiCategory, query])


  return (
    <div className="products">
      {showSearch && <SearchBar query={query} setQuery={setQuery} />}
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

export default ProductsPage