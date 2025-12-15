import React, { useEffect, useState } from 'react';

import { formatTimeAgo } from '../utils/formatter';
import Rating from '../components/common/Rating';
import './Home.css';



interface HomeProps {
  userProfile: any;
  onRefresh: () => void;
}

const Home: React.FC<HomeProps> = ({ userProfile, onRefresh }) => {
  const [favoriteBeers, setFavoriteBeers] = useState<any[]>([]);
  const [recentBadges, setRecentBadges] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [friendsActivity, setFriendsActivity] = useState<any[]>([]);
  const [trendingBeers, setTrendingBeers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Datos ficticios ampliados
  const mockStats = {
    tastingsCount: 156,
    venuesAdded: 24,
    lastSevenDaysTastings: 12,
    countries: 12,
    styles: 28,
    friends: 8,
    streak: 15
  };

  const mockFavoriteBeers = [
    {
      id: '1',
      name: 'Chimay Azul',
      style: 'AMBER_ALE',
      country: 'BE',
      photo: null,
      userRating: 4.9,
      tastingsCount: 3,
      description: 'Trapense oscura, compleja y afrutada'
    },
    {
      id: '2',
      name: 'Alhambra Reserva 1925',
      style: 'LAGER',
      country: 'ES',
      photo: null,
      userRating: 4.8,
      tastingsCount: 5,
      description: 'Lager premium de Granada'
    },
    {
      id: '3',
      name: 'Stone IPA',
      style: 'IPA',
      country: 'US',
      photo: null,
      userRating: 4.7,
      tastingsCount: 4,
      description: 'West Coast IPA clásica'
    },
    {
      id: '4',
      name: 'Paulaner Hefe-Weissbier',
      style: 'WEISSBIER',
      country: 'DE',
      photo: null,
      userRating: 4.6,
      tastingsCount: 3,
      description: 'Weissbier bávara tradicional'
    },
    {
      id: '5',
      name: 'Guinness Draught',
      style: 'STOUT',
      country: 'IE',
      photo: null,
      userRating: 4.5,
      tastingsCount: 7,
      description: 'La stout más icónica'
    },
    {
      id: '6',
      name: 'Sierra Nevada Pale Ale',
      style: 'APA',
      country: 'US',
      photo: null,
      userRating: 4.4,
      tastingsCount: 4,
      description: 'La APA revolucionaria'
    }
  ];

  const mockFriendsActivity = [
    {
      id: '1',
      type: 'tasting',
      user: { username: 'maria_cervecera', fullName: 'María García', photo: null },
      beer: { name: 'Chimay Blue', style: 'STRONG_ALE', country: 'BE' },
      rating: 5,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      venue: 'Delirium Café, Bruselas'
    },
    {
      id: '2',
      type: 'venue',
      user: { username: 'carlos_beer', fullName: 'Carlos Rodríguez', photo: null },
      beer: null,
      venue: 'Garage Beer Co., Barcelona',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'badge',
      user: { username: 'ana_craftbeer', fullName: 'Ana Martínez', photo: null },
      badge: { name: 'Leyenda BeerSp', icon: '🌟' },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      type: 'tasting',
      user: { username: 'javi_beerlover', fullName: 'Javier López', photo: null },
      beer: { name: 'Westmalle Tripel', style: 'TRIPEL', country: 'BE' },
      rating: 5,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      venue: 'Cervecería Trapense, Amberes'
    },
    {
      id: '5',
      type: 'friend',
      user: { username: 'laura_hops', fullName: 'Laura Fernández', photo: null },
      action: 'Se ha hecho amigo de Pablo Stout',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '6',
      type: 'tasting',
      user: { username: 'pablo_stout', fullName: 'Pablo Sánchez', photo: null },
      beer: { name: 'Founders Breakfast Stout', style: 'STOUT', country: 'US' },
      rating: 5,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      venue: 'The Stout House, Chicago'
    },
    {
      id: '7',
      type: 'review',
      user: { username: 'sofia_lager', fullName: 'Sofía Ruiz', photo: null },
      beer: { name: 'Pilsner Urquell', style: 'PILSNER', country: 'CZ' },
      review: 'La pilsner perfecta, equilibrio excepcional',
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '8',
      type: 'tasting',
      user: { username: 'diego_brewmaster', fullName: 'Diego Morales', photo: null },
      beer: { name: 'Russian River Pliny the Elder', style: 'DIPA', country: 'US' },
      rating: 5,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      venue: 'Russian River Brewing, California'
    }
  ];

  const mockBadges = [
    {
      id: '1',
      level: 5,
      achievedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      badge: {
        name: 'Leyenda BeerSp',
        category: 'legend',
        image: null,
        icon: '🌟',
        color: '#FFC107'
      }
    },
    {
      id: '2',
      level: 4,
      achievedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      badge: {
        name: 'Catador Experto',
        category: 'tastings',
        image: null,
        icon: '👨‍🍳',
        color: '#9C27B0'
      }
    },
    {
      id: '3',
      level: 3,
      achievedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      badge: {
        name: 'Viajero Cervecero',
        category: 'countries',
        image: null,
        icon: '🌍',
        color: '#2196F3'
      }
    },
    {
      id: '4',
      level: 2,
      achievedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      badge: {
        name: 'Explorador de Estilos',
        category: 'styles',
        image: null,
        icon: '🎨',
        color: '#4CAF50'
      }
    },
    {
      id: '5',
      level: 1,
      achievedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      badge: {
        name: 'Pionero Cervecero',
        category: 'beginner',
        image: null,
        icon: '🥇',
        color: '#FFD700'
      }
    }
  ];

  const mockTrendingBeers = [
    {
      id: 'trend-1',
      name: 'Basqueland Imparable',
      style: 'IPA',
      country: 'ES',
      averageRating: 4.7,
      ratingsCount: 2345,
      trend: '↑ 15% esta semana',
      description: 'West Coast IPA vasca muy premiada'
    },
    {
      id: 'trend-2',
      name: 'La Virgen IPA',
      style: 'IPA',
      country: 'ES',
      averageRating: 4.4,
      ratingsCount: 1987,
      trend: '↑ 22% esta semana',
      description: 'IPA madrileña aromática y equilibrada'
    },
    {
      id: 'trend-3',
      name: '1906 Red Vintage',
      style: 'AMBER_ALE',
      country: 'ES',
      averageRating: 4.6,
      ratingsCount: 3214,
      trend: '↑ 18% esta semana',
      description: 'La colorada, intensa y equilibrada'
    },
    {
      id: 'trend-4',
      name: 'Garage IPA',
      style: 'IPA',
      country: 'ES',
      averageRating: 4.5,
      ratingsCount: 1876,
      trend: '↑ 25% esta semana',
      description: 'IPA de Garage Beer Co. Barcelona'
    }
  ];

  useEffect(() => {
    if (userProfile) {
      loadHomeData();
    }
  }, [userProfile]);

  const loadHomeData = async () => {
    setLoading(true);
    try {
      // Usar datos ficticios directamente
      setFavoriteBeers(mockFavoriteBeers);
      setRecentBadges(mockBadges);
      setFriendsActivity(mockFriendsActivity);
      setTrendingBeers(mockTrendingBeers);
      setFriendRequests([
        { id: '1', user: { username: 'elena_pilsen', fullName: 'Elena Torres' } },
        { id: '2', user: { username: 'miguel_ale', fullName: 'Miguel Ángel Vega' } }
      ]);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando tu actividad...</p>
      </div>
    );
  }

  const displayStats = {
    tastingsCount: userProfile?.tastingsCount || mockStats.tastingsCount,
    venuesAdded: userProfile?.venuesAdded || mockStats.venuesAdded,
    lastSevenDaysTastings: userProfile?.lastSevenDaysTastings || mockStats.lastSevenDaysTastings,
    countries: userProfile?.countries || mockStats.countries,
    styles: userProfile?.styles || mockStats.styles,
    friends: userProfile?.friends || mockStats.friends,
    streak: userProfile?.streak || mockStats.streak
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>¡Hola, {userProfile?.fullName || userProfile?.username}! 🍻</h1>
        <p className="text-secondary">
          Tu comunidad cervecera te espera. {friendsActivity.length} actividades recientes.
        </p>
      </div>

      <div className="home-grid">
        {/* Profile Summary */}
        <div className="card profile-summary">
          <div className="card-header">
            <h3 className="card-title">📊 Tu Actividad</h3>
            <button className="btn-text" onClick={onRefresh}>🔄 Actualizar</button>
          </div>
          <div className="card-content">
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{displayStats.tastingsCount}</div>
                <div className="stat-label">Degustaciones</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{displayStats.venuesAdded}</div>
                <div className="stat-label">Locales</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{displayStats.lastSevenDaysTastings}</div>
                <div className="stat-label">Últimos 7 días</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{displayStats.streak}</div>
                <div className="stat-label">Días racha 🔥</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{displayStats.countries}</div>
                <div className="stat-label">Países</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{displayStats.styles}</div>
                <div className="stat-label">Estilos</div>
              </div>
            </div>

            {friendRequests.length > 0 && (
              <div className="friend-requests">
                <div className="requests-header">
                  <span className="badge">{friendRequests.length}</span>
                  <span>📨 Solicitudes de amistad pendientes</span>
                </div>
                <div className="requests-list">
                  {friendRequests.map(req => (
                    <div key={req.id} className="request-item">
                      <span>{req.user.fullName}</span>
                      <div className="request-actions">
                        <button className="btn-sm btn-primary">✓</button>
                        <button className="btn-sm btn-secondary">✗</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="progress-section">
              <h4>Tu progreso mensual</h4>
              <div className="progress-item">
                <span>Degustaciones: {displayStats.lastSevenDaysTastings}/20 objetivo</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ 
                    width: `${(displayStats.lastSevenDaysTastings / 20) * 100}%`,
                    background: displayStats.lastSevenDaysTastings >= 20 ? '#4CAF50' : '#2196F3'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Friends Activity */}
        <div className="card friends-activity">
          <div className="card-header">
            <h3 className="card-title">👥 Actividad de Amigos</h3>
            <button className="btn-text">Ver todos</button>
          </div>
          <div className="card-content">
            <div className="activity-list">
              {friendsActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-avatar">
                    {activity.user?.photo ? (
                      <img src={activity.user.photo} alt={activity.user.username} />
                    ) : (
                      <div className="avatar-placeholder">
                        {activity.user?.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="activity-content">
                    <p>
                      <strong>{activity.user?.fullName || activity.user?.username}</strong>
                      {activity.type === 'tasting' && (
                        <> probó <strong>{activity.beer?.name}</strong> {activity.rating && `y le dio ${activity.rating} ⭐`}</>
                      )}
                      {activity.type === 'venue' && (
                        <> añadió el local <strong>{activity.venue}</strong></>
                      )}
                      {activity.type === 'badge' && (
                        <> consiguió el galardón <strong>{activity.badge.name} {activity.badge.icon}</strong></>
                      )}
                      {activity.type === 'friend' && (
                        <>{activity.action}</>
                      )}
                      {activity.type === 'review' && (
                        <> escribió sobre <strong>{activity.beer?.name}</strong>: "{activity.review}"</>
                      )}
                    </p>
                    <span className="activity-time">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Favorite Beers */}
        <div className="card favorite-beers">
          <div className="card-header">
            <h3 className="card-title">⭐ Tus Cervezas Favoritas</h3>
            <button className="btn-text">Ver todas</button>
          </div>
          <div className="card-content">
            <div className="beers-list">
              {favoriteBeers.map((beer) => (
                <div key={beer.id} className="beer-item">
                  <div className="beer-image">
                    {beer.photo ? (
                      <img src={beer.photo} alt={beer.name} />
                    ) : (
                      <div className="beer-placeholder">
                        {beer.style === 'IPA' ? '🍻' : 
                         beer.style === 'STOUT' ? '☕' : 
                         beer.style === 'WEISSBIER' ? '🌾' : '🍺'}
                      </div>
                    )}
                  </div>
                  <div className="beer-info">
                    <h4>{beer.name}</h4>
                    <p className="text-sm text-secondary">{beer.style} • {beer.country}</p>
                    <p className="text-xs text-secondary" style={{ marginTop: '0.25rem' }}>
                      {beer.description}
                    </p>
                    <div className="beer-rating">
                      <Rating value={beer.userRating} readonly size="small" />
                      <span className="text-sm ml-sm">
                        {beer.userRating.toFixed(1)}/5 ({beer.tastingsCount} {beer.tastingsCount === 1 ? 'vez' : 'veces'})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="card recent-badges">
          <div className="card-header">
            <h3 className="card-title">🏆 Galardones Recientes</h3>
            <button className="btn-text">Ver todos</button>
          </div>
          <div className="card-content">
            <div className="badges-grid">
              {recentBadges.map((userBadge) => (
                <div key={userBadge.id} className="badge-item">
                  <div className="badge-image" style={{ background: `${userBadge.badge.color}20`, color: userBadge.badge.color }}>
                    {userBadge.badge.icon}
                  </div>
                  <div className="badge-info">
                    <h5>{userBadge.badge?.name || 'Galardón'}</h5>
                    <span className="badge-level">Nivel {userBadge.level}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="badges-summary">
              <p className="text-sm text-secondary">
                Tienes {recentBadges.length} galardones de 25 posibles
              </p>
            </div>
          </div>
        </div>

        {/* Trending Beers */}
        <div className="card trending-beers">
          <div className="card-header">
            <h3 className="card-title">📈 Cervezas en Tendencia</h3>
            <button className="btn-text">Explorar</button>
          </div>
          <div className="card-content">
            <div className="trending-list">
              {trendingBeers.map((beer) => (
                <div key={beer.id} className="trending-item">
                  <div className="trending-rank">
                    <span className="trend-indicator">{beer.trend}</span>
                  </div>
                  <div className="trending-info">
                    <h5>{beer.name}</h5>
                    <p className="text-sm text-secondary">{beer.style} • {beer.country}</p>
                    <div className="trending-stats">
                      <Rating value={beer.averageRating} readonly size="small" />
                      <span className="text-xs ml-sm">{beer.averageRating.toFixed(1)}</span>
                      <span className="text-xs text-secondary ml-sm">({beer.ratingsCount})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <div className="card-header">
            <h3 className="card-title">⚡ Acciones Rápidas</h3>
          </div>
          <div className="card-content">
            <div className="actions-grid">
              <button className="action-btn">
                <span>➕</span>
                <span>Nueva Degustación</span>
              </button>
              <button className="action-btn">
                <span>🔍</span>
                <span>Buscar Cervezas</span>
              </button>
              <button className="action-btn">
                <span>🏪</span>
                <span>Añadir Local</span>
              </button>
              <button className="action-btn">
                <span>👥</span>
                <span>Encontrar Amigos</span>
              </button>
              <button className="action-btn">
                <span>📊</span>
                <span>Ver Estadísticas</span>
              </button>
              <button className="action-btn">
                <span>🎯</span>
                <span>Retos Diarios</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;