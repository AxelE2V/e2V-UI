import React, { type FC } from 'react';
import { tokens } from '../tokens';
import type { Industry, MaterialFlow } from '../types';

// Simple inline components to avoid circular dependencies
const Card: FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    background: tokens.colors.cream[50],
    borderRadius: tokens.radius.xl,
    border: `1px solid ${tokens.colors.cream[400]}`,
    padding: '20px',
    ...style,
  }}>
    {children}
  </div>
);

const Badge: FC<{ children: React.ReactNode; variant: 'success' | 'warning' | 'neutral' }> = ({ children, variant }) => {
  const colors = {
    success: { bg: tokens.colors.success.light, text: tokens.colors.success.dark },
    warning: { bg: tokens.colors.action.light, text: tokens.colors.action.dark },
    neutral: { bg: tokens.colors.cream[300], text: tokens.colors.text.secondary },
  };
  return (
    <span style={{
      padding: '3px 8px',
      borderRadius: tokens.radius.full,
      fontSize: '10px',
      fontWeight: 600,
      textTransform: 'uppercase',
      background: colors[variant].bg,
      color: colors[variant].text,
    }}>
      {children}
    </span>
  );
};

interface OperationsManagerDashboardProps {
  industry: Industry;
  flows: MaterialFlow[];
  lang: 'en' | 'fr';
}

export const OperationsManagerDashboard: FC<OperationsManagerDashboardProps> = ({
  industry,
  flows,
  lang,
}) => {
  // Operations KPIs - focus on throughput and efficiency
  const operationsKPIs = [
    {
      label: lang === 'fr' ? 'Débit journalier' : 'Daily Throughput',
      value: '127',
      unit: 't',
      change: '+12%',
      trend: 'up' as const,
    },
    {
      label: lang === 'fr' ? 'Documents traités' : 'Docs Processed',
      value: '89',
      unit: lang === 'fr' ? 'aujourd\'hui' : 'today',
      change: '+23',
      trend: 'up' as const,
    },
    {
      label: lang === 'fr' ? 'Taux d\'erreur' : 'Error Rate',
      value: '2.3',
      unit: '%',
      change: '-0.5%',
      trend: 'down' as const,
    },
    {
      label: lang === 'fr' ? 'Temps moyen traitement' : 'Avg Processing Time',
      value: '4.2',
      unit: 'min',
      change: '-18%',
      trend: 'down' as const,
    },
  ];

  // Active processes
  const activeProcesses = [
    { id: 1, name: lang === 'fr' ? 'Réception matière' : 'Material Reception', count: 12, status: 'active' as const },
    { id: 2, name: lang === 'fr' ? 'Vérification qualité' : 'Quality Check', count: 8, status: 'active' as const },
    { id: 3, name: lang === 'fr' ? 'Traitement' : 'Processing', count: 15, status: 'active' as const },
    { id: 4, name: lang === 'fr' ? 'Certification' : 'Certification', count: 5, status: 'pending' as const },
  ];

  // Recent activities
  const recentActivities = [
    { time: '10:32', action: lang === 'fr' ? 'Lot #2847 vérifié' : 'Batch #2847 verified', type: 'success' as const },
    { time: '10:28', action: lang === 'fr' ? 'COA reçu - Fournisseur ABC' : 'COA received - Supplier ABC', type: 'info' as const },
    { time: '10:15', action: lang === 'fr' ? 'Alerte qualité - Lot #2845' : 'Quality alert - Batch #2845', type: 'warning' as const },
    { time: '09:58', action: lang === 'fr' ? '15t traitées - Ligne A' : '15t processed - Line A', type: 'success' as const },
    { time: '09:45', action: lang === 'fr' ? 'Nouveau lot enregistré' : 'New batch registered', type: 'info' as const },
  ];

  return (
    <div>
      {/* Operations Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
          {lang === 'fr' ? 'Vue Opérations' : 'Operations View'}
        </h2>
        <p style={{ fontSize: '13px', color: tokens.colors.text.muted, marginTop: '4px' }}>
          {lang === 'fr' ? 'Suivi en temps réel des opérations' : 'Real-time operations monitoring'}
        </p>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {operationsKPIs.map((kpi, idx) => (
          <Card key={idx}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '8px' }}>
              {kpi.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: tokens.colors.text.primary }}>{kpi.value}</span>
              <span style={{ fontSize: '13px', color: tokens.colors.text.muted }}>{kpi.unit}</span>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '11px',
              fontWeight: 600,
              color: kpi.trend === 'up' ? tokens.colors.success.main : tokens.colors.success.main,
            }}>
              {kpi.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Active Processes */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
              {lang === 'fr' ? 'Processus actifs' : 'Active Processes'}
            </h3>
            <Badge variant="neutral">{activeProcesses.reduce((sum, p) => sum + p.count, 0)} {lang === 'fr' ? 'en cours' : 'in progress'}</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeProcesses.map(process => (
              <div
                key={process.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: tokens.colors.cream[100],
                  borderRadius: tokens.radius.md,
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{process.name}</div>
                  <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{process.count} {lang === 'fr' ? 'éléments' : 'items'}</div>
                </div>
                <Badge variant={process.status === 'active' ? 'success' : 'warning'}>
                  {process.status === 'active' ? (lang === 'fr' ? 'Actif' : 'Active') : (lang === 'fr' ? 'En attente' : 'Pending')}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: '0 0 16px 0' }}>
            {lang === 'fr' ? 'Activité récente' : 'Recent Activity'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: tokens.colors.cream[100],
                  borderRadius: tokens.radius.md,
                  borderLeft: `3px solid ${
                    activity.type === 'success' ? tokens.colors.success.main :
                    activity.type === 'warning' ? tokens.colors.action.main :
                    tokens.colors.neutral.main
                  }`,
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, minWidth: '40px' }}>
                  {activity.time}
                </span>
                <span style={{ fontSize: '13px', color: tokens.colors.text.primary }}>{activity.action}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Processing Queue */}
      <Card style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
            {lang === 'fr' ? 'File de traitement' : 'Processing Queue'}
          </h3>
          <button style={{
            padding: '6px 12px',
            background: tokens.colors.accent.main,
            color: '#FFF',
            border: 'none',
            borderRadius: tokens.radius.md,
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            {lang === 'fr' ? 'Voir tout' : 'View All'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${tokens.colors.cream[400]}` }}>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Lot' : 'Batch'}
                </th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Matière' : 'Material'}
                </th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Quantité' : 'Quantity'}
                </th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Étape' : 'Stage'}
                </th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Statut' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody>
              {flows.slice(0, 5).map((flow, idx) => (
                <tr key={flow.id} style={{ borderBottom: idx < 4 ? `1px solid ${tokens.colors.cream[300]}` : 'none' }}>
                  <td style={{ padding: '12px 10px', fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{flow.id}</td>
                  <td style={{ padding: '12px 10px', fontSize: '13px', color: tokens.colors.text.secondary }}>{flow.material}</td>
                  <td style={{ padding: '12px 10px', fontSize: '13px', color: tokens.colors.text.secondary }}>{flow.quantity} {flow.unit}</td>
                  <td style={{ padding: '12px 10px', fontSize: '13px', color: tokens.colors.text.secondary }}>{flow.source}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <Badge variant={flow.status === 'verified' ? 'success' : flow.status === 'pending' ? 'neutral' : 'warning'}>
                      {flow.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default OperationsManagerDashboard;
