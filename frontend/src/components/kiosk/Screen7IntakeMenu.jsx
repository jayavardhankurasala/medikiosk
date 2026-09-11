import React from 'react';
import { FileEdit, UploadCloud, FolderClock, Home, ChevronRight, UserCog } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen7IntakeMenu({
  onStartNewVisit,
  onUploadDocsOnly,
  onViewRecords,
  onEditProfile,
  onBackHome,
}) {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 'new_visit',
      title: t.menuItems?.newVisit?.title || 'Start New Visit',
      desc: t.menuItems?.newVisit?.desc || 'Answer a few questions with AI',
      icon: FileEdit,
      iconColor: '#00C7A6',
      iconBg: '#E8F7F5',
      action: onStartNewVisit,
    },
    {
      id: 'upload_docs',
      title: t.menuItems?.uploadDocs?.title || 'Upload Medical Documents',
      desc: t.menuItems?.uploadDocs?.desc || 'Prescriptions, lab reports, discharge summaries',
      icon: UploadCloud,
      iconColor: '#2563EB',
      iconBg: '#EFF6FF',
      action: onUploadDocsOnly,
    },
    {
      id: 'view_records',
      title: t.menuItems?.viewRecords?.title || 'View My Previous Records',
      desc: t.menuItems?.viewRecords?.desc || 'Your ABHA health timeline',
      icon: FolderClock,
      iconColor: '#7C3AED',
      iconBg: '#F5F3FF',
      action: onViewRecords,
    },
    ...(onEditProfile
      ? [
          {
            id: 'edit_profile',
            title: t.menuItems?.editProfile?.title || 'My Profile & Baseline Vitals',
            desc: t.menuItems?.editProfile?.desc || 'Update height, weight & demographic details',
            icon: UserCog,
            iconColor: '#0D9488',
            iconBg: '#CCFBF1',
            action: onEditProfile,
          },
        ]
      : []),
  ];

  return (
    <div style={styles.kioskCard}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.title}>{t.headings.intakeMenu || 'What would you like to do?'}</h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {t.subtitles.intakeMenu || 'Select an option below to proceed'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              style={{
                minHeight: '80px',
                borderRadius: theme.borderRadius.cards,
                backgroundColor: '#FFFFFF',
                border: `1.5px solid ${theme.colors.border}`,
                padding: '18px 20px',
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
                    width: '50px',
                    height: '50px',
                    borderRadius: '16px',
                    backgroundColor: item.iconBg,
                    color: item.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={26} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: theme.colors.textPrimary }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: theme.colors.textSecondary }}>
                    {item.desc}
                  </div>
                </div>
              </div>

              <ChevronRight size={22} color={theme.colors.textSecondary} />
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '8px' }}>
        <button
          onClick={onBackHome}
          style={{ ...styles.outlineButton, width: '100%' }}
        >
          <Home size={18} />
          <span>{t.backToHome || 'Back to Start'}</span>
        </button>
      </div>
    </div>
  );
}
