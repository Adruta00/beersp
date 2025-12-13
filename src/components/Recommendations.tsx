import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Rating from '../components/common/Rating';
import Button from '../components/common/Button';
import { recommendationsService } from '../services/recommendationsService';

interface RecommendationsProps {
  userId: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({ userId }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReasons, setShowReasons] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadRecommendations();
  }, [userId]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const recs = await recommendationsService.getRecommendations(userId, 5);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReasons = (beerId: string) => {
    setShowReasons(prev => ({
      ...prev,
      [beerId]: !prev[beerId]
    }));
  };

  if (loading) {
    return (
      <Card title="Recomendaciones para Ti">
        <div className="loading">
          <div className="spinner"></div>
          <p className="text-sm">Calculando recomendaciones...</p>
        </div>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card title="Recomendaciones para Ti">
        <div className="empty-state">
          <p className="text-secondary">
            Prueba más cervezas para recibir recomendaciones personalizadas
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Recomendaciones para Ti" 
      subtitle="Basado en tus gustos y los de tus amigos"
    >
      <div className="recommendations-list">
        {recommendations.map(({ beer, score, reasons }) => (
          <div key={beer.id} className="recommendation-item">
            <div className="recommendation-content">
              <div className="beer-image-small">
                {beer.photo ? (
                  <img src={beer.photo} alt={beer.name} />
                ) : (
                  <div className="beer-placeholder">🍺</div>
                )}
              </div>
              
              <div className="recommendation-info">
                <h4>{beer.name}</h4>
                <p className="text-sm text-secondary">
                  {beer.style} • {beer.country}
                </p>
                
                {beer.averageRating > 0 && (
                  <div className="recommendation-rating">
                    <Rating value={beer.averageRating} readonly size="small" />
                    <span className="text-xs text-secondary">
                      ({beer.ratingsCount})
                    </span>
                  </div>
                )}

                <div className="recommendation-match">
                  <div className="match-bar">
                    <div 
                      className="match-fill" 
                      style={{ width: `${Math.min(100, (score / 150) * 100)}%` }}
                    />
                  </div>
                  <span className="match-score">
                    {Math.round((score / 150) * 100)}% compatibilidad
                  </span>
                </div>

                {reasons.length > 0 && (
                  <button 
                    className="btn-text btn-small"
                    onClick={() => toggleReasons(beer.id)}
                  >
                    {showReasons[beer.id] ? '▼' : '▶'} ¿Por qué?
                  </button>
                )}

                {showReasons[beer.id] && (
                  <ul className="recommendation-reasons">
                    {reasons.map((reason: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => (
                      <li key={idx}>✓ {reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <Button variant="primary" size="small">
              Ver más
            </Button>
          </div>
        ))}
      </div>

      <style>{`
        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .recommendation-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .recommendation-item:hover {
          background: var(--color-primary-light);
          transform: translateX(4px);
        }

        .recommendation-content {
          display: flex;
          gap: var(--spacing-md);
          flex: 1;
        }

        .beer-image-small {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--color-surface);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .beer-image-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .beer-placeholder {
          font-size: 2rem;
        }

        .recommendation-info {
          flex: 1;
          min-width: 0;
        }

        .recommendation-info h4 {
          margin: 0 0 var(--spacing-xs) 0;
          font-size: 1rem;
        }

        .recommendation-rating {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin: var(--spacing-xs) 0;
        }

        .recommendation-match {
          margin: var(--spacing-sm) 0;
        }

        .match-bar {
          width: 100%;
          height: 8px;
          background: var(--color-surface);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: var(--spacing-xs);
        }

        .match-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          transition: width var(--transition-base);
        }

        .match-score {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .recommendation-reasons {
          list-style: none;
          padding: var(--spacing-sm);
          margin: var(--spacing-sm) 0 0 0;
          background: var(--color-surface);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
        }

        .recommendation-reasons li {
          padding: var(--spacing-xs) 0;
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .recommendation-item {
            flex-direction: column;
          }

          .recommendation-content {
            width: 100%;
          }

          .recommendation-item button {
            width: 100%;
          }
        }
      `}</style>
    </Card>
  );
};

export default Recommendations;