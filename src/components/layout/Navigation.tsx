import React from 'react';
import './Navigation.css';

type Page = 'home' | 'profile' | 'friends' | 'top-rated' | 'add-tasting' | 'search';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home' as Page, label: 'Inicio', icon: '🏠' },
    { id: 'add-tasting' as Page, label: 'Nueva Degustación', icon: '➕' },
    { id: 'top-rated' as Page, label: 'Top Cervezas', icon: '⭐' },
    { id: 'search' as Page, label: 'Buscar', icon: '🔍' },
    { id: 'friends' as Page, label: 'Amigos', icon: '👥' },
    { id: 'profile' as Page, label: 'Perfil', icon: '👤' },
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;