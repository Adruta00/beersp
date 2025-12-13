import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Definición de thresholds para cada nivel de galardón (exponencial)
const BADGE_LEVELS = [
  { level: 1, threshold: 5 },
  { level: 2, threshold: 10 },
  { level: 3, threshold: 25 },
  { level: 4, threshold: 50 },
  { level: 5, threshold: 100 },
  { level: 6, threshold: 200 },
  { level: 7, threshold: 400 },
  { level: 8, threshold: 750 },
  { level: 9, threshold: 1500 },
  { level: 10, threshold: 3000 },
];

export const badgeService = {
  /**
   * Inicializar galardones base en el sistema
   * Solo se ejecuta una vez al configurar la aplicación
   */
  async initializeDefaultBadges() {
    try {
      const badges = [
        {
          name: 'Catador Novato',
          description: 'Degustador de cervezas',
          category: 'TASTINGS',
          image: '🍺',
        },
        {
          name: 'Explorador Global',
          description: 'Probar cervezas de diferentes países',
          category: 'COUNTRIES',
          image: '🌍',
        },
        {
          name: 'Maestro de Estilos',
          description: 'Probar diferentes estilos de cerveza',
          category: 'STYLES',
          image: '🎨',
        },
        {
          name: 'Descubridor Local',
          description: 'Añadir locales al sistema',
          category: 'VENUES',
          image: '📍',
        },
        {
          name: 'Comentarista Activo',
          description: 'Comentar en degustaciones de amigos',
          category: 'COMMENTS',
          image: '💬',
        },
      ];

      for (const badgeData of badges) {
        // Verificar si ya existe
        const existing = await client.models.Badge.list({
          filter: { name: { eq: badgeData.name } }
        });

        if (!existing.data || existing.data.length === 0) {
          await client.models.Badge.create({
            ...badgeData,
            levels: JSON.stringify(BADGE_LEVELS),
          } as any);
        }
      }

      console.log('Galardones inicializados correctamente');
    } catch (error) {
      console.error('Error inicializando galardones:', error);
    }
  },

  /**
   * Verificar y otorgar galardones a un usuario después de una actividad
   */
  async checkAndAwardBadges(userId: string) {
    try {
      await Promise.all([
        this.checkTastingsBadge(userId),
        this.checkCountriesBadge(userId),
        this.checkStylesBadge(userId),
        this.checkVenuesBadge(userId),
        this.checkCommentsBadge(userId),
      ]);
    } catch (error) {
      console.error('Error checking badges:', error);
    }
  },

  /**
   * Verificar galardón de degustaciones
   */
  async checkTastingsBadge(userId: string) {
    try {
      // Obtener galardón de degustaciones
      const badgeResponse = await client.models.Badge.list({
        filter: { category: { eq: 'TASTINGS' } }
      });

      if (!badgeResponse.data || badgeResponse.data.length === 0) return;
      const badge = badgeResponse.data[0];

      // Contar degustaciones del usuario
      const tastingsResponse = await client.models.Tasting.list({
        filter: { userId: { eq: userId } }
      });
      const tastingsCount = tastingsResponse.data?.length || 0;

      // Determinar nivel alcanzado
      const achievedLevel = this.calculateLevel(tastingsCount);
      
      if (achievedLevel > 0) {
        await this.awardBadge(userId, badge.id, achievedLevel);
      }
    } catch (error) {
      console.error('Error checking tastings badge:', error);
    }
  },

  /**
   * Verificar galardón de países
   */
  async checkCountriesBadge(userId: string) {
    try {
      const badgeResponse = await client.models.Badge.list({
        filter: { category: { eq: 'COUNTRIES' } }
      });

      if (!badgeResponse.data || badgeResponse.data.length === 0) return;
      const badge = badgeResponse.data[0];

      // Obtener degustaciones y contar países únicos
      const tastingsResponse = await client.models.Tasting.list({
        filter: { userId: { eq: userId } }
      });

      const uniqueCountries = new Set(
        (tastingsResponse.data || []).map(t => t.consumptionCountry)
      );
      const countriesCount = uniqueCountries.size;

      const achievedLevel = this.calculateLevel(countriesCount);
      
      if (achievedLevel > 0) {
        await this.awardBadge(userId, badge.id, achievedLevel);
      }
    } catch (error) {
      console.error('Error checking countries badge:', error);
    }
  },

  /**
   * Verificar galardón de estilos
   */
  async checkStylesBadge(userId: string) {
    try {
      const badgeResponse = await client.models.Badge.list({
        filter: { category: { eq: 'STYLES' } }
      });

      if (!badgeResponse.data || badgeResponse.data.length === 0) return;
      const badge = badgeResponse.data[0];

      // Obtener degustaciones y contar estilos únicos de cervezas
      const tastingsResponse = await client.models.Tasting.list({
        filter: { userId: { eq: userId } }
      });

      const uniqueStyles = new Set();
      for (const tasting of tastingsResponse.data || []) {
        const beerResponse = await client.models.Beer.get({ id: tasting.beerId });
        if (beerResponse.data) {
          uniqueStyles.add(beerResponse.data.style);
        }
      }

      const stylesCount = uniqueStyles.size;
      const achievedLevel = this.calculateLevel(stylesCount);
      
      if (achievedLevel > 0) {
        await this.awardBadge(userId, badge.id, achievedLevel);
      }
    } catch (error) {
      console.error('Error checking styles badge:', error);
    }
  },

  /**
   * Verificar galardón de locales
   */
  async checkVenuesBadge(userId: string) {
    try {
      const badgeResponse = await client.models.Badge.list({
        filter: { category: { eq: 'VENUES' } }
      });

      if (!badgeResponse.data || badgeResponse.data.length === 0) return;
      const badge = badgeResponse.data[0];

      // Contar locales añadidos por el usuario
      const venuesResponse = await client.models.Venue.list({
        filter: { addedById: { eq: userId } }
      });
      const venuesCount = venuesResponse.data?.length || 0;

      const achievedLevel = this.calculateLevel(venuesCount);
      
      if (achievedLevel > 0) {
        await this.awardBadge(userId, badge.id, achievedLevel);
      }
    } catch (error) {
      console.error('Error checking venues badge:', error);
    }
  },

  /**
   * Verificar galardón de comentarios
   */
  async checkCommentsBadge(userId: string) {
    try {
      const badgeResponse = await client.models.Badge.list({
        filter: { category: { eq: 'COMMENTS' } }
      });

      if (!badgeResponse.data || badgeResponse.data.length === 0) return;
      const badge = badgeResponse.data[0];

      // Contar comentarios del usuario
      const commentsResponse = await client.models.Comment.list({
        filter: { authorId: { eq: userId } }
      });
      const commentsCount = commentsResponse.data?.length || 0;

      const achievedLevel = this.calculateLevel(commentsCount);
      
      if (achievedLevel > 0) {
        await this.awardBadge(userId, badge.id, achievedLevel);
      }
    } catch (error) {
      console.error('Error checking comments badge:', error);
    }
  },

  /**
   * Calcular el nivel alcanzado basado en el conteo
   */
  calculateLevel(count: number): number {
    for (let i = BADGE_LEVELS.length - 1; i >= 0; i--) {
      if (count >= BADGE_LEVELS[i].threshold) {
        return BADGE_LEVELS[i].level;
      }
    }
    return 0;
  },

  /**
   * Otorgar o actualizar un galardón
   */
  async awardBadge(userId: string, badgeId: string, level: number) {
    try {
      // Verificar si el usuario ya tiene este galardón
      const existingResponse = await client.models.UserBadge.list({
        filter: {
          userId: { eq: userId },
          badgeId: { eq: badgeId }
        }
      });

      if (existingResponse.data && existingResponse.data.length > 0) {
        const existing = existingResponse.data[0];
        
        // Solo actualizar si el nivel es mayor
        if (level > existing.level) {
          await client.models.UserBadge.update({
            id: existing.id,
            level: level,
            achievedAt: new Date().toISOString(),
          });
          console.log(`Galardón actualizado: nivel ${level}`);
        }
      } else {
        // Crear nuevo galardón
        await client.models.UserBadge.create({
          userId,
          badgeId,
          level,
          achievedAt: new Date().toISOString(),
        });
        console.log(`Nuevo galardón otorgado: nivel ${level}`);
      }
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  },

  /**
   * Obtener el progreso del usuario en un galardón específico
   */
  async getBadgeProgress(userId: string, badgeId: string) {
    try {
      const userBadgeResponse = await client.models.UserBadge.list({
        filter: {
          userId: { eq: userId },
          badgeId: { eq: badgeId }
        }
      });

      const currentLevel = userBadgeResponse.data?.[0]?.level || 0;
      const nextLevel = currentLevel + 1;
      
      if (nextLevel > 10) {
        return {
          currentLevel,
          maxLevelReached: true,
          progress: 100
        };
      }

      const nextThreshold = BADGE_LEVELS.find(l => l.level === nextLevel)?.threshold || 0;
      
      return {
        currentLevel,
        nextLevel,
        nextThreshold,
        maxLevelReached: false,
      };
    } catch (error) {
      console.error('Error getting badge progress:', error);
      return null;
    }
  }
};