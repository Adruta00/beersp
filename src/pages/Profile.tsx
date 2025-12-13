import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Rating from '../components/common/Rating';
import Modal from '../components/common/Modal';
import { storage } from '../services/storage';
import { formatDate } from '../utils/formatter';
import { BEER_SIZES, BEER_FORMATS, COUNTRIES } from '../utils/constants';
import './Profile.css';

const client = generateClient<Schema>();

interface ProfileProps {
  userProfile: any;
  onUpdate: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    lastName: '',
    location: '',
    bio: '',
    photo: null as File | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [tastings, setTastings] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Estados para edición de degustación
  const [editingTasting, setEditingTasting] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tastingToDelete, setTastingToDelete] = useState<any>(null);

  useEffect(() => {
    if (userProfile) {
      setEditData({
        fullName: userProfile.fullName || '',
        lastName: userProfile.lastName || '',
        location: userProfile.location || '',
        bio: userProfile.bio || '',
        photo: null,
      });
      setPhotoPreview(userProfile.photo || null);
      loadProfileData();
    }
  }, [userProfile]);

  const loadProfileData = async () => {
    try {
      // Cargar degustaciones con información de cerveza
      const tastingsResponse = await client.models.Tasting.list({
        filter: { userId: { eq: userProfile.userId } },
      });

      const tastingsWithBeers = await Promise.all(
        (tastingsResponse.data || []).map(async (tasting) => {
          const beerResponse = await client.models.Beer.get({ id: tasting.beerId });
          const venueResponse = tasting.venueId 
            ? await client.models.Venue.get({ id: tasting.venueId })
            : null;
          
          return {
            ...tasting,
            beer: beerResponse.data,
            venue: venueResponse?.data
          };
        })
      );

      setTastings(tastingsWithBeers);

      // Cargar galardones
      const badgesResponse = await client.models.UserBadge.list({
        filter: { userId: { eq: userProfile.userId } },
      });

      const badgesWithInfo = await Promise.all(
        (badgesResponse.data || []).map(async (userBadge) => {
          const badgeResponse = await client.models.Badge.get({ id: userBadge.badgeId });
          return { ...userBadge, badge: badgeResponse.data };
        })
      );

      setBadges(badgesWithInfo);

      // Cargar amigos
      const friendshipsResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: userProfile.userId }, status: { eq: 'ACCEPTED' } },
            { receiverId: { eq: userProfile.userId }, status: { eq: 'ACCEPTED' } },
          ],
        },
      });
      setFriends(friendshipsResponse.data || []);
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditData({ ...editData, photo: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      let photoUrl = userProfile.photo;

      if (editData.photo) {
        const uploadedUrl = await storage.uploadImage(
          editData.photo,
          `profiles/${userProfile.userId}/${Date.now()}_${editData.photo.name}`
        );
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }

      await client.models.UserProfile.update({
        id: userProfile.id,
        fullName: editData.fullName || undefined,
        lastName: editData.lastName || undefined,
        location: editData.location || undefined,
        bio: editData.bio || undefined,
        photo: photoUrl || undefined,
      });

      setSuccessMessage('Perfil actualizado correctamente');
      setIsEditing(false);
      onUpdate();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  // NUEVO: Editar degustación
  const handleEditTasting = (tasting: any) => {
    setEditingTasting({
      ...tasting,
      editRating: tasting.rating || 0,
      editSize: tasting.size,
      editFormat: tasting.format,
      editConsumptionCountry: tasting.consumptionCountry,
      editLiked: tasting.liked,
    });
    setShowEditModal(true);
  };

  const handleSaveEditTasting = async () => {
    if (!editingTasting) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await client.models.Tasting.update({
        id: editingTasting.id,
        rating: editingTasting.editRating > 0 ? editingTasting.editRating : undefined,
        size: editingTasting.editSize,
        format: editingTasting.editFormat,
        consumptionCountry: editingTasting.editConsumptionCountry,
        liked: editingTasting.editLiked,
      });

      setSuccessMessage('Degustación actualizada correctamente');
      setShowEditModal(false);
      setEditingTasting(null);
      await loadProfileData();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating tasting:', error);
      setErrorMessage('Error al actualizar la degustación');
    } finally {
      setLoading(false);
    }
  };

  // NUEVO: Eliminar degustación
  const confirmDeleteTasting = (tasting: any) => {
    setTastingToDelete(tasting);
    setShowDeleteModal(true);
  };

  const handleDeleteTasting = async () => {
    if (!tastingToDelete) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await client.models.Tasting.delete({ id: tastingToDelete.id });

      // Actualizar contador de degustaciones
      await client.models.UserProfile.update({
        id: userProfile.id,
        tastingsCount: Math.max(0, (userProfile.tastingsCount || 1) - 1),
      });

      setSuccessMessage('Degustación eliminada correctamente');
      setShowDeleteModal(false);
      setTastingToDelete(null);
      await loadProfileData();
      onUpdate();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting tasting:', error);
      setErrorMessage('Error al eliminar la degustación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <div className="profile-header-card">
        <Card>
          <div className="profile-header-content">
            <div className="profile-avatar-large">
              {photoPreview ? (
                <img src={photoPreview} alt={userProfile?.username} />
              ) : (
                <div className="avatar-placeholder-large">
                  {userProfile?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1>{userProfile?.fullName || userProfile?.username}</h1>
              <p className="username">@{userProfile?.username}</p>
              {userProfile?.location && (
                <p className="location">📍 {userProfile.location}</p>
              )}
              {userProfile?.bio && (
                <p className="bio">{userProfile.bio}</p>
              )}
            </div>
            <div className="profile-actions">
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="profile-stats-grid">
        <Card title="Estadísticas">
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">{userProfile?.tastingsCount || 0}</div>
              <div className="stat-label">Degustaciones</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{friends.length}</div>
              <div className="stat-label">Amigos</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{badges.length}</div>
              <div className="stat-label">Galardones</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{userProfile?.venuesAdded || 0}</div>
              <div className="stat-label">Locales Añadidos</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="profile-content-grid">
        <div className="profile-section">
          <Card title={`Degustaciones (${tastings.length})`}>
            {tastings.length === 0 ? (
              <div className="empty-state">
                <p>Aún no has registrado degustaciones</p>
              </div>
            ) : (
              <div className="tastings-list">
                {tastings.map((tasting) => (
                  <div key={tasting.id} className="tasting-item">
                    <div className="tasting-content">
                      <div className="tasting-info">
                        <h4>{tasting.beer?.name || 'Cerveza'}</h4>
                        <p className="text-sm text-secondary">
                          {tasting.beer?.style} • {tasting.size} • {tasting.format}
                        </p>
                        {tasting.venue && (
                          <p className="text-xs text-secondary">
                            📍 {tasting.venue.name}
                          </p>
                        )}
                        {tasting.rating && (
                          <div className="rating-stars">
                            <Rating value={tasting.rating} readonly size="small" />
                          </div>
                        )}
                        <p className="text-xs text-secondary">
                          {formatDate(tasting.consumptionDate)}
                        </p>
                      </div>
                      <div className="tasting-actions">
                        <Button 
                          variant="secondary" 
                          size="small"
                          onClick={() => handleEditTasting(tasting)}
                        >
                          ✏️ Editar
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small"
                          onClick={() => confirmDeleteTasting(tasting)}
                        >
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="profile-section">
          <Card title={`Galardones (${badges.length})`}>
            {badges.length === 0 ? (
              <div className="empty-state">
                <p>Completa actividades para ganar galardones</p>
              </div>
            ) : (
              <div className="badges-grid">
                {badges.map((userBadge) => (
                  <div key={userBadge.id} className="badge-card">
                    <div className="badge-icon">🏆</div>
                    <p className="badge-name">{userBadge.badge?.name || 'Galardón'}</p>
                    <span className="badge-level">Nivel {userBadge.level}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Modal de Edición de Perfil */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Editar Perfil"
        size="medium"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave} loading={loading}>
              Guardar Cambios
            </Button>
          </>
        }
      >
        <div className="edit-form">
          <div className="photo-upload">
            <div className="photo-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" />
              ) : (
                <div className="avatar-placeholder-large">
                  {userProfile?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              label="Foto de Perfil"
            />
          </div>

          <Input
            label="Nombre"
            value={editData.fullName}
            onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
            placeholder="Tu nombre"
          />

          <Input
            label="Apellidos"
            value={editData.lastName}
            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
            placeholder="Tus apellidos"
          />

          <Input
            label="Ubicación"
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            placeholder="Tu ciudad o país"
          />

          <div className="form-group">
            <label htmlFor="bio">Sobre ti</label>
            <textarea
              id="bio"
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              placeholder="Cuéntanos algo sobre ti..."
              rows={4}
              maxLength={500}
            />
            <span className="text-xs text-secondary">
              {editData.bio.length}/500 caracteres
            </span>
          </div>
        </div>
      </Modal>

      {/* Modal de Edición de Degustación */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingTasting(null);
        }}
        title="Editar Degustación"
        size="medium"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveEditTasting} loading={loading}>
              Guardar Cambios
            </Button>
          </>
        }
      >
        {editingTasting && (
          <div className="edit-form">
            <div className="form-group">
              <label>Cerveza</label>
              <p className="text-secondary">{editingTasting.beer?.name}</p>
            </div>

            <div className="form-group">
              <label>Valoración</label>
              <Rating
                value={editingTasting.editRating}
                onChange={(rating) => setEditingTasting({ ...editingTasting, editRating: rating })}
                size="large"
              />
            </div>

            <Select
              label="Tamaño"
              value={editingTasting.editSize}
              onChange={(e) => setEditingTasting({ ...editingTasting, editSize: e.target.value })}
              options={BEER_SIZES}
            />

            <Select
              label="Formato"
              value={editingTasting.editFormat}
              onChange={(e) => setEditingTasting({ ...editingTasting, editFormat: e.target.value })}
              options={BEER_FORMATS}
            />

            <Select
              label="País de Consumo"
              value={editingTasting.editConsumptionCountry}
              onChange={(e) => setEditingTasting({ ...editingTasting, editConsumptionCountry: e.target.value })}
              options={COUNTRIES}
            />

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={editingTasting.editLiked}
                  onChange={(e) => setEditingTasting({ ...editingTasting, editLiked: e.target.checked })}
                />
                <span>Me gustó el local</span>
              </label>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTastingToDelete(null);
        }}
        title="Confirmar Eliminación"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteTasting} loading={loading}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>¿Estás seguro de que quieres eliminar esta degustación?</p>
        {tastingToDelete && (
          <div className="mt-md">
            <strong>{tastingToDelete.beer?.name}</strong>
            <p className="text-sm text-secondary">
              {formatDate(tastingToDelete.consumptionDate)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;