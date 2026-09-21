import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Users,
  Clock,
  CheckCircle2,
  FileText,
  Search,
  RefreshCw,
  Building2,
  TrendingUp,
  UserCheck,
  Stethoscope,
  Leaf,
  Filter,
} from 'lucide-react';
import { theme } from '../../styles/theme';

export default function AdminAuditDashboard({ onBackToKiosk }) {
  const [queue, setQueue] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchLog, setSearchLog] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch live queue
      const qRes = await fetch('/api/visits/queue');
      const qData = await qRes.json();
      if (qData.success) setQueue(qData.queue || []);

      // 2. Fetch priority alerts
      const aRes = await fetch('/api/visits/alerts');
      const aData = await aRes.json();
      if (aData.success) setAlerts(aData.alerts || []);

      // 3. Fetch audit logs
      const lRes = await fetch('/api/visits/audit-logs');
      const lData = await lRes.json();
      if (lData.success) setAuditLogs(lData.logs || []);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledgeAlert = async (alertId) => {
    try {
      const res = await fetch(`/api/visits/alerts/${alertId}/ack`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffName: 'Hospital Triage Director' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Alert ack error:', err);
    }
  };

  const handleResolveAlert = async (alertId) => {
    try {
      const res = await fetch(`/api/visits/alerts/${alertId}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffName: 'Chief Medical Officer' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Alert resolve error:', err);
    }
  };

  // KPI Calculations
  const totalRegistered = queue.length;
  const waitingTriage = queue.filter((v) => v.triageStatus === 'waiting_for_nurse').length;
  const withDoctor = queue.filter((v) => v.triageStatus === 'with_doctor' || v.triageStatus === 'vitals_recorded').length;
  const completedCount = queue.filter((v) => v.triageStatus === 'completed' || v.status === 'COMPLETED').length;
  const activeAlerts = alerts.filter((a) => a.status === 'active');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;
    const matchesSearch =
      (log.action || '').toLowerCase().includes(searchLog.toLowerCase()) ||
      (log.userName || '').toLowerCase().includes(searchLog.toLowerCase()) ||
      (log.resource || '').toLowerCase().includes(searchLog.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1280px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: theme.shadows.card,
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '740px',
        overflow: 'hidden',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 24px',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={24} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
              Hospital OPD Command & DPDP Compliance Center
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0 }}>
              Real-time Queue Throughput • Priority Red-Flag Alerts • Immutable DPDP Act Audit Logs
            </p>
          </div>
        </div>

        <button
          onClick={fetchDashboardData}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#1E293B',
            color: '#93C5FD',
            border: '1px solid #334155',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <RefreshCw size={16} />
          <span>Refresh Data</span>
        </button>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 1. Live KPI Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B' }}>Total Registered</span>
              <Users size={20} color="#3B82F6" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '8px' }}>
              {totalRegistered}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '4px' }}>Kiosk & Walk-in OPD</div>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#991B1B' }}>Active Red Flags</span>
              <AlertTriangle size={20} color="#DC2626" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#DC2626', marginTop: '8px' }}>
              {activeAlerts.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#B91C1C', marginTop: '4px' }}>Immediate Triage Needed</div>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#92400E' }}>Awaiting Triage</span>
              <Clock size={20} color="#D97706" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#B45309', marginTop: '8px' }}>
              {waitingTriage}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#92400E', marginTop: '4px' }}>Nurse Desk Queue</div>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#166534' }}>Completed & Verified</span>
              <CheckCircle2 size={20} color="#16A34A" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#15803D', marginTop: '8px' }}>
              {completedCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#166534', marginTop: '4px' }}>Prescriptions Issued</div>
          </div>
        </div>

        {/* 2. Priority Alerts Action Center */}
        {alerts.length > 0 && (
          <div
            style={{
              padding: '20px',
              borderRadius: '14px',
              backgroundColor: '#FFF1F2',
              border: '1.5px solid #FDA4AF',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={22} color="#E11D48" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#9F1239' }}>
                Priority Clinical Red-Flag Alerts ({activeAlerts.length} Active)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {alerts.map((a) => {
                const isActive = a.status === 'active';
                return (
                  <div
                    key={a.id}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${isActive ? '#FDA4AF' : '#E2E8F0'}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: '#E11D48',
                            color: '#FFFFFF',
                            fontWeight: '800',
                            fontSize: '0.75rem',
                          }}
                        >
                          {a.severity}
                        </span>
                        {a.tokenNumber && (
                          <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>
                            {a.tokenNumber}
                          </span>
                        )}
                        <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '0.95rem' }}>
                          {a.patientName}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#BE123C', fontWeight: '600', marginTop: '4px' }}>
                        Trigger: {a.triggerCondition}
                      </div>
                      {a.acknowledgedBy && (
                        <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '2px' }}>
                          ✓ Acknowledged by: {a.acknowledgedBy}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {isActive ? (
                        <button
                          onClick={() => handleAcknowledgeAlert(a.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: '#BE123C',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                          }}
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResolveAlert(a.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: '#059669',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                          }}
                        >
                          Resolve Alert
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. DPDP Act Immutable Audit Trail Table */}
        <div
          style={{
            padding: '20px',
            borderRadius: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={22} color="#059669" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                Digital Personal Data Protection (DPDP) Act Audit Trail
              </h3>
            </div>

            {/* Role Filter Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {['ALL', 'patient', 'triage_staff', 'doctor', 'ayush_practitioner'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    border: '1px solid #CBD5E1',
                    backgroundColor: roleFilter === r ? '#0F172A' : '#FFFFFF',
                    color: roleFilter === r ? '#FFFFFF' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {r === 'ALL'
                    ? 'All Events'
                    : r === 'patient'
                    ? 'Patient'
                    : r === 'triage_staff'
                    ? 'Triage'
                    : r === 'doctor'
                    ? 'Allopathic Doctor'
                    : 'AYUSH'}
                </button>
              ))}
            </div>
          </div>

          {/* Audit Logs Table */}
          <div style={{ overflowX: 'auto', maxHeight: '420px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '10px 14px', color: '#475569', fontWeight: '700' }}>Timestamp</th>
                  <th style={{ padding: '10px 14px', color: '#475569', fontWeight: '700' }}>Actor</th>
                  <th style={{ padding: '10px 14px', color: '#475569', fontWeight: '700' }}>Role</th>
                  <th style={{ padding: '10px 14px', color: '#475569', fontWeight: '700' }}>Action Performed</th>
                  <th style={{ padding: '10px 14px', color: '#475569', fontWeight: '700' }}>Resource Target</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 14px', color: '#64748B', whiteSpace: 'nowrap' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0F172A' }}>
                      {log.userName}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          backgroundColor:
                            log.role === 'patient'
                              ? '#E0E7FF'
                              : log.role === 'triage_staff'
                              ? '#FEF3C7'
                              : log.role === 'ayush_practitioner'
                              ? '#ECFDF5'
                              : '#F1F5F9',
                          color:
                            log.role === 'patient'
                              ? '#3730A3'
                              : log.role === 'triage_staff'
                              ? '#92400E'
                              : log.role === 'ayush_practitioner'
                              ? '#065F46'
                              : '#334155',
                        }}
                      >
                        {log.role}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0F172A' }}>
                      <div>{log.action}</div>
                      {log.details && (
                        <div style={{ fontSize: '0.75rem', fontWeight: '400', color: '#64748B', marginTop: '3px', maxWidth: '320px', lineHeight: '1.2' }}>
                          {log.details}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '10px 14px', color: '#64748B' }}>
                      {log.resource} {log.resourceId ? `(${log.resourceId})` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
