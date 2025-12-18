// ============================================================================
// eco₂Veritas - Client Product Interface
// ============================================================================
// Professional UI with custom SVG icons (no emojis)
// Industry-adaptive compliance & traceability platform
// ============================================================================

import React, { useState, useMemo, type ReactNode, type FC, type CSSProperties } from 'react';

// ============================================================================
// TYPES
// ============================================================================

type IndustryId = 'tire_epo' | 'chemical_recycling' | 'packaging_prn' | 'weee_collection' | 'plastics_mechanical';
type PersonaId = 'compliance_officer' | 'operations_manager' | 'site_operator';
type DocumentStatus = 'verified' | 'pending' | 'flagged' | 'missing';
type ProcessStep = 'collection' | 'reception' | 'processing' | 'output' | 'certification';

interface MaterialFlow {
  id: string;
  date: string;
  source: string;
  material: string;
  quantity: number;
  unit: string;
  status: DocumentStatus;
  documents: Document[];
  step: ProcessStep;
}

interface Document {
  id: string;
  type: string;
  name: string;
  status: DocumentStatus;
  confidence?: number;
  extractedData?: Record<string, string>;
  uploadedAt: string;
}

interface MassBalanceEntry {
  period: string;
  material: string;
  inputKg: number;
  outputKg: number;
  wasteKg: number;
  yieldPercent: number;
  isBalanced: boolean;
}

interface Certificate {
  id: string;
  type: string;
  reference: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'valid' | 'expiring' | 'expired' | 'draft';
  linkedFlows: number;
}

interface Industry {
  id: IndustryId;
  name: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  terminology: {
    input: string;
    output: string;
    document: string;
    certificate: string;
    compliance: string;
    unit: string;
  };
  regulations: string[];
  kpis: { label: string; key: string; unit: string; target?: number }[];
  processSteps: { id: ProcessStep; label: string; icon: string }[];
  documentTypes: string[];
}

interface Persona {
  id: PersonaId;
  title: string;
  icon: string;
  focus: string[];
  dashboardLayout: string[];
}

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const tokens = {
  colors: {
    navy: { 900: '#0A1628', 800: '#0F2137', 700: '#152A46', 600: '#1B3A5C', 500: '#2A4A7A' },
    cream: { 50: '#FFFEF9', 100: '#FDF9F3', 200: '#F8F3EA', 300: '#F2EBE0', 400: '#E8DFD0', 500: '#D4C8B5' },
    accent: { main: '#D35D3A', light: '#E8927A', pale: '#FEF3EB' },
    text: { primary: '#1A2332', secondary: '#4A5568', muted: '#718096', inverse: '#FFFFFF' },
    success: { main: '#2D7A5E', light: '#E5F2EC', dark: '#1D5A42' },
    warning: { main: '#C48B2E', light: '#FDF5E1' },
    danger: { main: '#C44D4D', light: '#FDECEC' },
    info: { main: '#3A6B96', light: '#E8F0F8' },
  },
  radius: { sm: '6px', md: '8px', lg: '12px', xl: '14px', '2xl': '16px', full: '9999px' },
  shadow: { sm: '0 1px 3px rgba(10,22,40,0.08)', md: '0 4px 12px rgba(10,22,40,0.10)', lg: '0 8px 24px rgba(10,22,40,0.14)' },
} as const;

// ============================================================================
// SVG ICON LIBRARY - Professional contextual icons
// ============================================================================

