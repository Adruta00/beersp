import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Rating from '../components/common/Rating';
import Select from '../components/common/Select';
import { BEER_STYLES, COUNTRIES } from '../utils/constants';
import './TopRated.css';

const client = generateClient<Schema>();

const TopRated: React.FC = () => {
  const [beers, setBeers] = useState<any[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [styleFilter, setStyleFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    loadTopRatedBeers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [styleFilter, countryFilter, beers]);

  const loadTopRatedBeers = async () => {
    setLoading(true);
    try {
      const response = await client.models.Beer.list();
      const sortedBeers = (response.data || [])
        .filter((beer) => beer.ratingsCount > 0)
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      
      setBeers(sortedBeers);
      setFilteredBeers(sortedBeers);
    } catch (error) {
      console.error('Error loading top rated beers:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...beers];

    if (styleFilter) {
      filtered = filtered.filter((beer) => beer.style === styleFilter);
    }

    if (countryFilter) {
      filtered = filtered.filter((beer) => beer.country === countryFilter);
    }

    setFilteredBeers(filtered);
  };

  const clearFilters = () => {
    setStyleFilter('');
    setCountryFilter('');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="top-rated-page">
      <div className="page-header">
        <h1>Cervezas Mejor Valoradas</h1>
        <p className="page-description">
          Descubre las cervezas más apreciadas por la comunidad BeerSp
        </p>
      </div>

      {/* Filtros */}
      <Card className="filters-card">
        <div className="filters-container">
          <Select
            label="Estilo de Cerveza"
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los estilos' },
              ...BEER_STYLES,
            ]}
            placeholder="Selecciona un estilo"
          />

          <Select
            label="País de Origen"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los países' },
              ...COUNTRIES,
            ]}
            placeholder="Selecciona un país"
          />

          {(styleFilter || countryFilter) && (
            <div className="filter-actions">
              <button className="btn-text" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Resultados */}
      <div className="results-info">
        <span className="results-count">
          {filteredBeers.length} {filteredBeers.length === 1 ? 'cerveza encontrada' : 'cervezas encontradas'}
        </span>
      </div>

      {filteredBeers.length === 0 ? (
        <div className="empty-state-container">
          <div className="empty-state">
            <div className="empty-state-icon">🍺</div>
            <h3>No se encontraron cervezas</h3>
            <p>Intenta cambiar los filtros de búsqueda</p>
            <button className="btn-primary mt-md" onClick={clearFilters}>
              Ver todas las cervezas
            </button>
          </div>
        </div>
      ) : (
        <div className="beers-list">
          {filteredBeers.map((beer, index) => (
            <Card key={beer.id} className="beer-card" hoverable>
              <div className="beer-ranking">#{index + 1}</div>
              <div className="beer-content">
                <div className="beer-image">
                  {beer.photo ? (
                    <img src={beer.photo} alt={beer.name} />
                  ) : (
                    <div className="beer-placeholder">🍺</div>
                  )}
                </div>

                <div className="beer-details">
                  <div className="beer-header">
                    <div>
                      <h3 className="beer-name">{beer.name}</h3>
                      <p className="beer-meta">
                        {beer.style} • {beer.country}
                      </p>
                    </div>
                    <div className="beer-rating-container">
                      <div className="rating-score">
                        {beer.averageRating?.toFixed(1) || '0.0'}
                      </div>
                      <Rating
                        value={beer.averageRating || 0}
                        readonly
                        size="small"
                      />
                      <span className="rating-count">
                        ({beer.ratingsCount} {beer.ratingsCount === 1 ? 'valoración' : 'valoraciones'})
                      </span>
                    </div>
                  </div>

                  {beer.description && (
                    <p className="beer-description">{beer.description}</p>
                  )}

                  <div className="beer-specs">
                    {beer.alcoholPercentage && (
                      <span className="spec-badge">
                        🍷 {beer.alcoholPercentage}% ABV
                      </span>
                    )}
                    {beer.ibu && (
                      <span className="spec-badge">
                        💧 {beer.ibu} IBU
                      </span>
                    )}
                    {beer.color && (
                      <span className="spec-badge">
                        🎨 {beer.color}
                      </span>
                    )}
                  </div>

                  <div className="beer-stats">
                    <div className="stat">
                      <span className="stat-icon">📅</span>
                      <span className="stat-text">
                        Añadida: {new Date(beer.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRated;
