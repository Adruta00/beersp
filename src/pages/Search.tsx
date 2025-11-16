import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Rating from '../components/common/Rating';
import './Search.css';

const client = generateClient<Schema>();

type SearchCategory = 'all' | 'beers' | 'users' | 'venues';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [loading, setLoading] = useState(false);
  const [beerResults, setBeerResults] = useState<any[]>([]);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [venueResults, setVenueResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      if (category === 'all' || category === 'beers') {
        const beersResponse = await client.models.Beer.list({
          filter: {
            or: [
              { name: { contains: query } },
              { country: { contains: query } },
            ],
          },
        });
        setBeerResults(beersResponse.data || []);
      }

      if (category === 'all' || category === 'users') {
        const usersResponse = await client.models.UserProfile.list({
          filter: {
            or: [
              { username: { contains: query } },
              { fullName: { contains: query } },
            ],
          },
        });
        setUserResults(usersResponse.data || []);
      }

      if (category === 'all' || category === 'venues') {
        const venuesResponse = await client.models.Venue.list({
          filter: {
            or: [
              { name: { contains: query } },
              { city: { contains: query } },
            ],
          },
        });
        setVenueResults(venuesResponse.data || []);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setBeerResults([]);
    setUserResults([]);
    setVenueResults([]);
  };

  const totalResults = beerResults.length + userResults.length + venueResults.length;

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Búsqueda</h1>
        <p className="search-description">
          Encuentra cervezas, usuarios y locales en BeerSp
        </p>
      </div>

      <Card className="search-card">
        <div className="search-controls">
          <div className="search-input-container">
            <Input
              placeholder="¿Qué estás buscando?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              icon="🔍"
              fullWidth
            />
            <Button
              variant="primary"
              onClick={handleSearch}
              loading={loading}
            >
              Buscar
            </Button>
            {query && (
              <Button variant="secondary" onClick={clearSearch}>
                Limpiar
              </Button>
            )}
          </div>

          <div className="category-tabs">
            <button
              className={`category-tab ${category === 'all' ? 'active' : ''}`}
              onClick={() => setCategory('all')}
            >
              Todo
            </button>
            <button
              className={`category-tab ${category === 'beers' ? 'active' : ''}`}
              onClick={() => setCategory('beers')}
            >
              Cervezas
            </button>
            <button
              className={`category-tab ${category === 'users' ? 'active' : ''}`}
              onClick={() => setCategory('users')}
            >
              Usuarios
            </button>
            <button
              className={`category-tab ${category === 'venues' ? 'active' : ''}`}
              onClick={() => setCategory('venues')}
            >
              Locales
            </button>
          </div>
        </div>
      </Card>

      {query && totalResults > 0 && (
        <div className="results-summary">
          <span>{totalResults} resultados encontrados</span>
        </div>
      )}

      {query && totalResults === 0 && !loading && (
        <div className="empty-state-container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No se encontraron resultados</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        </div>
      )}

      {/* Resultados de Cervezas */}
      {(category === 'all' || category === 'beers') && beerResults.length > 0 && (
        <Card title={`Cervezas (${beerResults.length})`} className="results-section">
          <div className="results-grid">
            {beerResults.map((beer) => (
              <div key={beer.id} className="result-card beer-card">
                <div className="result-image">
                  {beer.photo ? (
                    <img src={beer.photo} alt={beer.name} />
                  ) : (
                    <div className="result-placeholder">🍺</div>
                  )}
                </div>
                <div className="result-content">
                  <h4>{beer.name}</h4>
                  <p className="result-meta">{beer.style} • {beer.country}</p>
                  {beer.averageRating > 0 && (
                    <div className="result-rating">
                      <Rating value={beer.averageRating} readonly size="small" />
                      <span className="rating-text">
                        {beer.averageRating.toFixed(1)} ({beer.ratingsCount})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Resultados de Usuarios */}
      {(category === 'all' || category === 'users') && userResults.length > 0 && (
        <Card title={`Usuarios (${userResults.length})`} className="results-section">
          <div className="results-list">
            {userResults.map((user) => (
              <div key={user.id} className="result-card user-card">
                <div className="user-avatar-result">
                  {user.photo ? (
                    <img src={user.photo} alt={user.username} />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="result-content">
                  <h4>{user.fullName || user.username}</h4>
                  <p className="result-meta">@{user.username}</p>
                  {user.location && (
                    <p className="result-location">📍 {user.location}</p>
                  )}
                  <div className="user-stats">
                    <span>{user.tastingsCount || 0} degustaciones</span>
                  </div>
                </div>
                <div className="result-actions">
                  <Button variant="primary" size="small">
                    Ver Perfil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Resultados de Locales */}
      {(category === 'all' || category === 'venues') && venueResults.length > 0 && (
        <Card title={`Locales (${venueResults.length})`} className="results-section">
          <div className="results-list">
            {venueResults.map((venue) => (
              <div key={venue.id} className="result-card venue-card">
                <div className="venue-icon">🏪</div>
                <div className="result-content">
                  <h4>{venue.name}</h4>
                  <p className="result-meta">{venue.address}</p>
                  {venue.city && (
                    <p className="result-location">📍 {venue.city}, {venue.country}</p>
                  )}
                  <div className="venue-stats">
                    <span>❤️ {venue.likes || 0} me gusta</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Search;
