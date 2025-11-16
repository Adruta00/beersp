import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export const api = {
  // Users
  async getUserProfile(userId: string) {
    return await client.models.UserProfile.get({ userId });
  },

  async updateUserProfile(userId: string, updates: any) {
    return await client.models.UserProfile.update({ userId, ...updates });
  },

  // Beers
  async searchBeers(query: string) {
    return await client.models.Beer.list({
      filter: { name: { contains: query } }
    });
  },

  async getTopRatedBeers(limit: number = 20) {
    const response = await client.models.Beer.list();
    return (response.data || [])
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, limit);
  },

  async getBeer(id: string) {
    return await client.models.Beer.get({ id });
  },

  // Tastings
  async getTastingsByUser(userId: string) {
    return await client.models.Tasting.list({
      filter: { userId: { eq: userId } }
    });
  },

  async getFriendsTastings(friendIds: string[]) {
    const tastings = [];
    for (const friendId of friendIds) {
      const response = await client.models.Tasting.list({
        filter: { userId: { eq: friendId } },
        limit: 5
      });
      tastings.push(...(response.data || []));
    }
    return tastings.sort((a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  },

  // Venues
  async searchVenues(query: string) {
    return await client.models.Venue.list({
      filter: { name: { contains: query } }
    });
  },

  // Comments
  async addComment(tastingId: string, authorId: string, content: string) {
    return await client.models.Comment.create({
      tastingId,
      authorId,
      content
    });
  },

  async getComments(tastingId: string) {
    return await client.models.Comment.list({
      filter: { tastingId: { eq: tastingId } }
    });
  }
};