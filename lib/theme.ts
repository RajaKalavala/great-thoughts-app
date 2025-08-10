export type ThemeTag =
  | 'stoicism'
  | 'mindfulness'
  | 'gratitude'
  | 'growth'
  | 'joy'

export type ThemeMode = 'light' | 'dark'

export const palette = {
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#1a1a1a',
    mutedText: '#6b7280',
    border: '#e5e7eb',
    card: 'rgba(255, 255, 255, 0.9)',
  },
  dark: {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#f9fafb',
    mutedText: '#9ca3af',
    border: '#374151',
    card: 'rgba(26, 26, 26, 0.9)',
  },
}

export const themeBackgrounds: Record<
  ThemeTag,
  { start: string; end: string }
> = {
  stoicism: { start: '#0f172a', end: '#1e293b' }, // deep slate
  mindfulness: { start: '#0e7490', end: '#14b8a6' }, // calm aqua
  gratitude: { start: '#b45309', end: '#f59e0b' }, // warm amber
  growth: { start: '#065f46', end: '#10b981' }, // fresh green
  joy: { start: '#6d28d9', end: '#ec4899' }, // playful violet→pink
}

export const typography = {
  // Base unit: 16px
  headline: 32, // Large quote text
  title: 24,
  body: 16,
  caption: 14,
  meta: 12,
}

export function scaleTypography(scale: number) {
  return {
    headline: Math.round(typography.headline * scale),
    title: Math.round(typography.title * scale),
    body: Math.round(typography.body * scale),
    caption: Math.round(typography.caption * scale),
    meta: Math.round(typography.meta * scale),
  } as const
}

export function getColors(mode: ThemeMode) {
  return palette[mode]
}

// Get effective theme mode based on user preference and system settings
export function getEffectiveThemeMode(
  userPreference: 'light' | 'dark' | 'system',
  systemColorScheme: 'light' | 'dark' | null
): ThemeMode {
  if (userPreference === 'system') {
    return systemColorScheme || 'light'
  }
  return userPreference
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
}
