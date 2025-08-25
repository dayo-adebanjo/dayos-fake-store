import { Link } from 'react-router-dom'
import '../style/Home.css'

export default function HomePage(products) {
  return (
    <div className="home-wrap">
      {/* Top main grid */}
      <section className="main">
        <div className="main-left">
          <h1 className="main-title">
            WELCOME <br />
            TO <i>FAKE.</i><br />
          </h1>

          <div className="main-cards">
            <Link className="main-card main-card--lime" to="/products?category=men">
              <span style={{color: "white"}}>MEN'S</span>
              <span className="arrow">↗</span>
            </Link>

            <Link className="main-card main-card--pink" to="/products?category=women">
              <span style={{color: "white"}}>WOMEN'S</span>
              <span className="arrow">↗</span>
            </Link>

            <Link className="main-card main-card--orange" to="/products?category=electronics">
              <span style={{color: "white"}}>ELECTRONICS</span>
              <span className="arrow">↗</span>
            </Link>
          </div>
        </div>

        <div className="main-right" onClick={() => window.location.href = '/products?category=jewelry'}>
          <div className='right-text' style={{fontSize: 100, marginTop: "20%"}}>SALE:</div>
          <div className='right-text' ><i>50% OFF JEWELRY</i></div>
          <span className="arrow">↗</span>          
        </div>
      </section>

      <div className="divider">
        <h2>BESTSELLERS</h2>
        <Link to="/products" className="pill-cta">
          ALL PRODUCTS
        </Link>
      </div>

      {/* Bestseller row */}
      <section className="cards-row">
        {products && products.products.slice(0,4).map((p, i) => (
          <article className="prod-card" key={i}>
            <div className="prod-media">
              <img className="prod-media-img" src={p.image} alt={p.title} />
            </div>
            <div className="prod-content">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            
            </div>
            <div className="prod-footer">
              <span className="price">${p.price.toFixed(2)}</span>
              <Link to="/products" className="circle-cta" aria-label="Open">↗</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}