const icons: Record<string, FC<{ size?: number; color?: string }>> = {
  // Navigation & UI
  home: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
  menu: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
  search: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  bell: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  settings: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>),
  filter: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>),
  arrowRight: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>),
  
  // Status icons
  checkCircle: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>),
  alertTriangle: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>),
  clock: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  xCircle: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>),
  
  // Actions
  upload: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>),
  download: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
  eye: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  
  // Data & Documents
  document: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>),
  certificate: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>),
  reports: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>),
  flows: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
  scale: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" /><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" /><path d="M7 21h10M12 3v18" /></svg>),
  
  // INDUSTRY ICONS
  tire: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></svg>),
  
  flask: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v6.5L4 20a1 1 0 0 0 .8 1.6h14.4a1 1 0 0 0 .8-1.6L14 9.5V3" /><path d="M7 15h10" /><circle cx="9" cy="18" r="1" fill={color} /><circle cx="14" cy="17" r="0.5" fill={color} /></svg>),
  
  package: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
  
  refrigerator: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="8" y1="5" x2="8" y2="7" /><line x1="8" y1="12" x2="8" y2="16" /></svg>),
  
  recycle: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" /><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" /><path d="m14 16-3 3 3 3" /><path d="M8.293 13.596L4.875 8.5l3.418-5.096a1.83 1.83 0 0 1 1.561-.881h2.292" /><path d="m9.5 5.5 4-3" /><path d="m9.5 8.5 4 3" /><path d="M14.746 8.904L18.263 15" /><path d="m17 5 3 4.5" /><path d="m21 5-3 4.5" /></svg>),
  
  // PROCESS STEP ICONS
  truck: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
  
  weighScale: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="18" height="8" rx="1" /><path d="M12 4v8" /><path d="M8 8l4-4 4 4" /><rect x="6" y="14" width="4" height="4" /><rect x="14" y="14" width="4" height="4" /></svg>),
  
  sorting: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M7 12h10" /><path d="M10 18h4" /><circle cx="3" cy="6" r="1" fill={color} /><circle cx="21" cy="6" r="1" fill={color} /></svg>),
  
  factory: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M5 20V8l5 4V8l5 4V4h5v16" /><path d="M3 20v-2" /><rect x="17" y="8" width="2" height="3" /><rect x="17" y="14" width="2" height="3" /></svg>),
  
  oilDrop: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-6 7.5-6 12a6 6 0 0 0 12 0c0-4.5-6-12-6-12z" /><path d="M12 18a2 2 0 0 0 2-2c0-1.5-2-4-2-4s-2 2.5-2 4a2 2 0 0 0 2 2z" /></svg>),
  
  qualityCheck: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
  
  fire: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4-2 8-6 8-12 0-3-2-6-4-8-1 3-2 4-4 4s-3-1-4-4C6 4 4 7 4 10c0 6 4 10 8 12z" /><path d="M12 22c-2-1-4-3-4-6 0-2 1-3 2-4 .5 1.5 1 2 2 2s1.5-.5 2-2c1 1 2 2 2 4 0 3-2 5-4 6z" /></svg>),
  
  pellets: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><circle cx="7" cy="17" r="3" /><circle cx="17" cy="17" r="3" /><circle cx="12" cy="12" r="2" /></svg>),
  
  robot: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 2v4" /><circle cx="12" cy="2" r="1" /><circle cx="8" cy="13" r="1.5" fill={color} /><circle cx="16" cy="13" r="1.5" fill={color} /><path d="M9 17h6" /><path d="M1 12h2" /><path d="M21 12h2" /></svg>),
  
  clipboard: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>),
  
  stamp: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14" /><path d="M5 18h14v4H5z" /><path d="M8 14h8" /><path d="M7 14v4" /><path d="M17 14v4" /><rect x="9" y="6" width="6" height="8" rx="1" /><circle cx="12" cy="4" r="2" /></svg>),
  
  washing: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="12" cy="13" r="5" /><path d="M12 8v.01" /><path d="M8 5h2" /><path d="M14 5h2" /><path d="M9 13c1-1 2-1 3 0s2 1 3 0" /></svg>),
  
  intake: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /></svg>),
  
  trophy: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" /><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" /><path d="M6 3h12v7a6 6 0 0 1-12 0V3z" /><path d="M12 16v4" /><path d="M8 22h8" /></svg>),
  
  reconcile: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2-2H4" /><path d="m15 9 3 3-3 3" /></svg>),
  
  // PERSONA ICONS
  complianceOfficer: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>),
  
  operationsManager: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4" /><path d="M12 19v4" /><path d="M4.22 4.22l2.83 2.83" /><path d="M16.95 16.95l2.83 2.83" /><path d="M1 12h4" /><path d="M19 12h4" /><path d="M4.22 19.78l2.83-2.83" /><path d="M16.95 7.05l2.83-2.83" /></svg>),
  
  siteOperator: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v1H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3z" /><circle cx="12" cy="9" r="1" /><path d="M12 12v5" /><path d="M8 22v-2" /><path d="M16 22v-2" /></svg>),
};

const Icon: FC<{ name: string; size?: number; color?: string }> = ({ name, size = 20, color = 'currentColor' }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
};

// ============================================================================
// INDUSTRY CONFIGURATIONS
// ============================================================================

