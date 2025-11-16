import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // User Profile (extiende Cognito)
  UserProfile: a
    .model({
      userId: a.string().required(),
      username: a.string().required(),
      email: a.email().required(),
      birthdate: a.date().required(),
      fullName: a.string(),
      lastName: a.string(),
      photo: a.string(),
      location: a.string(),
      bio: a.string(),
      gender: a.string(),
      tastingsCount: a.integer().default(0),
      venuesAdded: a.integer().default(0),
      lastSevenDaysTastings: a.integer().default(0),
      lastSevenDaysVenues: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'update', 'delete']),
      allow.authenticated().to(['read', 'create']),
      allow.publicApiKey().to(['read']),
    ]),

  // Beer
  Beer: a
    .model({
      name: a.string().required(),
      style: a.string().required(),
      country: a.string().required(),
      description: a.string(),
      photo: a.string(),
      alcoholPercentage: a.float(),
      ibu: a.integer(),
      color: a.string().required(),
      averageRating: a.float().default(0),
      ratingsCount: a.integer().default(0),
      addedById: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['create', 'read']),
      allow.publicApiKey().to(['read']),
    ]),

  // Venue (Local/Cervecería)
  Venue: a
    .model({
      name: a.string().required(),
      address: a.string().required(),
      city: a.string(),
      country: a.string(),
      latitude: a.float(),
      longitude: a.float(),
      likes: a.integer().default(0),
      addedById: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['create', 'read']),
      allow.publicApiKey().to(['read']),
    ]),

  // Tasting (Degustación)
  Tasting: a
    .model({
      userId: a.string().required(),
      beerId: a.string().required(),
      venueId: a.string(),
      rating: a.float(),
      size: a.string().required(),
      format: a.string().required(),
      consumptionCountry: a.string().required(),
      consumptionDate: a.datetime().required(),
      liked: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read']),
    ]),

  // Badge (Galardón)
  Badge: a
    .model({
      name: a.string().required(),
      description: a.string(),
      image: a.string(),
      category: a.string().required(),
      levels: a.json().required(),
      createdBy: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read']),
    ]),

  // UserBadge (Galardón del Usuario)
  UserBadge: a
    .model({
      userId: a.string().required(),
      badgeId: a.string().required(),
      level: a.integer().required(),
      achievedAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create']),
      allow.authenticated().to(['read']),
      allow.publicApiKey().to(['read']),
    ]),

  // Friendship (Amistad)
  Friendship: a
    .model({
      requesterId: a.string().required(),
      receiverId: a.string().required(),
      status: a.string().required(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
    ]),

  // Comment (Comentario)
  Comment: a
    .model({
      tastingId: a.string().required(),
      authorId: a.string().required(),
      content: a.string().required(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});