import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { createSampleUsersOnly } from '../utils/seedData';
import './Friends.css';

const client = generateClient<Schema>();

interface FriendsProps {
  userId?: string;
}

const Friends: React.FC<FriendsProps> = ({ userId }) => {
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [creatingUsers, setCreatingUsers] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    if (userId) {
      loadFriends();
      loadFriendRequests();
      loadSuggestedUsers();
    }
  }, [userId]);

  const loadFriends = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // Cargar amistades aceptadas
      const friendshipsResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: userId }, status: { eq: 'ACCEPTED' } },
            { receiverId: { eq: userId }, status: { eq: 'ACCEPTED' } }
          ]
        }
      });

      // Obtener perfiles de amigos
      const friendProfiles: any[] = [];
      for (const friendship of friendshipsResponse.data || []) {
        const friendId = friendship.requesterId === userId 
          ? friendship.receiverId 
          : friendship.requesterId;

        const profileResponse = await client.models.UserProfile.list({
          filter: { userId: { eq: friendId } },
          limit: 1
        });

        if (profileResponse.data && profileResponse.data.length > 0) {
          friendProfiles.push(profileResponse.data[0]);
        }
      }

      setFriends(friendProfiles);
    } catch (error) {
      console.error('Error loading friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFriendRequests = async () => {
    if (!userId) return;
    
    try {
      const response = await client.models.Friendship.list({
        filter: {
          receiverId: { eq: userId },
          status: { eq: 'PENDING' }
        }
      });

      // Cargar información de los solicitantes
      const requestsWithProfiles = await Promise.all(
        (response.data || []).map(async (request) => {
          const profileResponse = await client.models.UserProfile.list({
            filter: { userId: { eq: request.requesterId } },
            limit: 1
          });

          return {
            ...request,
            requester: profileResponse.data?.[0]
          };
        })
      );

      setFriendRequests(requestsWithProfiles);
    } catch (error) {
      console.error('Error loading friend requests:', error);
    }
  };

  const loadSuggestedUsers = async () => {
    if (!userId) return;
    
    try {
      // Cargar todos los usuarios menos el actual
      const allUsersResponse = await client.models.UserProfile.list({
        limit: 100
      });

      // Obtener IDs de amigos actuales y solicitudes pendientes
      const friendshipsResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: userId } },
            { receiverId: { eq: userId } }
          ]
        }
      });

      const connectedUserIds = new Set(
        (friendshipsResponse.data || []).map(f => 
          f.requesterId === userId ? f.receiverId : f.requesterId
        )
      );

      // Filtrar usuarios que no son amigos ni tienen solicitud pendiente
      const suggested = (allUsersResponse.data || [])
        .filter(user => 
          user.userId !== userId && 
          !connectedUserIds.has(user.userId)
        )
        .slice(0, 20); // Mostrar máximo 20 sugerencias

      setSuggestedUsers(suggested);
    } catch (error) {
      console.error('Error loading suggested users:', error);
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
            { fullName: { contains: searchQuery } }
          ],
        },
      });

      // Filtrar el usuario actual
      const filtered = (response.data || []).filter(u => u.userId !== userId);
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  }; 
  const sendFriendRequest = async (receiverId: string) => {
  if (!userId) return;
  
  try {
    // Verificar si ya existe una solicitud
    const existingRequest = await client.models.Friendship.list({
      filter: {
        or: [
          { requesterId: { eq: userId }, receiverId: { eq: receiverId } },
          { requesterId: { eq: receiverId }, receiverId: { eq: userId } }
        ]
      }
    });

    if (existingRequest.data && existingRequest.data.length > 0) {
      alert('Ya existe una solicitud de amistad con este usuario');
      return;
    }

    // Verificar si el usuario receptor es un usuario de ejemplo
    const isExampleUser = receiverId.startsWith('sample-user-') || 
                          receiverId.startsWith('user-');

    // Si es usuario de ejemplo, crear la amistad directamente como ACCEPTED
    // Si es usuario real, crear como PENDING
    const friendshipStatus = isExampleUser ? 'ACCEPTED' : 'PENDING';

    await client.models.Friendship.create({
      requesterId: userId,
      receiverId,
      status: friendshipStatus,
    });
    
    if (isExampleUser) {
      alert('✅ ¡Ahora sois amigos!');
    } else {
      alert('✅ Solicitud de amistad enviada\n\nEspera a que el usuario acepte tu solicitud.');
    }
    
    setShowSearchModal(false);
    setSearchQuery('');
    setSearchResults([]);
    
    // Recargar datos
    await loadFriends();
    await loadSuggestedUsers();
  } catch (error) {
    console.error('Error sending friend request:', error);
    alert('❌ Error al enviar solicitud');
  }
};

  const acceptFriendRequest = async (requestId: string) => {
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'ACCEPTED',
      });
      
      alert('✅ Solicitud aceptada');
      await loadFriends();
      await loadFriendRequests();
      await loadSuggestedUsers();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('❌ Error al aceptar solicitud');
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'REJECTED',
      });
      
      alert('Solicitud rechazada');
      await loadFriendRequests();
      await loadSuggestedUsers();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      alert('❌ Error al rechazar solicitud');
    }
  };

  const handleCreateSampleUsers = async () => {
    setCreatingUsers(true);
    try {
      const result = await createSampleUsersOnly();
      alert(`✅ ${result.created} usuarios de ejemplo creados!\n\nAhora puedes buscarlos y añadirlos como amigos.`);
      await loadSuggestedUsers();
    } catch (error) {
      console.error('Error creating sample users:', error);
      alert('❌ Error al crear usuarios de ejemplo');
    } finally {
      setCreatingUsers(false);
    }
  };

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>Mis Amigos</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {suggestedUsers.length === 0 && (
            <Button 
              variant="secondary" 
              onClick={handleCreateSampleUsers}
              loading={creatingUsers}
            >
              👥 Crear Usuarios Ejemplo
            </Button>
          )}
          <Button variant="primary" onClick={() => setShowSearchModal(true)}>
            🔍 Buscar Usuarios
          </Button>
        </div>
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
                        {request.requester?.username?.charAt(0).toUpperCase() || '?'}
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
                  >
                    ✅ Aceptar
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => rejectFriendRequest(request.id)}
                  >
                    ❌ Rechazar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Usuarios Sugeridos */}
      {suggestedUsers.length > 0 && (
        <Card title="Usuarios que podrías conocer" className="mb-lg">
          <div className="friends-grid">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="friend-card">
                <div className="friend-avatar">
                  {user.photo ? (
                    <img src={user.photo} alt={user.username} />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.username?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <div className="friend-info">
                  <h4>{user.fullName || user.username}</h4>
                  <p className="text-sm text-secondary">@{user.username}</p>
                  {user.location && (
                    <p className="text-xs text-secondary">📍 {user.location}</p>
                  )}
                  {user.bio && (
                    <p className="text-xs text-secondary" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                      "{user.bio}"
                    </p>
                  )}
                </div>
                <div className="friend-stats">
                  <span className="stat">
                    🍺 <strong>{user.tastingsCount || 0}</strong> degustaciones
                  </span>
                </div>
                <Button 
                  variant="primary" 
                  size="small" 
                  fullWidth
                  onClick={() => sendFriendRequest(user.userId)}
                >
                  ➕ Añadir amigo
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Mensaje si no hay usuarios sugeridos */}
      {suggestedUsers.length === 0 && friends.length === 0 && friendRequests.length === 0 && (
        <Card>
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No hay usuarios disponibles</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Crea usuarios de ejemplo para poder añadir amigos y explorar la funcionalidad social de BeerSp
            </p>
            <Button 
              variant="primary" 
              onClick={handleCreateSampleUsers}
              loading={creatingUsers}
            >
              👥 Crear Usuarios de Ejemplo
            </Button>
          </div>
        </Card>
      )}

      {/* Lista de Amigos */}
      {friends.length > 0 && (
        <Card title={`Mis Amigos (${friends.length})`}>
          <div className="friends-grid">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <div className="friend-avatar">
                  {friend.photo ? (
                    <img src={friend.photo} alt={friend.username} />
                  ) : (
                    <div className="avatar-placeholder">
                      {friend.username?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <div className="friend-info">
                  <h4>{friend.fullName || friend.username}</h4>
                  <p className="text-sm text-secondary">@{friend.username}</p>
                  {friend.location && (
                    <p className="text-xs text-secondary">📍 {friend.location}</p>
                  )}
                  {friend.bio && (
                    <p className="text-xs text-secondary" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                      "{friend.bio}"
                    </p>
                  )}
                </div>
                <div className="friend-stats">
                  <span className="stat">
                    🍺 <strong>{friend.tastingsCount || 0}</strong> degustaciones
                  </span>
                </div>
                <Button variant="secondary" size="small" fullWidth>
                  👤 Ver Perfil
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Modal de Búsqueda */}
      <Modal
        isOpen={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        title="Buscar Usuarios"
        size="medium"
      >
        <div className="search-modal-content">
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
                {searchResults.map((user) => (
                  <div key={user.id} className="search-result-item">
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.photo ? (
                          <img src={user.photo} alt={user.username} />
                        ) : (
                          <div className="avatar-placeholder">
                            {user.username?.charAt(0).toUpperCase() || '?'}
                          </div>
                        )}
                      </div>
                      <div className="user-details">
                        <h5>{user.fullName || user.username}</h5>
                        <p className="text-sm text-secondary">@{user.username}</p>
                        {user.location && (
                          <p className="text-xs text-secondary">📍 {user.location}</p>
                        )}
                        {user.bio && (
                          <p className="text-xs text-secondary" style={{ marginTop: '0.25rem' }}>
                            {user.bio}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => sendFriendRequest(user.userId)}
                    >
                      ➕ Enviar Solicitud
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !loading && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <p>No se encontraron usuarios</p>
              <p className="text-sm text-secondary" style={{ marginTop: '0.5rem' }}>
                Intenta buscar por nombre de usuario o nombre completo
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Friends;