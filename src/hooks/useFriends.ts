import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { Friendship, UserProfile } from '../types';

const client = generateClient<Schema>();

export const useFriends = (userId?: string) => {
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [friendRequests, setFriendRequests] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadFriends();
      loadFriendRequests();
    }
  }, [userId]);

  const loadFriends = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await client.models.Friendship.list({
        filter: {
          or: [
            { requesterId: { eq: userId }, status: { eq: 'ACCEPTED' } },
            { receiverId: { eq: userId }, status: { eq: 'ACCEPTED' } }
          ]
        }
      });

      // Extract friend profiles
      const friendProfiles: UserProfile[] = [];
      for (const friendship of response.data || []) {
        const friendId = friendship.requesterId === userId
          ? friendship.receiverId
          : friendship.requesterId;

        const profile = await client.models.UserProfile.get({ userId: friendId });
        if (profile.data) {
          friendProfiles.push(profile.data as any);
        }
      }

      setFriends(friendProfiles);
    } catch (err) {
      setError('Error al cargar amigos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFriendRequests = async () => {
    if (!userId) return;

    try {
      const response = await client.models.Friendship.list({
        filter: {
          receiverId: { eq: userId },
          status: { eq: 'PENDING' }
        }
      });

      setFriendRequests(response.data as any || []);
    } catch (err) {
      console.error('Error loading friend requests:', err);
    }
  };

  const sendFriendRequest = async (receiverId: string) => {
    if (!userId) return { success: false };

    setLoading(true);
    try {
      await client.models.Friendship.create({
        requesterId: userId,
        receiverId,
        status: 'PENDING'
      });

      return { success: true };
    } catch (err) {
      setError('Error al enviar solicitud');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    setLoading(true);
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'ACCEPTED'
      });

      await loadFriends();
      await loadFriendRequests();
      return { success: true };
    } catch (err) {
      setError('Error al aceptar solicitud');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    setLoading(true);
    try {
      await client.models.Friendship.update({
        id: requestId,
        status: 'REJECTED'
      });

      await loadFriendRequests();
      return { success: true };
    } catch (err) {
      setError('Error al rechazar solicitud');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    setLoading(true);
    try {
      const response = await client.models.UserProfile.list({
        filter: {
          or: [
            { username: { contains: query } },
            { email: { contains: query } }
          ]
        }
      });

      return response.data || [];
    } catch (err) {
      setError('Error en la búsqueda');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    friends,
    friendRequests,
    loading,
    error,
    loadFriends,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    searchUsers
  };
};