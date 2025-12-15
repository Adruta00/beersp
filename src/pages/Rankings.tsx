import React, { useState, useEffect } from 'react';

import Card from '../components/common/Card';
import Rating from '../components/common/Rating';

import './Rankings.css';



type RankingType = 'styles' | 'countries' | 'venues' | 'breweries' | 'strength' | 'popularity';

const Rankings: React.FC = () => {
  const [rankingType, setRankingType] = useState<RankingType>('styles');
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Rankings ficticios de ejemplo
  const mockStyleRankings = [
    {
      category: 'IPA',
      label: 'India Pale Ale',
      topBeer: {
        name: 'Stone IPA',
        averageRating: 4.8,
        ratingsCount: 3421,
        description: 'IPA americana clásica con alto contenido de lúpulo'
      },
      totalBeers: 156,
      avgRating: 4.2,
      totalRatings: 45678
    },
    {
      category: 'STOUT',
      label: 'Stout',
      topBeer: {
        name: 'Guinness Draught',
        averageRating: 4.6,
        ratingsCount: 8921,
        description: 'La stout más icónica del mundo'
      },
      totalBeers: 89,
      avgRating: 4.1,
      totalRatings: 34567
    },
    {
      category: 'LAGER',
      label: 'Lager',
      topBeer: {
        name: 'Alhambra Reserva 1925',
        averageRating: 4.4,
        ratingsCount: 5213,
        description: 'Lager premium española'
      },
      totalBeers: 245,
      avgRating: 3.9,
      totalRatings: 78901
    },
    {
      category: 'WEISSBIER',
      label: 'Cerveza de Trigo',
      topBeer: {
        name: 'Paulaner Hefe-Weissbier',
        averageRating: 4.7,
        ratingsCount: 3124,
        description: 'Weissbier bávara tradicional'
      },
      totalBeers: 78,
      avgRating: 4.3,
      totalRatings: 23456
    },
    {
      category: 'PORTER',
      label: 'Porter',
      topBeer: {
        name: 'Founders Porter',
        averageRating: 4.5,
        ratingsCount: 1892,
        description: 'Porter robusta y compleja'
      },
      totalBeers: 67,
      avgRating: 4.0,
      totalRatings: 12345
    },
    {
      category: 'APA',
      label: 'American Pale Ale',
      topBeer: {
        name: 'Sierra Nevada Pale Ale',
        averageRating: 4.6,
        ratingsCount: 4567,
        description: 'La APA que inició la revolución artesanal'
      },
      totalBeers: 134,
      avgRating: 4.2,
      totalRatings: 34567
    },
    {
      category: 'PILSNER',
      label: 'Pilsner',
      topBeer: {
        name: 'Pilsner Urquell',
        averageRating: 4.3,
        ratingsCount: 3789,
        description: 'La primera pilsner del mundo'
      },
      totalBeers: 98,
      avgRating: 3.8,
      totalRatings: 23456
    },
    {
      category: 'SAISON',
      label: 'Saison',
      topBeer: {
        name: 'Saison Dupont',
        averageRating: 4.7,
        ratingsCount: 1567,
        description: 'Saison belga de referencia'
      },
      totalBeers: 45,
      avgRating: 4.4,
      totalRatings: 9876
    },
    {
      category: 'GOSE',
      label: 'Gose',
      topBeer: {
        name: 'Ritterguts Gose',
        averageRating: 4.2,
        ratingsCount: 876,
        description: 'Gose alemana tradicional'
      },
      totalBeers: 32,
      avgRating: 3.9,
      totalRatings: 5432
    },
    {
      category: 'SOUR',
      label: 'Cerveza Ácida',
      topBeer: {
        name: 'Cantillon Gueuze',
        averageRating: 4.9,
        ratingsCount: 2345,
        description: 'Gueuze lambic artesanal belga'
      },
      totalBeers: 41,
      avgRating: 4.5,
      totalRatings: 12345
    }
  ];

  const mockCountryRankings = [
    {
      category: 'BE',
      label: 'Bélgica',
      topBeer: {
        name: 'Westvleteren 12',
        averageRating: 4.9,
        ratingsCount: 5678,
        description: 'La cerveza trapense más codiciada'
      },
      totalBeers: 89,
      avgRating: 4.6,
      totalRatings: 45678
    },
    {
      category: 'DE',
      label: 'Alemania',
      topBeer: {
        name: 'Weihenstephaner Hefe',
        averageRating: 4.7,
        ratingsCount: 7890,
        description: 'De la cervecería más antigua del mundo'
      },
      totalBeers: 156,
      avgRating: 4.3,
      totalRatings: 67890
    },
    {
      category: 'US',
      label: 'Estados Unidos',
      topBeer: {
        name: 'Pliny the Elder',
        averageRating: 4.8,
        ratingsCount: 4567,
        description: 'Double IPA legendaria'
      },
      totalBeers: 345,
      avgRating: 4.4,
      totalRatings: 89012
    },
    {
      category: 'CZ',
      label: 'República Checa',
      topBeer: {
        name: 'Pilsner Urquell',
        averageRating: 4.5,
        ratingsCount: 12345,
        description: 'La pilsner original'
      },
      totalBeers: 78,
      avgRating: 4.1,
      totalRatings: 45678
    },
    {
      category: 'GB',
      label: 'Reino Unido',
      topBeer: {
        name: 'Fuller\'s London Porter',
        averageRating: 4.4,
        ratingsCount: 3456,
        description: 'Porter londinense clásica'
      },
      totalBeers: 112,
      avgRating: 4.0,
      totalRatings: 34567
    },
    {
      category: 'ES',
      label: 'España',
      topBeer: {
        name: 'Alhambra Reserva 1925',
        averageRating: 4.4,
        ratingsCount: 6789,
        description: 'Lager granadina premium'
      },
      totalBeers: 234,
      avgRating: 3.9,
      totalRatings: 56789
    },
    {
      category: 'IE',
      label: 'Irlanda',
      topBeer: {
        name: 'Guinness Draught',
        averageRating: 4.6,
        ratingsCount: 23456,
        description: 'La stout más famosa'
      },
      totalBeers: 45,
      avgRating: 4.2,
      totalRatings: 78901
    },
    {
      category: 'BE',
      label: 'Bélgica',
      topBeer: {
        name: 'Rochefort 10',
        averageRating: 4.8,
        ratingsCount: 4567,
        description: 'Quadrupel trapense extraordinaria'
      },
      totalBeers: 67,
      avgRating: 4.5,
      totalRatings: 34567
    },
    {
      category: 'DK',
      label: 'Dinamarca',
      topBeer: {
        name: 'Mikkeller Beer Geek Brunch',
        averageRating: 4.7,
        ratingsCount: 2345,
        description: 'Imperial Stout con café'
      },
      totalBeers: 89,
      avgRating: 4.3,
      totalRatings: 12345
    },
    {
      category: 'NO',
      label: 'Noruega',
      topBeer: {
        name: 'Nøgne Ø Imperial Stout',
        averageRating: 4.6,
        ratingsCount: 1567,
        description: 'Imperial Stout noruega de alta graduación'
      },
      totalBeers: 56,
      avgRating: 4.2,
      totalRatings: 8765
    }
  ];

  const mockVenueRankings = [
    {
      venue: {
        id: '1',
        name: 'Garage Beer Co.',
        address: 'Carrer del Consell de Cent, 261',
        city: 'Barcelona',
        likes: 456
      },
      avgRating: 4.8,
      totalTastings: 1234,
      topBeer: {
        name: 'Garage IPA',
        style: 'IPA',
        country: 'ES'
      },
      likes: 456
    },
    {
      venue: {
        id: '2',
        name: 'Cervecería Catalana',
        address: 'Carrer de Mallorca, 236',
        city: 'Barcelona',
        likes: 389
      },
      avgRating: 4.7,
      totalTastings: 987,
      topBeer: {
        name: 'Estrella Damm',
        style: 'LAGER',
        country: 'ES'
      },
      likes: 389
    },
    {
      venue: {
        id: '3',
        name: 'BierCaB',
        address: 'Carrer de la Muntaner, 55',
        city: 'Barcelona',
        likes: 421
      },
      avgRating: 4.6,
      totalTastings: 876,
      topBeer: {
        name: 'BrewDog Punk IPA',
        style: 'IPA',
        country: 'GB'
      },
      likes: 421
    },
    {
      venue: {
        id: '4',
        name: 'La Tape',
        address: 'Calle de San Bernardo, 88',
        city: 'Madrid',
        likes: 345
      },
      avgRating: 4.5,
      totalTastings: 765,
      topBeer: {
        name: 'Mahou 5 Estrellas',
        style: 'LAGER',
        country: 'ES'
      },
      likes: 345
    },
    {
      venue: {
        id: '5',
        name: 'Fábrica Maravillas',
        address: 'Calle de Valverde, 29',
        city: 'Madrid',
        likes: 398
      },
      avgRating: 4.7,
      totalTastings: 654,
      topBeer: {
        name: 'Fábrica IPA',
        style: 'IPA',
        country: 'ES'
      },
      likes: 398
    },
    {
      venue: {
        id: '6',
        name: 'Delirium Café',
        address: 'Impasse de la Fidélité 4A',
        city: 'Bruselas',
        likes: 567
      },
      avgRating: 4.9,
      totalTastings: 2109,
      topBeer: {
        name: 'Delirium Tremens',
        style: 'STRONG_ALE',
        country: 'BE'
      },
      likes: 567
    },
    {
      venue: {
        id: '7',
        name: 'Hofbräuhaus München',
        address: 'Platzl 9',
        city: 'Múnich',
        likes: 678
      },
      avgRating: 4.4,
      totalTastings: 4321,
      topBeer: {
        name: 'Hofbräu Original',
        style: 'LAGER',
        country: 'DE'
      },
      likes: 678
    },
    {
      venue: {
        id: '8',
        name: 'The Temple Bar',
        address: '47 Temple Bar',
        city: 'Dublin',
        likes: 512
      },
      avgRating: 4.3,
      totalTastings: 3456,
      topBeer: {
        name: 'Guinness Draught',
        style: 'STOUT',
        country: 'IE'
      },
      likes: 512
    },
    {
      venue: {
        id: '9',
        name: 'Tyris on Tap',
        address: 'Carrer de la Pau, 27',
        city: 'Valencia',
        likes: 287
      },
      avgRating: 4.6,
      totalTastings: 543,
      topBeer: {
        name: 'Tyris IPA',
        style: 'IPA',
        country: 'ES'
      },
      likes: 287
    },
    {
      venue: {
        id: '10',
        name: 'BlackLab Brewhouse',
        address: 'Carrer de la Diputació, 251',
        city: 'Barcelona',
        likes: 321
      },
      avgRating: 4.5,
      totalTastings: 432,
      topBeer: {
        name: 'BlackLab Porter',
        style: 'PORTER',
        country: 'ES'
      },
      likes: 321
    }
  ];

  useEffect(() => {
    loadRankings();
  }, [rankingType]);

  const loadRankings = async () => {
    setLoading(true);
    try {
      // Usar datos ficticios directamente para que se vea lleno
      switch (rankingType) {
        case 'styles':
          setRankings(mockStyleRankings);
          break;
        case 'countries':
          setRankings(mockCountryRankings);
          break;
        case 'venues':
          setRankings(mockVenueRankings);
          break;
        case 'breweries':
          setRankings(mockVenueRankings.slice(0, 8));
          break;
        case 'strength':
          setRankings(mockStyleRankings.map(r => ({
            ...r,
            avgRating: 4.5 + Math.random() * 0.3,
            topBeer: { ...r.topBeer, alcoholPercentage: 8 + Math.random() * 5 }
          })));
          break;
        case 'popularity':
          setRankings(mockStyleRankings.map(r => ({
            ...r,
            totalRatings: r.totalRatings * 2,
            avgRating: 4.0 + Math.random() * 0.5
          })));
          break;
      }
    } catch (error) {
      console.error('Error loading rankings:', error);
    } finally {
      setTimeout(() => setLoading(false), 300); // Simular carga
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Calculando rankings...</p>
      </div>
    );
  }

  return (
    <div className="rankings-page">
      <div className="page-header">
        <h1>🏆 Rankings BeerSp</h1>
        <p className="page-description">
          Descubre las mejores cervezas, países y locales según la comunidad
        </p>
      </div>

      <Card className="ranking-selector">
        <div className="ranking-tabs">
          <button
            className={`ranking-tab ${rankingType === 'styles' ? 'active' : ''}`}
            onClick={() => setRankingType('styles')}
          >
            🎨 Por Estilo
          </button>
          <button
            className={`ranking-tab ${rankingType === 'countries' ? 'active' : ''}`}
            onClick={() => setRankingType('countries')}
          >
            🌍 Por País
          </button>
          <button
            className={`ranking-tab ${rankingType === 'venues' ? 'active' : ''}`}
            onClick={() => setRankingType('venues')}
          >
            🏪 Mejores Locales
          </button>
          <button
            className={`ranking-tab ${rankingType === 'breweries' ? 'active' : ''}`}
            onClick={() => setRankingType('breweries')}
          >
            🏭 Cervecerías
          </button>
          <button
            className={`ranking-tab ${rankingType === 'strength' ? 'active' : ''}`}
            onClick={() => setRankingType('strength')}
          >
            💪 Más Fuertes
          </button>
          <button
            className={`ranking-tab ${rankingType === 'popularity' ? 'active' : ''}`}
            onClick={() => setRankingType('popularity')}
          >
            🔥 Más Populares
          </button>
        </div>
      </Card>

      {/* Rankings por Estilo o País */}
      {(rankingType === 'styles' || rankingType === 'countries' || rankingType === 'strength' || rankingType === 'popularity') && (
  <div className="rankings-list">
    {rankings.map((ranking, index) => (
      <Card key={`${ranking.category}-${index}`} className="ranking-card" hoverable>
        <div className="ranking-content">
          <div className="ranking-position" style={{
            background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                       index === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                       index === 2 ? 'linear-gradient(135deg, #CD7F32, #A0522D)' :
                       'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
          }}>
            #{index + 1}
          </div>
          
          <div className="ranking-info">
            <h3 className="ranking-category">
              {ranking.label}
              {index < 3 && (
                <span className="ranking-badge" style={{
                  background: index === 0 ? '#FFD700' :
                             index === 1 ? '#C0C0C0' :
                             '#CD7F32',
                  color: index === 0 ? '#000' : '#fff'
                }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
              )}
            </h3>
            
            <p className="ranking-subtitle">
              {ranking.totalBeers} cervezas catalogadas
            </p>
            
            <div className="ranking-stats">
              <span className="stat">
                ⭐ {ranking.avgRating.toFixed(1)} promedio
              </span>
              <span className="stat">
                🍺 {ranking.totalBeers} cervezas
              </span>
              <span className="stat">
                👥 {ranking.totalRatings?.toLocaleString()} valoraciones
              </span>
              {rankingType === 'strength' && ranking.topBeer.alcoholPercentage && (
                <span className="stat">
                  🍷 {ranking.topBeer.alcoholPercentage.toFixed(1)}% alcohol
                </span>
              )}
            </div>
            
            <div className="top-beer">
              <h4>🏆 Mejor cerveza: {ranking.topBeer?.name}</h4>
              <div className="beer-details">
                <Rating value={ranking.topBeer?.averageRating || 0} readonly size="small" />
                <span className="rating-value">
                  {ranking.topBeer?.averageRating?.toFixed(1) || '0.0'} ({ranking.topBeer?.ratingsCount?.toLocaleString() || 0} valoraciones)
                </span>
              </div>
              {ranking.topBeer?.description && (
                <p className="beer-description">{ranking.topBeer.description}</p>
              )}
              {ranking.topBeer?.style && ranking.topBeer?.country && (
                <div className="beer-meta">
                  <span className="beer-style">{ranking.topBeer.style}</span>
                  <span className="beer-country">
                    {ranking.topBeer.country === 'US' ? '🇺🇸' : 
                     ranking.topBeer.country === 'ES' ? '🇪🇸' :
                     ranking.topBeer.country === 'DE' ? '🇩🇪' :
                     ranking.topBeer.country === 'BE' ? '🇧🇪' :
                     ranking.topBeer.country === 'GB' ? '🇬🇧' :
                     ranking.topBeer.country === 'IE' ? '🇮🇪' :
                     ranking.topBeer.country === 'CZ' ? '🇨🇿' :
                     ranking.topBeer.country === 'MX' ? '🇲🇽' :
                     ranking.topBeer.country === 'JP' ? '🇯🇵' : '🌍'} {ranking.topBeer.country}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
)}

{(rankingType === 'venues' || rankingType === 'breweries') && (
  <div className="rankings-list">
    {rankings.map((ranking, index) => (
      <Card key={`${ranking.venue?.id || ranking.category}-${index}`} className="ranking-card" hoverable>
        <div className="ranking-content">
          <div className="ranking-position" style={{
            background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                       index === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                       index === 2 ? 'linear-gradient(135deg, #CD7F32, #A0522D)' :
                       'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
          }}>
            #{index + 1}
          </div>
          
          <div className="ranking-info">
            <h3 className="ranking-category">
              {ranking.venue?.name || ranking.label}
              {index < 3 && (
                <span className="ranking-badge" style={{
                  background: index === 0 ? '#FFD700' :
                             index === 1 ? '#C0C0C0' :
                             '#CD7F32',
                  color: index === 0 ? '#000' : '#fff'
                }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
              )}
            </h3>
            
            {ranking.venue?.address && (
              <p className="venue-address">
                📍 {ranking.venue.address}
                {ranking.venue.city && `, ${ranking.venue.city}`}
              </p>
            )}
            
            <div className="ranking-stats">
              <span className="stat">
                ⭐ {ranking.avgRating?.toFixed(1) || '0.0'} promedio
              </span>
              <span className="stat">
                🍺 {ranking.totalTastings?.toLocaleString() || ranking.totalBeers?.toLocaleString() || 0} degustaciones
              </span>
              <span className="stat">
                ❤️ {ranking.likes?.toLocaleString() || 0} me gusta
              </span>
            </div>
            
            {ranking.topBeer?.name && (
              <div className="top-beer">
                <h4>🏆 Cerveza más popular: {ranking.topBeer.name}</h4>
                <p className="text-sm text-secondary">
                  {ranking.topBeer.style} • {ranking.topBeer.country}
                </p>
                <div className="venue-extra-info">
                  <span className="info-item">🍽️ Menú disponible</span>
                  <span className="info-item">🎵 Música en vivo</span>
                  <span className="info-item">🅿️ Parking cercano</span>
                  <span className="info-item">🐶 Pet-friendly</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    ))}
  </div>
)}

      {/* Rankings de Locales y Cervecerías */}
      {(rankingType === 'venues' || rankingType === 'breweries') && (
        <div className="rankings-list">
          {rankings.map((ranking, index) => (
            <Card key={`${ranking.venue.id}-${index}`} className="ranking-card" hoverable>
              <div className="ranking-content">
                <div className="ranking-position" style={{
                  background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                             index === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                             index === 2 ? 'linear-gradient(135deg, #CD7F32, #A0522D)' :
                             'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                }}>
                  #{index + 1}
                </div>
                
                <div className="ranking-info">
                  <h3 className="ranking-category">
                    {ranking.venue.name}
                    {index < 3 && (
                      <span className="ranking-badge" style={{
                        background: index === 0 ? '#FFD700' :
                                   index === 1 ? '#C0C0C0' :
                                   '#CD7F32',
                        color: index === 0 ? '#000' : '#fff'
                      }}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    )}
                  </h3>
                  <p className="venue-address">
                    📍 {ranking.venue.address}
                    {ranking.venue.city && `, ${ranking.venue.city}`}
                  </p>
                  
                  <div className="ranking-stats">
                    <span className="stat">
                      ⭐ {ranking.avgRating.toFixed(1)} valoración promedio
                    </span>
                    <span className="stat">
                      🍺 {ranking.totalTastings?.toLocaleString() || 0} degustaciones
                    </span>
                    <span className="stat">
                      ❤️ {ranking.likes?.toLocaleString() || 0} me gusta
                    </span>
                    <span className="stat">
                      👥 {Math.floor(ranking.totalTastings / 10)} visitantes/mes
                    </span>
                  </div>
                  
                  {ranking.topBeer && (
                    <div className="top-beer">
                      <h4>🏆 Cerveza más popular: {ranking.topBeer.name}</h4>
                      <p className="text-sm text-secondary">
                        {ranking.topBeer.style} • {ranking.topBeer.country}
                      </p>
                      <div className="venue-extra-info">
                        <span className="info-item">🍽️ Menú disponible</span>
                        <span className="info-item">🎵 Música en vivo</span>
                        <span className="info-item">🅿️ Parking cercano</span>
                        <span className="info-item">🐶 Pet-friendly</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {rankings.length === 0 && (
        <div className="empty-state-container">
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <h3>No hay suficientes datos para generar rankings</h3>
            <p>¡Sé el primero en valorar cervezas y locales!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rankings;