const industries: Record<IndustryId, Industry> = {
  tire_epo: {
    id: 'tire_epo',
    name: 'Tire Recycling EPO',
    icon: 'tire',
    color: '#4A4A4A',
    gradientFrom: '#3D3D3D',
    gradientTo: '#5A5A5A',
    terminology: { input: 'Collected Tires', output: 'Valorized Material', document: 'Collection Declaration', certificate: 'EPO Certificate', compliance: 'EPR Tire', unit: 'units' },
    regulations: ['EPR Tire France', 'Waste Shipment Regulation', 'REACH'],
    kpis: [
      { label: 'Collection Volume', key: 'collectionVolume', unit: 't', target: 46000000 },
      { label: 'Reuse Rate', key: 'reuseRate', unit: '%', target: 20 },
      { label: 'NRUT Stock', key: 'nrutStock', unit: 't' },
      { label: 'Valorization Rate', key: 'valorizationRate', unit: '%', target: 100 },
    ],
    processSteps: [
      { id: 'collection', label: 'Collection', icon: 'truck' },
      { id: 'reception', label: 'Reception & Weighing', icon: 'weighScale' },
      { id: 'processing', label: 'Sorting & Grading', icon: 'sorting' },
      { id: 'output', label: 'Valorization', icon: 'recycle' },
      { id: 'certification', label: 'EPO Declaration', icon: 'clipboard' },
    ],
    documentTypes: ['Weighing Slip', 'Transport Document', 'Collector Declaration', 'Valorization Certificate'],
  },
  
  chemical_recycling: {
    id: 'chemical_recycling',
    name: 'Chemical Recycling',
    icon: 'flask',
    color: '#6B46C1',
    gradientFrom: '#553C9A',
    gradientTo: '#805AD5',
    terminology: { input: 'Feedstock', output: 'Pyrolysis Oil', document: 'Mass Balance Declaration', certificate: 'ISCC+ Certificate', compliance: 'ISCC+ Audit', unit: 'kg' },
    regulations: ['ISCC+', 'REDcert²', 'Mass Balance', 'EUDR'],
    kpis: [
      { label: 'Mass Balance Accuracy', key: 'massBalanceAccuracy', unit: '%', target: 100 },
      { label: 'PyOil Output', key: 'pyoilOutput', unit: 't' },
      { label: 'Feedstock Verified', key: 'feedstockVerified', unit: '%', target: 100 },
      { label: 'Waste/Off-spec', key: 'wasteRate', unit: '%' },
    ],
    processSteps: [
      { id: 'collection', label: 'Feedstock Intake', icon: 'intake' },
      { id: 'reception', label: 'Quality Check', icon: 'qualityCheck' },
      { id: 'processing', label: 'Pyrolysis', icon: 'fire' },
      { id: 'output', label: 'Oil Output', icon: 'oilDrop' },
      { id: 'certification', label: 'ISCC+ Declaration', icon: 'stamp' },
    ],
    documentTypes: ['Feedstock Declaration', 'Origin Certificate', 'Mass Balance Report', 'ISCC+ Sustainability Declaration', 'Offtaker Export'],
  },
  
  packaging_prn: {
    id: 'packaging_prn',
    name: 'Packaging Recycling',
    icon: 'package',
    color: '#2B6CB0',
    gradientFrom: '#2C5282',
    gradientTo: '#4299E1',
    terminology: { input: 'Infeed Material', output: 'Recycled Output', document: 'Certificate of Analysis', certificate: 'PRN/PERN', compliance: 'EPR Packaging', unit: 'kg' },
    regulations: ['PRN/PERN', 'EPR Packaging', 'RecyClass', 'PPWR'],
    kpis: [
      { label: 'PRN Coverage', key: 'prnCoverage', unit: '%', target: 100 },
      { label: 'COA Error Rate', key: 'coaErrorRate', unit: '%', target: 0 },
      { label: 'Yield', key: 'yield', unit: '%', target: 90 },
      { label: 'Infeed Mapped', key: 'infeedMapped', unit: '%', target: 100 },
    ],
    processSteps: [
      { id: 'collection', label: 'Material Reception', icon: 'intake' },
      { id: 'reception', label: 'Weighbridge', icon: 'weighScale' },
      { id: 'processing', label: 'Processing', icon: 'factory' },
      { id: 'output', label: 'Output & QC', icon: 'qualityCheck' },
      { id: 'certification', label: 'COA & PRN', icon: 'certificate' },
    ],
    documentTypes: ['Weighbridge Ticket', 'Delivery Note', 'Process Log', 'Certificate of Analysis', 'PRN Evidence'],
  },
  
  weee_collection: {
    id: 'weee_collection',
    name: 'WEEE Collection',
    icon: 'refrigerator',
    color: '#38A169',
    gradientFrom: '#276749',
    gradientTo: '#48BB78',
    terminology: { input: 'Collected Units', output: 'Processed Units', document: 'Collection Record', certificate: 'WEEE Certificate', compliance: 'WEEE Directive', unit: 'units' },
    regulations: ['WEEE Directive', 'EPR WEEE', 'F-Gas Regulation'],
    kpis: [
      { label: 'Units Collected', key: 'unitsCollected', unit: 'units' },
      { label: 'Verification Rate', key: 'verificationRate', unit: '%', target: 100 },
      { label: 'Registration Accuracy', key: 'registrationAccuracy', unit: '%', target: 100 },
      { label: 'Processing Time', key: 'processingTime', unit: 'days' },
    ],
    processSteps: [
      { id: 'collection', label: 'Collection', icon: 'truck' },
      { id: 'reception', label: 'Document Upload', icon: 'upload' },
      { id: 'processing', label: 'AI Verification', icon: 'robot' },
      { id: 'output', label: 'Reconciliation', icon: 'reconcile' },
      { id: 'certification', label: 'Report Generation', icon: 'reports' },
    ],
    documentTypes: ['Collection Sheet', 'Transport Manifest', 'Unit Registration', 'Verification Report'],
  },
  
  plastics_mechanical: {
    id: 'plastics_mechanical',
    name: 'Plastics Recycling',
    icon: 'recycle',
    color: '#00A3C4',
    gradientFrom: '#0987A0',
    gradientTo: '#38B2CE',
    terminology: { input: 'Post-Consumer Waste', output: 'rPET / Flakes', document: 'Quality Certificate', certificate: 'Traceability Certificate', compliance: 'Brand Requirements', unit: 'kg' },
    regulations: ['EuCertPlast', 'RecyClass', 'Food Contact', 'Brand Specs'],
    kpis: [
      { label: 'Throughput', key: 'throughput', unit: 't/month', target: 2000 },
      { label: 'Purity Level', key: 'purityLevel', unit: '%', target: 99 },
      { label: 'Traceability Coverage', key: 'traceabilityCoverage', unit: '%', target: 100 },
      { label: 'Customer Compliance', key: 'customerCompliance', unit: '%', target: 100 },
    ],
    processSteps: [
      { id: 'collection', label: 'Intake', icon: 'intake' },
      { id: 'reception', label: 'Sorting (AI)', icon: 'robot' },
      { id: 'processing', label: 'Washing/Grinding', icon: 'washing' },
      { id: 'output', label: 'Pelletizing', icon: 'pellets' },
      { id: 'certification', label: 'Certification', icon: 'trophy' },
    ],
    documentTypes: ['Intake Record', 'AI Sorting Log', 'Quality Test', 'Customer Certificate'],
  },
};

// ============================================================================
// PERSONA CONFIGURATIONS
// ============================================================================

