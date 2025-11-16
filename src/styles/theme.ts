export const theme = {
  colors: {
    primary: '#D4A574',
    primaryDark: '#B8854F',
    primaryLight: '#E8C9A0',
    secondary: '#8B6F47',
    accent: '#E8B86D',
    background: '#FFF8F0',
    surface: '#FFFFFF',
    surfaceDark: '#F5E6D3',
    text: '#2C2C2C',
    textSecondary: '#666666',
    textLight: '#999999',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
    info: '#1976D2',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export type Theme = typeof theme;