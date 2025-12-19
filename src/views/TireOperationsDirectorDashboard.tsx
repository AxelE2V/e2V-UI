import React, { useState, type FC } from 'react';
import { tokens } from '../tokens';
import type { Industry } from '../types';

// Simple inline components
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

// Icons
const DirectorIcons = {
  tireRecycle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 2v4"/>
      <path d="M12 18v4"/>
      <path d="M2 12h4"/>
      <path d="M18 12h4"/>
    </svg>
  ),
  truck: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  scale: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v19"/>
      <path d="M5 8l7-5 7 5"/>
      <path d="M3 13a4 4 0 0 0 4 4h2"/>
      <path d="M21 13a4 4 0 0 1-4 4h-2"/>
    </svg>
  ),
  recycle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
      <path d="m14 16-3 3 3 3"/>
      <path d="M8.293 13.596 4.875 7.5l-3.875-1"/>
      <path d="m7.5 4.5 2 1"/>
      <path d="M14.5 3.207 19.143 11.5l1.857 1"/>
      <path d="m12.5 7.5-2-1"/>
    </svg>
  ),
  factory: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M17 18h1"/>
      <path d="M12 18h1"/>
      <path d="M7 18h1"/>
    </svg>
  ),
  checkCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  alertTriangle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  trendUp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  trendDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
      <polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  barChart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
};

interface TireOperationsDirectorDashboardProps {
  industry: Industry;
  lang: 'en' | 'fr';
  onNavigate: (tab: string) => void;
}