const personas: Record<PersonaId, Persona> = {
  compliance_officer: { id: 'compliance_officer', title: 'Compliance Officer', icon: 'complianceOfficer', focus: ['Audit readiness', 'Certificate validity', 'Regulatory deadlines', 'Filing status'], dashboardLayout: ['alerts', 'certificates', 'audits', 'deadlines'] },
  operations_manager: { id: 'operations_manager', title: 'Operations Manager', icon: 'operationsManager', focus: ['Process efficiency', 'Document processing', 'Error rates', 'Throughput'], dashboardLayout: ['kpis', 'processing', 'flows', 'quality'] },
  site_operator: { id: 'site_operator', title: 'Site Operator', icon: 'siteOperator', focus: ['Daily operations', 'Document upload', 'Verification status', 'Tasks'], dashboardLayout: ['tasks', 'upload', 'recent', 'status'] },
};

// ============================================================================
// MOCK DATA GENERATOR
// ============================================================================

const generateMockData = (industry: Industry) => {
  const baseFlows: MaterialFlow[] = [];
  const statusOptions: DocumentStatus[] = ['verified', 'verified', 'verified', 'pending', 'flagged'];
  
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    baseFlows.push({
      id: `flow-${i}`,
      date: date.toISOString().split('T')[0],
      source: `Supplier ${String.fromCharCode(65 + (i % 8))}`,
      material: industry.terminology.input,
      quantity: Math.floor(Math.random() * 10000) + 1000,
      unit: industry.terminology.unit,
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      documents: industry.documentTypes.slice(0, 2 + Math.floor(Math.random() * 2)).map((type, j) => ({
        id: `doc-${i}-${j}`,
        type,
        name: `${type.replace(/\s/g, '_')}_${date.toISOString().split('T')[0]}_${i}.pdf`,
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        confidence: 85 + Math.floor(Math.random() * 15),
        uploadedAt: date.toISOString(),
      })),
      step: industry.processSteps[Math.floor(Math.random() * industry.processSteps.length)].id,
    });
  }
  
  return { flows: baseFlows };
};

// ============================================================================
// LOGO
// ============================================================================

const Logo: FC<{ collapsed?: boolean; variant?: 'light' | 'dark' }> = ({ collapsed = false, variant = 'dark' }) => {
  const primaryColor = variant === 'light' ? tokens.colors.cream[50] : tokens.colors.navy[900];
  const accentColor = tokens.colors.accent.main;
  
  if (collapsed) {
    return (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <path d="M20 4C11.163 4 4 11.163 4 20c0 8.837 7.163 16 16 16s16-7.163 16-16" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M32 4L36 8L32 12" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10" stroke={accentColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M13 20L17 24L27 14" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  
  return (
    <svg width="156" height="40" viewBox="0 0 156 40" fill="none">
      <path d="M20 4C11.163 4 4 11.163 4 20c0 8.837 7.163 16 16 16s16-7.163 16-16" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M32 4L36 8L32 12" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs><linearGradient id="logoGrad" x1="8" y1="28" x2="8" y2="12"><stop offset="0%" stopColor="#E67E22" /><stop offset="100%" stopColor={accentColor} /></linearGradient></defs>
      <path d="M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M13 20L17 24L27 14" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="46" y="27" fontFamily="Nunito, system-ui" fontSize="20" fontWeight="700" fill={primaryColor}>eco</text>
      <text x="76" y="31" fontFamily="Nunito, system-ui" fontSize="13" fontWeight="700" fill={primaryColor}>2</text>
      <text x="86" y="27" fontFamily="Nunito, system-ui" fontSize="20" fontWeight="800" fill={primaryColor}>Veritas</text>
    </svg>
  );
};

// ============================================================================
// BASE COMPONENTS
// ============================================================================

const Card: FC<{ children: ReactNode; padding?: 'sm' | 'md' | 'lg'; style?: CSSProperties }> = ({ children, padding = 'md', style }) => {
  const paddingSizes = { sm: '14px', md: '20px', lg: '24px' };
  return <div style={{ background: tokens.colors.cream[200], borderRadius: tokens.radius.xl, padding: paddingSizes[padding], border: `1px solid ${tokens.colors.cream[400]}`, boxShadow: tokens.shadow.sm, ...style }}>{children}</div>;
};

const Button: FC<{ children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md'; icon?: string; onClick?: () => void; style?: CSSProperties }> = ({ children, variant = 'primary', size = 'md', icon, onClick, style }) => {
  const variantStyles: Record<string, CSSProperties> = {
    primary: { background: tokens.colors.accent.main, color: '#FFF', border: 'none' },
    secondary: { background: tokens.colors.cream[200], color: tokens.colors.text.primary, border: `1px solid ${tokens.colors.cream[500]}` },
    ghost: { background: 'transparent', color: tokens.colors.navy[600], border: 'none' },
  };
  const sizeStyles: Record<string, CSSProperties> = { sm: { padding: '6px 12px', fontSize: '12px' }, md: { padding: '8px 16px', fontSize: '13px' } };
  
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontFamily: 'inherit', borderRadius: tokens.radius.md, cursor: 'pointer', transition: 'all 150ms ease', ...variantStyles[variant], ...sizeStyles[size], ...style }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

const Badge: FC<{ variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info'; icon?: string; children: ReactNode }> = ({ variant = 'neutral', icon, children }) => {
  const styles: Record<string, { bg: string; color: string }> = {
    success: { bg: tokens.colors.success.light, color: tokens.colors.success.main },
    warning: { bg: tokens.colors.warning.light, color: tokens.colors.warning.main },
    danger: { bg: tokens.colors.danger.light, color: tokens.colors.danger.main },
    neutral: { bg: tokens.colors.cream[400], color: tokens.colors.text.secondary },
    info: { bg: tokens.colors.info.light, color: tokens.colors.info.main },
  };
  const s = styles[variant];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: tokens.radius.full, fontSize: '11px', fontWeight: 600, background: s.bg, color: s.color }}>{icon && <Icon name={icon} size={12} />}{children}</span>;
};

const StatusBadge: FC<{ status: DocumentStatus }> = ({ status }) => {
  const config: Record<DocumentStatus, { variant: 'success' | 'warning' | 'danger' | 'neutral'; icon: string; label: string }> = {
    verified: { variant: 'success', icon: 'checkCircle', label: 'Verified' },
    pending: { variant: 'warning', icon: 'clock', label: 'Pending' },
    flagged: { variant: 'danger', icon: 'alertTriangle', label: 'Flagged' },
    missing: { variant: 'neutral', icon: 'xCircle', label: 'Missing' },
  };
  const c = config[status];
  return <Badge variant={c.variant} icon={c.icon}>{c.label}</Badge>;
};

// ============================================================================
// KPI CARD
// ============================================================================

const KPICard: FC<{ label: string; value: number | string; unit: string; target?: number; industry: Industry }> = ({ label, value, unit, target, industry }) => {
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  const progress = target ? Math.min((numValue / target) * 100, 100) : null;
  const isOnTrack = target ? numValue >= target * 0.9 : true;
  
  return (
    <Card padding="sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ fontSize: '12px', color: tokens.colors.text.muted, fontWeight: 500 }}>{label}</div>
        {target && <Badge variant={isOnTrack ? 'success' : 'warning'}>{isOnTrack ? 'On Track' : 'Below Target'}</Badge>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontSize: '28px', fontWeight: 700, color: tokens.colors.text.primary }}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
        <span style={{ fontSize: '14px', color: tokens.colors.text.muted }}>{unit}</span>
      </div>
      {progress !== null && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ height: '4px', background: tokens.colors.cream[400], borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: isOnTrack ? tokens.colors.success.main : tokens.colors.warning.main, borderRadius: '2px', transition: 'width 300ms ease' }} />
          </div>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, marginTop: '4px' }}>Target: {target?.toLocaleString()} {unit}</div>
        </div>
      )}
    </Card>
  );
};

