import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'

const mapParamToApiCategory = (slug) => { 
  switch ((slug || '').toLowerCase()) {
    case 'women': return "women's clothing"
    case 'men': return "men's clothing"
    case 'jewelry': return 'jewelery'      // API spelling
    case 'electronics': return 'electronics'
    default: return ''                     
  }
}

function ProductsPage({showSearch, products}) {
  const [query, setQuery] = useState('')
  //const [loading, setLoading] = useState(true)
  //const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || ''
  const apiCategory = mapParamToApiCategory(categoryParam)

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

      <div className="product-grid">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage