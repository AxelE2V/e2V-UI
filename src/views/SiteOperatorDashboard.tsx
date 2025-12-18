import React, { type FC } from 'react';
import { tokens } from '../tokens';
import type { Industry } from '../types';
import { Icon } from '../components/ui/Icon';

// Simple inline components
const Card: FC<{ children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }> = ({ children, style, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: tokens.colors.cream[50],
      borderRadius: tokens.radius.xl,
      border: `1px solid ${tokens.colors.cream[400]}`,
      padding: '20px',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}
  >
    {children}
  </div>
);

interface SiteOperatorDashboardProps {
  industry: Industry;
  lang: 'en' | 'fr';
  onNavigate: (tab: string) => void;
}

export const SiteOperatorDashboard: FC<SiteOperatorDashboardProps> = ({
  industry,
  lang,
  onNavigate,
}) => {
  // Tasks for today
  const todayTasks = [
    {
      id: 1,
      title: lang === 'fr' ? 'Scanner les bons de livraison' : 'Scan delivery notes',
      count: 5,
      completed: 2,
      priority: 'high' as const,
    },
    {
      id: 2,
      title: lang === 'fr' ? 'Vérifier les pesées' : 'Verify weighings',
      count: 8,
      completed: 8,
      priority: 'medium' as const,
    },
    {
      id: 3,
      title: lang === 'fr' ? 'Photos des lots' : 'Batch photos',
      count: 3,
      completed: 1,
      priority: 'medium' as const,
    },
    {
      id: 4,
      title: lang === 'fr' ? 'Signer les documents' : 'Sign documents',
      count: 4,
      completed: 0,
      priority: 'low' as const,
    },
  ];

  // Quick actions
  const quickActions = [
    {
      icon: 'fileScan',
      label: lang === 'fr' ? 'Scanner document' : 'Scan Document',
      color: tokens.colors.brand[600],
      action: 'documents',
    },
    {
      icon: 'camera',
      label: lang === 'fr' ? 'Prendre photo' : 'Take Photo',
      color: tokens.colors.success.main,
      action: 'documents',
    },
    {
      icon: 'weighScale',
      label: lang === 'fr' ? 'Nouvelle pesée' : 'New Weighing',
      color: '#8B5CF6',
      action: 'flows',
    },
    {
      icon: 'pen',
      label: lang === 'fr' ? 'Signature' : 'Signature',
      color: tokens.colors.action.main,
      action: 'documents',
    },
  ];

  // Recent uploads
  const recentUploads = [
    { id: 1, name: 'BL-2024-1247.pdf', time: lang === 'fr' ? 'Il y a 10 min' : '10 min ago', status: 'verified' as const },
    { id: 2, name: 'Photo-Lot-458.jpg', time: lang === 'fr' ? 'Il y a 25 min' : '25 min ago', status: 'pending' as const },
    { id: 3, name: 'Pesee-12-18.pdf', time: lang === 'fr' ? 'Il y a 1h' : '1h ago', status: 'verified' as const },
    { id: 4, name: 'COA-SUP-789.pdf', time: lang === 'fr' ? 'Il y a 2h' : '2h ago', status: 'flagged' as const },
  ];

  const priorityColors = {
    high: tokens.colors.action.main,
    medium: tokens.colors.neutral.main,
    low: tokens.colors.success.main,
  };

  const statusColors = {
    verified: { bg: tokens.colors.success.light, text: tokens.colors.success.dark },
    pending: { bg: tokens.colors.neutral.light, text: tokens.colors.neutral.dark },
    flagged: { bg: tokens.colors.action.light, text: tokens.colors.action.dark },
  };

  return (
    <div>
      {/* Operator Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
          {lang === 'fr' ? 'Vue Opérateur' : 'Operator View'}
        </h2>
        <p style={{ fontSize: '13px', color: tokens.colors.text.muted, marginTop: '4px' }}>
          {lang === 'fr' ? 'Tâches et documents du jour' : 'Today\'s tasks and documents'}
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {quickActions.map((action, idx) => (
          <Card
            key={idx}
            onClick={() => onNavigate(action.action)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'pointer',
              transition: 'transform 150ms ease, box-shadow 150ms ease',
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: `${action.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <Icon name={action.icon} size={24} color={action.color} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary, textAlign: 'center' }}>
              {action.label}
            </span>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Today's Tasks */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
              {lang === 'fr' ? 'Tâches du jour' : 'Today\'s Tasks'}
            </h3>
            <span style={{
              padding: '4px 10px',
              borderRadius: tokens.radius.full,
              background: tokens.colors.cream[300],
              fontSize: '11px',
              fontWeight: 600,
              color: tokens.colors.text.secondary,
            }}>
              {todayTasks.reduce((sum, t) => sum + t.completed, 0)}/{todayTasks.reduce((sum, t) => sum + t.count, 0)} {lang === 'fr' ? 'complétés' : 'completed'}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todayTasks.map(task => (
              <div
                key={task.id}
                style={{
                  padding: '14px',
                  background: tokens.colors.cream[100],
                  borderRadius: tokens.radius.md,
                  borderLeft: `4px solid ${priorityColors[task.priority]}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{task.title}</span>
                  <span style={{ fontSize: '12px', color: tokens.colors.text.muted }}>{task.completed}/{task.count}</span>
                </div>
                <div style={{
                  height: '6px',
                  background: tokens.colors.cream[300],
                  borderRadius: tokens.radius.full,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(task.completed / task.count) * 100}%`,
                    background: task.completed === task.count ? tokens.colors.success.main : tokens.colors.brand[500],
                    borderRadius: tokens.radius.full,
                    transition: 'width 300ms ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
              {lang === 'fr' ? 'Documents récents' : 'Recent Documents'}
            </h3>
            <button
              onClick={() => onNavigate('documents')}
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
              {lang === 'fr' ? 'Voir tout' : 'View All'}
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentUploads.map(doc => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: tokens.colors.cream[100],
                  borderRadius: tokens.radius.md,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: tokens.radius.md,
                    background: tokens.colors.cream[300],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon
                      name={doc.name.endsWith('.pdf') ? 'document' : 'fileImage'}
                      size={18}
                      color={tokens.colors.text.secondary}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{doc.name}</div>
                    <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{doc.time}</div>
                  </div>
                </div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: tokens.radius.full,
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: statusColors[doc.status].bg,
                  color: statusColors[doc.status].text,
                }}>
                  {doc.status === 'verified' ? (lang === 'fr' ? 'Vérifié' : 'Verified') :
                   doc.status === 'pending' ? (lang === 'fr' ? 'En attente' : 'Pending') :
                   (lang === 'fr' ? 'À revoir' : 'Review')}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Status Summary */}
      <Card style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: '0 0 16px 0' }}>
          {lang === 'fr' ? 'Résumé du statut' : 'Status Summary'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', background: tokens.colors.success.light, borderRadius: tokens.radius.md, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.success.dark }}>23</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.success.main, textTransform: 'uppercase' }}>
              {lang === 'fr' ? 'Vérifiés' : 'Verified'}
            </div>
          </div>
          <div style={{ padding: '16px', background: tokens.colors.neutral.light, borderRadius: tokens.radius.md, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.neutral.dark }}>7</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.neutral.main, textTransform: 'uppercase' }}>
              {lang === 'fr' ? 'En attente' : 'Pending'}
            </div>
          </div>
          <div style={{ padding: '16px', background: tokens.colors.action.light, borderRadius: tokens.radius.md, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.action.dark }}>2</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.action.main, textTransform: 'uppercase' }}>
              {lang === 'fr' ? 'À revoir' : 'Flagged'}
            </div>
          </div>
          <div style={{ padding: '16px', background: tokens.colors.cream[200], borderRadius: tokens.radius.md, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.text.primary }}>32</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, textTransform: 'uppercase' }}>
              {lang === 'fr' ? 'Total jour' : 'Total Today'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SiteOperatorDashboard;
