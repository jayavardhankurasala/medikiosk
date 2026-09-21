import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, HeartPulse, Sun, Moon, Eye, Shield, Users, Stethoscope, ChevronDown, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function KioskLayout({
  children,
  onBack,
  showBack = true,
  currentLanguageCode,
  currentLanguageName,
  onLanguageClick,
  onRoleSelect,
  themeMode = 'light',
  onToggleTheme,
  themeObj,
  patient,
  onProfileClick,
}) {
  const { language, t, languages } = useLanguage();
  const [staffMenuOpen, setStaffMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const activeLangCode = currentLanguageCode || language;
  const activeLangName = currentLanguageName || (languages.find((l) => l.id === activeLangCode)?.name || 'English');

  const staffRef = useRef(null);
  const themeRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (staffRef.current && !staffRef.current.contains(e.target)) {
        setStaffMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: themeObj.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 16px 40px 16px',
        boxSizing: 'border-box',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          width: '100%',
          maxWidth: '780px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0 16px 0',
          position: 'relative',
          zIndex: 40,
        }}
      >
        {/* Left: Top-Left Profile Picture + Back Arrow + MediKiosk Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Absolute Top-Left Circular Profile Picture / User Icon */}
          <button
            onClick={onProfileClick}
            title="Patient Profile & Settings (Edit Demographics / Retake Photo)"
            aria-label="Open Profile Settings"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              padding: 0,
              backgroundColor: themeObj.colors.surface,
              border: `2.5px solid ${themeObj.colors.primary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: onProfileClick ? 'pointer' : 'default',
              overflow: 'hidden',
              boxShadow: themeObj.shadows.subtle,
              flexShrink: 0,
              outline: 'none',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            {patient?.profilePhotoUrl ? (
              <img
                src={patient.profilePhotoUrl}
                alt={patient.name || 'Patient'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <User size={22} color={themeObj.colors.primaryDark || themeObj.colors.primary} />
            )}
          </button>

          {showBack && onBack ? (
            <button
              onClick={onBack}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: themeObj.colors.surface,
                border: `1px solid ${themeObj.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: themeObj.colors.textPrimary,
                boxShadow: themeObj.shadows.subtle,
              }}
            >
              <ArrowLeft size={22} />
            </button>
          ) : null}

          {/* MediKiosk Emblem & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: themeObj.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: themeObj.mode === 'contrast' ? '#000000' : '#FFFFFF',
                boxShadow: '0 4px 10px rgba(0, 199, 166, 0.3)',
              }}
            >
              <HeartPulse size={22} />
            </div>
            <div>
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: '700',
                  color: themeObj.colors.textPrimary,
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                MediKiosk
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: themeObj.colors.textSecondary,
                  fontWeight: '500',
                }}
              >
                {t.brandSubtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls: Theme Toggle + Staff Login + Language Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* 1. Theme Toggle Dropdown */}
          <div ref={themeRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              title="Change Theme Mode"
              style={{
                padding: '8px 12px',
                borderRadius: themeObj.borderRadius.badge,
                backgroundColor: themeObj.colors.surface,
                border: `1px solid ${themeObj.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                color: themeObj.colors.textPrimary,
                fontWeight: '600',
                fontSize: '0.85rem',
                boxShadow: themeObj.shadows.subtle,
              }}
            >
              {themeMode === 'light' && <Sun size={16} color="#F59E0B" />}
              {themeMode === 'dark' && <Moon size={16} color="#38BDF8" />}
              {themeMode === 'contrast' && <Eye size={16} color="#FFFF00" />}
              <span style={{ textTransform: 'capitalize' }}>{themeMode}</span>
            </button>

            {themeMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: themeObj.colors.surface,
                  border: `1px solid ${themeObj.colors.border}`,
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '150px',
                  overflow: 'hidden',
                  zIndex: 50,
                }}
              >
                {[
                  { id: 'light', label: t.themeLight, icon: Sun, color: '#F59E0B' },
                  { id: 'dark', label: t.themeDark, icon: Moon, color: '#38BDF8' },
                  { id: 'contrast', label: t.themeContrast, icon: Eye, color: '#FFFF00' },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onToggleTheme(m.id);
                        setThemeMenuOpen(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        border: 'none',
                        backgroundColor: themeMode === m.id ? 'rgba(0, 199, 166, 0.12)' : 'transparent',
                        color: themeObj.colors.textPrimary,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: themeMode === m.id ? '700' : '500',
                        textAlign: 'left',
                      }}
                    >
                      <Icon size={16} color={m.color} />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Staff Login Dropdown */}
          <div ref={staffRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setStaffMenuOpen(!staffMenuOpen)}
              style={{
                padding: '8px 14px',
                borderRadius: themeObj.borderRadius.badge,
                backgroundColor: 'transparent',
                border: `1.5px solid ${themeObj.colors.primary}`,
                color: themeObj.colors.primaryDark,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
              }}
            >
              <Shield size={14} color={themeObj.colors.primary} />
              <span>{t.staffLogin}</span>
              <ChevronDown size={14} />
            </button>

            {staffMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: themeObj.colors.surface,
                  border: `1px solid ${themeObj.colors.border}`,
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '180px',
                  overflow: 'hidden',
                  zIndex: 50,
                }}
              >
                <div style={{ padding: '8px 14px', fontSize: '0.75rem', fontWeight: '700', color: themeObj.colors.textSecondary, borderBottom: `1px solid ${themeObj.colors.border}` }}>
                  CLINICAL PORTALS
                </div>
                {[
                  { id: 'nurse', label: 'Nurse Triage', icon: Users, color: '#2563EB' },
                  { id: 'doctor', label: 'Allopathic Doctor', icon: Stethoscope, color: '#7C3AED' },
                  { id: 'ayush', label: 'AYUSH Specialist', icon: Stethoscope, color: '#059669' },
                  { id: 'admin', label: 'Admin & Audit', icon: Shield, color: '#D97706' },
                ].map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        setStaffMenuOpen(false);
                        onRoleSelect(role.id);
                      }}
                      style={{
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: themeObj.colors.textPrimary,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textAlign: 'left',
                      }}
                    >
                      <Icon size={16} color={role.color} />
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Language Selector Pill */}
          <button
            onClick={onLanguageClick}
            style={{
              padding: '8px 14px',
              borderRadius: themeObj.borderRadius.badge,
              backgroundColor: themeObj.colors.surface,
              border: `1px solid ${themeObj.colors.border}`,
              fontSize: '0.88rem',
              fontWeight: '600',
              color: themeObj.colors.primaryDark,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: themeObj.shadows.subtle,
            }}
          >
            <Globe size={15} color={themeObj.colors.primary} />
            <span>{activeLangName}</span>
          </button>
        </div>
      </header>

      {/* Main Screen Body */}
      <main
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '12px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
