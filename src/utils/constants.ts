import { BeerStyle, BeerColor, BeerSize, BeerFormat } from '../types';

// Beer Styles
export const BEER_STYLES = [
  { value: 'LAGER', label: 'Lager' },
  { value: 'IPA', label: 'IPA' },
  { value: 'APA', label: 'APA' },
  { value: 'STOUT', label: 'Stout' },
  { value: 'SAISON', label: 'Saison' },
  { value: 'PORTER', label: 'Porter' },
  { value: 'PILSNER', label: 'Pilsner' },
  { value: 'WEISSBIER', label: 'Weissbier' },
  { value: 'SOUR_ALE', label: 'Sour Ale' },
  { value: 'LAMBIC', label: 'Lambic' },
  { value: 'AMBER_ALE', label: 'Amber Ale' },
];

// Beer Colors
export const BEER_COLORS = [
  { value: 'LIGHT_GOLD', label: 'Dorado Claro' },
  { value: 'GOLDEN_YELLOW', label: 'Amarillo Dorado' },
  { value: 'LIGHT_AMBER', label: 'Ámbar Claro' },
  { value: 'DARK_BROWN', label: 'Marrón Oscuro' },
  { value: 'OPAQUE_BLACK', label: 'Negro Opaco' },
];

// Beer Sizes
export const BEER_SIZES = [
  { value: 'PINT', label: 'Pinta' },
  { value: 'HALF_PINT', label: 'Media Pinta' },
  { value: 'THIRD', label: 'Tercio' },
];

// Beer Formats
export const BEER_FORMATS = [
  { value: 'DRAFT', label: 'Barril' },
  { value: 'CAN', label: 'Lata' },
  { value: 'BOTTLE', label: 'Botella' },
];

// Countries (most common beer producing countries)
export const COUNTRIES = [
  { value: 'ES', label: 'España' },
  { value: 'DE', label: 'Alemania' },
  { value: 'BE', label: 'Bélgica' },
  { value: 'US', label: 'Estados Unidos' },
  { value: 'GB', label: 'Reino Unido' },
  { value: 'IE', label: 'Irlanda' },
  { value: 'CZ', label: 'República Checa' },
  { value: 'NL', label: 'Países Bajos' },
  { value: 'MX', label: 'México' },
  { value: 'JP', label: 'Japón' },
  { value: 'AU', label: 'Australia' },
  { value: 'FR', label: 'Francia' },
  { value: 'IT', label: 'Italia' },
  { value: 'CA', label: 'Canadá' },
  { value: 'BR', label: 'Brasil' },
  { value: 'AR', label: 'Argentina' },
  { value: 'DK', label: 'Dinamarca' },
  { value: 'NO', label: 'Noruega' },
  { value: 'SE', label: 'Suecia' },
  { value: 'PL', label: 'Polonia' },
].sort((a, b) => a.label.localeCompare(b.label));

// Badge Categories
export const BADGE_CATEGORIES = {
  TASTINGS: 'Degustaciones',
  COUNTRIES: 'Países',
  STYLES: 'Estilos',
  VENUES: 'Locales',
  COMMENTS: 'Comentarios',
};

// Badge Level Thresholds (exponential growth)
export const BADGE_LEVELS = [
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

// Validation constants
export const MIN_AGE = 18;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_BIO_LENGTH = 500;
export const MAX_COMMENT_LENGTH = 500;
export const MIN_IBU = 0;
export const MAX_IBU = 120;
export const MIN_ALCOHOL = 0;
export const MAX_ALCOHOL = 20;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const ACTIVITY_FEED_SIZE = 10;
export const TOP_FRIENDS_COUNT = 5;

// Time constants
export const DAYS_FOR_STATS = 7; // Last 7 days for statistics

// Image upload
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es obligatorio',
  INVALID_EMAIL: 'Email inválido',
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
  UNDER_AGE: `Debes ser mayor de ${MIN_AGE} años`,
  INVALID_DATE: 'Fecha inválida',
  IMAGE_TOO_LARGE: `La imagen no debe superar ${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
  INVALID_IMAGE_TYPE: 'Tipo de imagen no permitido',
  INVALID_RATING: 'La valoración debe estar entre 0 y 5',
  BIO_TOO_LONG: `La biografía no debe superar ${MAX_BIO_LENGTH} caracteres`,
  COMMENT_TOO_LONG: `El comentario no debe superar ${MAX_COMMENT_LENGTH} caracteres`,
};

// Success messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Perfil actualizado correctamente',
  TASTING_ADDED: 'Degustación añadida correctamente',
  FRIEND_REQUEST_SENT: 'Solicitud de amistad enviada',
  FRIEND_REQUEST_ACCEPTED: 'Solicitud de amistad aceptada',
  COMMENT_ADDED: 'Comentario añadido',
  BEER_ADDED: 'Cerveza añadida al sistema',
  VENUE_ADDED: 'Local añadido al sistema',
};