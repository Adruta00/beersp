import React, { useState, useEffect } from 'react';
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
  const [allBeers, setAllBeers] = useState<any[]>([]);
  const [allVenues, setAllVenues] = useState<any[]>([]);

  // Cargar todas las cervezas y locales al montar el componente
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Cargar todas las cervezas
      const beersResponse = await client.models.Beer.list({ limit: 1000 });
      setAllBeers(beersResponse.data || []);

      // Cargar todos los locales
      const venuesResponse = await client.models.Venue.list({ limit: 1000 });
      setAllVenues(venuesResponse.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSearch = async () => {
    if (!query.trim() && category !== 'all') {
      // Si no hay query, mostrar todo en la categoría seleccionada
      if (category === 'beers') {
        setBeerResults(allBeers);
        setUserResults([]);
        setVenueResults([]);
      } else if (category === 'venues') {
        setVenueResults(allVenues);
        setBeerResults([]);
        setUserResults([]);
      }
      return;
    }

    setLoading(true);
    try {
      const searchTerm = query.toLowerCase().trim();

      if (category === 'all' || category === 'beers') {
        // Buscar en memoria las cervezas que coincidan
        const filteredBeers = allBeers.filter(beer =>
          beer.name.toLowerCase().includes(searchTerm) ||
          beer.country.toLowerCase().includes(searchTerm) ||
          beer.style.toLowerCase().includes(searchTerm)
        );
        setBeerResults(filteredBeers);
      } else {
        setBeerResults([]);
      }

      if (category === 'all' || category === 'users') {
        const usersResponse = await client.models.UserProfile.list({
          filter: {
            or: [
              { username: { contains: searchTerm } },
              { fullName: { contains: searchTerm } },
            ],
          },
        });
        setUserResults(usersResponse.data || []);
      } else {
        setUserResults([]);
      }

      if (category === 'all' || category === 'venues') {
        // Buscar en memoria los locales que coincidan
        const filteredVenues = allVenues.filter(venue =>
          venue.name.toLowerCase().includes(searchTerm) ||
          (venue.city && venue.city.toLowerCase().includes(searchTerm)) ||
          (venue.address && venue.address.toLowerCase().includes(searchTerm))
        );
        setVenueResults(filteredVenues);
      } else {
        setVenueResults([]);
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

  const showAll = () => {
    if (category === 'beers' || category === 'all') {
      setBeerResults(allBeers);
    }
    if (category === 'venues' || category === 'all') {
      setVenueResults(allVenues);
    }
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
            <Button variant="secondary" onClick={showAll}>
              Ver Todo
            </Button>
            {(query || totalResults > 0) && (
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
              Cervezas ({allBeers.length})
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
              Locales ({allVenues.length})
            </button>
          </div>
        </div>
      </Card>

      {totalResults > 0 && (
        <div className="results-summary">
          <span>{totalResults} resultados encontrados</span>
        </div>
      )}

      {!query && totalResults === 0 && !loading && (
        <div className="empty-state-container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Busca o explora nuestro catálogo</h3>
            <p>Tenemos {allBeers.length} cervezas y {allVenues.length} locales disponibles</p>
            <Button variant="primary" onClick={showAll} style={{ marginTop: '1rem' }}>
              Ver Todas las Cervezas
            </Button>
          </div>
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
                  {beer.description && (
                    <p className="text-xs text-secondary" style={{ marginTop: '0.5rem' }}>
                      {beer.description.substring(0, 80)}...
                    </p>
                  )}
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