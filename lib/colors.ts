/**
 * AviTrack Color Palette
 * Professional Blue & Gray design system
 */

export const colors = {
  // Primary Blue - Trust, Corporate
  primary: {
    50: '#F0F7FF',
    100: '#E0EFFE',
    200: '#BAD9FF',
    300: '#7DC3FF',
    400: '#36AAFF',
    500: '#1E88E5',
    600: '#0E5AA4',
    700: '#0A3F7C',
    800: '#082A59',
    900: '#051A39',
  },

  // Secondary Blue - Action, Highlights
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#1E88E5',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
  },

  // Neutral Gray
  gray: {
    25: '#FAFBFC',
    50: '#F1F5F9',
    100: '#E2E8F0',
    150: '#D4DCE6',
    200: '#CBD5E1',
    300: '#94A3B8',
    400: '#64748B',
    500: '#475569',
    600: '#334155',
    700: '#1E293B',
    800: '#0F172A',
    900: '#020617',
  },

  // Success Green - Healthy birds, success
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#10B981',
    700: '#059669',
    800: '#047857',
  },

  // Warning Orange - Caution, withdrawal periods
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
  },

  // Error Red - Alerts, mortality
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#F87171',
    600: '#EF4444',
    700: '#DC2626',
    800: '#991B1B',
  },

  // Semantic
  background: '#FFFFFF',
  foreground: '#1E293B',
  border: '#E2E8F0',
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
}

export type ColorType = typeof colors
