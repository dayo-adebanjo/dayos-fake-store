import { Link } from 'react-router-dom'
import '../style/Home.css'

export default function HomePage() {
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
            <Link className="main-card main-card--lime" to="/products">
              <span style={{color: "white"}}>MEN'S</span>
              <span className="arrow">↗</span>
            </Link>

            <Link className="main-card main-card--pink" to="/about">
              <span style={{color: "white"}}>WOMEN'S</span>
              <span className="arrow">↗</span>
            </Link>

            <Link className="main-card main-card--orange" to="/delivery">
              <span style={{color: "white"}}>ELECTRONICS</span>
              <span className="arrow">↗</span>
            </Link>
          </div>
        </div>

        <div className="main-right">
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
    </div>
  );
}