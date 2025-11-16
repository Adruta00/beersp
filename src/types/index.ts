// Enums
export enum BeerStyle {
  LAGER = 'Lager',
  IPA = 'IPA',
  APA = 'APA',
  STOUT = 'Stout',
  SAISON = 'Saison',
  PORTER = 'Porter',
  PILSNER = 'Pilsner',
  WEISSBIER = 'Weissbier',
  SOUR_ALE = 'Sour Ale',
  LAMBIC = 'Lambic',
  AMBER_ALE = 'Amber Ale',
}

export enum BeerColor {
  LIGHT_GOLD = 'Dorado Claro',
  GOLDEN_YELLOW = 'Amarillo Dorado',
  LIGHT_AMBER = 'Ámbar Claro',
  DARK_BROWN = 'Marrón Oscuro',
  OPAQUE_BLACK = 'Negro Opaco',
}

export enum BeerSize {
  PINT = 'Pinta',
  HALF_PINT = 'Media Pinta',
  THIRD = 'Tercio',
}

export enum BeerFormat {
  DRAFT = 'Barril',
  CAN = 'Lata',
  BOTTLE = 'Botella',
}

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum BadgeCategory {
  TASTINGS = 'TASTINGS',
  COUNTRIES = 'COUNTRIES',
  STYLES = 'STYLES',
  VENUES = 'VENUES',
  COMMENTS = 'COMMENTS',
}

// Interfaces
export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  birthdate: string;
  fullName?: string;
  lastName?: string;
  photo?: string;
  location?: string;
  bio?: string;
  gender?: string;
  tastingsCount: number;
  venuesAdded: number;
  lastSevenDaysTastings: number;
  lastSevenDaysVenues: number;
  createdAt: string;
  updatedAt: string;
}

export interface Beer {
  id: string;
  name: string;
  style: BeerStyle;
  country: string;
  description?: string;
  photo?: string;
  alcoholPercentage?: number;
  ibu?: number;
  color: BeerColor;
  averageRating: number;
  ratingsCount: number;
  addedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  likes: number;
  addedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tasting {
  id: string;
  userId: string;
  beerId: string;
  venueId?: string;
  rating?: number;
  size: BeerSize;
  format: BeerFormat;
  consumptionCountry: string;
  consumptionDate: string;
  liked: boolean;
  beer?: Beer;
  venue?: Venue;
  user?: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category: BadgeCategory;
  levels: BadgeLevel[];
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BadgeLevel {
  level: number;
  threshold: number;
  name: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  level: number;
  achievedAt: string;
  badge?: Badge;
}

export interface Friendship {
  id: string;
  requesterId: string;
  receiverId: string;
  status: FriendshipStatus;
  requester?: UserProfile;
  receiver?: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  tastingId: string;
  authorId: string;
  content: string;
  author?: UserProfile;
  createdAt: string;
  updatedAt: string;
}

// Form Types
export interface RegisterFormData {
  birthdate: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  fullName?: string;
  lastName?: string;
  location?: string;
  bio?: string;
}

export interface TastingFormData {
  beerId?: string;
  newBeerName?: string;
  newBeerStyle?: BeerStyle;
  newBeerCountry?: string;
  newBeerDescription?: string;
  newBeerPhoto?: File;
  newBeerAlcoholPercentage?: number;
  newBeerIbu?: number;
  newBeerColor?: BeerColor;
  rating?: number;
  size: BeerSize;
  format: BeerFormat;
  consumptionCountry: string;
  venueId?: string;
  newVenueName?: string;
  newVenueAddress?: string;
  liked: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextToken?: string;
  total?: number;
}

// Activity Feed
export interface Activity {
  id: string;
  type: 'tasting' | 'badge' | 'friend' | 'comment';
  userId: string;
  user: UserProfile;
  data: Tasting | UserBadge | Friendship | Comment;
  createdAt: string;
}