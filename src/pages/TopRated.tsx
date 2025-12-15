import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Rating from '../components/common/Rating';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { BEER_STYLES, BEER_COLORS, COUNTRIES } from '../utils/constants';
import './TopRated.css';



const TopRated: React.FC = () => {
  const [beers, setBeers] = useState<any[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filtros
  const [styleFilter, setStyleFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'count' | 'recent' | 'alcohol' | 'ibu'>('rating');
  
  // Filtros avanzados
  const [minIBU, setMinIBU] = useState('');
  const [maxIBU, setMaxIBU] = useState('');
  const [minAlcohol, setMinAlcohol] = useState('');
  const [maxAlcohol, setMaxAlcohol] = useState('');

  // Cervezas ficticias para mostrar
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
    { id: '11', name: 'Westmalle Tripel', style: 'AMBER_ALE', country: 'BE', color: 'GOLDEN_YELLOW', alcoholPercentage: 9.5, ibu: 36, averageRating: 4.9, ratingsCount: 3987, description: 'La madre de todas las Tripels.', createdAt: '2023-11-25' },
    
    // Cervezas Americanas
    { id: '12', name: 'Sierra Nevada Pale Ale', style: 'APA', country: 'US', color: 'LIGHT_AMBER', alcoholPercentage: 5.6, ibu: 38, averageRating: 4.6, ratingsCount: 4567, description: 'La APA que inició la revolución artesanal.', createdAt: '2023-12-03' },
    { id: '13', name: 'Lagunitas IPA', style: 'IPA', country: 'US', color: 'LIGHT_GOLD', alcoholPercentage: 6.2, ibu: 51, averageRating: 4.5, ratingsCount: 4321, description: 'IPA de California icónica y balanceada.', createdAt: '2024-01-15' },
    { id: '14', name: 'Stone IPA', style: 'IPA', country: 'US', color: 'LIGHT_AMBER', alcoholPercentage: 6.9, ibu: 71, averageRating: 4.7, ratingsCount: 3987, description: 'West Coast IPA clásica y amarga.', createdAt: '2024-02-20' },
    
    // Cervezas Checas
    { id: '15', name: 'Pilsner Urquell', style: 'PILSNER', country: 'CZ', color: 'LIGHT_GOLD', alcoholPercentage: 4.4, ibu: 40, averageRating: 4.5, ratingsCount: 12345, description: 'La primera pilsner dorada del mundo (1842).', createdAt: '2024-03-05' },
    
    // Cervezas Irlandesas
    { id: '16', name: 'Guinness Draught', style: 'STOUT', country: 'IE', color: 'OPAQUE_BLACK', alcoholPercentage: 4.2, ibu: 45, averageRating: 4.6, ratingsCount: 8921, description: 'La stout más icónica, cremosa y tostada.', createdAt: '2024-04-10' },
    
    // Cervezas Británicas
    { id: '17', name: 'Fuller\'s London Pride', style: 'AMBER_ALE', country: 'GB', color: 'LIGHT_AMBER', alcoholPercentage: 4.7, ibu: 30, averageRating: 4.4, ratingsCount: 3456, description: 'La bitter inglesa por excelencia.', createdAt: '2024-05-15' },
    { id: '18', name: 'BrewDog Punk IPA', style: 'IPA', country: 'GB', color: 'LIGHT_GOLD', alcoholPercentage: 5.4, ibu: 35, averageRating: 4.5, ratingsCount: 5678, description: 'IPA moderna escocesa, explosión tropical.', createdAt: '2024-06-20' },
    
    // Cervezas Mexicanas
    { id: '19', name: 'Corona Extra', style: 'LAGER', country: 'MX', color: 'LIGHT_GOLD', alcoholPercentage: 4.5, ibu: 18, averageRating: 4.0, ratingsCount: 23456, description: 'La cerveza mexicana más famosa del mundo.', createdAt: '2024-07-25' },
    
    // Cervezas Japonesas
    { id: '20', name: 'Asahi Super Dry', style: 'LAGER', country: 'JP', color: 'LIGHT_GOLD', alcoholPercentage: 5.0, ibu: 16, averageRating: 4.3, ratingsCount: 8765, description: 'Karakuchi: sabor seco y crujiente.', createdAt: '2024-08-30' },
    
    // Cervezas adicionales para llenar
    { id: '21', name: 'La Virgen IPA', style: 'IPA', country: 'ES', color: 'LIGHT_AMBER', alcoholPercentage: 6.0, ibu: 55, averageRating: 4.4, ratingsCount: 1987, description: 'IPA madrileña aromática y equilibrada.', createdAt: '2024-09-05' },
    { id: '22', name: 'Basqueland Imparable', style: 'IPA', country: 'ES', color: 'GOLDEN_YELLOW', alcoholPercentage: 6.8, ibu: 62, averageRating: 4.7, ratingsCount: 2345, description: 'West Coast IPA vasca muy premiada.', createdAt: '2024-09-10' },
    { id: '23', name: 'Dougall\'s IPA 4', style: 'IPA', country: 'ES', color: 'LIGHT_GOLD', alcoholPercentage: 6.0, ibu: 55, averageRating: 4.5, ratingsCount: 1876, description: 'IPA cántabra de referencia, muy bebible.', createdAt: '2024-09-15' },
    { id: '24', name: 'Arriaca IPA', style: 'IPA', country: 'ES', color: 'LIGHT_AMBER', alcoholPercentage: 6.9, ibu: 60, averageRating: 4.6, ratingsCount: 1654, description: 'IPA artesana de Guadalajara potente y cítrica.', createdAt: '2024-09-20' },
    { id: '25', name: 'Moritz 7', style: 'LAGER', country: 'ES', color: 'LIGHT_GOLD', alcoholPercentage: 5.5, ibu: 25, averageRating: 4.2, ratingsCount: 2987, description: 'Premium lager de Barcelona 100% malta.', createdAt: '2024-09-25' },
    { id: '26', name: 'Ambar Export', style: 'LAGER', country: 'ES', color: 'LIGHT_AMBER', alcoholPercentage: 7.0, ibu: 28, averageRating: 4.3, ratingsCount: 2345, description: 'Cerveza con tres maltas, robusta y sabrosa.', createdAt: '2024-10-01' },
    { id: '27', name: '1906 Black Coupage', style: 'PORTER', country: 'ES', color: 'OPAQUE_BLACK', alcoholPercentage: 7.2, ibu: 35, averageRating: 4.5, ratingsCount: 1876, description: 'Cerveza negra con aromas de café y chocolate.', createdAt: '2024-10-05' },
    { id: '28', name: 'La Virgen Madrid Lager', style: 'LAGER', country: 'ES', color: 'LIGHT_GOLD', alcoholPercentage: 5.2, ibu: 22, averageRating: 4.1, ratingsCount: 1987, description: 'Lager artesana madrileña, fresca y sin filtrar.', createdAt: '2024-10-10' },
    { id: '29', name: 'La Virgen Jamonera', style: 'AMBER_ALE', country: 'ES', color: 'LIGHT_AMBER', alcoholPercentage: 5.5, ibu: 20, averageRating: 4.3, ratingsCount: 1654, description: 'Amber Ale tostada ideal para acompañar embutidos.', createdAt: '2024-10-15' },
    { id: '30', name: 'La Virgen 360', style: 'APA', country: 'ES', color: 'LIGHT_GOLD', alcoholPercentage: 5.0, ibu: 35, averageRating: 4.2, ratingsCount: 1432, description: 'Pale Ale muy aromática y lupulada.', createdAt: '2024-10-20' },
    { id: '31', name: 'Orval', style: 'SAISON', country: 'BE', color: 'LIGHT_AMBER', alcoholPercentage: 6.2, ibu: 32, averageRating: 4.7, ratingsCount: 2987, description: 'Trapense única con levadura Brettanomyces.', createdAt: '2024-10-25' },
    { id: '32', name: 'Rochefort 10', style: 'AMBER_ALE', country: 'BE', color: 'DARK_BROWN', alcoholPercentage: 11.3, ibu: 27, averageRating: 4.9, ratingsCount: 4567, description: 'Quadrupel muy fuerte y compleja.', createdAt: '2024-11-01' },
    { id: '33', name: 'Leffe Blonde', style: 'AMBER_ALE', country: 'BE', color: 'GOLDEN_YELLOW', alcoholPercentage: 6.6, ibu: 20, averageRating: 4.4, ratingsCount: 6789, description: 'De abadía, dulce y especiada.', createdAt: '2024-11-05' },
    { id: '34', name: 'Hoegaarden', style: 'WEISSBIER', country: 'BE', color: 'LIGHT_GOLD', alcoholPercentage: 4.9, ibu: 15, averageRating: 4.3, ratingsCount: 7890, description: 'Witbier original con cilantro y naranja.', createdAt: '2024-11-10' },
    { id: '35', name: 'Delirium Tremens', style: 'AMBER_ALE', country: 'BE', color: 'GOLDEN_YELLOW', alcoholPercentage: 8.5, ibu: 24, averageRating: 4.7, ratingsCount: 4321, description: 'Famosa por el elefante rosa y su fuerza.', createdAt: '2024-11-15' },
    { id: '36', name: 'Budweiser Budvar', style: 'LAGER', country: 'CZ', color: 'LIGHT_GOLD', alcoholPercentage: 5.0, ibu: 22, averageRating: 4.4, ratingsCount: 3456, description: 'La auténtica lager de České Budějovice.', createdAt: '2024-11-20' },
    { id: '37', name: 'Staropramen', style: 'LAGER', country: 'CZ', color: 'LIGHT_GOLD', alcoholPercentage: 5.0, ibu: 27, averageRating: 4.2, ratingsCount: 2987, description: 'La cerveza de Praga.', createdAt: '2024-11-25' },
    { id: '38', name: 'Modelo Especial', style: 'PILSNER', country: 'MX', color: 'LIGHT_GOLD', alcoholPercentage: 4.4, ibu: 18, averageRating: 4.3, ratingsCount: 4567, description: 'Pilsner rica y completa.', createdAt: '2024-12-01' },
    { id: '39', name: 'Negra Modelo', style: 'LAGER', country: 'MX', color: 'DARK_BROWN', alcoholPercentage: 5.3, ibu: 19, averageRating: 4.4, ratingsCount: 3456, description: 'Munich Dunkel estilo vienes.', createdAt: '2024-12-05' },
    { id: '40', name: 'Heineken', style: 'LAGER', country: 'NL', color: 'LIGHT_GOLD', alcoholPercentage: 5.0, ibu: 19, averageRating: 4.1, ratingsCount: 12345, description: 'La botella verde más reconocible del mundo.', createdAt: '2024-12-10' }
  ];

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
      // Usar las cervezas ficticias directamente
      const sortedBeers = mockBeers.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      
      setBeers(sortedBeers);
      setFilteredBeers(sortedBeers);
    } catch (error) {
      console.error('Error loading top rated beers:', error);
      // En caso de error, usar las cervezas ficticias de todos modos
      const sortedBeers = mockBeers.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      setBeers(sortedBeers);
      setFilteredBeers(sortedBeers);
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
      case 'alcohol':
        filtered.sort((a, b) => (b.alcoholPercentage || 0) - (a.alcoholPercentage || 0));
        break;
      case 'ibu':
        filtered.sort((a, b) => (b.ibu || 0) - (a.ibu || 0));
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
        <h1>🍺 Cervezas Mejor Valoradas</h1>
        <p className="page-description">
          Descubre las cervezas más apreciadas por la comunidad BeerSp. {beers.length} cervezas catalogadas.
        </p>
      </div>

      {/* Filtros Básicos */}
      <Card className="filters-card">
        <h3 className="filters-title">🔍 Filtros de Búsqueda</h3>
        
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
            label="🍺 Estilo"
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los estilos' },
              ...BEER_STYLES,
            ]}
          />

          <Select
            label="🌍 País"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los países' },
              ...COUNTRIES,
            ]}
          />

          <Select
            label="🎨 Color"
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            options={[
              { value: '', label: 'Todos los colores' },
              ...BEER_COLORS,
            ]}
          />

          <Select
            label="📊 Ordenar por"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            options={[
              { value: 'rating', label: '⭐ Mejor Valoradas' },
              { value: 'count', label: '👥 Más Valoradas' },
              { value: 'recent', label: '🆕 Más Recientes' },
              { value: 'alcohol', label: '🍷 Más Alcohólicas' },
              { value: 'ibu', label: '💧 Más Amargas' },
            ]}
          />
        </div>

        <div className="filters-advanced">
          <h4>⚙️ Filtros Avanzados</h4>
          <div className="filters-grid">
            <div className="filter-range">
              <label>💧 IBU (Amargor)</label>
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
              <label>🍷 Alcohol (%)</label>
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
              <label>⭐ Valoración mínima</label>
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
              🗑️ Limpiar filtros
            </Button>
            <Button variant="primary" onClick={() => alert('Buscando...')}>
              🔍 Aplicar filtros
            </Button>
          </div>
        )}
      </Card>

      {/* Resultados */}
      <div className="results-info">
        <span className="results-count">
          🍻 {filteredBeers.length} {filteredBeers.length === 1 ? 'cerveza encontrada' : 'cervezas encontradas'}
        </span>
        <span className="results-stats">
          ⭐ Media: {(filteredBeers.reduce((sum, beer) => sum + beer.averageRating, 0) / filteredBeers.length || 0).toFixed(1)}/5
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
              <div 
                className="beer-ranking"
                style={{
                  background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                             index === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                             index === 2 ? 'linear-gradient(135deg, #CD7F32, #A0522D)' :
                             'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                }}
              >
                #{index + 1}
                {index < 3 && (
                  <span className="ranking-medal">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                )}
              </div>
              <div className="beer-content">
                <div className="beer-image">
                  {beer.photo ? (
                    <img src={beer.photo} alt={beer.name} />
                  ) : (
                    <div className="beer-placeholder">
                      {beer.style === 'IPA' ? '🍻' : 
                       beer.style === 'STOUT' ? '☕' : 
                       beer.style === 'WEISSBIER' ? '🌾' : 
                       beer.style === 'LAGER' ? '🍺' : '🍻'}
                    </div>
                  )}
                </div>

                <div className="beer-details">
                  <div className="beer-header">
                    <div>
                      <h3 className="beer-name">{beer.name}</h3>
                      <p className="beer-meta">
                        {BEER_STYLES.find(s => s.value === beer.style)?.label || beer.style} • 
                        {' '}{COUNTRIES.find(c => c.value === beer.country)?.label || beer.country}
                      </p>
                    </div>
                    <div className="beer-rating-container">
                      <div className="rating-score" style={{
                        color: beer.averageRating >= 4.5 ? '#FFD700' :
                               beer.averageRating >= 4.0 ? '#C0C0C0' :
                               beer.averageRating >= 3.5 ? '#CD7F32' : '#3498DB'
                      }}>
                        {beer.averageRating?.toFixed(1) || '0.0'}
                      </div>
                      <Rating
                        value={beer.averageRating || 0}
                        readonly
                        size="small"
                      />
                      <span className="rating-count">
                        ({beer.ratingsCount?.toLocaleString()} {beer.ratingsCount === 1 ? 'valoración' : 'valoraciones'})
                      </span>
                    </div>
                  </div>

                  {beer.description && (
                    <p className="beer-description">{beer.description}</p>
                  )}

                  <div className="beer-specs">
                    {beer.alcoholPercentage && (
                      <span className="spec-badge" style={{ background: beer.alcoholPercentage > 8 ? '#E74C3C20' : '#3498DB20' }}>
                        🍷 {beer.alcoholPercentage}% ABV
                        {beer.alcoholPercentage > 8 && <span className="spec-warning"> ALTA</span>}
                      </span>
                    )}
                    {beer.ibu && (
                      <span className="spec-badge" style={{ background: beer.ibu > 50 ? '#E67E2220' : '#2ECC7120' }}>
                        💧 {beer.ibu} IBU
                        {beer.ibu > 50 && <span className="spec-warning"> AMARGA</span>}
                      </span>
                    )}
                    {beer.color && (
                      <span className="spec-badge">
                        🎨 {BEER_COLORS.find(c => c.value === beer.color)?.label || beer.color}
                      </span>
                    )}
                    <span className="spec-badge">
                      🌍 {COUNTRIES.find(c => c.value === beer.country)?.label || beer.country}
                    </span>
                    <span className="spec-badge">
                      🏆 Top {Math.ceil((index + 1) / beers.length * 100)}%
                    </span>
                  </div>

                  <div className="beer-stats">
                    <div className="stat">
                      <span className="stat-icon">📅</span>
                      <span className="stat-text">
                        Añadida: {new Date(beer.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">👥</span>
                      <span className="stat-text">
                        {Math.floor(beer.ratingsCount / 100)} valoraciones/mes
                      </span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">💬</span>
                      <span className="stat-text">
                        {Math.floor(beer.ratingsCount / 50)} comentarios
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredBeers.length > 0 && (
        <div className="pagination">
          <Button variant="secondary">← Anterior</Button>
          <span className="page-info">Página 1 de {Math.ceil(filteredBeers.length / 10)}</span>
          <Button variant="primary">Siguiente →</Button>
        </div>
      )}

      <style>{`
        .filters-title {
          margin: 0 0 var(--spacing-md) 0;
          font-size: 1.25rem;
          color: var(--color-primary);
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
          color: var(--color-primary);
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
          gap: var(--spacing-sm);
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-surface-dark);
        }

        .results-info {
          margin-bottom: var(--spacing-md);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .results-count {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.875rem;
        }

        .results-stats {
          font-weight: 500;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .beer-ranking {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 50px;
          height: 50px;
          color: white;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 800;
          box-shadow: var(--shadow-lg);
          z-index: 1;
        }

        .ranking-medal {
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 1rem;
        }

        .spec-warning {
          margin-left: 4px;
          font-weight: bold;
          font-size: 0.7em;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
        }

        .page-info {
          font-weight: 500;
          color: var(--color-text-secondary);
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

          .filter-actions {
            flex-direction: column;
          }

          .results-info {
            flex-direction: column;
            gap: var(--spacing-xs);
          }

          .pagination {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default TopRated;