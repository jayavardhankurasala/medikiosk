import React from 'react';
import { User, Activity, Stethoscope, ShieldCheck, ChevronRight } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen6RoleSelect({ onSelectRole }) {
  const { t } = useLanguage();

  const roles = [
    {
      id: 'patient',
      title: t.roles?.patient?.title || 'Patient',
      desc: t.roles?.patient?.desc || 'Start your health intake',
      icon: User,
      color: '#00C7A6',
      bgColor: '#E8F7F5',
    },
    {
      id: 'nurse',
      title: t.roles?.nurse?.title || 'Nurse',
      desc: t.roles?.nurse?.desc || 'Record vitals & manage queue',
      icon: Activity,
      color: '#2563EB',
      bgColor: '#EFF6FF',
    },
    {
      id: 'doctor',
      title: t.roles?.doctor?.title || 'Doctor',
      desc: t.roles?.doctor?.desc || 'View patient summaries',
      icon: Stethoscope,
      color: '#7C3AED',
      bgColor: '#F5F3FF',
    },
    {
      id: 'admin',
      title: t.roles?.admin?.title || 'Admin',
      desc: t.roles?.admin?.desc || 'System management',
      icon: ShieldCheck,
      color: '#D97706',
      bgColor: '#FFFBEB',
    },
  ];

  return (
    <div style={styles.kioskCard}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.title}>{t.headings.roleSelect || 'Who are you?'}</h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {t.subtitles.roleSelect || 'Select your portal to continue'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              style={{
                minHeight: '74px',
                borderRadius: theme.borderRadius.cards,
                backgroundColor: '#FFFFFF',
                border: `1.5px solid ${theme.colors.border}`,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: theme.shadows.subtle,
                transition: 'all 0.16s ease-in-out',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: role.bgColor,
                    color: role.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={24} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: theme.colors.textPrimary }}>
                    {role.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: theme.colors.textSecondary }}>
                    {role.desc}
                  </div>
                </div>
              </div>

              <ChevronRight size={22} color={theme.colors.textSecondary} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
