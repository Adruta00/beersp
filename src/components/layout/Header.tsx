import React from 'react';
import './Header.css';

interface HeaderProps {
  username: string;
  photo?: string;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, photo, onSignOut }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <div className="logo-icon">🍺</div>
          <h1 className="logo-text">BeerSp</h1>
        </div>

        <div className="header-actions">
          <div className="header-user">
            <div className="user-avatar">
              {photo ? (
                <img src={photo} alt={username} />
              ) : (
                <div className="user-avatar-placeholder">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="user-name">{username}</span>
          </div>

          <button className="btn-secondary" onClick={onSignOut}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;