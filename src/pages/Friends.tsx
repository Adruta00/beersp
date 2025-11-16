import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import './Friends.css';

const client = generateClient<Schema>();

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    loadFriends();
    loadFriendRequests();
  }, []);

  const loadFriends = async () => {
    setLoading(true);
    try {
      // Aquí cargarías los amigos del usuario actual
      // Por ahora dejamos un array vacío
      setFriends([]);
    } catch (error) {
      console.error('Error loading friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFriendRequests = async () => {
    try {
      // Cargar solicitudes de amistad pendientes
      setFriendRequests([]);
    } catch (error) {
      console.error('Error loading friend requests:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await client.models.UserProfile.list({
        filter: {
          or: [
            { username: { contains: searchQuery } },
            { email: { contains: searchQuery } },
          ],
        },
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (receiverId: string) => {
    try {
      await client.models.Friendship.create({
        requesterId: 'current-user-id', // Reemplazar con el ID real
        receiverId,
        status: 'PENDING',
      });
      alert('Solicitud enviada');
      setShowSearchModal(false);
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Error al enviar solicitud');
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'ACCEPTED',
      });
      loadFriends();
      loadFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'REJECTED',
      });
      loadFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>Mis Amigos</h1>
        <Button variant="primary" onClick={() => setShowSearchModal(true)}>
          Buscar Amigos
        </Button>
      </div>

      {/* Solicitudes Pendientes */}
      {friendRequests.length > 0 && (
        <Card title={`Solicitudes de Amistad (${friendRequests.length})`} className="mb-lg">
          <div className="friend-requests-list">
            {friendRequests.map((request) => (
              <div key={request.id} className="friend-request-item">
                <div className="user-info">
                  <div className="user-avatar">
                    {request.requester?.photo ? (
                      <img src={request.requester.photo} alt={request.requester.username} />
                    ) : (
                      <div className="avatar-placeholder">
                        {request.requester?.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="user-details">
                    <h4>{request.requester?.fullName || request.requester?.username}</h4>
                    <p className="text-sm text-secondary">@{request.requester?.username}</p>
                  </div>
                </div>
                <div className="request-actions">
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => acceptFriendRequest(request.id)}
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => rejectFriendRequest(request.id)}
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Lista de Amigos */}
      <Card title={`Amigos (${friends.length})`}>
        {friends.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p>Aún no tienes amigos en BeerSp</p>
            <Button variant="primary" onClick={() => setShowSearchModal(true)} className="mt-md">
              Buscar Amigos
            </Button>
          </div>
        ) : (
          <div className="friends-grid">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <div className="friend-avatar">
                  {friend.photo ? (
                    <img src={friend.photo} alt={friend.username} />
                  ) : (
                    <div className="avatar-placeholder">
                      {friend.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="friend-info">
                  <h4>{friend.fullName || friend.username}</h4>
                  <p className="text-sm text-secondary">@{friend.username}</p>
                  {friend.location && (
                    <p className="text-xs text-secondary">📍 {friend.location}</p>
                  )}
                </div>
                <div className="friend-stats">
                  <span className="stat">
                    <strong>{friend.tastingsCount || 0}</strong> degustaciones
                  </span>
                </div>
                <Button variant="secondary" size="small" fullWidth>
                  Ver Perfil
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modal de Búsqueda */}
      <Modal
        isOpen={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        title="Buscar Amigos"
        size="medium"
      >
        <div className="search-modal-content">
          <div className="search-input-container">
            <Input
              placeholder="Buscar por nombre de usuario o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              icon="🔍"
            />
            <Button variant="primary" onClick={handleSearch} loading={loading}>
              Buscar
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="search-results">
              <h4>Resultados ({searchResults.length})</h4>
              <div className="results-list">
                {searchResults.map((user) => (
                  <div key={user.id} className="search-result-item">
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.photo ? (
                          <img src={user.photo} alt={user.username} />
                        ) : (
                          <div className="avatar-placeholder">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="user-details">
                        <h5>{user.fullName || user.username}</h5>
                        <p className="text-sm text-secondary">@{user.username}</p>
                        {user.location && (
                          <p className="text-xs text-secondary">📍 {user.location}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => sendFriendRequest(user.userId)}
                    >
                      Enviar Solicitud
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !loading && (
            <div className="empty-state">
              <p>No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Friends;
