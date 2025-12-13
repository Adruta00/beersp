import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Rating from '../components/common/Rating';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { BEER_STYLES, BEER_COLORS, COUNTRIES } from '../utils/constants';
import './TopRated.css';

const client = generateClient<Schema>();

const TopRated: React.FC = () => {
  const [beers, setBeers] = useState<any[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [styleFilter, setStyleFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'count' | 'recent'>('rating');
  
  // Filtros avanzados
  const [minIBU, setMinIBU] = useState('');
  const [maxIBU, setMaxIBU] = useState('');
  const [minAlcohol, setMinAlcohol] = useState('');
  const [maxAlcohol, setMaxAlcohol] = useState('');

  useEffect(() => {
    loadTopRatedBeers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    styleFilter, 
    countryFilter, 
    colorFilter, 
    minRating, 
    searchQuery, 
    sortBy,
    minIBU,
    maxIBU,
    minAlcohol,
    maxAlcohol,
    beers
  ]);

  const loadTopRatedBeers = async () => {
    setLoading(true);
    try {
      const response = await client.models.Beer.list();
      const sortedBeers = (response.data || [])
        .filter((beer) => beer.ratingsCount && beer.ratingsCount > 0)
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

    // Filtro de texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(beer =>
        beer.name.toLowerCase().includes(query) ||
        beer.description?.toLowerCase().includes(query)
      );
    }

    // Filtro de estilo
    if (styleFilter) {
      filtered = filtered.filter((beer) => beer.style === styleFilter);
    }

    // Filtro de país
    if (countryFilter) {
      filtered = filtered.filter((beer) => beer.country === countryFilter);
    }

    // Filtro de color
    if (colorFilter) {
      filtered = filtered.filter((beer) => beer.color === colorFilter);
    }

    // Filtro de valoración mínima
    if (minRating > 0) {
      filtered = filtered.filter((beer) => (beer.averageRating || 0) >= minRating);
    }

    // Filtros avanzados de IBU
    if (minIBU) {
      const minIBUNum = parseFloat(minIBU);
      filtered = filtered.filter((beer) => beer.ibu && beer.ibu >= minIBUNum);
    }
    if (maxIBU) {
      const maxIBUNum = parseFloat(maxIBU);
      filtered = filtered.filter((beer) => beer.ibu && beer.ibu <= maxIBUNum);
    }

    // Filtros avanzados de alcohol
    if (minAlcohol) {
      const minAlcoholNum = parseFloat(minAlcohol);
      filtered = filtered.filter((beer) => beer.alcoholPercentage && beer.alcoholPercentage >= minAlcoholNum);
    }
    if (maxAlcohol) {
      const maxAlcoholNum = parseFloat(maxAlcohol);
      filtered = filtered.filter((beer) => beer.alcoholPercentage && beer.alcoholPercentage <= maxAlcoholNum);
    }

    // Ordenar
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'count':
        filtered.sort((a, b) => (b.ratingsCount || 0) - (a.ratingsCount || 0));
        break;
      case 'recent':
        filtered.sort((a, b) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        break;
    }

    setFilteredBeers(filtered);
  };

  const clearFilters = () => {
    setStyleFilter('');
    setCountryFilter('');
    setColorFilter('');
    setMinRating(0);
    setSearchQuery('');
    setSortBy('rating');
    setMinIBU('');
    setMaxIBU('');
    setMinAlcohol('');
    setMaxAlcohol('');
  };

  const hasActiveFilters = 
    styleFilter || 
    countryFilter || 
    colorFilter || 
    minRating > 0 || 
    searchQuery ||
    minIBU ||
    maxIBU ||
    minAlcohol ||
    maxAlcohol;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando cervezas...</p>
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

      {/* Filtros Básicos */}
      <Card className="filters-card">
        <h3 className="filters-title">Filtros</h3>
        
        <div className="filters-search">
          <Input
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon="🔍"
          />
        </div>

        <div className="filters-grid">
          <Select
            label="Estilo"
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los estilos' },
              ...BEER_STYLES,
            ]}
          />

          <Select
            label="País"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los países' },
              ...COUNTRIES,
            ]}
          />

          <Select
            label="Color"
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los colores' },
              ...BEER_COLORS,
            ]}
          />

          <Select
            label="Ordenar por"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            options={[
              { value: 'rating', label: 'Mejor Valoradas' },
              { value: 'count', label: 'Más Valoradas' },
              { value: 'recent', label: 'Más Recientes' },
            ]}
          />
        </div>

        <div className="filters-advanced">
          <h4>Filtros Avanzados</h4>
          <div className="filters-grid">
            <div className="filter-range">
              <label>IBU (Amargor)</label>
              <div className="range-inputs">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minIBU}
                  onChange={(e) => setMinIBU(e.target.value)}
                  min="0"
                  max="120"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxIBU}
                  onChange={(e) => setMaxIBU(e.target.value)}
                  min="0"
                  max="120"
                />
              </div>
            </div>

            <div className="filter-range">
              <label>Alcohol (%)</label>
              <div className="range-inputs">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minAlcohol}
                  onChange={(e) => setMinAlcohol(e.target.value)}
                  min="0"
                  max="20"
                  step="0.1"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxAlcohol}
                  onChange={(e) => setMaxAlcohol(e.target.value)}
                  min="0"
                  max="20"
                  step="0.1"
                />
              </div>
            </div>

            <div className="filter-rating">
              <label>Valoración mínima</label>
              <div className="rating-selector">
                {[0, 1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    className={`rating-button ${minRating === rating ? 'active' : ''}`}
                    onClick={() => setMinRating(rating)}
                  >
                    {rating === 0 ? 'Todas' : `${rating}⭐+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="filter-actions">
            <Button variant="secondary" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        )}
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
            <Button variant="primary" onClick={clearFilters} className="mt-md">
              Ver todas las cervezas
            </Button>
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

      <style>{`
        .filters-title {
          margin: 0 0 var(--spacing-md) 0;
          font-size: 1.25rem;
        }

        .filters-search {
          margin-bottom: var(--spacing-md);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .filters-advanced {
          margin-top: var(--spacing-lg);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--color-surface-dark);
        }

        .filters-advanced h4 {
          margin: 0 0 var(--spacing-md) 0;
          font-size: 1rem;
        }

        .filter-range label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: 500;
        }

        .range-inputs {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .range-inputs span {
          color: var(--color-text-secondary);
        }

        .filter-rating label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: 500;
        }

        .rating-selector {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .rating-button {
          padding: var(--spacing-xs) var(--spacing-sm);
          border: 1px solid var(--color-primary);
          background: transparent;
          color: var(--color-primary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-size: 0.875rem;
        }

        .rating-button:hover {
          background: var(--color-primary-light);
        }

        .rating-button.active {
          background: var(--color-primary);
          color: white;
        }

        .filter-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-surface-dark);
        }

        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }

          .range-inputs {
            flex-direction: column;
            align-items: stretch;
          }

          .range-inputs span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TopRated;