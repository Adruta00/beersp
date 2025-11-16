import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { Tasting, TastingFormData } from '../types';

const client = generateClient<Schema>();

export const useTastings = (userId?: string) => {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadTastings();
    }
  }, [userId]);

  const loadTastings = async () => {
    setLoading(true);
    setError(null);

    try {
      const filter = userId ? { userId: { eq: userId } } : {};
      const response = await client.models.Tasting.list({ filter });

      if (response.data) {
        setTastings(response.data as any);
      }
    } catch (err) {
      console.error('Error loading tastings:', err);
      setError('Error al cargar las degustaciones');
    } finally {
      setLoading(false);
    }
  };

  const createTasting = async (data: TastingFormData) => {
    setLoading(true);
    setError(null);

    try {
      // If new beer, create it first
      let beerId = data.beerId;

      if (!beerId && data.newBeerName) {
        const beerResponse = await client.models.Beer.create({
          name: data.newBeerName,
          style: data.newBeerStyle!,
          country: data.newBeerCountry!,
          description: data.newBeerDescription,
          alcoholPercentage: data.newBeerAlcoholPercentage,
          ibu: data.newBeerIbu,
          color: data.newBeerColor!,
        });

        if (beerResponse.data) {
          beerId = beerResponse.data.id;
        }
      }

      // If new venue, create it first
      let venueId = data.venueId;

      if (!venueId && data.newVenueName) {
        const venueResponse = await client.models.Venue.create({
          name: data.newVenueName,
          address: data.newVenueAddress!,
        });

        if (venueResponse.data) {
          venueId = venueResponse.data.id;
        }
      }

      // Create tasting
      const tastingResponse = await client.models.Tasting.create({
        beerId: beerId!,
        venueId,
        rating: data.rating,
        size: data.size,
        format: data.format,
        consumptionCountry: data.consumptionCountry,
        consumptionDate: new Date().toISOString(),
        liked: data.liked,
      });

      if (tastingResponse.data) {
        await loadTastings(); // Refresh list
        return { success: true, data: tastingResponse.data };
      }
    } catch (err) {
      console.error('Error creating tasting:', err);
      setError('Error al crear la degustación');
      return { success: false, error: 'Error al crear la degustación' };
    } finally {
      setLoading(false);
    }
  };

  const deleteTasting = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await client.models.Tasting.delete({ id });
      await loadTastings(); // Refresh list
      return { success: true };
    } catch (err) {
      console.error('Error deleting tasting:', err);
      setError('Error al eliminar la degustación');
      return { success: false, error: 'Error al eliminar la degustación' };
    } finally {
      setLoading(false);
    }
  };

  const getTasting = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await client.models.Tasting.get({ id });
      return response.data;
    } catch (err) {
      console.error('Error getting tasting:', err);
      setError('Error al cargar la degustación');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    tastings,
    loading,
    error,
    loadTastings,
    createTasting,
    deleteTasting,
    getTasting,
  };
};