/**
 * Kiosk-First UI Design Tokens & Inline Styles
 * Adheres to WCAG AAA touch targets (min-height 60px) and instant High-Contrast Mode toggle.
 */

export const getKioskStyles = (isHighContrast = false) => {
  const colors = isHighContrast
    ? {
        bg: '#000000',
        surface: '#121212',
        surfaceBorder: '#FFFF00',
        textPrimary: '#FFFFFF',
        textSecondary: '#FFFF00',
        accent: '#FFFF00',
        accentText: '#000000',
        danger: '#FF0000',
        success: '#00FF00',
        cardBg: '#050505',
        buttonBorder: '3px solid #FFFF00',
      }
    : {
        bg: '#0b132b',
        surface: 'rgba(28, 37, 65, 0.85)',
        surfaceBorder: 'rgba(92, 138, 203, 0.25)',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        accent: '#38bdf8',
        accentText: '#082f49',
        danger: '#ef4444',
        success: '#10b981',
        cardBg: '#1c2541',
        buttonBorder: '1px solid rgba(255, 255, 255, 0.15)',
      };

  return {
    colors,

    container: {
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.textPrimary,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: `'Plus Jakarta Sans', sans-serif`,
      transition: 'background-color 0.25s ease, color 0.25s ease',
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 28px',
      backgroundColor: isHighContrast ? '#000000' : 'rgba(11, 19, 43, 0.95)',
      borderBottom: `2px solid ${colors.surfaceBorder}`,
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    },

    mainContent: {
      flex: 1,
      maxWidth: '1080px',
      width: '100%',
      margin: '0 auto',
      padding: '24px 20px 48px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },

    card: {
      backgroundColor: colors.cardBg,
      border: `2px solid ${colors.surfaceBorder}`,
      borderRadius: '20px',
      padding: '28px',
      boxShadow: isHighContrast ? 'none' : '0 12px 32px -4px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },

    touchButton: {
      minHeight: '64px',
      padding: '16px 24px',
      borderRadius: '16px',
      fontSize: '1.15rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      cursor: 'pointer',
      border: colors.buttonBorder,
      backgroundColor: colors.surface,
      color: colors.textPrimary,
      transition: 'all 0.15s ease-in-out',
      boxShadow: isHighContrast ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.25)',
      userSelect: 'none',
    },

    primaryButton: {
      minHeight: '64px',
      padding: '16px 32px',
      borderRadius: '16px',
      fontSize: '1.25rem',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      cursor: 'pointer',
      border: isHighContrast ? '3px solid #FFFFFF' : 'none',
      backgroundColor: colors.accent,
      color: colors.accentText,
      transition: 'transform 0.1s ease, filter 0.15s ease',
      boxShadow: isHighContrast ? 'none' : '0 8px 24px -2px rgba(56, 189, 248, 0.4)',
    },

    largeInput: {
      minHeight: '64px',
      fontSize: '1.35rem',
      fontWeight: '600',
      padding: '16px 20px',
      borderRadius: '14px',
      border: `2px solid ${colors.surfaceBorder}`,
      backgroundColor: isHighContrast ? '#000000' : 'rgba(15, 23, 42, 0.8)',
      color: colors.textPrimary,
      width: '100%',
      outline: 'none',
      boxSizing: 'border-box',
    },

    pillOption: {
      minHeight: '58px',
      padding: '12px 22px',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      backgroundColor: isHighContrast ? '#000' : 'rgba(56, 189, 248, 0.12)',
      color: isHighContrast ? '#FFFF00' : '#7dd3fc',
      border: `2px solid ${isHighContrast ? '#FFFF00' : 'rgba(56, 189, 248, 0.4)'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.15s ease',
    },

    micButton: {
      width: '84px',
      height: '84px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: isHighContrast ? '4px solid #FFFF00' : 'none',
      boxShadow: isHighContrast ? 'none' : '0 0 28px rgba(56, 189, 248, 0.6)',
      transition: 'transform 0.15s ease',
    },

    stepIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '24px',
      backgroundColor: isHighContrast ? '#111' : 'rgba(255, 255, 255, 0.08)',
      fontSize: '0.95rem',
      fontWeight: '600',
    },
  };
};