// ============================================================================
// PROCESS PIPELINE
// ============================================================================

const ProcessPipeline: FC<{ industry: Industry; flows: MaterialFlow[] }> = ({ industry, flows }) => {
  const stepCounts = industry.processSteps.map(step => ({
    ...step,
    count: flows.filter(f => f.step === step.id).length,
    verified: flows.filter(f => f.step === step.id && f.status === 'verified').length,
  }));
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>Process Pipeline</h3>
        <Badge variant="info">{flows.length} active flows</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {stepCounts.map((step, i) => (
          <React.Fragment key={step.id}>
            <div style={{ flex: 1, background: tokens.colors.cream[300], borderRadius: tokens.radius.lg, padding: '16px', textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <Icon name={step.icon} size={22} color={industry.color} />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.primary, marginBottom: '4px' }}>{step.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: industry.color }}>{step.count}</div>
              <div style={{ fontSize: '10px', color: tokens.colors.text.muted }}>{step.verified} verified</div>
              {step.count > 0 && (
                <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '3px', background: tokens.colors.cream[400], borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(step.verified / step.count) * 100}%`, background: tokens.colors.success.main }} />
                </div>
              )}
            </div>
            {i < stepCounts.length - 1 && (
              <div style={{ color: tokens.colors.cream[500] }}>
                <Icon name="arrowRight" size={20} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

// ============================================================================
// MASS BALANCE VIEW
// ============================================================================

const MassBalanceView: FC<{ industry: Industry }> = ({ industry }) => {
  const mockBalance: MassBalanceEntry[] = [
    { period: 'Week 50', material: 'Mixed Plastics', inputKg: 45200, outputKg: 38420, wasteKg: 5870, yieldPercent: 85.0, isBalanced: true },
    { period: 'Week 49', material: 'PE/PP Feedstock', inputKg: 52100, outputKg: 44285, wasteKg: 6762, yieldPercent: 85.0, isBalanced: true },
    { period: 'Week 48', material: 'Mixed Plastics', inputKg: 48300, outputKg: 40100, wasteKg: 7200, yieldPercent: 83.0, isBalanced: false },
  ];
  
  const totalInput = mockBalance.reduce((sum, b) => sum + b.inputKg, 0);
  const totalOutput = mockBalance.reduce((sum, b) => sum + b.outputKg, 0);
  const totalWaste = mockBalance.reduce((sum, b) => sum + b.wasteKg, 0);
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: tokens.radius.md, background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="scale" size={20} color={industry.color} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>Mass Balance</h3>
        </div>
        <Button variant="secondary" size="sm" icon="download">Export ISCC+</Button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: tokens.colors.cream[300], borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>Total Input</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.text.primary }}>{(totalInput / 1000).toFixed(1)}t</div>
        </div>
        <div style={{ background: tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>PyOil Output</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.success.main }}>{(totalOutput / 1000).toFixed(1)}t</div>
        </div>
        <div style={{ background: tokens.colors.warning.light, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>Waste/Off-spec</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.warning.main }}>{(totalWaste / 1000).toFixed(1)}t</div>
        </div>
        <div style={{ background: `${industry.color}15`, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>Avg Yield</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: industry.color }}>{((totalOutput / totalInput) * 100).toFixed(1)}%</div>
        </div>
      </div>
      
      <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 100px 100px 80px 80px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
          <div>Period</div><div>Material</div><div style={{ textAlign: 'right' }}>Input (kg)</div><div style={{ textAlign: 'right' }}>Output (kg)</div><div style={{ textAlign: 'right' }}>Waste (kg)</div><div style={{ textAlign: 'right' }}>Yield</div><div style={{ textAlign: 'center' }}>Status</div>
        </div>
        {mockBalance.map((entry, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 100px 100px 80px 80px', padding: '12px 14px', borderBottom: i < mockBalance.length - 1 ? `1px solid ${tokens.colors.cream[300]}` : 'none', fontSize: '13px', alignItems: 'center' }}>
            <div style={{ fontWeight: 500, color: tokens.colors.text.primary }}>{entry.period}</div>
            <div style={{ color: tokens.colors.text.secondary }}>{entry.material}</div>
            <div style={{ textAlign: 'right', fontWeight: 500 }}>{entry.inputKg.toLocaleString()}</div>
            <div style={{ textAlign: 'right', fontWeight: 500, color: tokens.colors.success.main }}>{entry.outputKg.toLocaleString()}</div>
            <div style={{ textAlign: 'right', color: tokens.colors.text.muted }}>{entry.wasteKg.toLocaleString()}</div>
            <div style={{ textAlign: 'right', fontWeight: 600, color: entry.yieldPercent >= 85 ? tokens.colors.success.main : tokens.colors.warning.main }}>{entry.yieldPercent}%</div>
            <div style={{ textAlign: 'center' }}><Badge variant={entry.isBalanced ? 'success' : 'warning'}>{entry.isBalanced ? 'OK' : '!'}</Badge></div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================================
// DOCUMENT PROCESSING VIEW
// ============================================================================

const DocumentProcessingView: FC<{ industry: Industry; flows: MaterialFlow[] }> = ({ industry, flows }) => {
  const allDocs = flows.flatMap(f => f.documents);
  const verified = allDocs.filter(d => d.status === 'verified').length;
  const pending = allDocs.filter(d => d.status === 'pending').length;
  const flagged = allDocs.filter(d => d.status === 'flagged').length;
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>Document Processing</h3>
        <Button variant="primary" size="sm" icon="upload">Upload Documents</Button>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {[
          { icon: 'checkCircle', count: verified, label: 'Verified', color: tokens.colors.success },
          { icon: 'clock', count: pending, label: 'Pending', color: tokens.colors.warning },
          { icon: 'alertTriangle', count: flagged, label: 'Flagged', color: tokens.colors.danger },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, background: stat.color.light, borderRadius: tokens.radius.md, padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name={stat.icon} size={20} color={stat.color.main} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: stat.color.main }}>{stat.count}</div>
              <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '10px' }}>Recent Documents</div>
      {flows.slice(0, 5).flatMap(f => f.documents).slice(0, 6).map((doc, i) => (
        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: i % 2 === 0 ? tokens.colors.cream[100] : tokens.colors.cream[200], borderRadius: tokens.radius.sm, marginBottom: '4px' }}>
          <Icon name="document" size={18} color={tokens.colors.text.muted} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: tokens.colors.text.primary }}>{doc.name}</div>
            <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{doc.type}</div>
          </div>
          {doc.confidence && <div style={{ fontSize: '11px', color: doc.confidence >= 90 ? tokens.colors.success.main : tokens.colors.warning.main, fontWeight: 600 }}>{doc.confidence}%</div>}
          <StatusBadge status={doc.status} />
          <Button variant="ghost" size="sm" icon="eye">View</Button>
        </div>
      ))}
    </Card>
  );
};

// ============================================================================
// CERTIFICATE TRACKING
// ============================================================================

const CertificateTracking: FC<{ industry: Industry }> = ({ industry }) => {
  const mockCerts: Certificate[] = [
    { id: '1', type: industry.terminology.certificate, reference: `CERT-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-12-01', expiryDate: '2025-03-01', status: 'valid', linkedFlows: 45 },
    { id: '2', type: 'Sustainability Declaration', reference: `SD-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-11-15', status: 'valid', linkedFlows: 32 },
    { id: '3', type: 'Origin Certificate', reference: `OC-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-10-20', expiryDate: '2024-12-20', status: 'expiring', linkedFlows: 18 },
  ];
  
  const statusColors = { valid: tokens.colors.success, expiring: tokens.colors.warning, expired: tokens.colors.danger, draft: tokens.colors.info };
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: tokens.radius.md, background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="certificate" size={20} color={industry.color} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>{industry.terminology.certificate}s</h3>
        </div>
        <Button variant="primary" size="sm" icon="certificate">Generate New</Button>
      </div>
      
      {mockCerts.map(cert => (
        <div key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: tokens.colors.cream[300], borderRadius: tokens.radius.md, marginBottom: '10px', borderLeft: `4px solid ${statusColors[cert.status].main}` }}>
          <div style={{ width: '40px', height: '40px', borderRadius: tokens.radius.md, background: `${statusColors[cert.status].main}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="certificate" size={20} color={statusColors[cert.status].main} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '13px', color: tokens.colors.text.primary }}>{cert.type}</div>
            <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{cert.reference}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>{cert.linkedFlows} linked flows</div>
            {cert.expiryDate && <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>Expires: {cert.expiryDate}</div>}
          </div>
          <Badge variant={cert.status === 'valid' ? 'success' : cert.status === 'expiring' ? 'warning' : 'danger'}>{cert.status}</Badge>
          <Button variant="ghost" size="sm" icon="download">PDF</Button>
        </div>
      ))}
    </Card>
  );
};

// ============================================================================
// MATERIAL FLOWS TABLE
// ============================================================================

const MaterialFlowsTable: FC<{ industry: Industry; flows: MaterialFlow[] }> = ({ industry, flows }) => (
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>{industry.terminology.input} Flows</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="ghost" size="sm" icon="filter">Filter</Button>
        <Button variant="secondary" size="sm" icon="download">Export</Button>
      </div>
    </div>
    
    <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 120px 100px 100px 100px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
        <div>Date</div><div>Source</div><div>Material</div><div style={{ textAlign: 'right' }}>Quantity</div><div style={{ textAlign: 'center' }}>Documents</div><div style={{ textAlign: 'center' }}>Status</div>
      </div>
      {flows.slice(0, 10).map((flow, i) => (
        <div key={flow.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 120px 100px 100px 100px', padding: '12px 14px', borderBottom: i < 9 ? `1px solid ${tokens.colors.cream[300]}` : 'none', fontSize: '13px', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted }}>{flow.date}</div>
          <div style={{ fontWeight: 500, color: tokens.colors.text.primary }}>{flow.source}</div>
          <div style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>{flow.material}</div>
          <div style={{ textAlign: 'right', fontWeight: 600, color: tokens.colors.text.primary }}>{flow.quantity.toLocaleString()} {flow.unit}</div>
          <div style={{ textAlign: 'center' }}><Badge variant="info">{flow.documents.length} docs</Badge></div>
          <div style={{ textAlign: 'center' }}><StatusBadge status={flow.status} /></div>
        </div>
      ))}
    </div>
  </Card>
);

// ============================================================================
// SIDEBAR
// ============================================================================

const Sidebar: FC<{ industry: Industry; persona: Persona; collapsed: boolean; activeTab: string; onTabChange: (tab: string) => void }> = ({ industry, persona, collapsed, activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'flows', label: `${industry.terminology.input}s`, icon: 'flows' },
    { id: 'documents', label: 'Documents', icon: 'document' },
    { id: 'certificates', label: industry.terminology.certificate, icon: 'certificate' },
    { id: 'massbalance', label: 'Mass Balance', icon: 'scale' },
    { id: 'reports', label: 'Reports', icon: 'reports' },
  ];
  
  return (
    <aside style={{
      width: collapsed ? '72px' : '260px',
      background: `linear-gradient(180deg, ${industry.gradientFrom} 0%, ${industry.gradientTo} 100%)`,
      padding: '20px 12px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      transition: 'width 200ms ease',
      zIndex: 100,
      boxShadow: tokens.shadow.lg,
    }}>
      <div style={{ padding: collapsed ? '4px 0 24px' : '4px 8px 24px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <Logo collapsed={collapsed} variant="light" />
      </div>

      {!collapsed && (
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: tokens.radius.md, padding: '12px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: tokens.radius.md, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={industry.icon} size={20} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFF' }}>{industry.name}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name={persona.icon} size={12} color="rgba(255,255,255,0.7)" />
                {persona.title}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav style={{ flex: 1 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => onTabChange(item.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '12px' : '11px 14px', marginBottom: '4px', border: 'none', borderRadius: tokens.radius.md,
            background: activeTab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: activeTab === item.id ? '#FFF' : 'rgba(255,255,255,0.7)',
            cursor: 'pointer', transition: 'all 150ms ease', justifyContent: collapsed ? 'center' : 'flex-start',
            fontFamily: 'inherit',
          }}>
            <Icon name={item.icon} size={20} />
            {!collapsed && <span style={{ fontSize: '13px', fontWeight: activeTab === item.id ? 600 : 500 }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: collapsed ? '12px' : '11px 14px', border: 'none', borderRadius: tokens.radius.md, background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', justifyContent: collapsed ? 'center' : 'flex-start', fontFamily: 'inherit' }}>
          <Icon name="settings" size={20} />
          {!collapsed && <span style={{ fontSize: '13px', fontWeight: 500 }}>Settings</span>}
        </button>
      </div>
    </aside>
  );
};

// ============================================================================
// HEADER
// ============================================================================

const Header: FC<{ industry: Industry; persona: Persona; onMenuClick: () => void }> = ({ industry, persona, onMenuClick }) => (
  <header style={{ background: tokens.colors.cream[50], borderBottom: `1px solid ${tokens.colors.cream[400]}`, padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tokens.colors.text.secondary, padding: '8px', borderRadius: tokens.radius.sm }}>
        <Icon name="menu" size={20} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: tokens.colors.cream[300], padding: '8px 14px', borderRadius: tokens.radius.md, width: '300px' }}>
        <Icon name="search" size={16} color={tokens.colors.text.muted} />
        <input placeholder={`Search ${industry.terminology.input.toLowerCase()}s, documents...`} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: tokens.colors.text.primary, width: '100%', fontFamily: 'inherit' }} />
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        {industry.regulations.slice(0, 3).map(reg => <Badge key={reg} variant="success">{reg}</Badge>)}
      </div>
      <button style={{ position: 'relative', background: tokens.colors.cream[300], border: 'none', padding: '9px', borderRadius: tokens.radius.md, cursor: 'pointer' }}>
        <Icon name="bell" size={18} color={tokens.colors.text.secondary} />
        <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: tokens.colors.danger.main }} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 12px 5px 5px', background: tokens.colors.cream[300], borderRadius: tokens.radius.full }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: industry.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={persona.icon} size={16} color="#FFF" />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 500, color: tokens.colors.text.primary }}>{persona.title}</span>
      </div>
    </div>
  </header>
);

// ============================================================================
// INDUSTRY SELECTOR (Demo)
// ============================================================================

const IndustrySelector: FC<{ selected: IndustryId; onChange: (id: IndustryId) => void }> = ({ selected, onChange }) => (
  <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: tokens.colors.cream[100], borderRadius: tokens.radius.xl, padding: '16px', boxShadow: tokens.shadow.lg, zIndex: 200, border: `1px solid ${tokens.colors.cream[400]}` }}>
    <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.muted, marginBottom: '10px', textTransform: 'uppercase' }}>Demo: Switch Industry</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {Object.values(industries).map(ind => (
        <button key={ind.id} onClick={() => onChange(ind.id)} style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', borderRadius: tokens.radius.md, cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 500,
          background: selected === ind.id ? ind.color : tokens.colors.cream[300],
          color: selected === ind.id ? '#FFF' : tokens.colors.text.secondary,
        }}>
          <Icon name={ind.icon} size={16} color={selected === ind.id ? '#FFF' : tokens.colors.text.muted} />
          <span>{ind.name}</span>
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// MAIN APP
// ============================================================================

const App: FC = () => {
  const [industryId, setIndustryId] = useState<IndustryId>('chemical_recycling');
  const [personaId] = useState<PersonaId>('compliance_officer');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const industry = industries[industryId];
  const persona = personas[personaId];
  const mockData = useMemo(() => generateMockData(industry), [industry]);
  
  const kpiValues: Record<string, number> = {
    collectionVolume: 12450, reuseRate: 18.5, nrutStock: 3200, valorizationRate: 97.2,
    massBalanceAccuracy: 99.1, pyoilOutput: 38.4, feedstockVerified: 94.5, wasteRate: 13.2,
    prnCoverage: 92, coaErrorRate: 9, yield: 87.5, infeedMapped: 78,
    unitsCollected: 4521, verificationRate: 98.2, registrationAccuracy: 96.8, processingTime: 3.2,
    throughput: 1850, purityLevel: 98.7, traceabilityCoverage: 89, customerCompliance: 100,
  };

  return (
    <div style={{ minHeight: '100vh', background: tokens.colors.cream[100], fontFamily: "'Nunito', -apple-system, sans-serif", display: 'flex' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { filter: brightness(0.96); }
        button:active { transform: scale(0.98); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: ${tokens.colors.cream[500]}; border-radius: 3px; }
      `}</style>

      <Sidebar industry={industry} persona={persona} collapsed={sidebarCollapsed} activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={{ flex: 1, marginLeft: sidebarCollapsed ? '72px' : '260px', transition: 'margin-left 200ms ease' }}>
        <Header industry={industry} persona={persona} onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <div style={{ padding: '28px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: tokens.radius.lg, background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={industry.icon} size={26} color={industry.color} />
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
                  {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'flows' ? `${industry.terminology.input} Flows` : activeTab === 'documents' ? 'Document Processing' : activeTab === 'certificates' ? `${industry.terminology.certificate}s` : activeTab === 'massbalance' ? 'Mass Balance' : 'Reports'}
                </h1>
                <p style={{ fontSize: '14px', color: tokens.colors.text.muted, margin: 0 }}>{industry.terminology.compliance} • {persona.title} View</p>
              </div>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${industry.kpis.length}, 1fr)`, gap: '16px', marginBottom: '24px' }}>
                {industry.kpis.map(kpi => <KPICard key={kpi.key} label={kpi.label} value={kpiValues[kpi.key] || 0} unit={kpi.unit} target={kpi.target} industry={industry} />)}
              </div>
              <div style={{ marginBottom: '24px' }}><ProcessPipeline industry={industry} flows={mockData.flows} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <DocumentProcessingView industry={industry} flows={mockData.flows} />
                <CertificateTracking industry={industry} />
              </div>
              {(industryId === 'chemical_recycling' || industryId === 'packaging_prn') && <MassBalanceView industry={industry} />}
            </>
          )}

          {activeTab === 'flows' && <MaterialFlowsTable industry={industry} flows={mockData.flows} />}
          {activeTab === 'documents' && <DocumentProcessingView industry={industry} flows={mockData.flows} />}
          {activeTab === 'certificates' && <CertificateTracking industry={industry} />}
          {activeTab === 'massbalance' && <MassBalanceView industry={industry} />}
          {activeTab === 'reports' && (
            <Card style={{ textAlign: 'center', padding: '60px' }}>
              <Icon name="reports" size={48} color={tokens.colors.text.muted} />
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: tokens.colors.text.primary, margin: '16px 0 8px' }}>Report Generator</h3>
              <p style={{ fontSize: '14px', color: tokens.colors.text.muted, marginBottom: '20px' }}>Generate {industry.terminology.compliance} reports, {industry.terminology.certificate}s, and audit documentation</p>
              <Button variant="primary" icon="reports">Generate Report</Button>
            </Card>
          )}
        </div>
      </main>

      <IndustrySelector selected={industryId} onChange={setIndustryId} />
    </div>
  );
};

export default App;
