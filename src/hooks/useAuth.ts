import { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { UserProfile } from '../types';

const client = generateClient<Schema>();

export const useAuth = () => {
  const { user, signOut } = useAuthenticator();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setUserProfile(null);
      setLoading(false);
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await client.models.UserProfile.get({
        userId: user.userId
      });

      if (response.data) {
        setUserProfile(response.data as any);
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return;

    setLoading(true);
    setError(null);

    try {
      const response = await client.models.UserProfile.update({
        userId: userProfile.userId,
        ...updates,
      });

      if (response.data) {
        setUserProfile(response.data as any);
        return { success: true };
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Error al actualizar el perfil');
      return { success: false, error: 'Error al actualizar el perfil' };
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = () => {
    loadUserProfile();
  };

  return {
    user,
    userProfile,
    loading,
    error,
    signOut,
    updateProfile,
    refreshProfile,
    isAuthenticated: !!user,
  };
};