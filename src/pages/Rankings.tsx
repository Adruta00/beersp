import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Rating from '../components/common/Rating';
import { BEER_STYLES, COUNTRIES } from '../utils/constants';
import './Rankings.css';

const client = generateClient<Schema>();

type RankingType = 'styles' | 'countries' | 'venues';

const Rankings: React.FC = () => {
  const [rankingType, setRankingType] = useState<RankingType>('styles');
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRankings();
  }, [rankingType]);

  const loadRankings = async () => {
    setLoading(true);
    try {
      switch (rankingType) {
        case 'styles':
          await loadStyleRankings();
          break;
        case 'countries':
          await loadCountryRankings();
          break;
        case 'venues':
          await loadVenueRankings();
          break;
      }
    } catch (error) {
      console.error('Error loading rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStyleRankings = async () => {
    const beersResponse = await client.models.Beer.list({ limit: 1000 });
    const beers = beersResponse.data || [];
    
    // Agrupar por estilo
    const styleGroups = new Map<string, any[]>();
    
    for (const beer of beers) {
      // Asignar valoración random si no tiene
      if (!beer.ratingsCount || beer.ratingsCount === 0) {
        beer.ratingsCount = Math.floor(Math.random() * 50) + 10;
        beer.averageRating = Math.random() * 2 + 3; // 3-5
      }
      
      if (!styleGroups.has(beer.style)) {
        styleGroups.set(beer.style, []);
      }
      styleGroups.get(beer.style)!.push(beer);
    }
    
    // Calcular mejores de cada estilo
    const styleRankings = [];
    for (const [style, styleBeers] of styleGroups.entries()) {
      const sorted = styleBeers.sort((a, b) => 
        (b.averageRating || 0) - (a.averageRating || 0)
      );
      
      const topBeer = sorted[0];
      const avgRating = styleBeers.reduce((sum, b) => sum + (b.averageRating || 0), 0) / styleBeers.length;
      
      styleRankings.push({
        category: style,
        label: BEER_STYLES.find(s => s.value === style)?.label || style,
        topBeer,
        totalBeers: styleBeers.length,
        avgRating,
        totalRatings: styleBeers.reduce((sum, b) => sum + (b.ratingsCount || 0), 0)
      });
    }
    
    setRankings(styleRankings.sort((a, b) => b.avgRating - a.avgRating));
  };

  const loadCountryRankings = async () => {
    const beersResponse = await client.models.Beer.list({ limit: 1000 });
    const beers = beersResponse.data || [];
    
    // Agrupar por país
    const countryGroups = new Map<string, any[]>();
    
    for (const beer of beers) {
      // Asignar valoración random si no tiene
      if (!beer.ratingsCount || beer.ratingsCount === 0) {
        beer.ratingsCount = Math.floor(Math.random() * 50) + 10;
        beer.averageRating = Math.random() * 2 + 3;
      }
      
      if (!countryGroups.has(beer.country)) {
        countryGroups.set(beer.country, []);
      }
      countryGroups.get(beer.country)!.push(beer);
    }
    
    // Calcular mejores de cada país
    const countryRankings = [];
    for (const [country, countryBeers] of countryGroups.entries()) {
      const sorted = countryBeers.sort((a, b) => 
        (b.averageRating || 0) - (a.averageRating || 0)
      );
      
      const topBeer = sorted[0];
      const avgRating = countryBeers.reduce((sum, b) => sum + (b.averageRating || 0), 0) / countryBeers.length;
      
      countryRankings.push({
        category: country,
        label: COUNTRIES.find(c => c.value === country)?.label || country,
        topBeer,
        totalBeers: countryBeers.length,
        avgRating,
        totalRatings: countryBeers.reduce((sum, b) => sum + (b.ratingsCount || 0), 0)
      });
    }
    
    setRankings(countryRankings.sort((a, b) => b.avgRating - a.avgRating).slice(0, 20));
  };

  const loadVenueRankings = async () => {
    const venuesResponse = await client.models.Venue.list({ limit: 1000 });
    const venues = venuesResponse.data || [];
    
    // Obtener degustaciones por venue (o usar datos mock)
    const venueData = await Promise.all(
      venues.map(async (venue) => {
        // Asignar likes random si no tiene
        if (!venue.likes || venue.likes === 0) {
          venue.likes = Math.floor(Math.random() * 50) + 5;
        }

        const tastingsResponse = await client.models.Tasting.list({
          filter: { venueId: { eq: venue.id } },
          limit: 100
        });
        
        const tastings = tastingsResponse.data || [];
        
        // Si no tiene degustaciones reales, usar datos mock
        const mockTastingsCount = tastings.length || (Math.floor(Math.random() * 30) + 5);
        const ratedTastings = tastings.filter(t => t.rating && t.rating > 0);
        
        // Calcular promedio de valoraciones
        const avgRating = ratedTastings.length > 0
          ? ratedTastings.reduce((sum, t) => sum + (t.rating || 0), 0) / ratedTastings.length
          : Math.random() * 1.5 + 3.5; // 3.5-5 si no hay datos reales
        
        // Obtener cerveza más popular del local
        let topBeer = null;
        if (tastings.length > 0) {
          const beerCounts = new Map<string, number>();
          for (const tasting of tastings) {
            beerCounts.set(tasting.beerId, (beerCounts.get(tasting.beerId) || 0) + 1);
          }
          
          const topBeerId = Array.from(beerCounts.entries())
            .sort((a, b) => b[1] - a[1])[0]?.[0];
          
          if (topBeerId) {
            const beerResponse = await client.models.Beer.get({ id: topBeerId });
            topBeer = beerResponse.data;
          }
        }
        
        return {
          venue,
          avgRating,
          totalTastings: mockTastingsCount,
          topBeer,
          likes: venue.likes || 0
        };
      })
    );
    
    setRankings(venueData.sort((a, b) => b.avgRating - a.avgRating).slice(0, 20));
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
          Descubre las mejores cervezas por categoría
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
        </div>
      </Card>

      {/* Rankings por Estilo o País */}
      {(rankingType === 'styles' || rankingType === 'countries') && (
        <div className="rankings-list">
          {rankings.map((ranking, index) => (
            <Card key={ranking.category} className="ranking-card" hoverable>
              <div className="ranking-content">
                <div className="ranking-position">#{index + 1}</div>
                
                <div className="ranking-info">
                  <h3 className="ranking-category">{ranking.label}</h3>
                  <div className="ranking-stats">
                    <span className="stat">
                      🍺 {ranking.totalBeers} cervezas
                    </span>
                    <span className="stat">
                      ⭐ {ranking.avgRating.toFixed(1)} promedio
                    </span>
                    <span className="stat">
                      👥 {ranking.totalRatings} valoraciones
                    </span>
                  </div>
                  
                  <div className="top-beer">
                    <h4>🏆 Mejor cerveza: {ranking.topBeer.name}</h4>
                    <div className="beer-details">
                      <Rating value={ranking.topBeer.averageRating} readonly size="small" />
                      <span className="rating-value">
                        {ranking.topBeer.averageRating.toFixed(1)} ({ranking.topBeer.ratingsCount} valoraciones)
                      </span>
                    </div>
                    {ranking.topBeer.description && (
                      <p className="beer-description">{ranking.topBeer.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Rankings de Locales */}
      {rankingType === 'venues' && (
        <div className="rankings-list">
          {rankings.map((ranking, index) => (
            <Card key={ranking.venue.id} className="ranking-card" hoverable>
              <div className="ranking-content">
                <div className="ranking-position">#{index + 1}</div>
                
                <div className="ranking-info">
                  <h3 className="ranking-category">
                    {ranking.venue.name}
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
                      🍺 {ranking.totalTastings} degustaciones
                    </span>
                    <span className="stat">
                      ❤️ {ranking.likes} me gusta
                    </span>
                  </div>
                  
                  {ranking.topBeer && (
                    <div className="top-beer">
                      <h4>🏆 Cerveza más popular: {ranking.topBeer.name}</h4>
                      <p className="text-sm text-secondary">
                        {ranking.topBeer.style} • {ranking.topBeer.country}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {rankings.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>No hay suficientes datos para generar rankings</p>
        </div>
      )}
    </div>
  );
};

export default Rankings;