import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Activity, FileBarChart, Settings, ArrowLeft, Search, Filter, AlertTriangle, CheckCircle2, UserCheck, RefreshCw, PlusCircle, Edit } from 'lucide-react';
import { theme } from '../../styles/theme';
import NurseVitalsEntry from './NurseVitalsEntry';
import ProfileUI from './ProfileUI';

export default function NurseQueue({ onBackToKiosk, onSelectPatient }) {
  const [activeTab, setActiveTab] = useState('queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals state
  const [selectedVisitForVitals, setSelectedVisitForVitals] = useState(null);
  const [selectedPatientForProfile, setSelectedPatientForProfile] = useState(null);

  // Fetch real-time queue ordered by Visit.priority (HIGH_PRIORITY dynamically jumps to top)
  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/visits/queue');
      const data = await res.json();
      if (data.success && data.queue) {
        setQueue(data.queue);
      }
    } catch (err) {
      console.error('Queue fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    // Poll queue every 5 seconds for live emergency prioritization
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVitalsSaved = (updatedVisit) => {
    setQueue((prev) =>
      prev.map((v) => (v.id === updatedVisit.id ? { ...v, ...updatedVisit } : v))
    );
  };

  const filteredPatients = queue.filter(
    (p) =>
      (p.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.patientPhone || '').includes(searchQuery)
  );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1120px',
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.cards,
        boxShadow: theme.shadows.card,
        border: `1px solid ${theme.colors.border}`,
        display: 'flex',
        minHeight: '660px',
        overflow: 'hidden',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* Vitals Entry Modal */}
      {selectedVisitForVitals && (
        <NurseVitalsEntry
          visit={selectedVisitForVitals}
          isOpen={!!selectedVisitForVitals}
          onClose={() => setSelectedVisitForVitals(null)}
          onVitalsSaved={handleVitalsSaved}
          themeObj={theme}
        />
      )}

      {/* Patient Profile Demographics Modal */}
      {selectedPatientForProfile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 110,
            padding: '16px',
          }}
        >
          <ProfileUI
            patient={selectedPatientForProfile}
            isNurseView={true}
            onBack={() => setSelectedPatientForProfile(null)}
            onProfileUpdated={() => {
              setSelectedPatientForProfile(null);
              fetchQueue();
            }}
            themeObj={theme}
          />
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '230px',
          backgroundColor: '#F9FAFB',
          borderRight: `1px solid ${theme.colors.border}`,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Activity size={20} />
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', color: theme.colors.textPrimary, display: 'block' }}>
                Nurse Triage
              </span>
              <span style={{ fontSize: '0.72rem', color: theme.colors.textSecondary }}>
                Vitals & Queue Mgmt
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'queue', label: 'Patient Queue', icon: Users },
              { id: 'vitals', label: 'Vitals Entry', icon: Activity },
              { id: 'reports', label: 'Triage Reports', icon: FileBarChart },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                    color: isActive ? '#2563EB' : theme.colors.textSecondary,
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: theme.typography.fontFamily,
                  }}
                >
                  <Icon size={18} color={isActive ? '#2563EB' : theme.colors.textSecondary} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit to Kiosk */}
        <button
          onClick={onBackToKiosk}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: '#FFFFFF',
            color: theme.colors.textSecondary,
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} />
          <span>Exit to Kiosk</span>
        </button>
      </aside>

      {/* Main Queue Workspace */}
      <div style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: theme.colors.textPrimary, margin: 0 }}>
              Live Patient Queue & Triage
            </h2>
            <p style={{ fontSize: '0.9rem', color: theme.colors.textSecondary, margin: '4px 0 0 0' }}>
              Auto-sorted by Priority • High priority emergency cases dynamically jump to top
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={fetchQueue}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '10px',
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: theme.borderRadius.inputs,
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: '#F9FAFB',
                width: '220px',
              }}
            >
              <Search size={16} color={theme.colors.textSecondary} />
              <input
                type="text"
                placeholder="Search patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.88rem',
                  width: '100%',
                  fontFamily: theme.typography.fontFamily,
                }}
              />
            </div>
          </div>
        </div>

        {/* Priority Sorted Queue Table */}
        <div
          style={{
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.cards,
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: `1px solid ${theme.colors.border}` }}>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: '700', color: theme.colors.textSecondary }}>PRIORITY</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: '700', color: theme.colors.textSecondary }}>PATIENT</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: '700', color: theme.colors.textSecondary }}>DEMOGRAPHICS</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: '700', color: theme.colors.textSecondary }}>VITALS & BMI</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: '700', color: theme.colors.textSecondary }}>CHIEF SYMPTOMS</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: '700', color: theme.colors.textSecondary, textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((visit) => {
                const isHigh = visit.priority === 'HIGH_PRIORITY';
                const firstMsg = visit.messages?.find((m) => m.role === 'user')?.content || 'Intake recorded';

                return (
                  <tr
                    key={visit.id}
                    style={{
                      borderBottom: `1px solid ${theme.colors.border}`,
                      backgroundColor: isHigh ? 'rgba(254, 226, 226, 0.45)' : '#FFFFFF',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {/* Priority Badge with Flashing Indicator */}
                    <td style={{ padding: '16px 18px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: theme.borderRadius.badge,
                          fontSize: '0.82rem',
                          fontWeight: '800',
                          backgroundColor: isHigh ? '#FEE2E2' : '#DCFCE7',
                          color: isHigh ? '#DC2626' : '#16A34A',
                          border: isHigh ? '1px solid #EF4444' : '1px solid #22C55E',
                          boxShadow: isHigh ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none',
                        }}
                      >
                        {isHigh && (
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: '#DC2626',
                              animation: 'pulseRing 1s infinite ease-in-out',
                            }}
                          />
                        )}
                        {isHigh ? '🚨 HIGH PRIORITY' : '✓ NORMAL'}
                      </span>
                    </td>

                    {/* Patient Name & Token */}
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#0F172A',
                            color: '#FFFFFF',
                            fontWeight: '800',
                            fontSize: '0.8rem',
                          }}
                        >
                          {visit.tokenNumber || `TK-${visit.id.slice(0, 4)}`}
                        </span>
                        <div style={{ fontWeight: '800', color: theme.colors.textPrimary, fontSize: '1rem' }}>
                          {visit.patientName || 'OPD Patient'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor:
                              visit.triageStatus === 'completed'
                                ? '#DCFCE7'
                                : visit.triageStatus === 'with_doctor'
                                ? '#FEF3C7'
                                : visit.triageStatus === 'vitals_recorded'
                                ? '#EFF6FF'
                                : '#F1F5F9',
                            color:
                              visit.triageStatus === 'completed'
                                ? '#166534'
                                : visit.triageStatus === 'with_doctor'
                                ? '#92400E'
                                : visit.triageStatus === 'vitals_recorded'
                                ? '#1D4ED8'
                                : '#64748B',
                          }}
                        >
                          {visit.triageStatus === 'waiting_for_nurse'
                            ? 'Awaiting Vitals'
                            : visit.triageStatus === 'vitals_recorded'
                            ? 'Vitals Recorded'
                            : visit.triageStatus === 'with_doctor'
                            ? 'With Doctor'
                            : 'Completed'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: theme.colors.textSecondary }}>
                          • +91 {visit.patientPhone}
                        </span>
                      </div>
                    </td>

                    {/* Demographics */}
                    <td style={{ padding: '16px 18px', fontSize: '0.92rem', color: theme.colors.textPrimary }}>
                      <div>{visit.patientGender || 'Male'}, {visit.patientAge || 35} yrs</div>
                      <button
                        onClick={() =>
                          setSelectedPatientForProfile({
                            id: visit.patientId,
                            name: visit.patientName,
                            phone: visit.patientPhone,
                            age: visit.patientAge,
                            gender: visit.patientGender,
                            heightCm: visit.heightCm,
                            weightKg: visit.weightKg,
                          })
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2563EB',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          padding: 0,
                          marginTop: '2px',
                        }}
                      >
                        Edit Profile →
                      </button>
                    </td>

                    {/* Vitals & BMI */}
                    <td style={{ padding: '16px 18px' }}>
                      {visit.bloodPressure ? (
                        <div style={{ fontSize: '0.88rem' }}>
                          <b>BP:</b> {visit.bloodPressure} | <b>SpO2:</b> {visit.spo2}%
                          <div style={{ color: theme.colors.primaryDark, fontWeight: '700', marginTop: '2px' }}>
                            BMI: {visit.bmi || '--'} ({visit.heightCm}cm / {visit.weightKg}kg)
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.82rem', color: '#D97706', fontWeight: '600' }}>
                          ⚠️ Vitals Pending
                        </span>
                      )}
                    </td>

                    {/* Chief Symptoms */}
                    <td style={{ padding: '16px 18px', fontSize: '0.9rem', color: theme.colors.textPrimary, maxWidth: '240px' }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {firstMsg}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedVisitForVitals(visit)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              border: '1px solid #2563EB',
                              backgroundColor: '#EFF6FF',
                              color: '#2563EB',
                              fontSize: '0.8rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                            }}
                          >
                            {visit.bloodPressure ? 'Edit Vitals' : '+ Record Vitals'}
                          </button>

                          <button
                            onClick={() =>
                              onSelectPatient &&
                              onSelectPatient({
                                id: visit.id,
                                token: visit.tokenNumber || `TK-${visit.id.slice(0, 4)}`,
                                name: visit.patientName,
                                ageGender: `${visit.patientAge}${visit.patientGender?.[0] || 'M'}`,
                                complaint: firstMsg,
                                patientId: visit.patientId,
                                vitals: visit.bloodPressure ? `BP: ${visit.bloodPressure} | Temp: ${visit.temperature}°F | SpO2: ${visit.spo2}% | BMI: ${visit.bmi}` : 'Pending',
                              })
                            }
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              border: `1px solid ${theme.colors.primary}`,
                              backgroundColor: '#E8F7F5',
                              color: theme.colors.primaryDark,
                              fontSize: '0.8rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                            }}
                          >
                            Doctor View →
                          </button>
                        </div>

                        {visit.triageStatus !== 'with_doctor' && visit.triageStatus !== 'completed' && (
                          <button
                            onClick={async () => {
                              await fetch(`/api/visits/${visit.id}/triage-status`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: 'with_doctor' }),
                              });
                              fetchQueue();
                            }}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              color: '#475569',
                              fontSize: '0.74rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                            }}
                          >
                            Send to Doctor Room ➔
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
