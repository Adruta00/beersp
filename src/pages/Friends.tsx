import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import './Friends.css';

const client = generateClient<Schema>();

interface FriendsProps {
  userId?: string;
  onUpdate?: () => void;
}

const Friends: React.FC<FriendsProps> = ({ onUpdate }) => {
  const { user } = useAuthenticator();
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    await Promise.all([
      loadFriends(),
      loadFriendRequests()
    ]);
  };

  const loadFriends = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const friendshipsResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: user.userId }, status: { eq: 'ACCEPTED' } },
            { receiverId: { eq: user.userId }, status: { eq: 'ACCEPTED' } }
          ]
        }
      });

      const friendProfiles: any[] = [];
      for (const friendship of friendshipsResponse.data || []) {
        const friendId = friendship.requesterId === user.userId
          ? friendship.receiverId
          : friendship.requesterId;

        const profileResponse = await client.models.UserProfile.list({
          filter: { userId: { eq: friendId } }
        });

        if (profileResponse.data && profileResponse.data.length > 0) {
          friendProfiles.push(profileResponse.data[0]);
        }
      }

      setFriends(friendProfiles);
    } catch (error) {
      console.error('Error loading friends:', error);
      setErrorMessage('Error al cargar amigos');
    } finally {
      setLoading(false);
    }
  };

  const loadFriendRequests = async () => {
    if (!user) return;

    try {
      const requestsResponse = await client.models.Friendship.list({
        filter: {
          receiverId: { eq: user.userId },
          status: { eq: 'PENDING' }
        }
      });

      const requestsWithProfiles = [];
      for (const request of requestsResponse.data || []) {
        const profileResponse = await client.models.UserProfile.list({
          filter: { userId: { eq: request.requesterId } }
        });

        if (profileResponse.data && profileResponse.data.length > 0) {
          requestsWithProfiles.push({
            ...request,
            requester: profileResponse.data[0]
          });
        }
      }

      setFriendRequests(requestsWithProfiles);
    } catch (error) {
      console.error('Error loading friend requests:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await client.models.UserProfile.list({
        filter: {
          or: [
            { username: { contains: searchQuery } },
            { email: { contains: searchQuery } },
            { fullName: { contains: searchQuery } }
          ],
        },
      });

      const filteredResults = (response.data || []).filter(
        profile => profile.userId !== user?.userId
      );

      setSearchResults(filteredResults);
      
      if (filteredResults.length === 0) {
        setErrorMessage('No se encontraron usuarios');
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setErrorMessage('Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (receiverId: string) => {
    if (!user) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const existingResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: user.userId }, receiverId: { eq: receiverId } },
            { requesterId: { eq: receiverId }, receiverId: { eq: user.userId } }
          ]
        }
      });

      if (existingResponse.data && existingResponse.data.length > 0) {
        setErrorMessage('Ya existe una solicitud de amistad con este usuario');
        return;
      }

      await client.models.Friendship.create({
        requesterId: user.userId,
        receiverId: receiverId,
        status: 'PENDING',
      });

      setSuccessMessage('Solicitud enviada correctamente');
      
      setTimeout(() => {
        setShowSearchModal(false);
        setSearchQuery('');
        setSearchResults([]);
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error sending friend request:', error);
      setErrorMessage('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'ACCEPTED',
      });

      setSuccessMessage('¡Solicitud aceptada! Ahora sois amigos 🎉');
      
      // CORREGIDO: Recargar ambas listas
      await loadFriends();
      await loadFriendRequests();
      
      // NUEVO: Notificar al componente padre para actualizar estadísticas
      if (onUpdate) {
        onUpdate();
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      setErrorMessage('Error al aceptar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'REJECTED',
      });

      setSuccessMessage('Solicitud rechazada');
      await loadFriendRequests();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      setErrorMessage('Error al rechazar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="friends-page">
      <button className="back-button" onClick={() => window.history.back()}>
        ← Volver
      </button>

      <div className="friends-header">
        <h1>Mis Amigos</h1>
        <Button variant="primary" onClick={() => setShowSearchModal(true)}>
          🔍 Buscar Amigos
        </Button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

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
                    {request.requester?.location && (
                      <p className="text-xs text-secondary">📍 {request.requester.location}</p>
                    )}
                  </div>
                </div>
                <div className="request-actions">
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => acceptFriendRequest(request.id)}
                    loading={loading}
                  >
                    ✓ Aceptar
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => rejectFriendRequest(request.id)}
                    loading={loading}
                  >
                    ✗ Rechazar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

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
                    🍺 <strong>{friend.tastingsCount || 0}</strong> degustaciones
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
          setSearchQuery('');
          setSearchResults([]);
          setErrorMessage('');
          setSuccessMessage('');
        }}
        title="Buscar Amigos"
        size="medium"
      >
        <div className="search-modal-content">
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <div className="search-input-container">
            <Input
              placeholder="Buscar por nombre de usuario, email o nombre..."
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
                {searchResults.map((userProfile) => (
                  <div key={userProfile.id} className="search-result-item">
                    <div className="user-info">
                      <div className="user-avatar">
                        {userProfile.photo ? (
                          <img src={userProfile.photo} alt={userProfile.username} />
                        ) : (
                          <div className="avatar-placeholder">
                            {userProfile.username?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="user-details">
                        <h5>{userProfile.fullName || userProfile.username}</h5>
                        <p className="text-sm text-secondary">@{userProfile.username}</p>
                        {userProfile.location && (
                          <p className="text-xs text-secondary">📍 {userProfile.location}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => sendFriendRequest(userProfile.userId)}
                      loading={loading}
                    >
                      Enviar Solicitud
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Friends;