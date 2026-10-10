import { Platform } from 'react-native';

export const colors = {
  primary: '#0F766E',
  primaryDark: '#0B5A54',
  primarySoft: '#E6F4F2',
  accent: '#F59E0B',
  bg: '#F6F7F9',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  warn: '#B45309',
  warnSoft: '#FEF3C7',
  star: '#F59E0B',
};

export const radius = { sm: 8, md: 12, lg: 18, pill: 999 };

export const shadow = Platform.select({
  web: { boxShadow: '0 4px 16px rgba(17,24,39,0.08)' },
  default: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});

export const MAX_WIDTH = 1120;
