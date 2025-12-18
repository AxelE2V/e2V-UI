// ============================================================================
// eco₂Veritas - Design Tokens
// ============================================================================
// Simplified color system:
// - ACTION: Red (#C44D4D) - Non-conformant, requires immediate action
// - SUCCESS: Green (#2D7A5E) - Completed, verified, conformant
// - NEUTRAL: Gray - Everything else (discreet)
// - BRAND: Deep blue sidebar + Cream background
// ============================================================================

export const tokens = {
  colors: {
    // Brand - Deep blue for eco2Veritas identity
    brand: {
      900: '#0A1628',
      800: '#0F2137',
      700: '#152A46',
      600: '#1B3A5C',  // Primary deep blue
      500: '#2A4A7A',
      400: '#3D6098',
    },
    // Background - Cream tones for readability
    cream: {
      50: '#FFFEF9',
      100: '#FDF9F3',
      200: '#F8F3EA',
      300: '#F2EBE0',
      400: '#E8DFD0',
      500: '#D4C8B5',
    },
    // Primary action button color
    accent: {
      main: '#1B3A5C',
      light: '#3D6098',
      pale: '#E8F0F8',
    },
    // Text colors
    text: {
      primary: '#1A2332',
      secondary: '#4A5568',
      muted: '#718096',
      inverse: '#FFFFFF',
    },
    // STATUS: Completed/Verified/Conformant (satisfaction)
    success: {
      main: '#2D7A5E',
      light: '#E5F2EC',
      dark: '#1D5A42',
    },
    // STATUS: Action required (non-conformant OR pending action needed)
    action: {
      main: '#C44D4D',
      light: '#FDECEC',
      dark: '#A33D3D',
    },
    // Aliases for backward compatibility
    warning: {
      main: '#C44D4D',
      light: '#FDECEC',
    },
    danger: {
      main: '#C44D4D',
      light: '#FDECEC',
    },
    // Neutral/informational (discreet)
    neutral: {
      main: '#718096',
      light: '#EDF2F7',
      dark: '#4A5568',
    },
    info: {
      main: '#718096',
      light: '#EDF2F7',
    },
    // Legacy navy alias
    navy: {
      900: '#0A1628',
      800: '#0F2137',
      700: '#152A46',
      600: '#1B3A5C',
      500: '#2A4A7A',
    },
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '14px',
    '2xl': '16px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(10,22,40,0.08)',
    md: '0 4px 12px rgba(10,22,40,0.10)',
    lg: '0 8px 24px rgba(10,22,40,0.14)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  typography: {
    fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: {
      xs: '11px',
      sm: '12px',
      base: '13px',
      md: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '24px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
  zIndex: {
    dropdown: 100,
    sticky: 200,
    modal: 1000,
    tooltip: 1100,
  },
} as const;

// Type exports for token values
export type TokenColors = typeof tokens.colors;
export type TokenRadius = typeof tokens.radius;
export type TokenShadow = typeof tokens.shadow;
