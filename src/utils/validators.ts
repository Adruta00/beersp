import {
  MIN_AGE,
  MIN_PASSWORD_LENGTH,
  MAX_BIO_LENGTH,
  MAX_COMMENT_LENGTH,
  MIN_IBU,
  MAX_IBU,
  MIN_ALCOHOL,
  MAX_ALCOHOL,
  MAX_IMAGE_SIZE,
  ALLOWED_IMAGE_TYPES,
  ERROR_MESSAGES,
} from './constants';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return null;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) {
    return ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
  }
  return null;
};

export const validateAge = (birthdate: string | Date): string | null => {
  const birth = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;

  if (isNaN(birth.getTime())) {
    return ERROR_MESSAGES.INVALID_DATE;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < MIN_AGE) {
    return ERROR_MESSAGES.UNDER_AGE;
  }

  return null;
};

export const validateBio = (bio: string): string | null => {
  if (bio && bio.length > MAX_BIO_LENGTH) {
    return ERROR_MESSAGES.BIO_TOO_LONG;
  }
  return null;
};

export const validateComment = (comment: string): string | null => {
  if (!comment || comment.trim().length === 0) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (comment.length > MAX_COMMENT_LENGTH) {
    return ERROR_MESSAGES.COMMENT_TOO_LONG;
  }
  return null;
};

export const validateRating = (rating: number): string | null => {
  if (rating < 0 || rating > 5) {
    return ERROR_MESSAGES.INVALID_RATING;
  }
  return null;
};

export const validateIBU = (ibu: number): string | null => {
  if (ibu < MIN_IBU || ibu > MAX_IBU) {
    return `El IBU debe estar entre ${MIN_IBU} y ${MAX_IBU}`;
  }
  return null;
};

export const validateAlcohol = (alcohol: number): string | null => {
  if (alcohol < MIN_ALCOHOL || alcohol > MAX_ALCOHOL) {
    return `El porcentaje de alcohol debe estar entre ${MIN_ALCOHOL} y ${MAX_ALCOHOL}`;
  }
  return null;
};

export const validateImage = (file: File): string | null => {
  if (file.size > MAX_IMAGE_SIZE) {
    return ERROR_MESSAGES.IMAGE_TOO_LARGE;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return ERROR_MESSAGES.INVALID_IMAGE_TYPE;
  }

  return null;
};

export const validateRequired = (value: any, fieldName: string = 'Campo'): string | null => {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    return `${fieldName} es obligatorio`;
  }
  return null;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};