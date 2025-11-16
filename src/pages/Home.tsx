import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import './Home.css';

const client = generateClient<Schema>();

interface HomeProps {
  userProfile: any;
}

const Home: React.FC<HomeProps> = ({ userProfile }) => {
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
      // Load recent friend requests
      const requests = await client.models.Friendship.list({
        filter: {
          receiverId: { eq: userProfile.userId },
          status: { eq: 'PENDING' }
        }
      });
      setFriendRequests(requests.data || []);

      // Load user's recent badges
      const badges = await client.models.UserBadge.list({
        filter: { userId: { eq: userProfile.userId } },
        limit: 5
      });
      setRecentBadges(badges.data || []);

      // Load user's tastings for favorites
      const tastings = await client.models.Tasting.list({
        filter: { userId: { eq: userProfile.userId } },
        limit: 3
      });
      setRecentTastings(tastings.data || []);

      // TODO: Load friends activity and favorite beers

    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
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
            <button className="btn-text">Ver todo</button>
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
            <button className="btn-text">Ver todos</button>
          </div>
          <div className="card-content">
            {friendsActivity.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <p>Aún no tienes amigos en BeerSp</p>
                <button className="btn-primary mt-sm">Buscar amigos</button>
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
                        <strong>{activity.user?.username}</strong> {activity.description}
                      </p>
                      <span className="activity-time">{activity.timeAgo}</span>
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
            <button className="btn-text">Ver todas</button>
          </div>
          <div className="card-content">
            {favoriteBeers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🍺</div>
                <p>Aún no has valorado ninguna cerveza</p>
                <button className="btn-primary mt-sm">Añadir degustación</button>
              </div>
            ) : (
              <div className="beers-list">
                {favoriteBeers.slice(0, 3).map((beer) => (
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
                      <p className="text-sm text-secondary">{beer.style}</p>
                      <div className="beer-rating">
                        {'⭐'.repeat(Math.floor(beer.rating || 0))}
                        <span className="text-sm ml-sm">{beer.rating}/5</span>
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
            <button className="btn-text">Ver todos</button>
          </div>
          <div className="card-content">
            {recentBadges.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏆</div>
                <p>Completa actividades para ganar galardones</p>
              </div>
            ) : (
              <div className="badges-grid">
                {recentBadges.slice(0, 5).map((userBadge) => (
                  <div key={userBadge.id} className="badge-item">
                    <div className="badge-image">
                      {userBadge.badge?.image ? (
                        <img src={userBadge.badge.image} alt={userBadge.badge.name} />
                      ) : (
                        <div className="badge-placeholder">🏆</div>
                      )}
                    </div>
                    <div className="badge-info">
                      <h5>{userBadge.badge?.name}</h5>
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