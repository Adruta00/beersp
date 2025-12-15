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
    // Cargar todas las cervezas ficticias (usa las mismas que en TopRated.tsx)
    const mockBeers = [
      // Cervezas Españolas
      { id: '1', name: 'Alhambra Reserva 1925', style: 'LAGER', country: 'ES', color: 'GOLDEN_YELLOW', alcoholPercentage: 6.4, ibu: 25, averageRating: 4.4, ratingsCount: 5213, description: 'Iconica lager premium de Granada, intensa y con cuerpo.', createdAt: '2023-01-15' },
      { id: '2', name: 'Mahou 5 Estrellas', style: 'LAGER', country: 'ES', color: 'GOLDEN_YELLOW', alcoholPercentage: 5.5, ibu: 27, averageRating: 4.2, ratingsCount: 4567, description: 'El sabor clásico de Madrid, equilibrada y refrescante.', createdAt: '2023-02-20' },
      { id: '3', name: 'Estrella Galicia Especial', style: 'LAGER', country: 'ES', color: 'LIGHT_GOLD', alcoholPercentage: 5.5, ibu: 25, averageRating: 4.3, ratingsCount: 4890, description: 'Cerveza gallega de sabor lupulado y refrescante.', createdAt: '2023-03-10' },
      { id: '4', name: '1906 Red Vintage', style: 'AMBER_ALE', country: 'ES', color: 'LIGHT_AMBER', alcoholPercentage: 8.0, ibu: 28, averageRating: 4.6, ratingsCount: 3214, description: 'La colorada, intensa y equilibrada.', createdAt: '2023-04-05' },
      { id: '5', name: 'Voll-Damm Doble Malta', style: 'AMBER_ALE', country: 'ES', color: 'LIGHT_AMBER', alcoholPercentage: 7.2, ibu: 35, averageRating: 4.5, ratingsCount: 2987, description: 'Märzenbier de cuerpo intenso y sabor tostado.', createdAt: '2023-05-12' },
      
      // Cervezas Alemanas
      { id: '6', name: 'Paulaner Hefe-Weissbier', style: 'WEISSBIER', country: 'DE', color: 'GOLDEN_YELLOW', alcoholPercentage: 5.5, ibu: 12, averageRating: 4.7, ratingsCount: 3124, description: 'La cerveza de trigo número 1 en Alemania.', createdAt: '2023-06-18' },
      { id: '7', name: 'Erdinger Weissbier', style: 'WEISSBIER', country: 'DE', color: 'GOLDEN_YELLOW', alcoholPercentage: 5.3, ibu: 13, averageRating: 4.5, ratingsCount: 2876, description: 'Clásica de trigo bávara.', createdAt: '2023-07-22' },
      { id: '8', name: 'Augustiner Helles', style: 'LAGER', country: 'DE', color: 'LIGHT_GOLD', alcoholPercentage: 5.2, ibu: 18, averageRating: 4.8, ratingsCount: 4123, description: 'La lager favorita de Múnich.', createdAt: '2023-08-30' },
      
      // Cervezas Belgas
      { id: '9', name: 'Chimay Azul', style: 'AMBER_ALE', country: 'BE', color: 'DARK_BROWN', alcoholPercentage: 9.0, ibu: 35, averageRating: 4.9, ratingsCount: 5678, description: 'Trapense oscura, compleja y afrutada.', createdAt: '2023-09-14' },
      { id: '10', name: 'Duvel', style: 'AMBER_ALE', country: 'BE', color: 'GOLDEN_YELLOW', alcoholPercentage: 8.5, ibu: 32, averageRating: 4.8, ratingsCount: 4567, description: 'Strong Ale de referencia, burbujeante.', createdAt: '2023-10-08' },
      
      // Cervezas Americanas
      { id: '12', name: 'Sierra Nevada Pale Ale', style: 'APA', country: 'US', color: 'LIGHT_AMBER', alcoholPercentage: 5.6, ibu: 38, averageRating: 4.6, ratingsCount: 4567, description: 'La APA que inició la revolución artesanal.', createdAt: '2023-12-03' },
      { id: '13', name: 'Lagunitas IPA', style: 'IPA', country: 'US', color: 'LIGHT_GOLD', alcoholPercentage: 6.2, ibu: 51, averageRating: 4.5, ratingsCount: 4321, description: 'IPA de California icónica y balanceada.', createdAt: '2024-01-15' },
      
      // Cervezas Checas
      { id: '15', name: 'Pilsner Urquell', style: 'PILSNER', country: 'CZ', color: 'LIGHT_GOLD', alcoholPercentage: 4.4, ibu: 40, averageRating: 4.5, ratingsCount: 12345, description: 'La primera pilsner dorada del mundo (1842).', createdAt: '2024-03-05' },
      
      // Cervezas Irlandesas
      { id: '16', name: 'Guinness Draught', style: 'STOUT', country: 'IE', color: 'OPAQUE_BLACK', alcoholPercentage: 4.2, ibu: 45, averageRating: 4.6, ratingsCount: 8921, description: 'La stout más icónica, cremosa y tostada.', createdAt: '2024-04-10' },
    ];
    
    setAllBeers(mockBeers);
    
    // Locales ficticios
    const mockVenues = [
      { id: '1', name: 'Garage Beer Co.', address: 'Carrer del Consell de Cent, 261', city: 'Barcelona', country: 'ES', likes: 456 },
      { id: '2', name: 'Cervecería Catalana', address: 'Carrer de Mallorca, 236', city: 'Barcelona', country: 'ES', likes: 389 },
      { id: '3', name: 'BierCaB', address: 'Carrer de la Muntaner, 55', city: 'Barcelona', country: 'ES', likes: 421 },
      { id: '4', name: 'La Tape', address: 'Calle de San Bernardo, 88', city: 'Madrid', country: 'ES', likes: 345 },
      { id: '5', name: 'Fábrica Maravillas', address: 'Calle de Valverde, 29', city: 'Madrid', country: 'ES', likes: 398 },
      { id: '6', name: 'Delirium Café', address: 'Impasse de la Fidélité 4A', city: 'Bruselas', country: 'BE', likes: 567 },
      { id: '7', name: 'Hofbräuhaus München', address: 'Platzl 9', city: 'Múnich', country: 'DE', likes: 678 },
      { id: '8', name: 'The Temple Bar', address: '47 Temple Bar', city: 'Dublin', country: 'IE', likes: 512 },
      { id: '9', name: 'Tyris on Tap', address: 'Carrer de la Pau, 27', city: 'Valencia', country: 'ES', likes: 287 },
      { id: '10', name: 'BlackLab Brewhouse', address: 'Carrer de la Diputació, 251', city: 'Barcelona', country: 'ES', likes: 321 }
    ];
    
    setAllVenues(mockVenues);
  } catch (error) {
    console.error('Error loading data:', error);
    // En caso de error, usar datos ficticios mínimos
    const mockBeers = [
      { id: '1', name: 'Alhambra Reserva 1925', style: 'LAGER', country: 'ES', color: 'GOLDEN_YELLOW', alcoholPercentage: 6.4, ibu: 25, averageRating: 4.4, ratingsCount: 5213, description: 'Iconica lager premium de Granada.' },
      { id: '2', name: 'Mahou 5 Estrellas', style: 'LAGER', country: 'ES', color: 'GOLDEN_YELLOW', alcoholPercentage: 5.5, ibu: 27, averageRating: 4.2, ratingsCount: 4567, description: 'El sabor clásico de Madrid.' },
    ];
    
    const mockVenues = [
      { id: '1', name: 'Garage Beer Co.', address: 'Carrer del Consell de Cent, 261', city: 'Barcelona', country: 'ES', likes: 456 },
      { id: '2', name: 'Cervecería Catalana', address: 'Carrer de Mallorca, 236', city: 'Barcelona', country: 'ES', likes: 389 },
    ];
    
    setAllBeers(mockBeers);
    setAllVenues(mockVenues);
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