export const TireOperationsDirectorDashboard: FC<TireOperationsDirectorDashboardProps> = ({
  industry,
  lang,
  onNavigate,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  // ============================================================================
  // REGULATORY KPIs - Based on French Tire EPR regulations (Aliapur/Tyval)
  // Targets from decree of March 2, 2023 and eco-organism requirements
  // ============================================================================

  const regulatoryKPIs = {
    // Collection rate target: 96% in 2024, 98% in 2028 (Article R543-146)
    collectionRate: {
      current: 97.2,
      target: 96,
      target2028: 98,
      unit: '%',
      status: 'on_track' as const,
    },
    // Recycling rate target: 40% in 2024, 42% in 2028
    recyclingRate: {
      current: 42.8,
      target: 40,
      target2028: 42,
      unit: '%',
      status: 'on_track' as const,
    },
    // Reuse rate target: 17% in 2024, 19% in 2028 (decree March 2023)
    reuseRate: {
      current: 18.5,
      target: 17,
      target2028: 19,
      unit: '%',
      status: 'on_track' as const,
    },
    // Energy recovery - complementary valorization
    energyRecoveryRate: {
      current: 38.7,
      target: 40,
      unit: '%',
      status: 'warning' as const,
    },
  };

  // Volume KPIs - Real-time operational data
  const volumeKPIs = [
    {
      label: lang === 'fr' ? 'Volume collecté' : 'Collected Volume',
      value: '4,287',
      unit: 't',
      change: '+8.3%',
      trend: 'up' as const,
      vsTarget: '102%',
      icon: DirectorIcons.truck,
      color: tokens.colors.success.main,
    },
    {
      label: lang === 'fr' ? 'Pneus réemployés' : 'Reused Tires',
      value: '793',
      unit: 't',
      change: '+12.1%',
      trend: 'up' as const,
      vsTarget: '109%',
      icon: DirectorIcons.recycle,
      color: tokens.colors.brand[600],
    },
    {
      label: lang === 'fr' ? 'PUNR valorisés' : 'Valorized PUNR',
      value: '3,494',
      unit: 't',
      change: '+6.7%',
      trend: 'up' as const,
      vsTarget: '98%',
      icon: DirectorIcons.factory,
      color: '#8B5CF6',
    },
    {
      label: lang === 'fr' ? 'Stock PUNR' : 'PUNR Stock',
      value: '847',
      unit: 't',
      change: '-15.2%',
      trend: 'down' as const,
      vsTarget: lang === 'fr' ? 'Optimal' : 'Optimal',
      icon: DirectorIcons.scale,
      color: tokens.colors.neutral.main,
    },
  ];

  // Collector performance
  const collectorPerformance = [
    {
      name: 'TransRecycle IDF',
      collected: 1247,
      target: 1200,
      compliance: 98.5,
      docs: 156,
      docsPending: 3,
      status: 'excellent' as const,
    },
    {
      name: 'EcoTri Nord',
      collected: 892,
      target: 950,
      compliance: 94.2,
      docs: 112,
      docsPending: 8,
      status: 'warning' as const,
    },
    {
      name: 'GreenPneu PACA',
      collected: 1034,
      target: 1000,
      compliance: 99.1,
      docs: 134,
      docsPending: 1,
      status: 'excellent' as const,
    },
    {
      name: 'RecycOuest',
      collected: 756,
      target: 800,
      compliance: 91.8,
      docs: 98,
      docsPending: 12,
      status: 'attention' as const,
    },
    {
      name: 'ValoPneu Est',
      collected: 358,
      target: 350,
      compliance: 96.7,
      docs: 45,
      docsPending: 2,
      status: 'good' as const,
    },
  ];

  // Valorization channels (exutoires)
  const valorizationChannels = [
    {
      name: lang === 'fr' ? 'Cimenteries' : 'Cement kilns',
      volume: 1847,
      percentage: 52.8,
      trend: '+3.2%',
      color: '#F59E0B',
    },
    {
      name: lang === 'fr' ? 'Granulats' : 'Granulates',
      volume: 1245,
      percentage: 35.6,
      trend: '+8.5%',
      color: tokens.colors.success.main,
    },
    {
      name: lang === 'fr' ? 'Aciéries' : 'Steel mills',
      volume: 289,
      percentage: 8.3,
      trend: '-2.1%',
      color: tokens.colors.brand[600],
    },
    {
      name: lang === 'fr' ? 'Pyrolyse' : 'Pyrolysis',
      volume: 113,
      percentage: 3.3,
      trend: '+45.2%',
      color: '#8B5CF6',
    },
  ];

  // ADEME reporting status
  const ademeReporting = {
    lastSubmission: '2024-03-15',
    nextDeadline: '2025-03-31',
    status: 'up_to_date' as const,
    items: [
      { name: lang === 'fr' ? 'Quantités mises sur le marché' : 'Quantities placed on market', status: 'submitted' as const },
      { name: lang === 'fr' ? 'Quantités collectées' : 'Collected quantities', status: 'submitted' as const },
      { name: lang === 'fr' ? 'Quantités valorisées par mode' : 'Valorized quantities by mode', status: 'submitted' as const },
      { name: lang === 'fr' ? 'Destination finale' : 'Final destination', status: 'submitted' as const },
    ],
  };

  // Alerts
  const alerts = [
    {
      type: 'warning' as const,
      title: lang === 'fr' ? 'Stock PUNR élevé - Site Lyon' : 'High PUNR stock - Lyon site',
      description: lang === 'fr' ? '312t en stock, seuil alerte: 250t' : '312t in stock, alert threshold: 250t',
      time: lang === 'fr' ? 'Il y a 2h' : '2h ago',
    },
    {
      type: 'info' as const,
      title: lang === 'fr' ? 'Collecteur EcoTri - Documents manquants' : 'EcoTri collector - Missing documents',
      description: lang === 'fr' ? '8 bons de pesée en attente de validation' : '8 weighing tickets pending validation',
      time: lang === 'fr' ? 'Il y a 4h' : '4h ago',
    },
    {
      type: 'success' as const,
      title: lang === 'fr' ? 'Objectif mensuel atteint - PACA' : 'Monthly target reached - PACA',
      description: lang === 'fr' ? 'Région PACA: 103% de l\'objectif de collecte' : 'PACA region: 103% of collection target',
      time: lang === 'fr' ? 'Il y a 6h' : '6h ago',
    },
  ];

  const statusConfig = {
    excellent: { bg: tokens.colors.success.light, text: tokens.colors.success.dark, label: lang === 'fr' ? 'Excellent' : 'Excellent' },
    good: { bg: '#DBEAFE', text: '#1E40AF', label: lang === 'fr' ? 'Bon' : 'Good' },
    warning: { bg: '#FEF3C7', text: '#92400E', label: lang === 'fr' ? 'Attention' : 'Warning' },
    attention: { bg: tokens.colors.action.light, text: tokens.colors.action.dark, label: lang === 'fr' ? 'À surveiller' : 'Monitor' },
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: tokens.colors.brand[600] }}>{DirectorIcons.tireRecycle}</span>
            {lang === 'fr' ? 'Direction des Opérations - Filière Pneus' : 'Operations Director - Tire Industry'}
          </h2>
          <p style={{ fontSize: '13px', color: tokens.colors.text.muted, marginTop: '4px' }}>
            {lang === 'fr' ? 'Suivi temps réel des KPIs réglementaires et opérationnels' : 'Real-time regulatory & operational KPI tracking'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: tokens.colors.text.muted }}>
            {DirectorIcons.calendar}
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'day' | 'week' | 'month' | 'year')}
            style={{
              padding: '8px 12px',
              border: `1px solid ${tokens.colors.cream[400]}`,
              borderRadius: tokens.radius.md,
              fontSize: '13px',
              fontFamily: 'inherit',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="day">{lang === 'fr' ? 'Aujourd\'hui' : 'Today'}</option>
            <option value="week">{lang === 'fr' ? 'Cette semaine' : 'This Week'}</option>
            <option value="month">{lang === 'fr' ? 'Ce mois' : 'This Month'}</option>
            <option value="year">{lang === 'fr' ? 'Cette année' : 'This Year'}</option>
          </select>
          <div style={{
            padding: '8px 16px',
            background: `linear-gradient(135deg, ${tokens.colors.brand[600]}, ${tokens.colors.brand[500]})`,
            borderRadius: tokens.radius.lg,
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600,
          }}>
            TYVAL
          </div>
        </div>
      </div>

      {/* Regulatory Compliance Banner */}
      <Card style={{
        marginBottom: '24px',
        background: `linear-gradient(135deg, ${tokens.colors.brand[600]}08, ${tokens.colors.success.main}05)`,
        borderColor: tokens.colors.success.main + '30',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {DirectorIcons.target}
            {lang === 'fr' ? 'Objectifs réglementaires REP (Décret Mars 2023)' : 'REP Regulatory Targets (March 2023 Decree)'}
          </h3>
          <span style={{
            padding: '4px 12px',
            background: tokens.colors.success.light,
            color: tokens.colors.success.dark,
            borderRadius: tokens.radius.full,
            fontSize: '11px',
            fontWeight: 600,
          }}>
            {lang === 'fr' ? 'Conforme 2024' : '2024 Compliant'}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            {
              label: lang === 'fr' ? 'Taux de collecte' : 'Collection Rate',
              ...regulatoryKPIs.collectionRate
            },
            {
              label: lang === 'fr' ? 'Taux de recyclage' : 'Recycling Rate',
              ...regulatoryKPIs.recyclingRate
            },
            {
              label: lang === 'fr' ? 'Taux de réemploi' : 'Reuse Rate',
              ...regulatoryKPIs.reuseRate
            },
            {
              label: lang === 'fr' ? 'Valorisation énergétique' : 'Energy Recovery',
              ...regulatoryKPIs.energyRecoveryRate
            },
          ].map((kpi, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '8px' }}>
                {kpi.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: kpi.status === 'on_track' ? tokens.colors.success.main : '#F59E0B'
                }}>
                  {kpi.current}
                </span>
                <span style={{ fontSize: '14px', color: tokens.colors.text.muted }}>{kpi.unit}</span>
              </div>
              <div style={{
                fontSize: '11px',
                color: kpi.current >= kpi.target ? tokens.colors.success.main : tokens.colors.text.muted,
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}>
                {kpi.current >= kpi.target && <span style={{ color: tokens.colors.success.main }}>{DirectorIcons.checkCircle}</span>}
                {lang === 'fr' ? `Objectif: ${kpi.target}%` : `Target: ${kpi.target}%`}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Volume KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {volumeKPIs.map((kpi, idx) => (
          <Card key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: tokens.radius.lg,
                background: `${kpi.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: kpi.color,
              }}>
                {kpi.icon}
              </div>
              <span style={{
                padding: '3px 8px',
                borderRadius: tokens.radius.full,
                fontSize: '10px',
                fontWeight: 600,
                background: kpi.vsTarget.includes('%') && parseInt(kpi.vsTarget) >= 100 ? tokens.colors.success.light : tokens.colors.cream[300],
                color: kpi.vsTarget.includes('%') && parseInt(kpi.vsTarget) >= 100 ? tokens.colors.success.dark : tokens.colors.text.secondary,
              }}>
                {kpi.vsTarget}
              </span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>
              {kpi.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '26px', fontWeight: 700, color: tokens.colors.text.primary }}>{kpi.value}</span>
              <span style={{ fontSize: '13px', color: tokens.colors.text.muted }}>{kpi.unit}</span>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '11px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: kpi.trend === 'up' ? tokens.colors.success.main : kpi.change.includes('+') ? tokens.colors.success.main : tokens.colors.action.main,
            }}>
              {kpi.trend === 'up' ? DirectorIcons.trendUp : DirectorIcons.trendDown}
              {kpi.change} {lang === 'fr' ? 'vs mois précédent' : 'vs last month'}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Collector Performance */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {DirectorIcons.users}
              {lang === 'fr' ? 'Performance des collecteurs' : 'Collector Performance'}
            </h3>
            <button
              onClick={() => onNavigate('flows')}
              style={{
                padding: '6px 12px',
                background: tokens.colors.accent.main,
                color: '#FFF',
                border: 'none',
                borderRadius: tokens.radius.md,
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {lang === 'fr' ? 'Voir détails' : 'View Details'}
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${tokens.colors.cream[400]}` }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                    {lang === 'fr' ? 'Collecteur' : 'Collector'}
                  </th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                    {lang === 'fr' ? 'Collecté (t)' : 'Collected (t)'}
                  </th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                    {lang === 'fr' ? 'Objectif' : 'Target'}
                  </th>
                  <th style={{ textAlign: 'right', padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                    {lang === 'fr' ? 'Conformité' : 'Compliance'}
                  </th>
                  <th style={{ textAlign: 'center', padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                    {lang === 'fr' ? 'Docs' : 'Docs'}
                  </th>
                  <th style={{ textAlign: 'center', padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
                    {lang === 'fr' ? 'Statut' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {collectorPerformance.map((collector, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < collectorPerformance.length - 1 ? `1px solid ${tokens.colors.cream[300]}` : 'none' }}>
                    <td style={{ padding: '12px 8px', fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>
                      {collector.name}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '13px', textAlign: 'right', color: collector.collected >= collector.target ? tokens.colors.success.main : tokens.colors.text.primary }}>
                      {collector.collected.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '13px', textAlign: 'right', color: tokens.colors.text.muted }}>
                      {collector.target.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '13px', textAlign: 'right' }}>
                      <span style={{
                        color: collector.compliance >= 95 ? tokens.colors.success.main : collector.compliance >= 90 ? '#F59E0B' : tokens.colors.action.main
                      }}>
                        {collector.compliance}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>{collector.docs}</span>
                      {collector.docsPending > 0 && (
                        <span style={{
                          marginLeft: '4px',
                          padding: '2px 6px',
                          background: collector.docsPending > 5 ? tokens.colors.action.light : '#FEF3C7',
                          color: collector.docsPending > 5 ? tokens.colors.action.dark : '#92400E',
                          borderRadius: tokens.radius.full,
                          fontSize: '10px',
                          fontWeight: 600,
                        }}>
                          +{collector.docsPending}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: tokens.radius.full,
                        fontSize: '10px',
                        fontWeight: 600,
                        background: statusConfig[collector.status].bg,
                        color: statusConfig[collector.status].text,
                      }}>
                        {statusConfig[collector.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Valorization Channels */}
          <Card>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {DirectorIcons.barChart}
              {lang === 'fr' ? 'Exutoires de valorisation' : 'Valorization Channels'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {valorizationChannels.map((channel, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{channel.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>{channel.volume}t</span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: channel.trend.startsWith('+') ? tokens.colors.success.main : tokens.colors.action.main
                      }}>
                        {channel.trend}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    height: '8px',
                    background: tokens.colors.cream[300],
                    borderRadius: tokens.radius.full,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${channel.percentage}%`,
                      background: channel.color,
                      borderRadius: tokens.radius.full,
                      transition: 'width 300ms ease',
                    }} />
                  </div>
                  <div style={{ fontSize: '11px', color: tokens.colors.text.muted, marginTop: '4px' }}>
                    {channel.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Alerts */}
          <Card>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: '0 0 16px 0' }}>
              {lang === 'fr' ? 'Alertes' : 'Alerts'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    background: tokens.colors.cream[100],
                    borderRadius: tokens.radius.md,
                    borderLeft: `3px solid ${
                      alert.type === 'success' ? tokens.colors.success.main :
                      alert.type === 'warning' ? '#F59E0B' :
                      tokens.colors.neutral.main
                    }`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.primary }}>{alert.title}</span>
                    <span style={{ fontSize: '10px', color: tokens.colors.text.muted }}>{alert.time}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: tokens.colors.text.muted, margin: 0 }}>{alert.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ADEME Reporting Status */}
      <Card style={{ background: `linear-gradient(135deg, ${tokens.colors.brand[600]}05, ${tokens.colors.brand[500]}03)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
            {lang === 'fr' ? 'Déclaration ADEME (Article R543-150)' : 'ADEME Reporting (Article R543-150)'}
          </h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: tokens.colors.text.muted }}>
              {lang === 'fr' ? 'Dernière soumission:' : 'Last submission:'} {ademeReporting.lastSubmission}
            </span>
            <span style={{ fontSize: '12px', color: tokens.colors.text.muted }}>
              {lang === 'fr' ? 'Prochaine échéance:' : 'Next deadline:'} <strong style={{ color: tokens.colors.brand[600] }}>{ademeReporting.nextDeadline}</strong>
            </span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {ademeReporting.items.map((item, idx) => (
            <div key={idx} style={{
              padding: '16px',
              background: tokens.colors.cream[50],
              borderRadius: tokens.radius.md,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{ color: tokens.colors.success.main }}>{DirectorIcons.checkCircle}</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.primary }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: tokens.colors.success.main }}>{lang === 'fr' ? 'Transmis' : 'Submitted'}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TireOperationsDirectorDashboard;
