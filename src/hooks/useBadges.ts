import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { UserBadge, Badge } from '../types';

const client = generateClient<Schema>();

export const useBadges = (userId?: string) => {
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadUserBadges();
    }
  }, [userId]);

  const loadUserBadges = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await client.models.UserBadge.list({
        filter: { userId: { eq: userId } }
      });

      setUserBadges(response.data as any || []);
    } catch (err) {
      setError('Error al cargar galardones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkAndAwardBadges = async (activityType: string, count: number) => {
    // Logic to check if user deserves a new badge level
    // This would be called after completing activities
    try {
      const badges = await client.models.Badge.list({
        filter: { category: { eq: activityType } }
      });

      // Check each badge's levels and award if threshold is met
      // Implementation depends on badge structure
    } catch (err) {
      console.error('Error checking badges:', err);
    }
  };

  return {
    userBadges,
    loading,
    error,
    loadUserBadges,
    checkAndAwardBadges
  };
};