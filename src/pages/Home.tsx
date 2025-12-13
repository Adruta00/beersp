import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { formatTimeAgo } from '../utils/formatter';
import Rating from '../components/common/Rating';
import './Home.css';

const client = generateClient<Schema>();

interface HomeProps {
  userProfile: any;
  onRefresh: () => void;
}

const Home: React.FC<HomeProps> = ({ userProfile, onRefresh }) => {
  const [recentTastings, setRecentTastings] = useState<any[]>([]);
  const [favoriteBeers, setFavoriteBeers] = useState<any[]>([]);
  const [recentBadges, setRecentBadges] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [friendsActivity, setFriendsActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      loadHomeData();
    }
  }, [userProfile]);

  const loadHomeData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadFriendRequests(),
        loadUserBadges(),
        loadFavoriteBeers(),
        loadFriendsActivity(),
      ]);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFriendRequests = async () => {
    try {
      const requests = await client.models.Friendship.list({
        filter: {
          receiverId: { eq: userProfile.userId },
          status: { eq: 'PENDING' }
        }
      });
      setFriendRequests(requests.data || []);
    } catch (error) {
      console.error('Error loading friend requests:', error);
    }
  };

  const loadUserBadges = async () => {
    try {
      const badges = await client.models.UserBadge.list({
        filter: { userId: { eq: userProfile.userId } },
      });
      
      // Ordenar por fecha y tomar los últimos 5
      const sortedBadges = (badges.data || [])
        .sort((a, b) => new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime())
        .slice(0, 5);
      
      // Cargar información de los badges
      const badgesWithInfo = await Promise.all(
        sortedBadges.map(async (userBadge) => {
          const badgeResponse = await client.models.Badge.get({ id: userBadge.badgeId });
          return { ...userBadge, badge: badgeResponse.data };
        })
      );
      
      setRecentBadges(badgesWithInfo);
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const loadFavoriteBeers = async () => {
    try {
      // Cargar degustaciones del usuario con valoración
      const tastings = await client.models.Tasting.list({
        filter: { 
          userId: { eq: userProfile.userId },
          rating: { gt: 0 }
        },
      });

      // Agrupar por cerveza y calcular promedio
      const beerRatings = new Map();
      
      for (const tasting of tastings.data || []) {
        if (!tasting.beerId || !tasting.rating) continue;
        
        if (!beerRatings.has(tasting.beerId)) {
          beerRatings.set(tasting.beerId, {
            beerId: tasting.beerId,
            ratings: [],
            count: 0
          });
        }
        
        const beerData = beerRatings.get(tasting.beerId);
        beerData.ratings.push(tasting.rating);
        beerData.count++;
      }

      // Calcular promedios y cargar info de cervezas
      const favorites = [];
      for (const [beerId, data] of beerRatings.entries()) {
        const avgRating = data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length;
        const beerResponse = await client.models.Beer.get({ id: beerId });
        
        if (beerResponse.data) {
          favorites.push({
            ...beerResponse.data,
            userRating: avgRating,
            tastingsCount: data.count
          });
        }
      }

      // Ordenar por valoración y tomar top 3
      const topFavorites = favorites
        .sort((a, b) => b.userRating - a.userRating)
        .slice(0, 3);

      setFavoriteBeers(topFavorites);
    } catch (error) {
      console.error('Error loading favorite beers:', error);
    }
  };

  const loadFriendsActivity = async () => {
    try {
      // Obtener amigos
      const friendshipsResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: userProfile.userId }, status: { eq: 'ACCEPTED' } },
            { receiverId: { eq: userProfile.userId }, status: { eq: 'ACCEPTED' } }
          ]
        }
      });

      const friendIds = (friendshipsResponse.data || []).map(f => 
        f.requesterId === userProfile.userId ? f.receiverId : f.requesterId
      );

      if (friendIds.length === 0) {
        setFriendsActivity([]);
        return;
      }

      // Obtener degustaciones recientes de amigos
      const allActivities = [];
      
      for (const friendId of friendIds) {
        const tastingsResponse = await client.models.Tasting.list({
          filter: { userId: { eq: friendId } },
        });

        // Obtener perfil del amigo
        const profileResponse = await client.models.UserProfile.list({
          filter: { userId: { eq: friendId } }
        });

        const friendProfile = profileResponse.data?.[0];

        // Procesar degustaciones
        for (const tasting of (tastingsResponse.data || []).slice(0, 2)) {
          // Obtener info de la cerveza
          const beerResponse = await client.models.Beer.get({ id: tasting.beerId });
          
          allActivities.push({
            id: tasting.id,
            type: 'tasting',
            user: friendProfile,
            beer: beerResponse.data,
            rating: tasting.rating,
            createdAt: tasting.createdAt,
          });
        }
      }

      // Ordenar por fecha y tomar los 5 más recientes
      const sortedActivities = allActivities
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      setFriendsActivity(sortedActivities);
    } catch (error) {
      console.error('Error loading friends activity:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Bienvenido, {userProfile?.fullName || userProfile?.username}! 🍺</h1>
        <p className="text-secondary">
          Descubre nuevas cervezas y comparte tus degustaciones con la comunidad
        </p>
      </div>

      <div className="home-grid">
        {/* Profile Summary */}
        <div className="card profile-summary">
          <div className="card-header">
            <h3 className="card-title">Tu Actividad</h3>
            <button className="btn-text" onClick={onRefresh}>Actualizar</button>
          </div>
          <div className="card-content">
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{userProfile?.tastingsCount || 0}</div>
                <div className="stat-label">Degustaciones</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userProfile?.venuesAdded || 0}</div>
                <div className="stat-label">Locales Añadidos</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userProfile?.lastSevenDaysTastings || 0}</div>
                <div className="stat-label">Últimos 7 días</div>
              </div>
            </div>

            {friendRequests.length > 0 && (
              <div className="friend-requests">
                <div className="requests-header">
                  <span className="badge">{friendRequests.length}</span>
                  <span>Solicitudes de amistad pendientes</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Friends Activity */}
        <div className="card friends-activity">
          <div className="card-header">
            <h3 className="card-title">Actividad de Amigos</h3>
          </div>
          <div className="card-content">
            {friendsActivity.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <p>Aún no tienes amigos en BeerSp</p>
              </div>
            ) : (
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
                        <strong>{activity.user?.username}</strong> probó{' '}
                        <strong>{activity.beer?.name}</strong>
                        {activity.rating && (
                          <span> y le dio {activity.rating} ⭐</span>
                        )}
                      </p>
                      <span className="activity-time">
                        {formatTimeAgo(activity.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Favorite Beers */}
        <div className="card favorite-beers">
          <div className="card-header">
            <h3 className="card-title">Tus Cervezas Favoritas</h3>
          </div>
          <div className="card-content">
            {favoriteBeers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🍺</div>
                <p>Aún no has valorado ninguna cerveza</p>
              </div>
            ) : (
              <div className="beers-list">
                {favoriteBeers.map((beer) => (
                  <div key={beer.id} className="beer-item">
                    <div className="beer-image">
                      {beer.photo ? (
                        <img src={beer.photo} alt={beer.name} />
                      ) : (
                        <div className="beer-placeholder">🍺</div>
                      )}
                    </div>
                    <div className="beer-info">
                      <h4>{beer.name}</h4>
                      <p className="text-sm text-secondary">{beer.style} • {beer.country}</p>
                      <div className="beer-rating">
                        <Rating value={beer.userRating} readonly size="small" />
                        <span className="text-sm ml-sm">
                          {beer.userRating.toFixed(1)}/5 ({beer.tastingsCount} veces)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Badges */}
        <div className="card recent-badges">
          <div className="card-header">
            <h3 className="card-title">Galardones Recientes</h3>
          </div>
          <div className="card-content">
            {recentBadges.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏆</div>
                <p>Completa actividades para ganar galardones</p>
              </div>
            ) : (
              <div className="badges-grid">
                {recentBadges.map((userBadge) => (
                  <div key={userBadge.id} className="badge-item">
                    <div className="badge-image">
                      {userBadge.badge?.image ? (
                        <img src={userBadge.badge.image} alt={userBadge.badge.name} />
                      ) : (
                        <div className="badge-placeholder">🏆</div>
                      )}
                    </div>
                    <div className="badge-info">
                      <h5>{userBadge.badge?.name || 'Galardón'}</h5>
                      <span className="badge-level">Nivel {userBadge.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;