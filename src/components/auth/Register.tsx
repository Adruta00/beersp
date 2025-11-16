import React, { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateEmail, validatePassword, validatePasswordMatch } from '../../utils/validators';
import './Auth.css';

interface RegisterProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [step, setStep] = useState<'register' | 'confirm'>('register');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!validateEmail(formData.email)) {
      setError('Email inválido');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const matchError = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (matchError) {
      setError(matchError);
      return;
    }

    setLoading(true);

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            preferred_username: formData.username,
          },
        },
      });

      setStep('confirm');
    } catch (err: any) {
      console.error('Error signing up:', err);
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode,
      });

      onSuccess?.();
    } catch (err: any) {
      console.error('Error confirming sign up:', err);
      setError(err.message || 'Error al confirmar el código');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">📧</div>
            <h1>Confirma tu Email</h1>
            <p className="auth-description">
              Hemos enviado un código de verificación a {formData.email}
            </p>
          </div>

          <form onSubmit={handleConfirm} className="auth-form">
            <Input
              label="Código de Verificación"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="123456"
              required
              icon="🔢"
            />

            {error && <div className="error-message">{error}</div>}

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
            >
              Verificar
            </Button>

            <div className="auth-footer">
              <button
                type="button"
                className="btn-text"
                onClick={() => setStep('register')}
              >
                Volver al registro
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🍺</div>
          <h1>Únete a BeerSp</h1>
          <p className="auth-description">
            Crea tu cuenta y empieza a descubrir nuevas cervezas
          </p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <Input
            label="Nombre de Usuario"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="tu_usuario"
            required
            icon="👤"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="tu@email.com"
            required
            icon="📧"
          />

          <Input
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="••••••••"
            required
            icon="🔒"
            helperText="Mínimo 8 caracteres"
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="••••••••"
            required
            icon="🔒"
          />

          {error && <div className="error-message">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
          >
            Crear Cuenta
          </Button>

          <div className="auth-footer">
            <p className="auth-switch">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                className="btn-text"
                onClick={onSwitchToLogin}
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </form>

        <div className="auth-disclaimer">
          <p className="text-xs text-secondary">
            Al registrarte, aceptas los términos de uso y la política de privacidad.
            Debes ser mayor de 18 años para usar BeerSp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;