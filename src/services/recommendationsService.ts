import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface BeerScore {
  beer: any;
  score: number;
  reasons: string[];
}

export const recommendationsService = {
  /**
   * Obtener recomendaciones personalizadas para un usuario
   * Basado en sus gustos y los de sus amigos
   */
  async getRecommendations(userId: string, limit: number = 10): Promise<BeerScore[]> {
    try {
      // 1. Obtener preferencias del usuario
      const userPreferences = await this.getUserPreferences(userId);
      
      // 2. Obtener preferencias de amigos
      const friendsPreferences = await this.getFriendsPreferences(userId);
      
      // 3. Obtener todas las cervezas
      const beersResponse = await client.models.Beer.list();
      const allBeers = beersResponse.data || [];
      
      // 4. Obtener cervezas ya probadas por el usuario
      const tastingsResponse = await client.models.Tasting.list({
        filter: { userId: { eq: userId } }
      });
      const triedBeerIds = new Set((tastingsResponse.data || []).map(t => t.beerId));
      
      // 5. Filtrar cervezas no probadas
      const untried = allBeers.filter(beer => !triedBeerIds.has(beer.id));
      
      // 6. Calcular puntuación para cada cerveza
      const scoredBeers: BeerScore[] = untried.map(beer => {
        const score = this.calculateBeerScore(beer, userPreferences, friendsPreferences);
        return score;
      });
      
      // 7. Ordenar por puntuación y devolver top N
      return scoredBeers
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  },

  /**
   * Obtener preferencias del usuario basadas en sus degustaciones
   */
  async getUserPreferences(userId: string) {
    try {
      const tastingsResponse = await client.models.Tasting.list({
        filter: { 
          userId: { eq: userId },
          rating: { gt: 3 } // Solo valoraciones altas
        }
      });

      const preferences = {
        styles: new Map<string, number>(),
        countries: new Map<string, number>(),
        ibuRange: { min: 0, max: 120, avg: 60 },
        alcoholRange: { min: 0, max: 20, avg: 5 },
        favoriteBeers: [] as any[]
      };

      const ibuValues: number[] = [];
      const alcoholValues: number[] = [];

      // Analizar degustaciones
      for (const tasting of tastingsResponse.data || []) {
        const beerResponse = await client.models.Beer.get({ id: tasting.beerId });
        if (!beerResponse.data) continue;

        const beer = beerResponse.data;
        const weight = tasting.rating || 3;

        // Contar estilos
        const styleCount = preferences.styles.get(beer.style) || 0;
        preferences.styles.set(beer.style, styleCount + weight);

        // Contar países
        const countryCount = preferences.countries.get(beer.country) || 0;
        preferences.countries.set(beer.country, countryCount + weight);

        // Recopilar valores de IBU y alcohol
        if (beer.ibu) ibuValues.push(beer.ibu);
        if (beer.alcoholPercentage) alcoholValues.push(beer.alcoholPercentage);

        // Guardar cervezas favoritas
        if (tasting.rating && tasting.rating >= 4) {
          preferences.favoriteBeers.push(beer);
        }
      }

      // Calcular rangos preferidos
      if (ibuValues.length > 0) {
        preferences.ibuRange = {
          min: Math.min(...ibuValues) - 10,
          max: Math.max(...ibuValues) + 10,
          avg: ibuValues.reduce((a, b) => a + b, 0) / ibuValues.length
        };
      }

      if (alcoholValues.length > 0) {
        preferences.alcoholRange = {
          min: Math.min(...alcoholValues) - 1,
          max: Math.max(...alcoholValues) + 1,
          avg: alcoholValues.reduce((a, b) => a + b, 0) / alcoholValues.length
        };
      }

      return preferences;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return {
        styles: new Map(),
        countries: new Map(),
        ibuRange: { min: 0, max: 120, avg: 60 },
        alcoholRange: { min: 0, max: 20, avg: 5 },
        favoriteBeers: []
      };
    }
  },

  /**
   * Obtener preferencias de amigos
   */
  async getFriendsPreferences(userId: string) {
    try {
      // Obtener amigos
      const friendshipsResponse = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: userId }, status: { eq: 'ACCEPTED' } },
            { receiverId: { eq: userId }, status: { eq: 'ACCEPTED' } }
          ]
        }
      });

      const friendIds = (friendshipsResponse.data || []).map(f =>
        f.requesterId === userId ? f.receiverId : f.requesterId
      );

      const friendsBeers = new Map<string, number>(); // beerId -> count

      // Obtener degustaciones de amigos bien valoradas
      for (const friendId of friendIds) {
        const tastingsResponse = await client.models.Tasting.list({
          filter: { 
            userId: { eq: friendId },
            rating: { gt: 3 }
          }
        });

        for (const tasting of tastingsResponse.data || []) {
          const count = friendsBeers.get(tasting.beerId) || 0;
          friendsBeers.set(tasting.beerId, count + (tasting.rating || 3));
        }
      }

      return friendsBeers;
    } catch (error) {
      console.error('Error getting friends preferences:', error);
      return new Map();
    }
  },

  /**
   * Calcular puntuación de una cerveza para recomendación
   */
  calculateBeerScore(
    beer: any, 
    userPreferences: any, 
    friendsPreferences: Map<string, number>
  ): BeerScore {
    let score = 0;
    const reasons: string[] = [];

    // Factor 1: Valoración global de la cerveza (0-50 puntos)
    if (beer.averageRating && beer.ratingsCount > 0) {
      const ratingScore = (beer.averageRating / 5) * 50;
      score += ratingScore;
      if (beer.averageRating >= 4) {
        reasons.push(`Muy bien valorada (${beer.averageRating.toFixed(1)}⭐)`);
      }
    }

    // Factor 2: Estilo preferido del usuario (0-30 puntos)
    const stylePreference = userPreferences.styles.get(beer.style) || 0;
    if (stylePreference > 0) {
      const styleScore = Math.min(30, stylePreference * 3);
      score += styleScore;
      reasons.push(`Te gusta el estilo ${beer.style}`);
    }

    // Factor 3: País preferido (0-20 puntos)
    const countryPreference = userPreferences.countries.get(beer.country) || 0;
    if (countryPreference > 0) {
      const countryScore = Math.min(20, countryPreference * 2);
      score += countryScore;
      reasons.push(`Te gustan las cervezas de ${beer.country}`);
    }

    // Factor 4: IBU en rango preferido (0-15 puntos)
    if (beer.ibu) {
      const ibuDiff = Math.abs(beer.ibu - userPreferences.ibuRange.avg);
      const ibuScore = Math.max(0, 15 - (ibuDiff / 10));
      score += ibuScore;
    }

    // Factor 5: Alcohol en rango preferido (0-15 puntos)
    if (beer.alcoholPercentage) {
      const alcoholDiff = Math.abs(beer.alcoholPercentage - userPreferences.alcoholRange.avg);
      const alcoholScore = Math.max(0, 15 - alcoholDiff * 2);
      score += alcoholScore;
    }

    // Factor 6: Valorada por amigos (0-40 puntos)
    const friendScore = friendsPreferences.get(beer.id) || 0;
    if (friendScore > 0) {
      const friendsScore = Math.min(40, friendScore * 5);
      score += friendsScore;
      reasons.push('Le gusta a tus amigos');
    }

    // Factor 7: Popularidad (bonus por cantidad de valoraciones) (0-10 puntos)
    if (beer.ratingsCount > 10) {
      score += Math.min(10, Math.log(beer.ratingsCount) * 2);
      if (beer.ratingsCount > 50) {
        reasons.push('Muy popular');
      }
    }

    // Factor 8: Similar a favoritas (0-20 puntos)
    const similarityScore = this.calculateSimilarity(beer, userPreferences.favoriteBeers);
    if (similarityScore > 0) {
      score += similarityScore;
      reasons.push('Similar a tus favoritas');
    }

    return {
      beer,
      score: Math.round(score),
      reasons
    };
  },

  /**
   * Calcular similitud con cervezas favoritas
   */
  calculateSimilarity(beer: any, favoriteBeers: any[]): number {
    if (favoriteBeers.length === 0) return 0;

    let maxSimilarity = 0;

    for (const favorite of favoriteBeers) {
      let similarity = 0;

      // Mismo estilo = alto peso
      if (beer.style === favorite.style) similarity += 10;

      // Mismo país = peso medio
      if (beer.country === favorite.country) similarity += 5;

      // IBU similar
      if (beer.ibu && favorite.ibu) {
        const ibuDiff = Math.abs(beer.ibu - favorite.ibu);
        similarity += Math.max(0, 5 - (ibuDiff / 20));
      }

      // Alcohol similar
      if (beer.alcoholPercentage && favorite.alcoholPercentage) {
        const alcoholDiff = Math.abs(beer.alcoholPercentage - favorite.alcoholPercentage);
        similarity += Math.max(0, 5 - alcoholDiff);
      }

      maxSimilarity = Math.max(maxSimilarity, similarity);
    }

    return maxSimilarity;
  },

  /**
   * Obtener cervezas similares a una específica
   */
  async getSimilarBeers(beerId: string, limit: number = 5): Promise<any[]> {
    try {
      const beerResponse = await client.models.Beer.get({ id: beerId });
      if (!beerResponse.data) return [];

      const targetBeer = beerResponse.data;

      // Obtener todas las cervezas
      const beersResponse = await client.models.Beer.list();
      const allBeers = (beersResponse.data || []).filter(b => b.id !== beerId);

      // Calcular similitud
      const scored = allBeers.map(beer => {
        let score = 0;

        if (beer.style === targetBeer.style) score += 50;
        if (beer.country === targetBeer.country) score += 20;
        if (beer.color === targetBeer.color) score += 10;

        if (beer.ibu && targetBeer.ibu) {
          const ibuDiff = Math.abs(beer.ibu - targetBeer.ibu);
          score += Math.max(0, 20 - ibuDiff / 5);
        }

        if (beer.alcoholPercentage && targetBeer.alcoholPercentage) {
          const alcoholDiff = Math.abs(beer.alcoholPercentage - targetBeer.alcoholPercentage);
          score += Math.max(0, 20 - alcoholDiff * 5);
        }

        return { beer, score };
      });

      return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(s => s.beer);

    } catch (error) {
      console.error('Error getting similar beers:', error);
      return [];
    }
  }
};