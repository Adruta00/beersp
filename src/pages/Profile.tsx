import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { storage } from '../services/storage';
import './Profile.css';

const client = generateClient<Schema>();

interface ProfileProps {
  userProfile: any;
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
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
      // Cargar degustaciones del usuario
      const tastingsResponse = await client.models.Tasting.list({
        filter: { userId: { eq: userProfile.userId } },
        limit: 10,
      });
      setTastings(tastingsResponse.data || []);

      // Cargar galardones del usuario
      const badgesResponse = await client.models.UserBadge.list({
        filter: { userId: { eq: userProfile.userId } },
      });
      setBadges(badgesResponse.data || []);

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
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let photoUrl = userProfile.photo;

      // Subir foto si hay una nueva
      if (editData.photo) {
        const uploadedUrl = await storage.uploadImage(
          editData.photo,
          `profiles/${userProfile.userId}/${Date.now()}_${editData.photo.name}`
        );
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }

      // Actualizar perfil
      await client.models.UserProfile.update({
        userId: userProfile.userId,
        fullName: editData.fullName || undefined,
        lastName: editData.lastName || undefined,
        location: editData.location || undefined,
        bio: editData.bio || undefined,
        photo: photoUrl || undefined,
      });

      setIsEditing(false);
      window.location.reload(); // Recargar para obtener datos actualizados
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
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
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
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
          <Card title="Últimas Degustaciones" headerAction={
            <Button variant="text" size="small">Ver todas</Button>
          }>
            {tastings.length === 0 ? (
              <div className="empty-state">
                <p>Aún no has registrado degustaciones</p>
              </div>
            ) : (
              <div className="tastings-list">
                {tastings.map((tasting) => (
                  <div key={tasting.id} className="tasting-item">
                    <div className="tasting-info">
                      <h4>{tasting.beer?.name || 'Cerveza'}</h4>
                      <p className="text-sm text-secondary">
                        {tasting.beer?.style} • {tasting.consumptionCountry}
                      </p>
                      {tasting.rating && (
                        <div className="rating-stars">
                          {'⭐'.repeat(tasting.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="profile-section">
          <Card title="Galardones" headerAction={
            <Button variant="text" size="small">Ver todos</Button>
          }>
            {badges.length === 0 ? (
              <div className="empty-state">
                <p>Completa actividades para ganar galardones</p>
              </div>
            ) : (
              <div className="badges-grid">
                {badges.map((userBadge) => (
                  <div key={userBadge.id} className="badge-card">
                    <div className="badge-icon">🏆</div>
                    <p className="badge-name">{userBadge.badge?.name}</p>
                    <span className="badge-level">Nivel {userBadge.level}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Modal de Edición */}
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
    </div>
  );
};

export default Profile;
