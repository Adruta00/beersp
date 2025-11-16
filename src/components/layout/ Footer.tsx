import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">🍺 BeerSp</h3>
            <p className="footer-description">
              Aplicación social para fomentar el turismo de calidad en cervecerías
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Enlaces</h4>
            <ul className="footer-links">
              <li><a href="#about">Sobre BeerSp</a></li>
              <li><a href="#privacy">Política de Privacidad</a></li>
              <li><a href="#terms">Términos de Uso</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Comunidad</h4>
            <ul className="footer-links">
              <li><a href="#guide">Guía de Uso</a></li>
              <li><a href="#badges">Galardones</a></li>
              <li><a href="#top-beers">Cervezas Top</a></li>
              <li><a href="#venues">Locales</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Síguenos</h4>
            <div className="footer-social">
              <a href="#twitter" aria-label="Twitter">🐦</a>
              <a href="#instagram" aria-label="Instagram">📷</a>
              <a href="#facebook" aria-label="Facebook">👥</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} BeerSp. Todos los derechos reservados.
          </p>
          <p className="footer-disclaimer">
            ⚠️ Ejercicio académico sin fines comerciales. Consumo responsable +18.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;