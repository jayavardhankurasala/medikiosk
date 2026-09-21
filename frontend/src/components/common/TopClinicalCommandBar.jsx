import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  Activity,
  Sparkles,
  BarChart3,
  Monitor,
  Database,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export default function TopClinicalCommandBar({
  activePortal,
  onSelectRole,
  themeMode,
  onToggleTheme,
}) {
  const [alerts, setAlerts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/visits/alerts');
      const data = await res.json();
      if (data.success && Array.isArray(data.alerts)) {
        setAlerts(data.alerts);
      }
    } catch {
      // Offline / dev fallback
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchAlerts();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const highAlerts = alerts.filter(
    (a) => a.severity === 'HIGH' && a.status !== 'RESOLVED' && !a.acknowledged
  );
  const totalUnresolved = alerts.filter((a) => a.status !== 'RESOLVED');

  const navItems = [
    {
      id: null,
      label: '← Exit to Kiosk',
      sublabel: 'Patient Terminal',
      icon: Monitor,
      color: '#00C7A6',
    },
    {
      id: 'nurse',
      label: 'Triage Station',
      sublabel: 'Station 1 Vitals',
      icon: Activity,
      color: '#2563EB',
    },
    {
      id: 'doctor',
      label: 'Allopathic Doctor',
      sublabel: 'SOCRATES EMR',
      icon: Stethoscope,
      color: '#7C3AED',
    },
    {
      id: 'ayush',
      label: 'AYUSH Specialist',
      sublabel: 'दशविध परीक्षा',
      icon: Sparkles,
      color: '#059669',
    },
    {
      id: 'admin',
      label: 'Admin & Audit',
      sublabel: 'DPDP & Analytics',
      icon: BarChart3,
      color: '#D97706',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        borderBottom: '1px solid #1E293B',
        padding: '8px 16px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      {/* Facility / Cloud DB Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#1E293B',
            padding: '5px 10px',
            borderRadius: '8px',
            border: '1px solid #334155',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
            }}
          />
          <span style={{ fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.04em', color: '#F1F5F9' }}>
            MEDIKIOSK HUB
          </span>
        </div>

        <div
          title="Active Database: Supabase PostgreSQL"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.74rem',
            color: '#94A3B8',
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid #1E293B',
          }}
        >
          <Database size={13} color="#38BDF8" />
          <span>Supabase DB</span>
        </div>

        {/* Live Priority Alert Pill */}
        {highAlerts.length > 0 ? (
          <button
            onClick={() => onSelectRole('admin')}
            title="Click to view urgent patient red flags in Admin Action Center"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '0.78rem',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(220, 38, 38, 0.6)',
              animation: 'pulse 1.8s infinite',
            }}
          >
            <AlertTriangle size={14} />
            <span>{highAlerts.length} CRITICAL RED-FLAG{highAlerts.length > 1 ? 'S' : ''}</span>
          </button>
        ) : totalUnresolved.length > 0 ? (
          <div
            onClick={() => onSelectRole('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#451A03',
              color: '#FBBF24',
              border: '1px solid #78350F',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            <AlertTriangle size={13} />
            <span>{totalUnresolved.length} Alerts Active</span>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#064E3B',
              color: '#34D399',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '700',
            }}
          >
            <CheckCircle2 size={13} />
            <span>No Red Flags</span>
          </div>
        )}
      </div>

      {/* Role Navigation Segmented Control */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1E293B',
          borderRadius: '10px',
          padding: '3px',
          gap: '3px',
          border: '1px solid #334155',
        }}
      >
        {navItems.map((item) => {
          const isActive = activePortal === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => onSelectRole(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? item.color : 'transparent',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                cursor: 'pointer',
                fontWeight: isActive ? '700' : '600',
                fontSize: '0.82rem',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              <IconComponent size={15} color={isActive ? '#FFFFFF' : '#94A3B8'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Compliance & Refresh Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          title="Digital Personal Data Protection Act 2023 Audit Logging Active"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#134E4A',
            color: '#5EEAD4',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.74rem',
            fontWeight: '700',
            border: '1px solid #0D9488',
          }}
        >
          <ShieldCheck size={14} />
          <span>DPDP 2023 v1.0</span>
        </div>

        <button
          onClick={handleManualRefresh}
          title="Refresh Queue and Alerts"
          style={{
            background: 'none',
            border: '1px solid #334155',
            borderRadius: '6px',
            padding: '5px 8px',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 0.6s linear infinite' : 'none' }} />
        </button>
      </div>
    </div>
  );
}
