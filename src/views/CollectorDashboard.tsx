import React, { useState, type FC } from 'react';
import { tokens } from '../tokens';
import type { Industry } from '../types';

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

// Icons for the collector dashboard
const CollectorIcons = {
  truck: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  camera: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  upload: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  scale: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v19"/>
      <path d="M5 8l7-5 7 5"/>
      <path d="M3 13a4 4 0 0 0 4 4h2"/>
      <path d="M21 13a4 4 0 0 1-4 4h-2"/>
    </svg>
  ),
  mapPin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  tire: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  checkCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  alertCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  file: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
};

interface CollectorDashboardProps {
  industry: Industry;
  lang: 'en' | 'fr';
  onNavigate: (tab: string) => void;
}

export const CollectorDashboard: FC<CollectorDashboardProps> = ({
  industry,
  lang,
  onNavigate,
}) => {
  const [activeUploadModal, setActiveUploadModal] = useState<string | null>(null);

  // Today's collection route
  const todayRoute = [
    {
      id: 1,
      name: 'Norauto Saint-Denis',
      address: '15 Rue du Commerce, 93200 Saint-Denis',
      estimatedQty: '45-60',
      status: 'pending' as const,
      scheduledTime: '08:30',
    },
    {
      id: 2,
      name: 'Speedy Villepinte',
      address: '22 Avenue de la République, 93420 Villepinte',
      estimatedQty: '30-40',
      status: 'completed' as const,
      scheduledTime: '10:00',
      actualQty: 38,
      documents: ['Bon de collecte', 'Photo'],
    },
    {
      id: 3,
      name: 'Euromaster Aulnay',
      address: '8 Boulevard Robert Schuman, 93600 Aulnay-sous-Bois',
      estimatedQty: '80-100',
      status: 'in_progress' as const,
      scheduledTime: '11:30',
    },
    {
      id: 4,
      name: 'Feu Vert Le Blanc-Mesnil',
      address: '45 Avenue Charles Floquet, 93150 Le Blanc-Mesnil',
      estimatedQty: '25-35',
      status: 'pending' as const,
      scheduledTime: '14:00',
    },
    {
      id: 5,
      name: 'Garage Michelin Bobigny',
      address: '12 Rue Pablo Picasso, 93000 Bobigny',
      estimatedQty: '50-70',
      status: 'pending' as const,
      scheduledTime: '15:30',
    },
  ];

  // Daily stats
  const dailyStats = {
    collectionsCompleted: 1,
    collectionsTotal: 5,
    tiresCollected: 38,
    tiresTarget: 250,
    documentsUploaded: 2,
    documentsRequired: 10,
    photosUploaded: 1,
    gpsVerified: 1,
  };

  // Recent documents
  const recentDocs = [
    { id: 1, name: 'BC-2024-1892.pdf', type: 'Bon de collecte', location: 'Speedy Villepinte', time: 'Il y a 45 min', status: 'verified' as const },
    { id: 2, name: 'Photo-chargement-001.jpg', type: 'Photo', location: 'Speedy Villepinte', time: 'Il y a 42 min', status: 'verified' as const },
    { id: 3, name: 'BC-2024-1891.pdf', type: 'Bon de collecte', location: 'Norauto Drancy', time: 'Hier 16:30', status: 'verified' as const },
  ];

  const statusConfig = {
    pending: { bg: tokens.colors.cream[300], text: tokens.colors.text.secondary, label: lang === 'fr' ? 'En attente' : 'Pending' },
    in_progress: { bg: '#FEF3C7', text: '#92400E', label: lang === 'fr' ? 'En cours' : 'In Progress' },
    completed: { bg: tokens.colors.success.light, text: tokens.colors.success.dark, label: lang === 'fr' ? 'Terminé' : 'Completed' },
    verified: { bg: tokens.colors.success.light, text: tokens.colors.success.dark, label: lang === 'fr' ? 'Vérifié' : 'Verified' },
  };

  // Quick action buttons
  const quickActions = [
    {
      id: 'bon_collecte',
      icon: CollectorIcons.file,
      label: lang === 'fr' ? 'Bon de collecte' : 'Collection Note',
      sublabel: lang === 'fr' ? 'Scanner ou uploader' : 'Scan or upload',
      color: tokens.colors.brand[600],
    },
    {
      id: 'photo',
      icon: CollectorIcons.camera,
      label: lang === 'fr' ? 'Photo chargement' : 'Loading Photo',
      sublabel: lang === 'fr' ? 'Avec géolocalisation' : 'With GPS location',
      color: tokens.colors.success.main,
    },
    {
      id: 'pesee',
      icon: CollectorIcons.scale,
      label: lang === 'fr' ? 'Saisir pesée' : 'Enter Weight',
      sublabel: lang === 'fr' ? 'Estimation terrain' : 'Field estimate',
      color: '#8B5CF6',
    },
    {
      id: 'signature',
      icon: CollectorIcons.checkCircle,
      label: lang === 'fr' ? 'Signature détenteur' : 'Holder Signature',
      sublabel: lang === 'fr' ? 'Confirmation enlèvement' : 'Pickup confirmation',
      color: tokens.colors.action.main,
    },
  ];

  return (
    <div>
      {/* Header with collector info */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: tokens.colors.brand[600] }}>{CollectorIcons.truck}</span>
            {lang === 'fr' ? 'Tableau de bord Collecteur' : 'Collector Dashboard'}
          </h2>
          <p style={{ fontSize: '13px', color: tokens.colors.text.muted, marginTop: '4px' }}>
            {lang === 'fr' ? 'Tournée du ' : 'Route for '}{new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div style={{
          padding: '8px 16px',
          background: `linear-gradient(135deg, ${tokens.colors.brand[600]}, ${tokens.colors.brand[500]})`,
          borderRadius: tokens.radius.lg,
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
        }}>
          {lang === 'fr' ? 'Éco-organisme: ' : 'Eco-organization: '}TYVAL
        </div>
      </div>

      {/* Daily Progress Summary */}
      <Card style={{ marginBottom: '24px', background: `linear-gradient(135deg, ${tokens.colors.brand[600]}08, ${tokens.colors.brand[500]}05)` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: tokens.colors.brand[600] }}>
              {dailyStats.collectionsCompleted}/{dailyStats.collectionsTotal}
            </div>
            <div style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '4px' }}>
              {lang === 'fr' ? 'Points de collecte' : 'Collection Points'}
            </div>
            <div style={{
              marginTop: '8px',
              height: '6px',
              background: tokens.colors.cream[400],
              borderRadius: tokens.radius.full,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${(dailyStats.collectionsCompleted / dailyStats.collectionsTotal) * 100}%`,
                background: tokens.colors.brand[600],
                borderRadius: tokens.radius.full,
              }} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: tokens.colors.success.main }}>
              {dailyStats.tiresCollected}
            </div>
            <div style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '4px' }}>
              {lang === 'fr' ? 'Pneus collectés' : 'Tires Collected'}
            </div>
            <div style={{ fontSize: '11px', color: tokens.colors.text.secondary, marginTop: '4px' }}>
              {lang === 'fr' ? `Objectif: ${dailyStats.tiresTarget}` : `Target: ${dailyStats.tiresTarget}`}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: tokens.colors.text.primary }}>
              {dailyStats.documentsUploaded}/{dailyStats.documentsRequired}
            </div>
            <div style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '4px' }}>
              {lang === 'fr' ? 'Documents uploadés' : 'Documents Uploaded'}
            </div>
            <div style={{
              marginTop: '8px',
              height: '6px',
              background: tokens.colors.cream[400],
              borderRadius: tokens.radius.full,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${(dailyStats.documentsUploaded / dailyStats.documentsRequired) * 100}%`,
                background: dailyStats.documentsUploaded >= dailyStats.documentsRequired ? tokens.colors.success.main : tokens.colors.neutral.main,
                borderRadius: tokens.radius.full,
              }} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span style={{ color: tokens.colors.success.main }}>{CollectorIcons.mapPin}</span>
              <span style={{ fontSize: '32px', fontWeight: 700, color: tokens.colors.success.main }}>{dailyStats.gpsVerified}</span>
            </div>
            <div style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '4px' }}>
              {lang === 'fr' ? 'GPS vérifié' : 'GPS Verified'}
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions Grid */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: tokens.colors.text.primary, marginBottom: '12px' }}>
          {lang === 'fr' ? 'Actions rapides' : 'Quick Actions'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {quickActions.map((action) => (
            <Card
              key={action.id}
              onClick={() => setActiveUploadModal(action.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 16px',
                cursor: 'pointer',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
                borderColor: `${action.color}30`,
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: `${action.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                color: action.color,
              }}>
                {action.icon}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary, textAlign: 'center' }}>
                {action.label}
              </span>
              <span style={{ fontSize: '11px', color: tokens.colors.text.muted, textAlign: 'center', marginTop: '2px' }}>
                {action.sublabel}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        {/* Today's Route */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
              {lang === 'fr' ? 'Tournée du jour' : "Today's Route"}
            </h3>
            <span style={{
              padding: '4px 10px',
              borderRadius: tokens.radius.full,
              background: tokens.colors.cream[300],
              fontSize: '11px',
              fontWeight: 600,
              color: tokens.colors.text.secondary,
            }}>
              {todayRoute.length} {lang === 'fr' ? 'points' : 'stops'}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todayRoute.map((stop, idx) => (
              <div
                key={stop.id}
                style={{
                  padding: '14px',
                  background: stop.status === 'in_progress' ? '#FFFBEB' : tokens.colors.cream[100],
                  borderRadius: tokens.radius.md,
                  borderLeft: `4px solid ${
                    stop.status === 'completed' ? tokens.colors.success.main :
                    stop.status === 'in_progress' ? '#F59E0B' :
                    tokens.colors.neutral.main
                  }`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: tokens.colors.brand[600],
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.primary }}>{stop.name}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: tokens.colors.text.muted, marginLeft: '28px' }}>{stop.address}</div>
                  </div>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: tokens.radius.full,
                    fontSize: '10px',
                    fontWeight: 600,
                    background: statusConfig[stop.status].bg,
                    color: statusConfig[stop.status].text,
                  }}>
                    {statusConfig[stop.status].label}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: tokens.colors.text.secondary }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: tokens.colors.neutral.main }}>{CollectorIcons.clock}</span>
                      {stop.scheduledTime}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: tokens.colors.brand[600] }}>{CollectorIcons.tire}</span>
                      {stop.actualQty ? `${stop.actualQty} pneus` : `~${stop.estimatedQty} pneus`}
                    </span>
                  </div>
                  {stop.status === 'in_progress' && (
                    <button style={{
                      padding: '6px 12px',
                      background: tokens.colors.success.main,
                      color: '#fff',
                      border: 'none',
                      borderRadius: tokens.radius.md,
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}>
                      {lang === 'fr' ? 'Valider collecte' : 'Confirm Collection'}
                    </button>
                  )}
                  {stop.status === 'completed' && stop.documents && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {stop.documents.map((doc, i) => (
                        <span key={i} style={{
                          padding: '2px 6px',
                          background: tokens.colors.success.light,
                          color: tokens.colors.success.dark,
                          fontSize: '10px',
                          borderRadius: tokens.radius.sm,
                        }}>
                          {doc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Documents */}
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
              {recentDocs.map(doc => (
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
                      background: doc.type === 'Photo' ? tokens.colors.success.light : tokens.colors.cream[300],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: doc.type === 'Photo' ? tokens.colors.success.main : tokens.colors.text.secondary,
                    }}>
                      {doc.type === 'Photo' ? CollectorIcons.camera : CollectorIcons.file}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.primary }}>{doc.name}</div>
                      <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{doc.location} · {doc.time}</div>
                    </div>
                  </div>
                  <span style={{ color: tokens.colors.success.main }}>{CollectorIcons.checkCircle}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Traçabilité Tyval */}
          <Card style={{ background: `linear-gradient(135deg, ${tokens.colors.brand[600]}05, ${tokens.colors.success.main}05)` }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.colors.text.primary, margin: '0 0 16px 0' }}>
              {lang === 'fr' ? 'Traçabilité TYVAL' : 'TYVAL Traceability'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: tokens.colors.cream[50], borderRadius: tokens.radius.md }}>
                <span style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>
                  {lang === 'fr' ? 'Bon de collecte requis' : 'Collection note required'}
                </span>
                <span style={{ color: tokens.colors.success.main, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {CollectorIcons.checkCircle} OK
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: tokens.colors.cream[50], borderRadius: tokens.radius.md }}>
                <span style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>
                  {lang === 'fr' ? 'Photo géolocalisée' : 'Geolocated photo'}
                </span>
                <span style={{ color: tokens.colors.success.main, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {CollectorIcons.checkCircle} OK
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#FEF3C7', borderRadius: tokens.radius.md }}>
                <span style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>
                  {lang === 'fr' ? 'Signature détenteur' : 'Holder signature'}
                </span>
                <span style={{ color: '#92400E', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {CollectorIcons.alertCircle} {lang === 'fr' ? 'En attente' : 'Pending'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: tokens.colors.cream[50], borderRadius: tokens.radius.md }}>
                <span style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>
                  {lang === 'fr' ? 'Enregistré éco-organisme' : 'Eco-org registered'}
                </span>
                <span style={{ color: tokens.colors.success.main, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {CollectorIcons.checkCircle} OK
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      {activeUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setActiveUploadModal(null)}>
          <div style={{
            background: tokens.colors.cream[50],
            borderRadius: tokens.radius.xl,
            padding: '32px',
            maxWidth: '480px',
            width: '90%',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.text.primary, margin: '0 0 8px 0' }}>
              {activeUploadModal === 'bon_collecte' && (lang === 'fr' ? 'Uploader un bon de collecte' : 'Upload Collection Note')}
              {activeUploadModal === 'photo' && (lang === 'fr' ? 'Prendre une photo' : 'Take a Photo')}
              {activeUploadModal === 'pesee' && (lang === 'fr' ? 'Saisir une pesée' : 'Enter Weight')}
              {activeUploadModal === 'signature' && (lang === 'fr' ? 'Signature détenteur' : 'Holder Signature')}
            </h3>
            <p style={{ fontSize: '13px', color: tokens.colors.text.muted, marginBottom: '24px' }}>
              {activeUploadModal === 'bon_collecte' && (lang === 'fr' ? 'Formats acceptés: PDF, JPG, PNG. Les champs seront extraits automatiquement.' : 'Accepted formats: PDF, JPG, PNG. Fields will be extracted automatically.')}
              {activeUploadModal === 'photo' && (lang === 'fr' ? 'La photo sera automatiquement géolocalisée pour la traçabilité TYVAL.' : 'The photo will be automatically geolocated for TYVAL traceability.')}
              {activeUploadModal === 'pesee' && (lang === 'fr' ? 'Entrez l\'estimation du nombre de pneus collectés.' : 'Enter the estimated number of tires collected.')}
              {activeUploadModal === 'signature' && (lang === 'fr' ? 'Le détenteur doit signer pour confirmer l\'enlèvement.' : 'The holder must sign to confirm pickup.')}
            </p>

            {activeUploadModal === 'bon_collecte' && (
              <div style={{
                border: `2px dashed ${tokens.colors.cream[500]}`,
                borderRadius: tokens.radius.lg,
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
              }}>
                <div style={{ color: tokens.colors.brand[600], marginBottom: '12px' }}>{CollectorIcons.upload}</div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.primary, margin: 0 }}>
                  {lang === 'fr' ? 'Glissez-déposez ou cliquez pour uploader' : 'Drag & drop or click to upload'}
                </p>
                <p style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '4px' }}>
                  PDF, JPG, PNG (max 10 MB)
                </p>
              </div>
            )}

            {activeUploadModal === 'photo' && (
              <div style={{
                border: `2px dashed ${tokens.colors.cream[500]}`,
                borderRadius: tokens.radius.lg,
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: tokens.colors.success.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: tokens.colors.success.main,
                }}>
                  {CollectorIcons.camera}
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.primary, margin: 0 }}>
                  {lang === 'fr' ? 'Ouvrir la caméra' : 'Open Camera'}
                </p>
                <p style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <span style={{ color: tokens.colors.success.main }}>{CollectorIcons.mapPin}</span>
                  {lang === 'fr' ? 'Géolocalisation activée' : 'Geolocation enabled'}
                </p>
              </div>
            )}

            {activeUploadModal === 'pesee' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '8px' }}>
                  {lang === 'fr' ? 'Nombre de pneus collectés' : 'Number of tires collected'}
                </label>
                <input
                  type="number"
                  placeholder="Ex: 45"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${tokens.colors.cream[400]}`,
                    borderRadius: tokens.radius.md,
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    marginBottom: '16px',
                  }}
                />
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '8px' }}>
                  {lang === 'fr' ? 'Catégorie principale' : 'Main category'}
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${tokens.colors.cream[400]}`,
                  borderRadius: tokens.radius.md,
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  background: '#fff',
                }}>
                  <option value="vl">{lang === 'fr' ? 'Pneus VL (Véhicules légers)' : 'Passenger car tires'}</option>
                  <option value="pl">{lang === 'fr' ? 'Pneus PL (Poids lourds)' : 'Truck tires'}</option>
                  <option value="agri">{lang === 'fr' ? 'Pneus agricoles' : 'Agricultural tires'}</option>
                  <option value="moto">{lang === 'fr' ? 'Pneus moto' : 'Motorcycle tires'}</option>
                </select>
              </div>
            )}

            {activeUploadModal === 'signature' && (
              <div style={{
                border: `1px solid ${tokens.colors.cream[400]}`,
                borderRadius: tokens.radius.lg,
                padding: '24px',
                textAlign: 'center',
                background: '#fff',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <p style={{ fontSize: '14px', color: tokens.colors.text.muted, margin: 0 }}>
                  {lang === 'fr' ? 'Zone de signature' : 'Signature area'}
                </p>
                <p style={{ fontSize: '12px', color: tokens.colors.text.muted, marginTop: '8px' }}>
                  {lang === 'fr' ? 'Dessinez votre signature avec le doigt ou la souris' : 'Draw your signature with finger or mouse'}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setActiveUploadModal(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: tokens.colors.cream[300],
                  color: tokens.colors.text.primary,
                  border: 'none',
                  borderRadius: tokens.radius.md,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {lang === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button
                onClick={() => setActiveUploadModal(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: tokens.colors.brand[600],
                  color: '#fff',
                  border: 'none',
                  borderRadius: tokens.radius.md,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {lang === 'fr' ? 'Valider' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectorDashboard;
