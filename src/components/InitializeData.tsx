import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { seedInitialData } from '../services/seedData';
import { badgeService } from '../services/badgeService';

const InitializeData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleInitialize = async () => {
    setLoading(true);
    setLogs([]);
    setStatus('Inicializando...');

    try {
      // 1. Crear cervezas
      addLog('📦 Creando cervezas...');
      const beers = await seedInitialData.createBeers();
      addLog(`✅ ${beers.length} cervezas creadas/verificadas`);

      // 2. Crear locales
      addLog('📦 Creando locales...');
      const venues = await seedInitialData.createVenues();
      addLog(`✅ ${venues.length} locales creados/verificados`);

      // 3. Inicializar galardones
      addLog('🏆 Inicializando sistema de galardones...');
      await badgeService.initializeDefaultBadges();
      addLog('✅ Galardones inicializados');

      setStatus('¡Inicialización completada! 🎉');
      addLog('🎉 Todo listo para usar BeerSp');
    } catch (error) {
      console.error('Error during initialization:', error);
      setStatus('❌ Error durante la inicialización');
      addLog(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="🚀 Inicializar Datos de BeerSp">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Este proceso creará datos iniciales en tu base de datos:
        </p>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs)'
        }}>
          <li>✅ 40+ cervezas de diferentes países y estilos</li>
          <li>✅ 20+ locales/bares en varias ciudades</li>
          <li>✅ Sistema de galardones (5 categorías, 10 niveles)</li>
        </ul>

        <div style={{
          padding: 'var(--spacing-md)',
          background: 'var(--color-surface-dark)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--color-warning)'
        }}>
          <strong>⚠️ Nota:</strong> Este proceso solo necesita ejecutarse una vez.
          Si los datos ya existen, no se duplicarán.
        </div>

        {status && (
          <div style={{
            padding: 'var(--spacing-md)',
            background: status.includes('Error') ? '#FFEBEE' : '#E8F5E9',
            color: status.includes('Error') ? 'var(--color-error)' : 'var(--color-success)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600
          }}>
            {status}
          </div>
        )}

        {logs.length > 0 && (
          <div style={{
            padding: 'var(--spacing-md)',
            background: '#000',
            color: '#0f0',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleInitialize}
          loading={loading}
          disabled={loading}
          size="large"
        >
          {loading ? 'Inicializando...' : '🚀 Inicializar Datos'}
        </Button>
      </div>
    </Card>
  );
};

export default InitializeData;