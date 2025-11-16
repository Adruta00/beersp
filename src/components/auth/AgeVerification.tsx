import React, { useState } from 'react';
import './AgeVerification.css';

interface AgeVerificationProps {
  onVerified: (birthdate: Date, additionalData: any) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [step, setStep] = useState<'age' | 'profile'>('age');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    lastName: '',
    location: '',
    bio: '',
    photo: null as File | null,
  });

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleAgeVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!birthdate) {
      setError('Por favor, introduce tu fecha de nacimiento');
      return;
    }

    const birthDate = new Date(birthdate);
    const age = calculateAge(birthDate);

    if (age < 18) {
      setError('Debes ser mayor de 18 años para usar BeerSp');
      return;
    }

    setStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const birthDate = new Date(birthdate);
    onVerified(birthDate, {
      fullName: profileData.fullName || undefined,
      lastName: profileData.lastName || undefined,
      location: profileData.location || undefined,
      bio: profileData.bio || undefined,
      // photo will be uploaded separately
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData({ ...profileData, photo: e.target.files[0] });
    }
  };

  if (step === 'age') {
    return (
      <div className="age-verification">
        <div className="verification-card">
          <div className="verification-icon">🍺</div>
          <h1>Bienvenido a BeerSp</h1>
          <p className="verification-description">
            Esta aplicación está destinada a mayores de edad. Por favor, verifica tu edad para continuar.
          </p>

          <form onSubmit={handleAgeVerification} className="verification-form">
            <div className="form-group">
              <label htmlFor="birthdate">Fecha de Nacimiento</label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary btn-large">
              Verificar Edad
            </button>
          </form>

          <div className="disclaimer">
            <p className="text-xs text-secondary">
              Al continuar, confirmas que tienes al menos 18 años de edad y aceptas los términos de uso.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="age-verification">
      <div className="verification-card profile-setup">
        <div className="verification-icon">👤</div>
        <h1>Completa tu Perfil</h1>
        <p className="verification-description">
          Personaliza tu cuenta para tener una mejor experiencia (opcional)
        </p>

        <form onSubmit={handleProfileSubmit} className="verification-form">
          <div className="form-group">
            <label htmlFor="fullName">Nombre</label>
            <input
              type="text"
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellidos (opcional)</label>
            <input
              type="text"
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              placeholder="Tus apellidos"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Ubicación (opcional)</label>
            <input
              type="text"
              id="location"
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              placeholder="Tu ciudad o país"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Sobre ti (opcional)</label>
            <textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              placeholder="Cuéntanos algo sobre ti..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Foto de Perfil (opcional)</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => onVerified(new Date(birthdate), {})}>
              Omitir
            </button>
            <button type="submit" className="btn-primary">
              Completar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgeVerification;