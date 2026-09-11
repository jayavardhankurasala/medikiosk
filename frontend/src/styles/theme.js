/**
 * MediKiosk Design System Theme Tokens
 * Supports Light, Dark, and High-Contrast modes
 */

export const getTheme = (mode = 'light') => {
  if (mode === 'contrast') {
    return {
      mode: 'contrast',
      colors: {
        primary: '#FFFF00',
        primaryDark: '#CCCC00',
        secondaryAccent: '#FFFFFF',
        background: '#000000',
        surface: '#111111',
        border: '#FFFF00',
        textPrimary: '#FFFFFF',
        textSecondary: '#FFFF00',
        priorityHigh: { bg: '#FF0000', text: '#FFFFFF' },
        priorityNormal: { bg: '#008800', text: '#FFFFFF' },
        white: '#FFFFFF',
        black: '#000000',
      },
      shadows: {
        card: 'none',
        subtle: 'none',
        floating: 'none',
        button: 'none',
      },
      borderRadius: {
        cards: '18px',
        buttons: '14px',
        inputs: '12px',
        badge: '999px',
      },
      typography: {
        fontFamily: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
      },
    };
  }

  if (mode === 'dark') {
    return {
      mode: 'dark',
      colors: {
        primary: '#00C7A6',
        primaryDark: '#00A389',
        secondaryAccent: '#24C1A0',
        background: '#0F172A',
        surface: '#1E293B',
        border: '#334155',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        priorityHigh: { bg: '#7F1D1D', text: '#FECACA' },
        priorityNormal: { bg: '#064E3B', text: '#A7F3D0' },
        white: '#FFFFFF',
        black: '#000000',
      },
      shadows: {
        card: '0 8px 24px rgba(0, 0, 0, 0.4)',
        subtle: '0 2px 8px rgba(0, 0, 0, 0.25)',
        floating: '0 12px 32px rgba(0, 199, 166, 0.2)',
        button: '0 4px 14px rgba(0, 199, 166, 0.3)',
      },
      borderRadius: {
        cards: '18px',
        buttons: '14px',
        inputs: '12px',
        badge: '999px',
      },
      typography: {
        fontFamily: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
      },
    };
  }

  // Default Light Mode (Figma Mint Ice)
  return {
    mode: 'light',
    colors: {
      primary: '#00C7A6', // Mint / Emerald Green
      primaryDark: '#00A389', // Hover / Active
      secondaryAccent: '#24C1A0',
      background: '#E8F7F5', // Soft Ice-Mint / Light Aqua
      surface: '#FFFFFF', // Card Surface
      border: '#E2F1EE', // Divider
      textPrimary: '#1F2937', // Slate / Charcoal
      textSecondary: '#6B7280', // Muted Gray
      priorityHigh: { bg: '#FEE2E2', text: '#DC2626' },
      priorityNormal: { bg: '#DCFCE7', text: '#16A34A' },
      white: '#FFFFFF',
      black: '#000000',
    },
    shadows: {
      card: '0 4px 20px rgba(0, 199, 166, 0.08)',
      subtle: '0 2px 8px rgba(0, 0, 0, 0.05)',
      floating: '0 12px 30px rgba(0, 199, 166, 0.22)',
      button: '0 4px 14px rgba(0, 199, 166, 0.35)',
    },
    borderRadius: {
      cards: '18px',
      buttons: '14px',
      inputs: '12px',
      badge: '999px',
    },
    typography: {
      fontFamily: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    },
  };
};

export const theme = getTheme('light');

export const getStyles = (themeObj) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: themeObj.colors.background,
    fontFamily: themeObj.typography.fontFamily,
    color: themeObj.colors.textPrimary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    overflowX: 'hidden',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },

  kioskCard: {
    backgroundColor: themeObj.colors.surface,
    borderRadius: themeObj.borderRadius.cards,
    padding: '36px 32px',
    boxShadow: themeObj.shadows.card,
    border: themeObj.mode === 'contrast' ? '3px solid #FFFF00' : `1px solid ${themeObj.colors.border}`,
    width: '100%',
    maxWidth: '560px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    transition: 'all 0.2s ease',
  },

  primaryButton: {
    minHeight: '60px',
    padding: '16px 28px',
    borderRadius: themeObj.borderRadius.buttons,
    backgroundColor: themeObj.colors.primary,
    color: themeObj.mode === 'contrast' ? '#000000' : '#FFFFFF',
    fontSize: '1.15rem',
    fontWeight: '600',
    border: themeObj.mode === 'contrast' ? '2px solid #FFFFFF' : 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    boxShadow: themeObj.shadows.button,
    transition: 'all 0.18s ease-in-out',
    fontFamily: themeObj.typography.fontFamily,
  },

  outlineButton: {
    minHeight: '56px',
    padding: '14px 24px',
    borderRadius: themeObj.borderRadius.buttons,
    backgroundColor: 'transparent',
    color: themeObj.colors.primaryDark,
    fontSize: '1.05rem',
    fontWeight: '600',
    border: `2px solid ${themeObj.colors.primary}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.18s ease-in-out',
    fontFamily: themeObj.typography.fontFamily,
  },

  largeInput: {
    minHeight: '58px',
    padding: '14px 18px',
    borderRadius: themeObj.borderRadius.inputs,
    border: themeObj.mode === 'contrast' ? '2px solid #FFFF00' : `1.5px solid ${themeObj.colors.border}`,
    fontSize: '1.1rem',
    backgroundColor: themeObj.mode === 'dark' ? '#0F172A' : '#FFFFFF',
    color: themeObj.colors.textPrimary,
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: themeObj.typography.fontFamily,
    transition: 'border-color 0.18s ease',
  },

  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: themeObj.colors.textPrimary,
    margin: 0,
    lineHeight: 1.25,
  },

  subtitle: {
    fontSize: '1rem',
    color: themeObj.colors.textSecondary,
    margin: 0,
    fontWeight: '400',
    lineHeight: 1.5,
  },
});

export const styles = getStyles(theme);
