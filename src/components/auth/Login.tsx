import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import Input from '../common/Input';
import Button from '../common/Button';
import './Auth.css';

interface LoginProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({
        username: email,
        password,
      });
      onSuccess?.();
    } catch (err: any) {
      console.error('Error signing in:', err);
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🍺</div>
          <h1>Bienvenido a BeerSp</h1>
          <p className="auth-description">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            icon="📧"
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Iniciar Sesión
          </Button>

          <div className="auth-footer">
            <button type="button" className="btn-text">
              ¿Olvidaste tu contraseña?
            </button>
            <p className="auth-switch">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                className="btn-text"
                onClick={onSwitchToRegister}
              >
                Regístrate
              </button>
            </p>
          </div>
        </form>

        <div className="auth-disclaimer">
          <p className="text-xs text-secondary">
            Al iniciar sesión, aceptas los términos de uso y la política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;