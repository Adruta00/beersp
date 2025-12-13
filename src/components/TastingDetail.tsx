import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Rating from '../components/common/Rating';
import { formatTimeAgo } from '../utils/formatter';
import { badgeService } from '../services/badgeService';

const client = generateClient<Schema>();

interface TastingDetailProps {
  tastingId: string;
  onClose: () => void;
}

const TastingDetail: React.FC<TastingDetailProps> = ({ tastingId, onClose }) => {
  const { user } = useAuthenticator();
  const [tasting, setTasting] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [canComment, setCanComment] = useState(false);

  useEffect(() => {
    loadTastingDetail();
  }, [tastingId]);

  const loadTastingDetail = async () => {
    setLoading(true);
    try {
      // Cargar degustación
      const tastingResponse = await client.models.Tasting.get({ id: tastingId });
      
      if (!tastingResponse.data) {
        console.error('Tasting not found');
        return;
      }

      // Cargar información relacionada
      const [beerResponse, venueResponse, userResponse] = await Promise.all([
        client.models.Beer.get({ id: tastingResponse.data.beerId }),
        tastingResponse.data.venueId 
          ? client.models.Venue.get({ id: tastingResponse.data.venueId })
          : Promise.resolve(null),
        client.models.UserProfile.list({
          filter: { userId: { eq: tastingResponse.data.userId } }
        }),
      ]);

      const tastingWithDetails = {
        ...tastingResponse.data,
        beer: beerResponse.data,
        venue: venueResponse?.data,
        user: userResponse.data?.[0],
      };

      setTasting(tastingWithDetails);

      // Verificar si el usuario actual puede comentar (debe ser amigo)
      await checkIfCanComment(tastingResponse.data.userId);

      // Cargar comentarios
      await loadComments();
    } catch (error) {
      console.error('Error loading tasting detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfCanComment = async (tastingUserId: string) => {
    if (!user || user.userId === tastingUserId) {
      // El propietario no comenta su propia degustación
      setCanComment(false);
      return;
    }

    try {
      // Verificar si son amigos
      const friendshipResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: user.userId }, receiverId: { eq: tastingUserId }, status: { eq: 'ACCEPTED' } },
            { requesterId: { eq: tastingUserId }, receiverId: { eq: user.userId }, status: { eq: 'ACCEPTED' } },
          ]
        }
      });

      setCanComment((friendshipResponse.data?.length || 0) > 0);
    } catch (error) {
      console.error('Error checking friendship:', error);
      setCanComment(false);
    }
  };

  const loadComments = async () => {
    try {
      const commentsResponse = await client.models.Comment.list({
        filter: { tastingId: { eq: tastingId } }
      });

      // Cargar información de los autores
      const commentsWithAuthors = await Promise.all(
        (commentsResponse.data || []).map(async (comment) => {
          const authorResponse = await client.models.UserProfile.list({
            filter: { userId: { eq: comment.authorId } }
          });
          return {
            ...comment,
            author: authorResponse.data?.[0],
          };
        })
      );

      // Ordenar por fecha (más recientes primero)
      commentsWithAuthors.sort((a, b) => 
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );

      setComments(commentsWithAuthors);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      await client.models.Comment.create({
        tastingId,
        authorId: user.userId,
        content: newComment.trim(),
      });

      setNewComment('');
      await loadComments();

      // Verificar galardones de comentarios
      await badgeService.checkCommentsBadge(user.userId);
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error al enviar el comentario');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('¿Eliminar este comentario?')) return;

    try {
      await client.models.Comment.delete({ id: commentId });
      await loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error al eliminar el comentario');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!tasting) {
    return (
      <div className="empty-state">
        <p>No se pudo cargar la degustación</p>
        <Button variant="secondary" onClick={onClose}>
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="tasting-detail">
      <Button variant="text" onClick={onClose} className="back-button">
        ← Volver
      </Button>

      <Card>
        <div className="tasting-header">
          <div className="user-info">
            <div className="user-avatar">
              {tasting.user?.photo ? (
                <img src={tasting.user.photo} alt={tasting.user.username} />
              ) : (
                <div className="avatar-placeholder">
                  {tasting.user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3>{tasting.user?.fullName || tasting.user?.username}</h3>
              <p className="text-sm text-secondary">
                {formatTimeAgo(tasting.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="tasting-content">
          <div className="beer-info">
            <div className="beer-image-large">
              {tasting.beer?.photo ? (
                <img src={tasting.beer.photo} alt={tasting.beer.name} />
              ) : (
                <div className="beer-placeholder">🍺</div>
              )}
            </div>
            <div className="beer-details">
              <h2>{tasting.beer?.name}</h2>
              <p className="text-secondary">
                {tasting.beer?.style} • {tasting.beer?.country}
              </p>
              {tasting.beer?.description && (
                <p className="beer-description">{tasting.beer.description}</p>
              )}
              <div className="tasting-specs">
                <span className="spec-badge">📏 {tasting.size}</span>
                <span className="spec-badge">📦 {tasting.format}</span>
                <span className="spec-badge">🌍 {tasting.consumptionCountry}</span>
              </div>
            </div>
          </div>

          {tasting.rating && (
            <div className="tasting-rating">
              <label>Valoración:</label>
              <Rating value={tasting.rating} readonly size="large" />
            </div>
          )}

          {tasting.venue && (
            <div className="tasting-venue">
              <h4>📍 Local</h4>
              <p><strong>{tasting.venue.name}</strong></p>
              <p className="text-sm text-secondary">{tasting.venue.address}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Sección de Comentarios */}
      <Card title={`Comentarios (${comments.length})`}>
        <div className="comments-section">
          {canComment && (
            <form onSubmit={handleSubmitComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                rows={3}
                maxLength={500}
                required
              />
              <div className="comment-form-footer">
                <span className="text-xs text-secondary">
                  {newComment.length}/500
                </span>
                <Button 
                  type="submit" 
                  variant="primary" 
                  loading={submitting}
                  disabled={!newComment.trim()}
                >
                  Comentar
                </Button>
              </div>
            </form>
          )}

          {!canComment && user?.userId !== tasting.userId && (
            <div className="info-message">
              <p className="text-sm text-secondary">
                Solo los amigos pueden comentar en esta degustación
              </p>
            </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="empty-state">
                <p className="text-secondary">Aún no hay comentarios</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <div className="user-info">
                      <div className="user-avatar-small">
                        {comment.author?.photo ? (
                          <img src={comment.author.photo} alt={comment.author.username} />
                        ) : (
                          <div className="avatar-placeholder">
                            {comment.author?.username?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <strong>{comment.author?.fullName || comment.author?.username}</strong>
                        <span className="text-xs text-secondary ml-sm">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    {user?.userId === comment.authorId && (
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        🗑️
                      </Button>
                    )}
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      <style>{`
        .tasting-detail {
          max-width: 800px;
          margin: 0 auto;
        }

        .tasting-header {
          margin-bottom: var(--spacing-md);
        }

        .tasting-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .beer-info {
          display: flex;
          gap: var(--spacing-lg);
        }

        .beer-image-large {
          width: 150px;
          height: 150px;
          flex-shrink: 0;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--color-surface-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .beer-image-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .beer-placeholder {
          font-size: 4rem;
        }

        .beer-details h2 {
          margin: 0 0 var(--spacing-xs) 0;
        }

        .beer-description {
          margin: var(--spacing-md) 0;
          color: var(--color-text);
        }

        .tasting-specs {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          margin-top: var(--spacing-md);
        }

        .spec-badge {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--color-primary-light);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
        }

        .tasting-rating {
          padding: var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
        }

        .tasting-rating label {
          display: block;
          margin-bottom: var(--spacing-sm);
          font-weight: 600;
        }

        .tasting-venue {
          padding: var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
        }

        .tasting-venue h4 {
          margin: 0 0 var(--spacing-sm) 0;
        }

        .comments-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .comment-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .comment-form textarea {
          width: 100%;
          padding: var(--spacing-sm);
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-family: var(--font-primary);
          resize: vertical;
        }

        .comment-form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-message {
          padding: var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
          text-align: center;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .comment-item {
          padding: var(--spacing-md);
          background: var(--color-surface-dark);
          border-radius: var(--radius-md);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .user-avatar-small {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          overflow: hidden;
          flex-shrink: 0;
        }

        .user-avatar-small img,
        .user-avatar-small .avatar-placeholder {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-avatar-small .avatar-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary);
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .comment-content {
          margin: 0;
          color: var(--color-text);
          line-height: 1.6;
        }

        .ml-sm {
          margin-left: var(--spacing-xs);
        }

        @media (max-width: 768px) {
          .beer-info {
            flex-direction: column;
          }

          .beer-image-large {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default TastingDetail;