// ============================================================================
// eco₂Veritas - Client Product Interface
// ============================================================================
// Professional UI with custom SVG icons (no emojis)
// Industry-adaptive compliance & traceability platform
// Process Configuration System with Evidence & Verification Management
// ============================================================================

import React, { useState, useMemo, createContext, useContext, type ReactNode, type FC, type CSSProperties } from 'react';

// ============================================================================
// INTERNATIONALIZATION (i18n)
// ============================================================================

type Language = 'en' | 'fr';

interface Translations {
  // Navigation
  nav: {
    dashboard: string;
    processConfig: string;
    documents: string;
    certificates: string;
    massBalance: string;
    reports: string;
    settings: string;
    prn: string;
    coa: string;
    errors: string;
  };
  // Status labels
  status: {
    verified: string;
    pending: string;
    flagged: string;
    missing: string;
    valid: string;
    expiring: string;
    expired: string;
    draft: string;
    onTrack: string;
    belowTarget: string;
    configured: string;
    notConfigured: string;
  };
  // Actions
  actions: {
    export: string;
    import: string;
    upload: string;
    download: string;
    save: string;
    cancel: string;
    close: string;
    add: string;
    remove: string;
    edit: string;
    view: string;
    generate: string;
    addEvidence: string;
    addCriterion: string;
  };
  // Common labels
  common: {
    date: string;
    source: string;
    material: string;
    quantity: string;
    unit: string;
    status: string;
    type: string;
    reference: string;
    description: string;
    name: string;
    required: string;
    optional: string;
    yes: string;
    no: string;
    target: string;
    total: string;
    input: string;
    output: string;
    waste: string;
    yield: string;
    balance: string;
    period: string;
    linkedFlows: string;
    issuedDate: string;
    expiryDate: string;
    confidence: string;
    documents: string;
    step: string;
    evidence: string;
    rules: string;
    severity: string;
    error: string;
    warning: string;
    info: string;
  };
  // Sections
  sections: {
    processConfiguration: string;
    processConfigSubtitle: string;
    modified: string;
    doubleClickInfo: string;
    evidenceSummary: string;
    verificationCriteria: string;
    extractedFields: string;
    documentProcessing: string;
    certificateTracking: string;
    massBalanceTracking: string;
    materialFlows: string;
    reportGenerator: string;
    reportGeneratorDesc: string;
  };
  // PRN Management
  prn: {
    title: string;
    subtitle: string;
    registration: string;
    registrationDesc: string;
    dataCollection: string;
    dataCollectionDesc: string;
    obligationCalc: string;
    obligationCalcDesc: string;
    acquisition: string;
    acquisitionDesc: string;
    verification: string;
    verificationDesc: string;
    compliance: string;
    complianceDesc: string;
    materialType: string;
    tonnage: string;
    target: string;
    acquired: string;
    remaining: string;
    coverage: string;
    accreditedReprocessor: string;
    npwdReference: string;
  };
  // COA Management
  coa: {
    title: string;
    subtitle: string;
    supplierQualification: string;
    supplierQualificationDesc: string;
    documentReception: string;
    documentReceptionDesc: string;
    productIdentification: string;
    productIdentificationDesc: string;
    batchTracking: string;
    batchTrackingDesc: string;
    testResultsReview: string;
    testResultsReviewDesc: string;
    specificationCheck: string;
    specificationCheckDesc: string;
    authorization: string;
    authorizationDesc: string;
    batchNumber: string;
    testParameter: string;
    specification: string;
    result: string;
    passedTests: string;
    failedTests: string;
    errorRate: string;
  };
  // Errors tracking
  errors: {
    title: string;
    subtitle: string;
    totalErrors: string;
    criticalErrors: string;
    warnings: string;
    missingDocs: string;
    errorType: string;
    affectedItem: string;
    detectedDate: string;
    resolveAction: string;
    markResolved: string;
    filterByType: string;
    filterByStatus: string;
    all: string;
    unresolved: string;
    resolved: string;
  };
  // Demo
  demo: {
    switchIndustry: string;
  };
  // Language
  language: {
    select: string;
    english: string;
    french: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      processConfig: 'Process Configuration',
      documents: 'Documents',
      certificates: 'Certificates',
      massBalance: 'Mass Balance',
      reports: 'Reports',
      settings: 'Settings',
      prn: 'PRN Management',
      coa: 'COA Verification',
      errors: 'Errors & Missing',
    },
    status: {
      verified: 'Verified',
      pending: 'Pending',
      flagged: 'Action Required',
      missing: 'Missing',
      valid: 'Valid',
      expiring: 'Expiring Soon',
      expired: 'Expired',
      draft: 'Draft',
      onTrack: 'On Track',
      belowTarget: 'Below Target',
      configured: 'configured',
      notConfigured: 'Not configured',
    },
    actions: {
      export: 'Export',
      import: 'Import',
      upload: 'Upload',
      download: 'Download',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      add: 'Add',
      remove: 'Remove',
      edit: 'Edit',
      view: 'View',
      generate: 'Generate',
      addEvidence: 'Add Evidence',
      addCriterion: 'Add Criterion',
    },
    common: {
      date: 'Date',
      source: 'Source',
      material: 'Material',
      quantity: 'Quantity',
      unit: 'Unit',
      status: 'Status',
      type: 'Type',
      reference: 'Reference',
      description: 'Description',
      name: 'Name',
      required: 'Required',
      optional: 'Optional',
      yes: 'Yes',
      no: 'No',
      target: 'Target',
      total: 'Total',
      input: 'Input',
      output: 'Output',
      waste: 'Waste',
      yield: 'Yield',
      balance: 'Balance',
      period: 'Period',
      linkedFlows: 'Linked Flows',
      issuedDate: 'Issued',
      expiryDate: 'Expires',
      confidence: 'Confidence',
      documents: 'Documents',
      step: 'Step',
      evidence: 'Evidence',
      rules: 'Rules',
      severity: 'Severity',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    },
    sections: {
      processConfiguration: 'Process Configuration',
      processConfigSubtitle: 'Configure evidence requirements and verification criteria',
      modified: 'Modified',
      doubleClickInfo: 'Double-click on a step to configure evidence requirements and verification criteria',
      evidenceSummary: 'EVIDENCE',
      verificationCriteria: 'Verification Criteria',
      extractedFields: 'Extracted Fields',
      documentProcessing: 'Document Processing',
      certificateTracking: 'Certificate Tracking',
      massBalanceTracking: 'Mass Balance Tracking',
      materialFlows: 'Material Flows',
      reportGenerator: 'Report Generator',
      reportGeneratorDesc: 'Generate compliance reports, certificates, and audit documentation',
    },
    prn: {
      title: 'PRN Management',
      subtitle: 'Packaging Recovery Notes tracking and compliance',
      registration: 'Registration',
      registrationDesc: 'Register with NPWD or compliance scheme',
      dataCollection: 'Data Collection',
      dataCollectionDesc: 'Collect packaging data by material type',
      obligationCalc: 'Obligation Calculation',
      obligationCalcDesc: 'Calculate PRN requirements based on tonnage',
      acquisition: 'PRN Acquisition',
      acquisitionDesc: 'Purchase PRNs from accredited reprocessors',
      verification: 'Verification',
      verificationDesc: 'Verify PRN authenticity and accreditation',
      compliance: 'Compliance Certificate',
      complianceDesc: 'Submit annual Certificate of Compliance',
      materialType: 'Material Type',
      tonnage: 'Tonnage (t)',
      target: 'Target (%)',
      acquired: 'PRN Acquired',
      remaining: 'Remaining',
      coverage: 'Coverage',
      accreditedReprocessor: 'Accredited Reprocessor',
      npwdReference: 'NPWD Reference',
    },
    coa: {
      title: 'COA Verification',
      subtitle: 'Certificate of Analysis management and validation',
      supplierQualification: 'Supplier Qualification',
      supplierQualificationDesc: 'Verify supplier accreditation status',
      documentReception: 'Document Reception',
      documentReceptionDesc: 'Receive COA with material shipment',
      productIdentification: 'Product Identification',
      productIdentificationDesc: 'Match product info to purchase order',
      batchTracking: 'Batch Tracking',
      batchTrackingDesc: 'Record batch/lot number for traceability',
      testResultsReview: 'Test Results Review',
      testResultsReviewDesc: 'Verify all required tests performed',
      specificationCheck: 'Specification Check',
      specificationCheckDesc: 'Compare results vs specifications',
      authorization: 'Authorization',
      authorizationDesc: 'Verify signature from authorized personnel',
      batchNumber: 'Batch Number',
      testParameter: 'Test Parameter',
      specification: 'Specification',
      result: 'Result',
      passedTests: 'Passed Tests',
      failedTests: 'Failed Tests',
      errorRate: 'Error Rate',
    },
    errors: {
      title: 'Errors & Missing Items',
      subtitle: 'Track and resolve compliance issues',
      totalErrors: 'Total Errors',
      criticalErrors: 'Critical Errors',
      warnings: 'Warnings',
      missingDocs: 'Missing Documents',
      errorType: 'Error Type',
      affectedItem: 'Affected Item',
      detectedDate: 'Detected',
      resolveAction: 'Action Required',
      markResolved: 'Mark Resolved',
      filterByType: 'Filter by Type',
      filterByStatus: 'Filter by Status',
      all: 'All',
      unresolved: 'Unresolved',
      resolved: 'Resolved',
    },
    demo: {
      switchIndustry: 'Demo: Switch Industry',
    },
    language: {
      select: 'Language',
      english: 'English',
      french: 'Français',
    },
  },
  fr: {
    nav: {
      dashboard: 'Tableau de bord',
      processConfig: 'Configuration Processus',
      documents: 'Documents',
      certificates: 'Certificats',
      massBalance: 'Bilan matière',
      reports: 'Rapports',
      settings: 'Paramètres',
      prn: 'Gestion PRN',
      coa: 'Vérification COA',
      errors: 'Erreurs & Manquants',
    },
    status: {
      verified: 'Vérifié',
      pending: 'En attente',
      flagged: 'Action requise',
      missing: 'Manquant',
      valid: 'Valide',
      expiring: 'Expire bientôt',
      expired: 'Expiré',
      draft: 'Brouillon',
      onTrack: 'Dans les temps',
      belowTarget: 'Sous l\'objectif',
      configured: 'configurée(s)',
      notConfigured: 'Non configuré',
    },
    actions: {
      export: 'Exporter',
      import: 'Importer',
      upload: 'Téléverser',
      download: 'Télécharger',
      save: 'Enregistrer',
      cancel: 'Annuler',
      close: 'Fermer',
      add: 'Ajouter',
      remove: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      generate: 'Générer',
      addEvidence: 'Ajouter une preuve',
      addCriterion: 'Ajouter un critère',
    },
    common: {
      date: 'Date',
      source: 'Source',
      material: 'Matière',
      quantity: 'Quantité',
      unit: 'Unité',
      status: 'Statut',
      type: 'Type',
      reference: 'Référence',
      description: 'Description',
      name: 'Nom',
      required: 'Requis',
      optional: 'Optionnel',
      yes: 'Oui',
      no: 'Non',
      target: 'Objectif',
      total: 'Total',
      input: 'Entrée',
      output: 'Sortie',
      waste: 'Déchet',
      yield: 'Rendement',
      balance: 'Bilan',
      period: 'Période',
      linkedFlows: 'Flux liés',
      issuedDate: 'Émis le',
      expiryDate: 'Expire le',
      confidence: 'Confiance',
      documents: 'Documents',
      step: 'Étape',
      evidence: 'Preuves',
      rules: 'Règles',
      severity: 'Sévérité',
      error: 'Erreur',
      warning: 'Avertissement',
      info: 'Info',
    },
    sections: {
      processConfiguration: 'Configuration du processus',
      processConfigSubtitle: 'Configurer les preuves requises et les critères de vérification',
      modified: 'Modifié',
      doubleClickInfo: 'Double-cliquez sur une étape pour configurer les preuves requises et les critères de vérification',
      evidenceSummary: 'PREUVES',
      verificationCriteria: 'Critères de vérification',
      extractedFields: 'Champs extraits',
      documentProcessing: 'Traitement des documents',
      certificateTracking: 'Suivi des certificats',
      massBalanceTracking: 'Suivi du bilan matière',
      materialFlows: 'Flux de matières',
      reportGenerator: 'Générateur de rapports',
      reportGeneratorDesc: 'Générer des rapports de conformité, certificats et documentation d\'audit',
    },
    prn: {
      title: 'Gestion PRN',
      subtitle: 'Suivi et conformité des Packaging Recovery Notes',
      registration: 'Enregistrement',
      registrationDesc: 'S\'enregistrer auprès du NPWD ou d\'un schéma de conformité',
      dataCollection: 'Collecte de données',
      dataCollectionDesc: 'Collecter les données d\'emballage par type de matériau',
      obligationCalc: 'Calcul des obligations',
      obligationCalcDesc: 'Calculer les besoins en PRN selon le tonnage',
      acquisition: 'Acquisition PRN',
      acquisitionDesc: 'Acheter des PRN auprès de reprocesseurs accrédités',
      verification: 'Vérification',
      verificationDesc: 'Vérifier l\'authenticité et l\'accréditation des PRN',
      compliance: 'Certificat de conformité',
      complianceDesc: 'Soumettre le certificat de conformité annuel',
      materialType: 'Type de matériau',
      tonnage: 'Tonnage (t)',
      target: 'Objectif (%)',
      acquired: 'PRN acquis',
      remaining: 'Restant',
      coverage: 'Couverture',
      accreditedReprocessor: 'Reprocesseur accrédité',
      npwdReference: 'Référence NPWD',
    },
    coa: {
      title: 'Vérification COA',
      subtitle: 'Gestion et validation des Certificats d\'Analyse',
      supplierQualification: 'Qualification fournisseur',
      supplierQualificationDesc: 'Vérifier le statut d\'accréditation du fournisseur',
      documentReception: 'Réception document',
      documentReceptionDesc: 'Recevoir le COA avec la livraison',
      productIdentification: 'Identification produit',
      productIdentificationDesc: 'Faire correspondre les infos produit à la commande',
      batchTracking: 'Suivi des lots',
      batchTrackingDesc: 'Enregistrer le numéro de lot pour la traçabilité',
      testResultsReview: 'Revue des résultats',
      testResultsReviewDesc: 'Vérifier que tous les tests requis sont effectués',
      specificationCheck: 'Vérification des specs',
      specificationCheckDesc: 'Comparer les résultats aux spécifications',
      authorization: 'Autorisation',
      authorizationDesc: 'Vérifier la signature du personnel autorisé',
      batchNumber: 'Numéro de lot',
      testParameter: 'Paramètre de test',
      specification: 'Spécification',
      result: 'Résultat',
      passedTests: 'Tests réussis',
      failedTests: 'Tests échoués',
      errorRate: 'Taux d\'erreur',
    },
    errors: {
      title: 'Erreurs & Manquants',
      subtitle: 'Suivre et résoudre les problèmes de conformité',
      totalErrors: 'Total erreurs',
      criticalErrors: 'Erreurs critiques',
      warnings: 'Avertissements',
      missingDocs: 'Documents manquants',
      errorType: 'Type d\'erreur',
      affectedItem: 'Élément affecté',
      detectedDate: 'Détecté',
      resolveAction: 'Action requise',
      markResolved: 'Marquer résolu',
      filterByType: 'Filtrer par type',
      filterByStatus: 'Filtrer par statut',
      all: 'Tous',
      unresolved: 'Non résolus',
      resolved: 'Résolus',
    },
    demo: {
      switchIndustry: 'Démo: Changer d\'industrie',
    },
    language: {
      select: 'Langue',
      english: 'English',
      french: 'Français',
    },
  },
};

// Language Context
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

const useLanguage = () => useContext(LanguageContext);

// ============================================================================
// TYPES
// ============================================================================

type IndustryId = 'tire_epo' | 'chemical_recycling' | 'packaging_prn' | 'weee_collection' | 'plastics_mechanical';
type PersonaId = 'compliance_officer' | 'operations_manager' | 'site_operator';
type DocumentStatus = 'verified' | 'pending' | 'flagged' | 'missing';
type ProcessStep = 'collection' | 'reception' | 'processing' | 'output' | 'certification' | 'coa_verification' | 'prn_management';
type EvidenceType = 'document' | 'photo' | 'iot_data' | 'manual_entry' | 'signature' | 'geolocation';
type VerificationRule = 'required' | 'numeric_range' | 'date_valid' | 'regex_match' | 'cross_reference' | 'threshold';

// Evidence requirement for a process step
interface EvidenceRequirement {
  id: string;
  name: string;
  type: EvidenceType;
  description: string;
  required: boolean;
  acceptedFormats?: string[]; // For documents: PDF, JPG, etc.
  extractionFields?: ExtractedField[]; // Fields to extract from document
  verificationCriteria: VerificationCriterion[];
}

// Field to extract from a document
interface ExtractedField {
  id: string;
  name: string;
  fieldType: 'text' | 'number' | 'date' | 'weight' | 'quantity' | 'reference';
  required: boolean;
  mappedTo?: string; // Maps to system field
}

// Verification criterion for validation
interface VerificationCriterion {
  id: string;
  name: string;
  rule: VerificationRule;
  parameters?: {
    min?: number;
    max?: number;
    pattern?: string;
    tolerance?: number;
    referenceField?: string;
    referenceStep?: string;
  };
  errorMessage: string;
  severity: 'error' | 'warning' | 'info';
}

// Process step configuration
interface ProcessStepConfig {
  id: ProcessStep;
  label: string;
  icon: string;
  description: string;
  evidenceRequirements: EvidenceRequirement[];
  outputs: string[]; // What this step produces
  predecessors: ProcessStep[]; // Steps that must be completed before
  estimatedDuration?: string;
  responsibleRole?: string;
}

// Full process configuration for an industry
interface ProcessConfiguration {
  industryId: IndustryId;
  name: string;
  version: string;
  lastModified: string;
  steps: ProcessStepConfig[];
}

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
// DESIGN TOKENS - eco2Veritas Brand Colors
// ============================================================================
// Simplified color system:
// - ACTION: Red (#C44D4D) - Non-conformant, requires immediate action
// - SUCCESS: Green (#2D7A5E) - Completed, verified, conformant
// - NEUTRAL: Gray - Everything else (discreet)
// - BRAND: Deep blue sidebar + Cream background
// ============================================================================

const tokens = {
  colors: {
    // Brand - Deep blue for eco2Veritas identity
    brand: {
      900: '#0A1628',
      800: '#0F2137',
      700: '#152A46',
      600: '#1B3A5C',  // Primary deep blue
      500: '#2A4A7A',
      400: '#3D6098',
    },
    // Background - Cream tones for readability
    cream: { 50: '#FFFEF9', 100: '#FDF9F3', 200: '#F8F3EA', 300: '#F2EBE0', 400: '#E8DFD0', 500: '#D4C8B5' },
    // Primary action button color
    accent: { main: '#1B3A5C', light: '#3D6098', pale: '#E8F0F8' },
    // Text colors
    text: { primary: '#1A2332', secondary: '#4A5568', muted: '#718096', inverse: '#FFFFFF' },
    // STATUS: Completed/Verified/Conformant (satisfaction)
    success: { main: '#2D7A5E', light: '#E5F2EC', dark: '#1D5A42' },
    // STATUS: Action required (non-conformant OR pending action needed)
    action: { main: '#C44D4D', light: '#FDECEC', dark: '#A33D3D' },
    // Aliases for backward compatibility
    warning: { main: '#C44D4D', light: '#FDECEC' },  // Now uses action color
    danger: { main: '#C44D4D', light: '#FDECEC' },   // Now uses action color
    // Neutral/informational (discreet)
    neutral: { main: '#718096', light: '#EDF2F7', dark: '#4A5568' },
    info: { main: '#718096', light: '#EDF2F7' },     // Now uses neutral
    // Legacy navy alias
    navy: { 900: '#0A1628', 800: '#0F2137', 700: '#152A46', 600: '#1B3A5C', 500: '#2A4A7A' },
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
  
  // EVIDENCE TYPE ICONS
  documentEvidence: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>),
  
  photoEvidence: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>),
  
  iotEvidence: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5.636 18.364a9 9 0 0 1 0-12.728" /><path d="M18.364 5.636a9 9 0 0 1 0 12.728" /><path d="M8.464 15.536a5 5 0 0 1 0-7.072" /><path d="M15.536 8.464a5 5 0 0 1 0 7.072" /><circle cx="12" cy="12" r="2" /></svg>),
  
  manualEntry: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>),
  
  signatureEvidence: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17c1.5-1.5 2.5-3 4-3s3 2 5 2 3-2 5-2 2.5 1.5 4 3" /><path d="M12 12V3" /><path d="M8 7l4-4 4 4" /></svg>),
  
  geolocation: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
  
  // CONFIG & EDIT ICONS
  edit: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>),
  
  plus: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>),
  
  minus: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>),
  
  trash: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>),
  
  x: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  
  workflow: ({ size = 20, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="9" y="15" width="6" height="6" rx="1" /><path d="M6 9v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" /><path d="M12 13v2" /></svg>),
  
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
    name: 'Tyval - Tire EPR France',
    icon: 'tire',
    color: '#4A4A4A',
    gradientFrom: '#3D3D3D',
    gradientTo: '#5A5A5A',
    terminology: { input: 'Pneus collectés', output: 'Matière valorisée', document: 'Bon de pesée', certificate: 'Certificat EPR', compliance: 'EPR Pneumatiques', unit: 'unités' },
    regulations: ['EPR Pneumatiques France', 'Waste Shipment Regulation (WSR)', 'Digital Product Passport (DPP)'],
    kpis: [
      { label: 'Volume collecté', key: 'collectionVolume', unit: 't', target: 3000 },
      { label: 'Taux de réemploi', key: 'reuseRate', unit: '%', target: 20 },
      { label: 'Stock PUNR', key: 'punrStock', unit: 't' },
      { label: 'Taux de valorisation', key: 'valorizationRate', unit: '%', target: 100 },
    ],
    processSteps: [
      { id: 'collection', label: 'Collecte détenteurs', icon: 'truck' },
      { id: 'reception', label: 'Pesée & Réception', icon: 'weighScale' },
      { id: 'processing', label: 'Tri (Occasion/PUNR)', icon: 'sorting' },
      { id: 'output', label: 'Conditionnement', icon: 'factory' },
      { id: 'certification', label: 'Exutoire & Déclaration', icon: 'clipboard' },
    ],
    documentTypes: ['Bon de pesée', 'Bon de transport', 'Déclaration collecteur', 'Certificat exutoire (Cimenterie/Granulateur)'],
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
      { id: 'coa_verification', label: 'COA Verification', icon: 'document' },
      { id: 'prn_management', label: 'PRN Management', icon: 'certificate' },
    ],
    documentTypes: ['Weighbridge Ticket', 'Delivery Note', 'Process Log', 'Certificate of Analysis', 'PRN Evidence'],
  },
  
  weee_collection: {
    id: 'weee_collection',
    name: 'Fridge Take-Back Germany',
    icon: 'refrigerator',
    color: '#38A169',
    gradientFrom: '#276749',
    gradientTo: '#48BB78',
    terminology: { input: 'Réfrigérateurs collectés', output: 'Volume recyclé', document: 'Feuille de comptage', certificate: 'ZKS Abf. Report', compliance: 'EAR (Stiftung ear)', unit: 'units' },
    regulations: ['EAR (Elektro Altgeräte Register)', 'Manufacturer Take-Back', 'F-Gas Regulation'],
    kpis: [
      { label: 'Appareils collectés', key: 'unitsCollected', unit: 'units', target: 3500 },
      { label: 'Poids net recyclé', key: 'recycledWeight', unit: 'MT', target: 250 },
      { label: 'Taux de vérification', key: 'verificationRate', unit: '%', target: 100 },
      { label: 'Obligation fabricant', key: 'manufacturerTally', unit: 'units' },
    ],
    processSteps: [
      { id: 'collection', label: 'Collecte Distributeur', icon: 'truck' },
      { id: 'reception', label: 'Transport → Recycleur', icon: 'document' },
      { id: 'processing', label: 'Pesée pont-bascule', icon: 'weighScale' },
      { id: 'output', label: 'Comptage manuel', icon: 'clipboard' },
      { id: 'certification', label: 'Rapport EAR', icon: 'reports' },
    ],
    documentTypes: ['Manifest/Delivery Note', 'Weight Scale Ticket', 'Count List (Tally Sheet)', 'Operation License', 'ZKS Abf. Certificate'],
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
// DEFAULT PROCESS CONFIGURATIONS WITH EVIDENCE REQUIREMENTS
// ============================================================================

const defaultProcessConfigurations: Record<IndustryId, ProcessConfiguration> = {
  tire_epo: {
    industryId: 'tire_epo',
    name: 'Tyval - Flux EPR Pneumatiques',
    version: '1.0',
    lastModified: '2024-12-18',
    steps: [
      {
        id: 'collection',
        label: 'Collecte détenteurs',
        icon: 'truck',
        description: 'Collecte des pneus usagés auprès des garages et concessionnaires',
        predecessors: [],
        outputs: ['Pneus collectés', 'Bon de collecte'],
        estimatedDuration: '1-2 jours',
        responsibleRole: 'Collecteur',
        evidenceRequirements: [
          {
            id: 'ev-coll-1',
            name: 'Bon de collecte',
            type: 'document',
            description: 'Document attestant la collecte chez le détenteur',
            required: true,
            acceptedFormats: ['PDF', 'JPG', 'PNG'],
            extractionFields: [
              { id: 'f1', name: 'Nom détenteur', fieldType: 'text', required: true, mappedTo: 'source_name' },
              { id: 'f2', name: 'Adresse', fieldType: 'text', required: true, mappedTo: 'source_address' },
              { id: 'f3', name: 'Date collecte', fieldType: 'date', required: true, mappedTo: 'collection_date' },
              { id: 'f4', name: 'Quantité (unités)', fieldType: 'quantity', required: true, mappedTo: 'quantity_units' },
            ],
            verificationCriteria: [
              { id: 'vc1', name: 'Date valide', rule: 'date_valid', errorMessage: 'La date de collecte doit être dans les 30 derniers jours', severity: 'error' },
              { id: 'vc2', name: 'Quantité positive', rule: 'numeric_range', parameters: { min: 1 }, errorMessage: 'La quantité doit être supérieure à 0', severity: 'error' },
            ],
          },
          {
            id: 'ev-coll-2',
            name: 'Photo chargement',
            type: 'photo',
            description: 'Photo du chargement des pneus dans le véhicule',
            required: false,
            acceptedFormats: ['JPG', 'PNG', 'HEIC'],
            extractionFields: [],
            verificationCriteria: [
              { id: 'vc3', name: 'Géolocalisation', rule: 'required', errorMessage: 'La photo doit contenir les métadonnées GPS', severity: 'warning' },
            ],
          },
        ],
      },
      {
        id: 'reception',
        label: 'Pesée & Réception',
        icon: 'weighScale',
        description: 'Pesée sur pont-bascule à l\'arrivée au centre de tri',
        predecessors: ['collection'],
        outputs: ['Poids brut', 'Poids net', 'Bon de pesée'],
        estimatedDuration: '15-30 min',
        responsibleRole: 'Opérateur pont-bascule',
        evidenceRequirements: [
          {
            id: 'ev-rec-1',
            name: 'Bon de pesée',
            type: 'document',
            description: 'Ticket de pesée du pont-bascule',
            required: true,
            acceptedFormats: ['PDF', 'JPG', 'PNG'],
            extractionFields: [
              { id: 'f5', name: 'Poids brut (kg)', fieldType: 'weight', required: true, mappedTo: 'gross_weight' },
              { id: 'f6', name: 'Poids tare (kg)', fieldType: 'weight', required: true, mappedTo: 'tare_weight' },
              { id: 'f7', name: 'Poids net (kg)', fieldType: 'weight', required: true, mappedTo: 'net_weight' },
              { id: 'f8', name: 'N° ticket', fieldType: 'reference', required: true, mappedTo: 'ticket_number' },
              { id: 'f9', name: 'Date/Heure', fieldType: 'date', required: true, mappedTo: 'weighing_datetime' },
            ],
            verificationCriteria: [
              { id: 'vc4', name: 'Cohérence poids', rule: 'threshold', parameters: { referenceField: 'gross_weight', tolerance: 5 }, errorMessage: 'Poids net = Brut - Tare (tolérance 5%)', severity: 'error' },
              { id: 'vc5', name: 'Poids minimum', rule: 'numeric_range', parameters: { min: 100 }, errorMessage: 'Le poids net minimum est de 100 kg', severity: 'warning' },
            ],
          },
          {
            id: 'ev-rec-2',
            name: 'Données IoT pont-bascule',
            type: 'iot_data',
            description: 'Données automatiques du pont-bascule connecté',
            required: false,
            extractionFields: [
              { id: 'f10', name: 'Poids automatique', fieldType: 'weight', required: true, mappedTo: 'iot_weight' },
              { id: 'f11', name: 'Timestamp', fieldType: 'date', required: true, mappedTo: 'iot_timestamp' },
            ],
            verificationCriteria: [
              { id: 'vc6', name: 'Concordance IoT/Document', rule: 'cross_reference', parameters: { referenceField: 'net_weight', tolerance: 2 }, errorMessage: 'Écart entre poids IoT et document > 2%', severity: 'warning' },
            ],
          },
        ],
      },
      {
        id: 'processing',
        label: 'Tri (Occasion/PUNR)',
        icon: 'sorting',
        description: 'Tri des pneus entre réemploi (occasion) et valorisation (PUNR)',
        predecessors: ['reception'],
        outputs: ['Pneus occasion', 'PUNR', 'Rapport de tri'],
        estimatedDuration: '2-4 heures',
        responsibleRole: 'Opérateur tri',
        evidenceRequirements: [
          {
            id: 'ev-tri-1',
            name: 'Rapport de tri',
            type: 'document',
            description: 'Fiche de tri détaillant la répartition occasion/PUNR',
            required: true,
            acceptedFormats: ['PDF', 'XLSX', 'CSV'],
            extractionFields: [
              { id: 'f12', name: 'Quantité occasion', fieldType: 'quantity', required: true, mappedTo: 'qty_reuse' },
              { id: 'f13', name: 'Quantité PUNR', fieldType: 'quantity', required: true, mappedTo: 'qty_punr' },
              { id: 'f14', name: 'Taux réemploi (%)', fieldType: 'number', required: true, mappedTo: 'reuse_rate' },
              { id: 'f15', name: 'Opérateur', fieldType: 'text', required: true, mappedTo: 'operator_name' },
            ],
            verificationCriteria: [
              { id: 'vc7', name: 'Total cohérent', rule: 'cross_reference', parameters: { referenceField: 'net_weight', referenceStep: 'reception' }, errorMessage: 'Total tri ≠ Poids réception', severity: 'error' },
              { id: 'vc8', name: 'Taux réemploi réaliste', rule: 'numeric_range', parameters: { min: 5, max: 35 }, errorMessage: 'Taux réemploi hors norme (5-35%)', severity: 'warning' },
            ],
          },
          {
            id: 'ev-tri-2',
            name: 'Saisie manuelle catégories',
            type: 'manual_entry',
            description: 'Ventilation par catégorie de pneus (VL, PL, agricole)',
            required: true,
            extractionFields: [
              { id: 'f16', name: 'Pneus VL', fieldType: 'quantity', required: true, mappedTo: 'qty_vl' },
              { id: 'f17', name: 'Pneus PL', fieldType: 'quantity', required: false, mappedTo: 'qty_pl' },
              { id: 'f18', name: 'Pneus agricoles', fieldType: 'quantity', required: false, mappedTo: 'qty_agri' },
            ],
            verificationCriteria: [],
          },
        ],
      },
      {
        id: 'output',
        label: 'Conditionnement',
        icon: 'factory',
        description: 'Broyage ou mise en balle des PUNR pour envoi exutoire',
        predecessors: ['processing'],
        outputs: ['PUNR broyés', 'PUNR ballés', 'Bon de conditionnement'],
        estimatedDuration: '1-2 jours',
        responsibleRole: 'Opérateur conditionnement',
        evidenceRequirements: [
          {
            id: 'ev-cond-1',
            name: 'Bon de conditionnement',
            type: 'document',
            description: 'Document attestant le conditionnement (broyage/balles)',
            required: true,
            acceptedFormats: ['PDF', 'JPG'],
            extractionFields: [
              { id: 'f19', name: 'Type conditionnement', fieldType: 'text', required: true, mappedTo: 'conditioning_type' },
              { id: 'f20', name: 'Quantité (tonnes)', fieldType: 'weight', required: true, mappedTo: 'conditioned_weight' },
              { id: 'f21', name: 'N° lot', fieldType: 'reference', required: true, mappedTo: 'batch_number' },
            ],
            verificationCriteria: [
              { id: 'vc9', name: 'Traçabilité lot', rule: 'required', errorMessage: 'Numéro de lot obligatoire', severity: 'error' },
            ],
          },
        ],
      },
      {
        id: 'certification',
        label: 'Exutoire & Déclaration',
        icon: 'clipboard',
        description: 'Envoi vers cimenterie/granulateur et déclaration EPR',
        predecessors: ['output'],
        outputs: ['Certificat exutoire', 'Déclaration EPR'],
        estimatedDuration: '1-5 jours',
        responsibleRole: 'Responsable conformité',
        evidenceRequirements: [
          {
            id: 'ev-cert-1',
            name: 'Bon de livraison exutoire',
            type: 'document',
            description: 'Bon de livraison signé par l\'exutoire (Lafarge, Estato...)',
            required: true,
            acceptedFormats: ['PDF', 'JPG'],
            extractionFields: [
              { id: 'f22', name: 'Nom exutoire', fieldType: 'text', required: true, mappedTo: 'exutoire_name' },
              { id: 'f23', name: 'Quantité livrée (t)', fieldType: 'weight', required: true, mappedTo: 'delivered_weight' },
              { id: 'f24', name: 'Date livraison', fieldType: 'date', required: true, mappedTo: 'delivery_date' },
              { id: 'f25', name: 'N° BSD', fieldType: 'reference', required: true, mappedTo: 'bsd_number' },
            ],
            verificationCriteria: [
              { id: 'vc10', name: 'BSD valide', rule: 'regex_match', parameters: { pattern: '^BSD-[0-9]{4}-[A-Z0-9]+$' }, errorMessage: 'Format BSD invalide', severity: 'warning' },
            ],
          },
          {
            id: 'ev-cert-2',
            name: 'Certificat de valorisation',
            type: 'document',
            description: 'Attestation de valorisation énergétique ou matière',
            required: true,
            acceptedFormats: ['PDF'],
            extractionFields: [
              { id: 'f26', name: 'Type valorisation', fieldType: 'text', required: true, mappedTo: 'valorization_type' },
              { id: 'f27', name: 'Quantité valorisée', fieldType: 'weight', required: true, mappedTo: 'valorized_weight' },
            ],
            verificationCriteria: [
              { id: 'vc11', name: 'Cohérence quantités', rule: 'cross_reference', parameters: { referenceField: 'delivered_weight', tolerance: 3 }, errorMessage: 'Écart livré/valorisé > 3%', severity: 'error' },
            ],
          },
          {
            id: 'ev-cert-3',
            name: 'Signature responsable',
            type: 'signature',
            description: 'Validation du responsable conformité',
            required: true,
            extractionFields: [
              { id: 'f28', name: 'Nom signataire', fieldType: 'text', required: true, mappedTo: 'signatory_name' },
              { id: 'f29', name: 'Date signature', fieldType: 'date', required: true, mappedTo: 'signature_date' },
            ],
            verificationCriteria: [],
          },
        ],
      },
    ],
  },
  
  weee_collection: {
    industryId: 'weee_collection',
    name: 'Fridge Take-Back Germany - EAR Process',
    version: '1.0',
    lastModified: '2024-12-18',
    steps: [
      {
        id: 'collection',
        label: 'Collecte Distributeur',
        icon: 'truck',
        description: 'Reprise des appareils usagés par les distributeurs',
        predecessors: [],
        outputs: ['Appareils collectés', 'Container plein'],
        estimatedDuration: 'Variable',
        responsibleRole: 'Distributeur',
        evidenceRequirements: [
          {
            id: 'ev-weee-1',
            name: 'Contrat Distributeur',
            type: 'document',
            description: 'Contrat entre fabricant et system operator',
            required: true,
            acceptedFormats: ['PDF'],
            extractionFields: [
              { id: 'wf1', name: 'Nom distributeur', fieldType: 'text', required: true, mappedTo: 'distributor_name' },
              { id: 'wf2', name: 'Adresse', fieldType: 'text', required: true, mappedTo: 'distributor_address' },
            ],
            verificationCriteria: [
              { id: 'wvc1', name: 'Distributeur agréé', rule: 'required', errorMessage: 'Le distributeur doit être sous contrat', severity: 'error' },
            ],
          },
        ],
      },
      {
        id: 'reception',
        label: 'Transport → Recycleur',
        icon: 'document',
        description: 'Transport du container vers le recycleur agréé',
        predecessors: ['collection'],
        outputs: ['Container livré', 'Manifest transport'],
        estimatedDuration: '1-3 jours',
        responsibleRole: 'System Operator',
        evidenceRequirements: [
          {
            id: 'ev-weee-2',
            name: 'Manifest / Delivery Note',
            type: 'document',
            description: 'Bordereau de livraison avec origine, destination, immatriculation',
            required: true,
            acceptedFormats: ['PDF', 'JPG'],
            extractionFields: [
              { id: 'wf3', name: 'Origine (adresse)', fieldType: 'text', required: true, mappedTo: 'source_address' },
              { id: 'wf4', name: 'Destination', fieldType: 'text', required: true, mappedTo: 'destination_address' },
              { id: 'wf5', name: 'Immatriculation', fieldType: 'text', required: true, mappedTo: 'vehicle_plate' },
              { id: 'wf6', name: 'Date/Heure', fieldType: 'date', required: true, mappedTo: 'transport_datetime' },
            ],
            verificationCriteria: [
              { id: 'wvc2', name: 'Origine non-municipale', rule: 'regex_match', parameters: { pattern: '^(?!.*Wertstoffhof).*$' }, errorMessage: 'L\'origine ne doit PAS être un point de collecte municipal', severity: 'error' },
            ],
          },
        ],
      },
      {
        id: 'processing',
        label: 'Pesée pont-bascule',
        icon: 'weighScale',
        description: 'Pesée du container à l\'arrivée chez le recycleur',
        predecessors: ['reception'],
        outputs: ['Poids net container', 'Weight Scale Ticket'],
        estimatedDuration: '15 min',
        responsibleRole: 'Recycleur',
        evidenceRequirements: [
          {
            id: 'ev-weee-3',
            name: 'Weight Scale Ticket',
            type: 'document',
            description: 'Ticket de pesée du pont-bascule',
            required: true,
            acceptedFormats: ['PDF', 'JPG', 'PNG'],
            extractionFields: [
              { id: 'wf7', name: 'Poids brut (kg)', fieldType: 'weight', required: true, mappedTo: 'gross_weight_kg' },
              { id: 'wf8', name: 'Poids tare (kg)', fieldType: 'weight', required: true, mappedTo: 'tare_weight_kg' },
              { id: 'wf9', name: 'Poids net (kg)', fieldType: 'weight', required: true, mappedTo: 'net_weight_kg' },
              { id: 'wf10', name: 'N° ticket', fieldType: 'reference', required: true, mappedTo: 'ticket_ref' },
            ],
            verificationCriteria: [
              { id: 'wvc3', name: 'Calcul poids', rule: 'threshold', parameters: { tolerance: 1 }, errorMessage: 'Poids net ≠ Brut - Tare', severity: 'error' },
            ],
          },
          {
            id: 'ev-weee-4',
            name: 'Licence d\'exploitation',
            type: 'document',
            description: 'Licence d\'exploitation du recycleur',
            required: true,
            acceptedFormats: ['PDF'],
            extractionFields: [
              { id: 'wf11', name: 'N° licence', fieldType: 'reference', required: true, mappedTo: 'license_number' },
              { id: 'wf12', name: 'Date expiration', fieldType: 'date', required: true, mappedTo: 'license_expiry' },
            ],
            verificationCriteria: [
              { id: 'wvc4', name: 'Licence valide', rule: 'date_valid', errorMessage: 'La licence doit être en cours de validité', severity: 'error' },
            ],
          },
        ],
      },
      {
        id: 'output',
        label: 'Comptage manuel',
        icon: 'clipboard',
        description: 'Vidage du container et comptage par type d\'appareil',
        predecessors: ['processing'],
        outputs: ['Count List', 'Poids par type'],
        estimatedDuration: '2-4 heures',
        responsibleRole: 'Recycleur',
        evidenceRequirements: [
          {
            id: 'ev-weee-5',
            name: 'Count List (Tally Sheet)',
            type: 'document',
            description: 'Feuille de comptage avec nombre d\'appareils par type',
            required: true,
            acceptedFormats: ['PDF', 'XLSX', 'CSV'],
            extractionFields: [
              { id: 'wf13', name: 'Nb réfrigérateurs', fieldType: 'quantity', required: true, mappedTo: 'count_refrigerators' },
              { id: 'wf14', name: 'Nb congélateurs', fieldType: 'quantity', required: false, mappedTo: 'count_freezers' },
              { id: 'wf15', name: 'Nb climatiseurs', fieldType: 'quantity', required: false, mappedTo: 'count_ac' },
              { id: 'wf16', name: 'Total appareils', fieldType: 'quantity', required: true, mappedTo: 'total_units' },
            ],
            verificationCriteria: [
              { id: 'wvc5', name: 'Total cohérent', rule: 'threshold', parameters: { tolerance: 0 }, errorMessage: 'Somme des types ≠ Total', severity: 'error' },
            ],
          },
          {
            id: 'ev-weee-6',
            name: 'Conversion poids',
            type: 'manual_entry',
            description: 'Conversion en poids via poids moyens par type',
            required: true,
            extractionFields: [
              { id: 'wf17', name: 'Poids moyen réfrigérateur (kg)', fieldType: 'weight', required: true, mappedTo: 'avg_weight_fridge' },
              { id: 'wf18', name: 'Poids total calculé (kg)', fieldType: 'weight', required: true, mappedTo: 'calculated_total_weight' },
            ],
            verificationCriteria: [
              { id: 'wvc6', name: 'Cohérence poids/comptage', rule: 'cross_reference', parameters: { referenceField: 'net_weight_kg', referenceStep: 'processing', tolerance: 15 }, errorMessage: 'Écart poids calculé vs pesé > 15%', severity: 'warning' },
            ],
          },
        ],
      },
      {
        id: 'certification',
        label: 'Rapport EAR',
        icon: 'reports',
        description: 'Génération du rapport pour EAR (Stiftung ear)',
        predecessors: ['output'],
        outputs: ['ZKS Abf. Certificate', 'EAR Report'],
        estimatedDuration: '1 jour',
        responsibleRole: 'System Operator',
        evidenceRequirements: [
          {
            id: 'ev-weee-7',
            name: 'ZKS Abf. Certificate',
            type: 'document',
            description: 'Certificat de recyclage pour déclaration EAR',
            required: true,
            acceptedFormats: ['PDF'],
            extractionFields: [
              { id: 'wf19', name: 'N° certificat', fieldType: 'reference', required: true, mappedTo: 'certificate_number' },
              { id: 'wf20', name: 'Poids recyclé (MT)', fieldType: 'weight', required: true, mappedTo: 'recycled_weight_mt' },
              { id: 'wf21', name: 'Fabricant', fieldType: 'text', required: true, mappedTo: 'manufacturer_name' },
            ],
            verificationCriteria: [
              { id: 'wvc7', name: 'Réduction obligation', rule: 'required', errorMessage: 'Le certificat doit permettre la réduction de l\'obligation EAR', severity: 'error' },
            ],
          },
          {
            id: 'ev-weee-8',
            name: 'Rapport audit expert',
            type: 'document',
            description: 'Rapport d\'audit par expert assermenté',
            required: false,
            acceptedFormats: ['PDF'],
            extractionFields: [
              { id: 'wf22', name: 'Nom expert', fieldType: 'text', required: true, mappedTo: 'auditor_name' },
              { id: 'wf23', name: 'Conclusion', fieldType: 'text', required: true, mappedTo: 'audit_conclusion' },
            ],
            verificationCriteria: [],
          },
        ],
      },
    ],
  },
  
  // Configurations simplifiées pour les autres industries
  chemical_recycling: {
    industryId: 'chemical_recycling',
    name: 'ISCC+ Chemical Recycling Process',
    version: '1.0',
    lastModified: '2024-12-18',
    steps: [
      { id: 'collection', label: 'Feedstock Intake', icon: 'intake', description: 'Réception des déchets plastiques', predecessors: [], outputs: ['Feedstock'], estimatedDuration: '1 jour', responsibleRole: 'Opérateur réception', evidenceRequirements: [] },
      { id: 'reception', label: 'Quality Check', icon: 'qualityCheck', description: 'Contrôle qualité entrée', predecessors: ['collection'], outputs: ['Rapport QC'], estimatedDuration: '2h', responsibleRole: 'Labo QC', evidenceRequirements: [] },
      { id: 'processing', label: 'Pyrolysis', icon: 'fire', description: 'Pyrolyse des plastiques', predecessors: ['reception'], outputs: ['PyOil'], estimatedDuration: '4-8h', responsibleRole: 'Opérateur process', evidenceRequirements: [] },
      { id: 'output', label: 'Oil Output', icon: 'oilDrop', description: 'Sortie huile de pyrolyse', predecessors: ['processing'], outputs: ['PyOil certifié'], estimatedDuration: '1h', responsibleRole: 'Opérateur sortie', evidenceRequirements: [] },
      { id: 'certification', label: 'ISCC+ Declaration', icon: 'stamp', description: 'Déclaration ISCC+', predecessors: ['output'], outputs: ['Certificat ISCC+'], estimatedDuration: '1 jour', responsibleRole: 'Compliance Officer', evidenceRequirements: [] },
    ],
  },
  
  packaging_prn: {
    industryId: 'packaging_prn',
    name: 'Packaging PRN/PERN Process',
    version: '1.0',
    lastModified: '2024-12-18',
    steps: [
      { id: 'collection', label: 'Material Reception', icon: 'intake', description: 'Réception matières', predecessors: [], outputs: ['Matière entrante'], estimatedDuration: '30min', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'reception', label: 'Weighbridge', icon: 'weighScale', description: 'Pesée pont-bascule', predecessors: ['collection'], outputs: ['Ticket pesée'], estimatedDuration: '10min', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'processing', label: 'Processing', icon: 'factory', description: 'Traitement/recyclage', predecessors: ['reception'], outputs: ['Matière recyclée'], estimatedDuration: '4h', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'output', label: 'Output & QC', icon: 'qualityCheck', description: 'Sortie et contrôle qualité', predecessors: ['processing'], outputs: ['Batch produit'], estimatedDuration: '1h', responsibleRole: 'Labo', evidenceRequirements: [] },
      { id: 'coa_verification', label: 'COA Verification', icon: 'document', description: 'Vérification et validation des Certificats d\'Analyse', predecessors: ['output'], outputs: ['COA validé'], estimatedDuration: '2h', responsibleRole: 'Qualité', evidenceRequirements: [] },
      { id: 'prn_management', label: 'PRN Management', icon: 'certificate', description: 'Gestion et émission des Packaging Recovery Notes', predecessors: ['coa_verification'], outputs: ['PRN émis'], estimatedDuration: '1 jour', responsibleRole: 'Admin', evidenceRequirements: [] },
    ],
  },
  
  plastics_mechanical: {
    industryId: 'plastics_mechanical',
    name: 'Mechanical Plastics Recycling',
    version: '1.0',
    lastModified: '2024-12-18',
    steps: [
      { id: 'collection', label: 'Intake', icon: 'intake', description: 'Réception balles', predecessors: [], outputs: ['Balles PET'], estimatedDuration: '30min', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'reception', label: 'Sorting (AI)', icon: 'robot', description: 'Tri optique IA', predecessors: ['collection'], outputs: ['Flux triés'], estimatedDuration: '2h', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'processing', label: 'Washing/Grinding', icon: 'washing', description: 'Lavage et broyage', predecessors: ['reception'], outputs: ['Flakes lavées'], estimatedDuration: '3h', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'output', label: 'Pelletizing', icon: 'pellets', description: 'Granulation', predecessors: ['processing'], outputs: ['Granulés rPET'], estimatedDuration: '2h', responsibleRole: 'Opérateur', evidenceRequirements: [] },
      { id: 'certification', label: 'Certification', icon: 'trophy', description: 'Certification client', predecessors: ['output'], outputs: ['Certificat'], estimatedDuration: '1 jour', responsibleRole: 'Qualité', evidenceRequirements: [] },
    ],
  },
};

// ============================================================================
// MOCK DATA GENERATOR - Industry-specific realistic data
// ============================================================================

// Industry-specific supplier names based on real use cases
const industrySuppliers: Record<IndustryId, string[]> = {
  tire_epo: ['Norauto Paris', 'Speedy Lyon', 'Euromaster Marseille', 'Midas Bordeaux', 'Point S Toulouse', 'Feu Vert Lille', 'AD Garage Nantes', 'Garage Peugeot Strasbourg'],
  chemical_recycling: ['Indorama Ventures', 'BASF Ludwigshafen', 'Neste Rotterdam', 'Sabic Geleen', 'LyondellBasell', 'Plastic Energy', 'Quantafuel', 'Pyrowave'],
  packaging_prn: ['Berry Leamington', 'Amcor Bünde', 'Mondi Gronau', 'DS Smith', 'Smurfit Kappa', 'Plastipak', 'Alpla', 'Graham Packaging'],
  weee_collection: ['MediaMarkt Hamburg', 'Saturn Berlin', 'Euronics München', 'Expert Frankfurt', 'Medimax Düsseldorf', 'Conrad Köln', 'EP Elektronik Stuttgart', 'Cyberport Dresden'],
  plastics_mechanical: ['Veolia rPET', 'Biffa Polymers', 'Viridor', 'Suez Plastics', 'PreZero', 'Remondis', 'FCC Environment', 'Renewi'],
};

// Industry-specific materials based on real processes
const industryMaterials: Record<IndustryId, string[]> = {
  tire_epo: ['Pneus VL', 'Pneus PL', 'Pneus agricoles', 'Pneus occasion', 'PUNR broyés', 'PUNR ballés'],
  chemical_recycling: ['PE/PP Feedstock', 'Mixed Plastics', 'PS Waste', 'Post-consumer Films', 'Industrial Plastics', 'Pyrolysis Oil'],
  packaging_prn: ['rPET Bales', 'HDPE Flakes', 'PP Regrind', 'Mixed Polymer', 'Film Scrap', 'Food-grade rPET'],
  weee_collection: ['Réfrigérateurs', 'Congélateurs', 'Climatiseurs', 'Appareils froid mixtes'],
  plastics_mechanical: ['Clear PET Bales', 'Colored PET', 'HDPE Natural', 'HDPE Mixed', 'PP Caps', 'rPET Flakes'],
};

const generateMockData = (industry: Industry) => {
  const baseFlows: MaterialFlow[] = [];
  const statusOptions: DocumentStatus[] = ['verified', 'verified', 'verified', 'pending', 'flagged'];
  const suppliers = industrySuppliers[industry.id] || [];
  const materials = industryMaterials[industry.id] || [industry.terminology.input];
  
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const supplier = suppliers[i % suppliers.length] || `Supplier ${String.fromCharCode(65 + (i % 8))}`;
    const material = materials[Math.floor(Math.random() * materials.length)];
    
    // Industry-specific quantities
    let quantity: number;
    let unit = industry.terminology.unit;
    if (industry.id === 'weee_collection') {
      quantity = Math.floor(Math.random() * 200) + 50; // 50-250 units (fridges)
    } else if (industry.id === 'tire_epo') {
      quantity = Math.floor(Math.random() * 500) + 100; // 100-600 tires
    } else {
      quantity = Math.floor(Math.random() * 10000) + 1000; // kg for others
    }
    
    baseFlows.push({
      id: `flow-${i}`,
      date: date.toISOString().split('T')[0],
      source: supplier,
      material: material,
      quantity,
      unit,
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      documents: industry.documentTypes.slice(0, 2 + Math.floor(Math.random() * 2)).map((type, j) => ({
        id: `doc-${i}-${j}`,
        type,
        name: `${type.replace(/\s/g, '_').replace(/[\(\)\/]/g, '')}_${date.toISOString().split('T')[0]}_${i}.pdf`,
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
    primary: { background: tokens.colors.brand[600], color: '#FFF', border: 'none' },
    secondary: { background: tokens.colors.cream[200], color: tokens.colors.text.primary, border: `1px solid ${tokens.colors.cream[500]}` },
    ghost: { background: 'transparent', color: tokens.colors.brand[600], border: 'none' },
  };
  const sizeStyles: Record<string, CSSProperties> = { sm: { padding: '6px 12px', fontSize: '12px' }, md: { padding: '8px 16px', fontSize: '13px' } };
  
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontFamily: 'inherit', borderRadius: tokens.radius.md, cursor: 'pointer', transition: 'all 150ms ease', ...variantStyles[variant], ...sizeStyles[size], ...style }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

const Badge: FC<{ variant?: 'success' | 'action' | 'neutral' | 'warning' | 'danger' | 'info'; icon?: string; children: ReactNode }> = ({ variant = 'neutral', icon, children }) => {
  // Simplified 3-color system: success (green), action (red), neutral (gray)
  const styles: Record<string, { bg: string; color: string }> = {
    success: { bg: tokens.colors.success.light, color: tokens.colors.success.main },
    action: { bg: tokens.colors.action.light, color: tokens.colors.action.main },
    neutral: { bg: tokens.colors.neutral.light, color: tokens.colors.neutral.main },
    // Legacy variants (now map to simplified system)
    warning: { bg: tokens.colors.action.light, color: tokens.colors.action.main },
    danger: { bg: tokens.colors.action.light, color: tokens.colors.action.main },
    info: { bg: tokens.colors.neutral.light, color: tokens.colors.neutral.main },
  };
  const s = styles[variant];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: tokens.radius.full, fontSize: '11px', fontWeight: 600, background: s.bg, color: s.color }}>{icon && <Icon name={icon} size={12} />}{children}</span>;
};

const StatusBadge: FC<{ status: DocumentStatus }> = ({ status }) => {
  const { t } = useLanguage();
  // Simplified 3-state color system:
  // - success (green): completed, verified, conformant
  // - action (red): requires action (flagged, missing, non-conformant)
  // - neutral (gray): in progress, pending (informational, discreet)
  const config: Record<DocumentStatus, { variant: 'success' | 'action' | 'neutral'; icon: string; labelKey: keyof typeof t.status }> = {
    verified: { variant: 'success', icon: 'checkCircle', labelKey: 'verified' },
    pending: { variant: 'neutral', icon: 'clock', labelKey: 'pending' },
    flagged: { variant: 'action', icon: 'alertTriangle', labelKey: 'flagged' },
    missing: { variant: 'action', icon: 'xCircle', labelKey: 'missing' },
  };
  const c = config[status];
  return <Badge variant={c.variant} icon={c.icon}>{t.status[c.labelKey]}</Badge>;
};

// ============================================================================
// KPI CARD
// ============================================================================

const KPICard: FC<{ label: string; value: number | string; unit: string; target?: number; industry: Industry; onClick?: () => void; linkLabel?: string }> = ({ label, value, unit, target, industry, onClick, linkLabel }) => {
  const { t } = useLanguage();
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  const progress = target ? Math.min((numValue / target) * 100, 100) : null;
  const isOnTrack = target ? numValue >= target * 0.9 : true;

  return (
    <Card padding="sm" style={{ cursor: onClick ? 'pointer' : 'default', transition: 'transform 150ms ease, box-shadow 150ms ease' }}>
      <div onClick={onClick} style={{ height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted, fontWeight: 500 }}>{label}</div>
          {target && <Badge variant={isOnTrack ? 'success' : 'action'}>{isOnTrack ? t.status.onTrack : t.status.belowTarget}</Badge>}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '28px', fontWeight: 700, color: tokens.colors.text.primary }}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
          <span style={{ fontSize: '14px', color: tokens.colors.text.muted }}>{unit}</span>
        </div>
        {progress !== null && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ height: '4px', background: tokens.colors.cream[400], borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: isOnTrack ? tokens.colors.success.main : tokens.colors.action.main, borderRadius: '2px', transition: 'width 300ms ease' }} />
            </div>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, marginTop: '4px' }}>{t.common.target}: {target?.toLocaleString()} {unit}</div>
          </div>
        )}
        {onClick && linkLabel && (
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: tokens.colors.brand[600], fontWeight: 600 }}>
            <span>{linkLabel}</span>
            <Icon name="arrowRight" size={12} color={tokens.colors.brand[600]} />
          </div>
        )}
      </div>
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
  // Industry-specific mass balance data
  const getMockBalance = (): MassBalanceEntry[] => {
    if (industry.id === 'tire_epo') {
      return [
        { period: 'Sem. 50', material: 'Pneus VL collectés', inputKg: 85000, outputKg: 17000, wasteKg: 68000, yieldPercent: 20.0, isBalanced: true }, // 20% reuse
        { period: 'Sem. 49', material: 'Pneus PL collectés', inputKg: 45000, outputKg: 9000, wasteKg: 36000, yieldPercent: 20.0, isBalanced: true },
        { period: 'Sem. 48', material: 'PUNR → Lafarge', inputKg: 104000, outputKg: 104000, wasteKg: 0, yieldPercent: 100.0, isBalanced: true },
      ];
    }
    if (industry.id === 'weee_collection') {
      return [
        { period: 'Sem. 50', material: 'Réfrigérateurs', inputKg: 3500, outputKg: 87500, wasteKg: 0, yieldPercent: 100.0, isBalanced: true }, // 3500 units × 25kg avg
        { period: 'Sem. 49', material: 'Congélateurs', inputKg: 1200, outputKg: 42000, wasteKg: 0, yieldPercent: 100.0, isBalanced: true },
        { period: 'Sem. 48', material: 'Réfrigérateurs', inputKg: 2800, outputKg: 70000, wasteKg: 0, yieldPercent: 100.0, isBalanced: false },
      ];
    }
    // Default for chemical/packaging/plastics
    return [
      { period: 'Week 50', material: 'Mixed Plastics', inputKg: 45200, outputKg: 38420, wasteKg: 5870, yieldPercent: 85.0, isBalanced: true },
      { period: 'Week 49', material: 'PE/PP Feedstock', inputKg: 52100, outputKg: 44285, wasteKg: 6762, yieldPercent: 85.0, isBalanced: true },
      { period: 'Week 48', material: 'Mixed Plastics', inputKg: 48300, outputKg: 40100, wasteKg: 7200, yieldPercent: 83.0, isBalanced: false },
    ];
  };
  
  const mockBalance = getMockBalance();
  const isTire = industry.id === 'tire_epo';
  const isFridge = industry.id === 'weee_collection';
  
  const totalInput = mockBalance.reduce((sum, b) => sum + b.inputKg, 0);
  const totalOutput = mockBalance.reduce((sum, b) => sum + b.outputKg, 0);
  const totalWaste = mockBalance.reduce((sum, b) => sum + b.wasteKg, 0);
  
  // Labels based on industry
  const labels = {
    input: isTire ? 'Collecté' : isFridge ? 'Appareils (unités)' : 'Total Input',
    output: isTire ? 'Réemploi' : isFridge ? 'Poids recyclé (kg)' : 'PyOil Output',
    waste: isTire ? 'PUNR → Exutoire' : isFridge ? 'En attente' : 'Waste/Off-spec',
    yield: isTire ? 'Taux réemploi' : isFridge ? 'Taux vérification' : 'Avg Yield',
    exportLabel: isTire ? 'Export EPR' : isFridge ? 'Export EAR' : 'Export ISCC+',
  };
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: tokens.radius.md, background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="scale" size={20} color={industry.color} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
            {isTire ? 'Bilan Collecte / Valorisation' : isFridge ? 'Bilan Recyclage EAR' : 'Mass Balance'}
          </h3>
        </div>
        <Button variant="secondary" size="sm" icon="download">{labels.exportLabel}</Button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: tokens.colors.cream[300], borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>{labels.input}</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.text.primary }}>
            {isFridge ? totalInput.toLocaleString() : `${(totalInput / 1000).toFixed(1)}t`}
          </div>
        </div>
        <div style={{ background: tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>{labels.output}</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.success.main }}>
            {isTire ? `${(totalOutput / 1000).toFixed(1)}t` : isFridge ? `${(totalOutput / 1000).toFixed(1)}t` : `${(totalOutput / 1000).toFixed(1)}t`}
          </div>
        </div>
        <div style={{ background: tokens.colors.warning.light, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>{labels.waste}</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.warning.main }}>
            {isFridge ? '0' : `${(totalWaste / 1000).toFixed(1)}t`}
          </div>
        </div>
        <div style={{ background: `${industry.color}15`, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>{labels.yield}</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: industry.color }}>
            {isTire ? '20%' : isFridge ? '100%' : `${((totalOutput / totalInput) * 100).toFixed(1)}%`}
          </div>
        </div>
      </div>
      
      <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px 100px 100px 80px 80px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
          <div>Période</div><div>Matière</div><div style={{ textAlign: 'right' }}>{isFridge ? 'Unités' : 'Entrée (kg)'}</div><div style={{ textAlign: 'right' }}>{isFridge ? 'Poids (kg)' : 'Sortie (kg)'}</div><div style={{ textAlign: 'right' }}>{isTire ? 'PUNR (kg)' : 'Déchet'}</div><div style={{ textAlign: 'right' }}>Taux</div><div style={{ textAlign: 'center' }}>Status</div>
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
  // Industry-specific certificates
  const getMockCerts = (): Certificate[] => {
    if (industry.id === 'tire_epo') {
      return [
        { id: '1', type: 'Certificat EPR Tyval', reference: `EPR-2024-TYV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-12-01', expiryDate: '2025-12-01', status: 'valid', linkedFlows: 1250 },
        { id: '2', type: 'Attestation Exutoire Lafarge', reference: `EXU-2024-LAF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-11-15', status: 'valid', linkedFlows: 850 },
        { id: '3', type: 'Certificat Granulateur Estato', reference: `GRA-2024-EST-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-10-20', expiryDate: '2024-12-20', status: 'expiring', linkedFlows: 320 },
      ];
    }
    if (industry.id === 'weee_collection') {
      return [
        { id: '1', type: 'ZKS Abf. Certificate', reference: `ZKS-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-12-01', status: 'valid', linkedFlows: 3500 },
        { id: '2', type: 'EAR Registration', reference: `EAR-WEEE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-11-15', expiryDate: '2025-11-15', status: 'valid', linkedFlows: 7200 },
        { id: '3', type: 'Recycler License', reference: `LIC-REC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-01-01', expiryDate: '2024-12-31', status: 'expiring', linkedFlows: 15000 },
      ];
    }
    // Default certificates
    return [
      { id: '1', type: industry.terminology.certificate, reference: `CERT-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-12-01', expiryDate: '2025-03-01', status: 'valid', linkedFlows: 45 },
      { id: '2', type: 'Sustainability Declaration', reference: `SD-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-11-15', status: 'valid', linkedFlows: 32 },
      { id: '3', type: 'Origin Certificate', reference: `OC-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, issuedDate: '2024-10-20', expiryDate: '2024-12-20', status: 'expiring', linkedFlows: 18 },
    ];
  };
  
  const mockCerts = getMockCerts();
  const statusColors = { valid: tokens.colors.success, expiring: tokens.colors.warning, expired: tokens.colors.danger, draft: tokens.colors.info };
  const isFrench = industry.id === 'tire_epo' || industry.id === 'weee_collection';
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: tokens.radius.md, background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="certificate" size={20} color={industry.color} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
            {industry.id === 'tire_epo' ? 'Certificats & Attestations' : industry.id === 'weee_collection' ? 'EAR Certificates' : `${industry.terminology.certificate}s`}
          </h3>
        </div>
        <Button variant="primary" size="sm" icon="certificate">{isFrench ? 'Générer' : 'Generate New'}</Button>
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
            <div style={{ fontSize: '12px', color: tokens.colors.text.secondary }}>{cert.linkedFlows.toLocaleString()} {isFrench ? 'flux liés' : 'linked flows'}</div>
            {cert.expiryDate && <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{isFrench ? 'Expire:' : 'Expires:'} {cert.expiryDate}</div>}
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
// PROCESS CONFIGURATION - STEP CONFIGURATION MODAL
// ============================================================================

const evidenceTypeConfig: Record<EvidenceType, { icon: string; label: string; color: string }> = {
  document: { icon: 'documentEvidence', label: 'Document', color: '#3182CE' },
  photo: { icon: 'photoEvidence', label: 'Photo', color: '#38A169' },
  iot_data: { icon: 'iotEvidence', label: 'Données IoT', color: '#805AD5' },
  manual_entry: { icon: 'manualEntry', label: 'Saisie manuelle', color: '#DD6B20' },
  signature: { icon: 'signatureEvidence', label: 'Signature', color: '#D53F8C' },
  geolocation: { icon: 'geolocation', label: 'Géolocalisation', color: '#319795' },
};

const verificationRuleConfig: Record<VerificationRule, { label: string; description: string }> = {
  required: { label: 'Obligatoire', description: 'Le champ doit être renseigné' },
  numeric_range: { label: 'Plage numérique', description: 'Valeur entre min et max' },
  date_valid: { label: 'Date valide', description: 'Date dans la plage acceptée' },
  regex_match: { label: 'Format (regex)', description: 'Correspond au pattern défini' },
  cross_reference: { label: 'Référence croisée', description: 'Cohérence avec autre étape' },
  threshold: { label: 'Seuil/Tolérance', description: 'Écart dans la tolérance' },
};

const StepConfigurationModal: FC<{
  step: ProcessStepConfig;
  industry: Industry;
  onClose: () => void;
  onSave: (updatedStep: ProcessStepConfig) => void;
}> = ({ step, industry, onClose, onSave }) => {
  const [editedStep, setEditedStep] = useState<ProcessStepConfig>({ ...step });
  const [activeEvidence, setActiveEvidence] = useState<string | null>(
    step.evidenceRequirements.length > 0 ? step.evidenceRequirements[0].id : null
  );
  const [showAddEvidence, setShowAddEvidence] = useState(false);
  
  const addEvidence = (type: EvidenceType) => {
    const newEvidence: EvidenceRequirement = {
      id: `ev-${Date.now()}`,
      name: `Nouvelle preuve ${type}`,
      type,
      description: '',
      required: true,
      acceptedFormats: type === 'document' ? ['PDF', 'JPG'] : type === 'photo' ? ['JPG', 'PNG', 'HEIC'] : undefined,
      extractionFields: [],
      verificationCriteria: [],
    };
    setEditedStep({
      ...editedStep,
      evidenceRequirements: [...editedStep.evidenceRequirements, newEvidence],
    });
    setActiveEvidence(newEvidence.id);
    setShowAddEvidence(false);
  };
  
  const updateEvidence = (evidenceId: string, updates: Partial<EvidenceRequirement>) => {
    setEditedStep({
      ...editedStep,
      evidenceRequirements: editedStep.evidenceRequirements.map(ev =>
        ev.id === evidenceId ? { ...ev, ...updates } : ev
      ),
    });
  };
  
  const removeEvidence = (evidenceId: string) => {
    setEditedStep({
      ...editedStep,
      evidenceRequirements: editedStep.evidenceRequirements.filter(ev => ev.id !== evidenceId),
    });
    setActiveEvidence(null);
  };
  
  const addExtractionField = (evidenceId: string) => {
    const evidence = editedStep.evidenceRequirements.find(ev => ev.id === evidenceId);
    if (!evidence) return;
    
    const newField: ExtractedField = {
      id: `field-${Date.now()}`,
      name: 'Nouveau champ',
      fieldType: 'text',
      required: false,
    };
    
    updateEvidence(evidenceId, {
      extractionFields: [...(evidence.extractionFields || []), newField],
    });
  };
  
  const addVerificationCriterion = (evidenceId: string) => {
    const evidence = editedStep.evidenceRequirements.find(ev => ev.id === evidenceId);
    if (!evidence) return;
    
    const newCriterion: VerificationCriterion = {
      id: `vc-${Date.now()}`,
      name: 'Nouvelle règle',
      rule: 'required',
      errorMessage: 'Validation échouée',
      severity: 'error',
    };
    
    updateEvidence(evidenceId, {
      verificationCriteria: [...evidence.verificationCriteria, newCriterion],
    });
  };
  
  const activeEvidenceData = editedStep.evidenceRequirements.find(ev => ev.id === activeEvidence);
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        background: tokens.colors.cream[50], borderRadius: tokens.radius.xl,
        width: '95%', maxWidth: '1100px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: `1px solid ${tokens.colors.cream[400]}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: `linear-gradient(135deg, ${industry.gradientFrom} 0%, ${industry.gradientTo} 100%)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: tokens.radius.lg, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={step.icon} size={26} color="#FFF" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                Configuration: {step.label}
              </h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                {step.description}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: tokens.radius.md, padding: '10px', cursor: 'pointer' }}>
            <Icon name="x" size={20} color="#FFF" />
          </button>
        </div>
        
        {/* Content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Left Panel - Evidence List */}
          <div style={{ width: '280px', borderRight: `1px solid ${tokens.colors.cream[400]}`, background: tokens.colors.cream[100], display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: `1px solid ${tokens.colors.cream[400]}` }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.secondary, textTransform: 'uppercase', marginBottom: '8px' }}>
                Preuves requises ({editedStep.evidenceRequirements.length})
              </div>
              <Button variant="primary" size="sm" icon="plus" onClick={() => setShowAddEvidence(true)} style={{ width: '100%' }}>
                Ajouter une preuve
              </Button>
            </div>
            
            <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
              {editedStep.evidenceRequirements.map(ev => {
                const config = evidenceTypeConfig[ev.type];
                const isActive = activeEvidence === ev.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setActiveEvidence(ev.id)}
                    style={{
                      padding: '12px', marginBottom: '6px', borderRadius: tokens.radius.md,
                      background: isActive ? tokens.colors.cream[50] : 'transparent',
                      border: isActive ? `2px solid ${config.color}` : `1px solid ${tokens.colors.cream[400]}`,
                      cursor: 'pointer', transition: 'all 150ms ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: tokens.radius.sm, background: `${config.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={config.icon} size={16} color={config.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{ev.name}</div>
                        <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>{config.label}</div>
                      </div>
                      {ev.required && <Badge variant="danger">Requis</Badge>}
                    </div>
                    <div style={{ fontSize: '11px', color: tokens.colors.text.muted, marginTop: '6px' }}>
                      {ev.extractionFields?.length || 0} champs • {ev.verificationCriteria.length} règles
                    </div>
                  </div>
                );
              })}
              
              {editedStep.evidenceRequirements.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 20px', color: tokens.colors.text.muted }}>
                  <Icon name="documentEvidence" size={40} color={tokens.colors.cream[500]} />
                  <p style={{ margin: '12px 0 0', fontSize: '13px' }}>Aucune preuve configurée</p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Cliquez sur "Ajouter" pour définir les preuves requises</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Panel - Evidence Details */}
          <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
            {activeEvidenceData ? (
              <>
                {/* Evidence Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <input
                      type="text"
                      value={activeEvidenceData.name}
                      onChange={e => updateEvidence(activeEvidenceData.id, { name: e.target.value })}
                      style={{
                        fontSize: '18px', fontWeight: 700, color: tokens.colors.text.primary,
                        border: 'none', background: 'transparent', padding: '4px 0',
                        borderBottom: `2px solid ${tokens.colors.cream[400]}`, width: '300px',
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                      <Badge variant={activeEvidenceData.required ? 'danger' : 'neutral'}>
                        {activeEvidenceData.required ? 'Obligatoire' : 'Optionnel'}
                      </Badge>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: tokens.colors.text.secondary, cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={activeEvidenceData.required}
                          onChange={e => updateEvidence(activeEvidenceData.id, { required: e.target.checked })}
                        />
                        Preuve obligatoire
                      </label>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon="trash" onClick={() => removeEvidence(activeEvidenceData.id)} style={{ color: tokens.colors.danger.main }}>
                    Supprimer
                  </Button>
                </div>
                
                {/* Description */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.secondary, display: 'block', marginBottom: '6px' }}>Description</label>
                  <textarea
                    value={activeEvidenceData.description}
                    onChange={e => updateEvidence(activeEvidenceData.id, { description: e.target.value })}
                    placeholder="Description de cette preuve..."
                    style={{
                      width: '100%', padding: '10px', borderRadius: tokens.radius.md,
                      border: `1px solid ${tokens.colors.cream[400]}`, fontSize: '13px',
                      resize: 'vertical', minHeight: '60px', fontFamily: 'inherit',
                    }}
                  />
                </div>
                
                {/* Accepted Formats (for documents/photos) */}
                {(activeEvidenceData.type === 'document' || activeEvidenceData.type === 'photo') && (
                  <div style={{ marginBottom: '20px', padding: '16px', background: tokens.colors.cream[200], borderRadius: tokens.radius.md }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.secondary, display: 'block', marginBottom: '8px' }}>Formats acceptés</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['PDF', 'JPG', 'PNG', 'HEIC', 'XLSX', 'CSV'].map(format => {
                        const isSelected = activeEvidenceData.acceptedFormats?.includes(format);
                        return (
                          <button
                            key={format}
                            onClick={() => {
                              const current = activeEvidenceData.acceptedFormats || [];
                              updateEvidence(activeEvidenceData.id, {
                                acceptedFormats: isSelected ? current.filter(f => f !== format) : [...current, format],
                              });
                            }}
                            style={{
                              padding: '6px 12px', borderRadius: tokens.radius.sm, fontSize: '12px', fontWeight: 600,
                              border: isSelected ? 'none' : `1px solid ${tokens.colors.cream[500]}`,
                              background: isSelected ? tokens.colors.accent.main : 'transparent',
                              color: isSelected ? '#FFF' : tokens.colors.text.secondary,
                              cursor: 'pointer',
                            }}
                          >
                            {format}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Extraction Fields */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: tokens.colors.text.primary }}>
                      Champs à extraire ({activeEvidenceData.extractionFields?.length || 0})
                    </label>
                    <Button variant="secondary" size="sm" icon="plus" onClick={() => addExtractionField(activeEvidenceData.id)}>
                      Ajouter champ
                    </Button>
                  </div>
                  
                  {activeEvidenceData.extractionFields && activeEvidenceData.extractionFields.length > 0 ? (
                    <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 80px 40px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
                        <div>Nom du champ</div><div>Type</div><div>Mapping</div><div>Requis</div><div></div>
                      </div>
                      {activeEvidenceData.extractionFields.map((field, idx) => (
                        <div key={field.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 80px 40px', padding: '8px 14px', borderBottom: idx < activeEvidenceData.extractionFields!.length - 1 ? `1px solid ${tokens.colors.cream[300]}` : 'none', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={field.name}
                            onChange={e => {
                              const updated = activeEvidenceData.extractionFields!.map(f => f.id === field.id ? { ...f, name: e.target.value } : f);
                              updateEvidence(activeEvidenceData.id, { extractionFields: updated });
                            }}
                            style={{ border: 'none', background: 'transparent', fontSize: '13px', padding: '4px' }}
                          />
                          <select
                            value={field.fieldType}
                            onChange={e => {
                              const updated = activeEvidenceData.extractionFields!.map(f => f.id === field.id ? { ...f, fieldType: e.target.value as any } : f);
                              updateEvidence(activeEvidenceData.id, { extractionFields: updated });
                            }}
                            style={{ padding: '4px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }}
                          >
                            <option value="text">Texte</option>
                            <option value="number">Nombre</option>
                            <option value="date">Date</option>
                            <option value="weight">Poids</option>
                            <option value="quantity">Quantité</option>
                            <option value="reference">Référence</option>
                          </select>
                          <input
                            type="text"
                            value={field.mappedTo || ''}
                            placeholder="field_name"
                            onChange={e => {
                              const updated = activeEvidenceData.extractionFields!.map(f => f.id === field.id ? { ...f, mappedTo: e.target.value } : f);
                              updateEvidence(activeEvidenceData.id, { extractionFields: updated });
                            }}
                            style={{ border: `1px solid ${tokens.colors.cream[400]}`, background: 'transparent', fontSize: '11px', padding: '4px', borderRadius: tokens.radius.sm }}
                          />
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={e => {
                              const updated = activeEvidenceData.extractionFields!.map(f => f.id === field.id ? { ...f, required: e.target.checked } : f);
                              updateEvidence(activeEvidenceData.id, { extractionFields: updated });
                            }}
                            style={{ width: '16px', height: '16px' }}
                          />
                          <button
                            onClick={() => {
                              const updated = activeEvidenceData.extractionFields!.filter(f => f.id !== field.id);
                              updateEvidence(activeEvidenceData.id, { extractionFields: updated });
                            }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                          >
                            <Icon name="x" size={14} color={tokens.colors.text.muted} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', background: tokens.colors.cream[200], borderRadius: tokens.radius.md, color: tokens.colors.text.muted, fontSize: '13px' }}>
                      Aucun champ d'extraction défini
                    </div>
                  )}
                </div>
                
                {/* Verification Criteria */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: tokens.colors.text.primary }}>
                      Critères de vérification ({activeEvidenceData.verificationCriteria.length})
                    </label>
                    <Button variant="secondary" size="sm" icon="plus" onClick={() => addVerificationCriterion(activeEvidenceData.id)}>
                      Ajouter règle
                    </Button>
                  </div>
                  
                  {activeEvidenceData.verificationCriteria.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {activeEvidenceData.verificationCriteria.map(criterion => (
                        <div key={criterion.id} style={{ padding: '14px', background: tokens.colors.cream[200], borderRadius: tokens.radius.md, borderLeft: `4px solid ${criterion.severity === 'error' ? tokens.colors.danger.main : criterion.severity === 'warning' ? tokens.colors.warning.main : tokens.colors.info.main}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <input
                              type="text"
                              value={criterion.name}
                              onChange={e => {
                                const updated = activeEvidenceData.verificationCriteria.map(c => c.id === criterion.id ? { ...c, name: e.target.value } : c);
                                updateEvidence(activeEvidenceData.id, { verificationCriteria: updated });
                              }}
                              style={{ fontSize: '14px', fontWeight: 600, border: 'none', background: 'transparent', width: '200px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <select
                                value={criterion.severity}
                                onChange={e => {
                                  const updated = activeEvidenceData.verificationCriteria.map(c => c.id === criterion.id ? { ...c, severity: e.target.value as any } : c);
                                  updateEvidence(activeEvidenceData.id, { verificationCriteria: updated });
                                }}
                                style={{ padding: '4px 8px', fontSize: '11px', borderRadius: tokens.radius.sm }}
                              >
                                <option value="error">Erreur</option>
                                <option value="warning">Alerte</option>
                                <option value="info">Info</option>
                              </select>
                              <button
                                onClick={() => {
                                  const updated = activeEvidenceData.verificationCriteria.filter(c => c.id !== criterion.id);
                                  updateEvidence(activeEvidenceData.id, { verificationCriteria: updated });
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                              >
                                <Icon name="x" size={14} color={tokens.colors.text.muted} />
                              </button>
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ fontSize: '11px', color: tokens.colors.text.muted, display: 'block', marginBottom: '4px' }}>Type de règle</label>
                              <select
                                value={criterion.rule}
                                onChange={e => {
                                  const updated = activeEvidenceData.verificationCriteria.map(c => c.id === criterion.id ? { ...c, rule: e.target.value as VerificationRule } : c);
                                  updateEvidence(activeEvidenceData.id, { verificationCriteria: updated });
                                }}
                                style={{ width: '100%', padding: '8px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }}
                              >
                                {Object.entries(verificationRuleConfig).map(([key, config]) => (
                                  <option key={key} value={key}>{config.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label style={{ fontSize: '11px', color: tokens.colors.text.muted, display: 'block', marginBottom: '4px' }}>Message d'erreur</label>
                              <input
                                type="text"
                                value={criterion.errorMessage}
                                onChange={e => {
                                  const updated = activeEvidenceData.verificationCriteria.map(c => c.id === criterion.id ? { ...c, errorMessage: e.target.value } : c);
                                  updateEvidence(activeEvidenceData.id, { verificationCriteria: updated });
                                }}
                                style={{ width: '100%', padding: '8px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }}
                              />
                            </div>
                          </div>
                          {(criterion.rule === 'numeric_range' || criterion.rule === 'threshold' || criterion.rule === 'cross_reference') && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                              {criterion.rule === 'numeric_range' && (
                                <>
                                  <div>
                                    <label style={{ fontSize: '11px', color: tokens.colors.text.muted }}>Min</label>
                                    <input type="number" placeholder="Min" style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }} />
                                  </div>
                                  <div>
                                    <label style={{ fontSize: '11px', color: tokens.colors.text.muted }}>Max</label>
                                    <input type="number" placeholder="Max" style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }} />
                                  </div>
                                </>
                              )}
                              {(criterion.rule === 'threshold' || criterion.rule === 'cross_reference') && (
                                <>
                                  <div>
                                    <label style={{ fontSize: '11px', color: tokens.colors.text.muted }}>Champ référence</label>
                                    <input type="text" placeholder="field_name" style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }} />
                                  </div>
                                  <div>
                                    <label style={{ fontSize: '11px', color: tokens.colors.text.muted }}>Tolérance (%)</label>
                                    <input type="number" placeholder="5" style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: tokens.radius.sm, border: `1px solid ${tokens.colors.cream[400]}` }} />
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', background: tokens.colors.cream[200], borderRadius: tokens.radius.md, color: tokens.colors.text.muted, fontSize: '13px' }}>
                      Aucun critère de vérification défini
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: tokens.colors.text.muted }}>
                <Icon name="documentEvidence" size={60} color={tokens.colors.cream[400]} />
                <p style={{ marginTop: '16px', fontSize: '15px' }}>Sélectionnez une preuve pour la configurer</p>
                <p style={{ fontSize: '13px' }}>ou ajoutez-en une nouvelle</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${tokens.colors.cream[400]}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: tokens.colors.cream[100] }}>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted }}>
            {editedStep.evidenceRequirements.length} preuve(s) configurée(s) • {editedStep.evidenceRequirements.reduce((sum, ev) => sum + ev.verificationCriteria.length, 0)} règle(s) de validation
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={onClose}>Annuler</Button>
            <Button variant="primary" icon="checkCircle" onClick={() => onSave(editedStep)}>Enregistrer</Button>
          </div>
        </div>
        
        {/* Add Evidence Modal */}
        {showAddEvidence && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(10,22,40,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} onClick={() => setShowAddEvidence(false)}>
            <div style={{ background: tokens.colors.cream[50], borderRadius: tokens.radius.xl, padding: '24px', width: '400px' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: tokens.colors.text.primary }}>Ajouter une preuve</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {Object.entries(evidenceTypeConfig).map(([type, config]) => (
                  <button
                    key={type}
                    onClick={() => addEvidence(type as EvidenceType)}
                    style={{
                      padding: '16px', borderRadius: tokens.radius.md, border: `1px solid ${tokens.colors.cream[400]}`,
                      background: tokens.colors.cream[100], cursor: 'pointer', textAlign: 'center',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: tokens.radius.md, background: `${config.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                      <Icon name={config.icon} size={22} color={config.color} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.text.primary }}>{config.label}</div>
                  </button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setShowAddEvidence(false)} style={{ width: '100%', marginTop: '16px' }}>Annuler</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// PROCESS FLOW EDITOR - Visual workflow with double-click configuration
// ============================================================================

const ProcessFlowEditor: FC<{ industry: Industry; onNavigate?: (tab: string) => void }> = ({ industry, onNavigate }) => {
  const [processConfig, setProcessConfig] = useState<ProcessConfiguration>(
    defaultProcessConfigurations[industry.id]
  );
  const [selectedStep, setSelectedStep] = useState<ProcessStepConfig | null>(null);

  // Map process step IDs to navigation tabs
  const stepNavigation: Record<string, string> = {
    'coa_verification': 'coa',
    'prn_management': 'prn',
  };

  const handleStepDoubleClick = (step: ProcessStepConfig) => {
    setSelectedStep(step);
  };

  const handleStepClick = (step: ProcessStepConfig) => {
    const navTarget = stepNavigation[step.id];
    if (navTarget && onNavigate) {
      onNavigate(navTarget);
    }
  };
  
  const handleStepSave = (updatedStep: ProcessStepConfig) => {
    setProcessConfig({
      ...processConfig,
      steps: processConfig.steps.map(s => s.id === updatedStep.id ? updatedStep : s),
      lastModified: new Date().toISOString().split('T')[0],
    });
    setSelectedStep(null);
  };
  
  const getTotalEvidence = (step: ProcessStepConfig) => step.evidenceRequirements.length;
  const getRequiredEvidence = (step: ProcessStepConfig) => step.evidenceRequirements.filter(e => e.required).length;
  const getTotalCriteria = (step: ProcessStepConfig) => step.evidenceRequirements.reduce((sum, e) => sum + e.verificationCriteria.length, 0);
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: tokens.radius.lg, background: `${industry.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="workflow" size={24} color={industry.color} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
              Configuration du processus
            </h3>
            <p style={{ fontSize: '13px', color: tokens.colors.text.muted, margin: '2px 0 0' }}>
              {processConfig.name} • v{processConfig.version}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: tokens.colors.text.muted }}>
            Modifié: {processConfig.lastModified}
          </span>
          <Button variant="secondary" size="sm" icon="download">Exporter</Button>
        </div>
      </div>
      
      {/* Info Banner */}
      <div style={{ 
        background: tokens.colors.info.light, 
        borderRadius: tokens.radius.md, 
        padding: '12px 16px', 
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: `1px solid ${tokens.colors.info.main}20`
      }}>
        <Icon name="edit" size={18} color={tokens.colors.info.main} />
        <span style={{ fontSize: '13px', color: tokens.colors.text.secondary }}>
          <strong>Double-cliquez</strong> sur une étape pour configurer les preuves requises et les critères de vérification
        </span>
      </div>
      
      {/* Process Flow Visualization */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '12px', overflowX: 'auto', padding: '10px 0' }}>
        {processConfig.steps.map((step, index) => {
          const totalEvidence = getTotalEvidence(step);
          const requiredEvidence = getRequiredEvidence(step);
          const totalCriteria = getTotalCriteria(step);
          const isConfigured = totalEvidence > 0;
          
          const isNavigable = !!stepNavigation[step.id];

          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => handleStepClick(step)}
                onDoubleClick={() => handleStepDoubleClick(step)}
                style={{
                  flex: '1',
                  minWidth: '180px',
                  background: isNavigable ? `${industry.color}10` : (isConfigured ? tokens.colors.cream[50] : tokens.colors.cream[300]),
                  borderRadius: tokens.radius.lg,
                  padding: '20px 16px',
                  border: `2px solid ${isNavigable ? industry.color : (isConfigured ? industry.color : tokens.colors.cream[400])}`,
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  position: 'relative',
                  boxShadow: isNavigable ? `0 2px 8px ${industry.color}30` : 'none',
                }}
              >
                {/* Step Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: isConfigured ? `${industry.color}20` : tokens.colors.cream[400],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${isConfigured ? industry.color : tokens.colors.cream[500]}`,
                  }}>
                    <Icon name={step.icon} size={24} color={isConfigured ? industry.color : tokens.colors.text.muted} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: tokens.colors.text.muted, textTransform: 'uppercase', fontWeight: 600 }}>
                      Étape {index + 1}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: tokens.colors.text.primary }}>
                      {step.label}
                    </div>
                  </div>
                </div>
                
                {/* Step Description */}
                <p style={{ fontSize: '12px', color: tokens.colors.text.secondary, margin: '0 0 14px', lineHeight: 1.4 }}>
                  {step.description}
                </p>
                
                {/* Evidence Summary */}
                <div style={{ 
                  background: tokens.colors.cream[200], 
                  borderRadius: tokens.radius.md, 
                  padding: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>PREUVES</span>
                    {isConfigured ? (
                      <Badge variant="success">{totalEvidence} configurée(s)</Badge>
                    ) : (
                      <Badge variant="warning">Non configuré</Badge>
                    )}
                  </div>
                  
                  {isConfigured && (
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                      <div>
                        <span style={{ color: tokens.colors.text.muted }}>Requises: </span>
                        <span style={{ fontWeight: 600, color: tokens.colors.danger.main }}>{requiredEvidence}</span>
                      </div>
                      <div>
                        <span style={{ color: tokens.colors.text.muted }}>Règles: </span>
                        <span style={{ fontWeight: 600, color: tokens.colors.text.primary }}>{totalCriteria}</span>
                      </div>
                    </div>
                  )}
                  
                  {!isConfigured && (
                    <div style={{ fontSize: '11px', color: tokens.colors.text.muted, fontStyle: 'italic' }}>
                      Double-cliquez pour configurer
                    </div>
                  )}
                </div>
                
                {/* Evidence Type Icons */}
                {isConfigured && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {step.evidenceRequirements.map(ev => {
                      const config = evidenceTypeConfig[ev.type];
                      return (
                        <div
                          key={ev.id}
                          title={ev.name}
                          style={{
                            width: '28px', height: '28px', borderRadius: tokens.radius.sm,
                            background: `${config.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: ev.required ? `2px solid ${config.color}` : 'none',
                          }}
                        >
                          <Icon name={config.icon} size={14} color={config.color} />
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Responsible Role */}
                {step.responsibleRole && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${tokens.colors.cream[400]}`, fontSize: '11px', color: tokens.colors.text.muted }}>
                    <Icon name="siteOperator" size={12} color={tokens.colors.text.muted} /> {step.responsibleRole}
                    {step.estimatedDuration && <span style={{ marginLeft: '10px' }}>• {step.estimatedDuration}</span>}
                  </div>
                )}
                
                {/* Edit indicator or Navigation indicator */}
                {isNavigable ? (
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: industry.color, borderRadius: tokens.radius.sm,
                    padding: '4px 10px', fontSize: '10px', color: 'white',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontWeight: 600,
                  }}>
                    <Icon name="arrowRight" size={10} color="white" /> Voir détails
                  </div>
                ) : (
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: 'rgba(255,255,255,0.9)', borderRadius: tokens.radius.sm,
                    padding: '4px 8px', fontSize: '10px', color: tokens.colors.text.muted,
                    display: 'flex', alignItems: 'center', gap: '4px',
                    opacity: 0.7,
                  }}>
                    <Icon name="edit" size={10} /> Double-clic
                  </div>
                )}
              </div>
              
              {/* Arrow between steps */}
              {index < processConfig.steps.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', color: tokens.colors.cream[500] }}>
                  <Icon name="arrowRight" size={24} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Summary Stats */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', 
        marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${tokens.colors.cream[400]}`
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: industry.color }}>{processConfig.steps.length}</div>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted }}>Étapes</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.success.main }}>
            {processConfig.steps.reduce((sum, s) => sum + getTotalEvidence(s), 0)}
          </div>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted }}>Preuves totales</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.danger.main }}>
            {processConfig.steps.reduce((sum, s) => sum + getRequiredEvidence(s), 0)}
          </div>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted }}>Preuves obligatoires</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.warning.main }}>
            {processConfig.steps.reduce((sum, s) => sum + getTotalCriteria(s), 0)}
          </div>
          <div style={{ fontSize: '12px', color: tokens.colors.text.muted }}>Règles de validation</div>
        </div>
      </div>
      
      {/* Configuration Modal */}
      {selectedStep && (
        <StepConfigurationModal
          step={selectedStep}
          industry={industry}
          onClose={() => setSelectedStep(null)}
          onSave={handleStepSave}
        />
      )}
    </Card>
  );
};

// ============================================================================
// PRN MANAGEMENT VIEW
// ============================================================================

const PRNManagementView: FC<{ industry: Industry }> = ({ industry }) => {
  const { t } = useLanguage();

  // Get process steps from industry configuration (dynamic)
  const processConfig = defaultProcessConfigurations[industry.id];
  const processSteps = processConfig.steps.map((step, index) => ({
    id: index + 1,
    key: step.id,
    label: step.label,
    icon: step.icon,
    description: step.description,
    // Simulate status based on step position
    status: index < processConfig.steps.length - 2 ? 'verified' as const :
            index === processConfig.steps.length - 1 ? 'flagged' as const : 'pending' as const,
  }));

  // Mock PRN data by material type
  const prnData = [
    { material: 'Paper/Board', tonnage: 450, target: 75, acquired: 340, coverage: 75.6, reprocessor: 'DS Smith Recycling', npwd: 'PRN-2024-001234' },
    { material: 'Glass', tonnage: 180, target: 85, acquired: 155, coverage: 86.1, reprocessor: 'Encirc Ltd', npwd: 'PRN-2024-001235' },
    { material: 'Aluminium', tonnage: 45, target: 80, acquired: 36, coverage: 80.0, reprocessor: 'Novelis UK', npwd: 'PRN-2024-001236' },
    { material: 'Steel', tonnage: 30, target: 85, acquired: 26, coverage: 86.7, reprocessor: 'Tata Steel', npwd: 'PRN-2024-001237' },
    { material: 'Plastic', tonnage: 280, target: 65, acquired: 170, coverage: 60.7, reprocessor: 'Viridor', npwd: 'PRN-2024-001238' },
    { material: 'Wood', tonnage: 95, target: 45, acquired: 43, coverage: 45.3, reprocessor: 'Kronospan', npwd: 'PRN-2024-001239' },
  ];

  const totalTonnage = prnData.reduce((sum, p) => sum + p.tonnage, 0);
  const totalAcquired = prnData.reduce((sum, p) => sum + p.acquired, 0);
  const overallCoverage = ((totalAcquired / totalTonnage) * 100).toFixed(1);
  const belowTarget = prnData.filter(p => p.coverage < p.target).length;

  return (
    <div>
      {/* Header */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: tokens.radius.lg, background: tokens.colors.brand[600] + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="certificate" size={26} color={tokens.colors.brand[600]} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>{t.prn.title}</h2>
            <p style={{ fontSize: '13px', color: tokens.colors.text.muted, margin: '2px 0 0' }}>{t.prn.subtitle}</p>
          </div>
          <Button variant="primary" icon="download">{t.actions.export}</Button>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ background: tokens.colors.cream[300], borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>Total {t.prn.tonnage}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.text.primary }}>{totalTonnage}</div>
          </div>
          <div style={{ background: tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.prn.acquired}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.success.main }}>{totalAcquired}</div>
          </div>
          <div style={{ background: tokens.colors.brand[600] + '15', borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.prn.coverage}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.brand[600] }}>{overallCoverage}%</div>
          </div>
          <div style={{ background: belowTarget > 0 ? tokens.colors.action.light : tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.status.belowTarget}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: belowTarget > 0 ? tokens.colors.action.main : tokens.colors.success.main }}>{belowTarget}</div>
          </div>
        </div>
      </Card>

      {/* Process Steps */}
      <Card style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '16px', textTransform: 'uppercase' }}>PRN Compliance Process</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {processSteps.map((step, idx) => (
            <div key={step.id} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                flex: 1,
                background: step.status === 'verified' ? tokens.colors.success.light : step.status === 'pending' ? tokens.colors.neutral.light : tokens.colors.action.light,
                borderRadius: tokens.radius.md,
                padding: '14px',
                textAlign: 'center',
                border: `2px solid ${step.status === 'verified' ? tokens.colors.success.main : step.status === 'pending' ? tokens.colors.neutral.main : tokens.colors.action.main}`,
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step.status === 'verified' ? tokens.colors.success.main : step.status === 'pending' ? tokens.colors.neutral.main : tokens.colors.action.main, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Icon name={step.icon} size={16} color="#FFF" />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: tokens.colors.text.primary }}>{step.label}</div>
                <div style={{ fontSize: '10px', color: tokens.colors.text.muted, marginTop: '4px' }}>{step.description}</div>
              </div>
              {idx < processSteps.length - 1 && <span style={{ margin: '0 4px' }}><Icon name="arrowRight" size={16} color={tokens.colors.text.muted} /></span>}
            </div>
          ))}
        </div>
      </Card>

      {/* PRN Data Table */}
      <Card>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '16px', textTransform: 'uppercase' }}>PRN {t.prn.coverage} by {t.prn.materialType}</h3>
        <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 100px 100px 80px 1fr 150px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
            <div>{t.prn.materialType}</div>
            <div style={{ textAlign: 'right' }}>{t.prn.tonnage}</div>
            <div style={{ textAlign: 'right' }}>{t.prn.target}</div>
            <div style={{ textAlign: 'right' }}>{t.prn.acquired}</div>
            <div style={{ textAlign: 'right' }}>{t.prn.remaining}</div>
            <div style={{ textAlign: 'right' }}>{t.prn.coverage}</div>
            <div>{t.prn.accreditedReprocessor}</div>
            <div>{t.prn.npwdReference}</div>
          </div>
          {prnData.map((prn, i) => {
            const remaining = Math.round(prn.tonnage * (prn.target / 100)) - prn.acquired;
            const isOnTarget = prn.coverage >= prn.target;
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 100px 100px 80px 1fr 150px', padding: '12px 14px', borderBottom: i < prnData.length - 1 ? `1px solid ${tokens.colors.cream[300]}` : 'none', fontSize: '13px', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, color: tokens.colors.text.primary }}>{prn.material}</div>
                <div style={{ textAlign: 'right' }}>{prn.tonnage}</div>
                <div style={{ textAlign: 'right' }}>{prn.target}%</div>
                <div style={{ textAlign: 'right', fontWeight: 600, color: tokens.colors.success.main }}>{prn.acquired}</div>
                <div style={{ textAlign: 'right', fontWeight: 600, color: remaining > 0 ? tokens.colors.action.main : tokens.colors.success.main }}>{Math.max(0, remaining)}</div>
                <div style={{ textAlign: 'right' }}><Badge variant={isOnTarget ? 'success' : 'action'}>{prn.coverage.toFixed(1)}%</Badge></div>
                <div style={{ color: tokens.colors.text.secondary, fontSize: '12px' }}>{prn.reprocessor}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: tokens.colors.text.muted }}>{prn.npwd}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

// ============================================================================
// COA VERIFICATION VIEW
// ============================================================================

interface COATestResult {
  parameter: string;
  specification: string;
  result: string;
  unit: string;
  passed: boolean;
}

interface COADocument {
  id: string;
  batch: string;
  supplier: string;
  supplierEmail: string;
  supplierContact: string;
  material: string;
  received: string;
  tests: number;
  passed: number;
  status: DocumentStatus;
  testResults: COATestResult[];
}

const COAVerificationView: FC<{ industry: Industry }> = ({ industry }) => {
  const { t, lang } = useLanguage();
  const [selectedCOA, setSelectedCOA] = useState<COADocument | null>(null);
  const [showFailedOnly, setShowFailedOnly] = useState(false);

  // Get process steps from industry configuration (dynamic)
  const processConfig = defaultProcessConfigurations[industry.id];
  const verificationSteps = processConfig.steps.map((step, index) => ({
    id: index + 1,
    key: step.id,
    label: step.label,
    icon: step.icon,
    description: step.description,
    // Simulate status based on step position (first half verified, last steps pending/flagged)
    status: index < processConfig.steps.length - 2 ? 'verified' as const :
            index === processConfig.steps.length - 1 ? 'flagged' as const : 'pending' as const,
  }));

  // Mock COA data with detailed test results
  const coaData: COADocument[] = [
    {
      id: 'COA-2024-0891', batch: 'BATCH-PET-2024-156', supplier: 'Veolia UK', supplierEmail: 'quality@veolia.co.uk', supplierContact: 'John Smith',
      material: 'rPET Flakes', received: '2024-12-15', tests: 8, passed: 8, status: 'verified',
      testResults: [
        { parameter: 'Intrinsic Viscosity', specification: '0.75-0.85 dL/g', result: '0.79', unit: 'dL/g', passed: true },
        { parameter: 'Moisture Content', specification: '< 0.5%', result: '0.3', unit: '%', passed: true },
        { parameter: 'Color (L*)', specification: '> 60', result: '65', unit: '', passed: true },
        { parameter: 'Melting Point', specification: '250-260°C', result: '255', unit: '°C', passed: true },
        { parameter: 'Contamination Level', specification: '< 50 ppm', result: '35', unit: 'ppm', passed: true },
        { parameter: 'PVC Content', specification: '< 10 ppm', result: '5', unit: 'ppm', passed: true },
        { parameter: 'Metal Content', specification: '< 20 ppm', result: '12', unit: 'ppm', passed: true },
        { parameter: 'Bulk Density', specification: '0.35-0.45 g/cm³', result: '0.40', unit: 'g/cm³', passed: true },
      ]
    },
    {
      id: 'COA-2024-0892', batch: 'BATCH-HDPE-2024-089', supplier: 'SUEZ Recycling', supplierEmail: 'compliance@suez.com', supplierContact: 'Marie Dupont',
      material: 'HDPE Pellets', received: '2024-12-14', tests: 6, passed: 5, status: 'flagged',
      testResults: [
        { parameter: 'Melt Flow Index', specification: '0.3-0.5 g/10min', result: '0.42', unit: 'g/10min', passed: true },
        { parameter: 'Density', specification: '0.952-0.965 g/cm³', result: '0.958', unit: 'g/cm³', passed: true },
        { parameter: 'Moisture Content', specification: '< 0.1%', result: '0.15', unit: '%', passed: false },
        { parameter: 'Ash Content', specification: '< 0.5%', result: '0.3', unit: '%', passed: true },
        { parameter: 'Color (b*)', specification: '< 5', result: '3.2', unit: '', passed: true },
        { parameter: 'Tensile Strength', specification: '> 25 MPa', result: '28', unit: 'MPa', passed: true },
      ]
    },
    {
      id: 'COA-2024-0893', batch: 'BATCH-PP-2024-234', supplier: 'Biffa', supplierEmail: 'lab@biffa.co.uk', supplierContact: 'James Wilson',
      material: 'PP Regranulate', received: '2024-12-13', tests: 7, passed: 7, status: 'verified',
      testResults: [
        { parameter: 'Melt Flow Rate', specification: '10-15 g/10min', result: '12', unit: 'g/10min', passed: true },
        { parameter: 'Density', specification: '0.90-0.91 g/cm³', result: '0.905', unit: 'g/cm³', passed: true },
        { parameter: 'Moisture Content', specification: '< 0.1%', result: '0.05', unit: '%', passed: true },
        { parameter: 'Ash Content', specification: '< 1%', result: '0.6', unit: '%', passed: true },
        { parameter: 'Odor Test', specification: 'Pass', result: 'Pass', unit: '', passed: true },
        { parameter: 'Flexural Modulus', specification: '> 1200 MPa', result: '1350', unit: 'MPa', passed: true },
        { parameter: 'Impact Strength', specification: '> 3 kJ/m²', result: '4.2', unit: 'kJ/m²', passed: true },
      ]
    },
    {
      id: 'COA-2024-0894', batch: 'BATCH-PET-2024-157', supplier: 'Veolia UK', supplierEmail: 'quality@veolia.co.uk', supplierContact: 'John Smith',
      material: 'rPET Flakes', received: '2024-12-12', tests: 8, passed: 6, status: 'flagged',
      testResults: [
        { parameter: 'Intrinsic Viscosity', specification: '0.75-0.85 dL/g', result: '0.72', unit: 'dL/g', passed: false },
        { parameter: 'Moisture Content', specification: '< 0.5%', result: '0.4', unit: '%', passed: true },
        { parameter: 'Color (L*)', specification: '> 60', result: '58', unit: '', passed: false },
        { parameter: 'Melting Point', specification: '250-260°C', result: '253', unit: '°C', passed: true },
        { parameter: 'Contamination Level', specification: '< 50 ppm', result: '42', unit: 'ppm', passed: true },
        { parameter: 'PVC Content', specification: '< 10 ppm', result: '8', unit: 'ppm', passed: true },
        { parameter: 'Metal Content', specification: '< 20 ppm', result: '15', unit: 'ppm', passed: true },
        { parameter: 'Bulk Density', specification: '0.35-0.45 g/cm³', result: '0.38', unit: 'g/cm³', passed: true },
      ]
    },
    {
      id: 'COA-2024-0895', batch: 'BATCH-LDPE-2024-045', supplier: 'FCC Environment', supplierEmail: 'qa@fccenvironment.co.uk', supplierContact: 'Sarah Brown',
      material: 'LDPE Film', received: '2024-12-11', tests: 5, passed: 5, status: 'verified',
      testResults: [
        { parameter: 'Melt Flow Index', specification: '1.5-2.5 g/10min', result: '2.0', unit: 'g/10min', passed: true },
        { parameter: 'Density', specification: '0.918-0.923 g/cm³', result: '0.920', unit: 'g/cm³', passed: true },
        { parameter: 'Moisture Content', specification: '< 0.1%', result: '0.08', unit: '%', passed: true },
        { parameter: 'Dart Impact', specification: '> 120 g', result: '145', unit: 'g', passed: true },
        { parameter: 'Haze', specification: '< 15%', result: '12', unit: '%', passed: true },
      ]
    },
    {
      id: 'COA-2024-0896', batch: 'BATCH-PET-2024-158', supplier: 'Viridor', supplierEmail: 'quality.control@viridor.co.uk', supplierContact: 'Emma Taylor',
      material: 'rPET Flakes', received: '2024-12-10', tests: 8, passed: 0, status: 'pending',
      testResults: [
        { parameter: 'Intrinsic Viscosity', specification: '0.75-0.85 dL/g', result: 'Pending', unit: 'dL/g', passed: false },
        { parameter: 'Moisture Content', specification: '< 0.5%', result: 'Pending', unit: '%', passed: false },
        { parameter: 'Color (L*)', specification: '> 60', result: 'Pending', unit: '', passed: false },
        { parameter: 'Melting Point', specification: '250-260°C', result: 'Pending', unit: '°C', passed: false },
        { parameter: 'Contamination Level', specification: '< 50 ppm', result: 'Pending', unit: 'ppm', passed: false },
        { parameter: 'PVC Content', specification: '< 10 ppm', result: 'Pending', unit: 'ppm', passed: false },
        { parameter: 'Metal Content', specification: '< 20 ppm', result: 'Pending', unit: 'ppm', passed: false },
        { parameter: 'Bulk Density', specification: '0.35-0.45 g/cm³', result: 'Pending', unit: 'g/cm³', passed: false },
      ]
    },
  ];

  const totalCOAs = coaData.length;
  const verifiedCOAs = coaData.filter(c => c.status === 'verified').length;
  const flaggedCOAs = coaData.filter(c => c.status === 'flagged').length;
  const totalTests = coaData.reduce((sum, c) => sum + c.tests, 0);
  const passedTests = coaData.reduce((sum, c) => sum + c.passed, 0);
  const failedTests = totalTests - passedTests;
  const errorRate = (((totalTests - passedTests) / totalTests) * 100).toFixed(1);

  // Get all failed tests across all COAs
  const allFailedTests = coaData.flatMap(coa =>
    coa.testResults.filter(t => !t.passed && t.result !== 'Pending').map(test => ({
      ...test,
      coaId: coa.id,
      batch: coa.batch,
      supplier: coa.supplier,
      supplierEmail: coa.supplierEmail,
      supplierContact: coa.supplierContact,
      material: coa.material,
    }))
  );

  // Generate email content
  const generateEmailContent = (coa: COADocument, failedTest?: COATestResult) => {
    const subjectText = lang === 'fr'
      ? `[Action requise] Clarification COA ${coa.id} - ${coa.batch}`
      : `[Action Required] COA Clarification ${coa.id} - ${coa.batch}`;

    const failedTestsList = coa.testResults.filter(t => !t.passed && t.result !== 'Pending');
    const failedTestsText = failedTestsList.map(t =>
      `- ${t.parameter}: ${t.result} ${t.unit} (Spec: ${t.specification})`
    ).join('\n');

    const bodyText = lang === 'fr'
      ? `Bonjour ${coa.supplierContact},

Nous avons identifié des non-conformités dans le Certificat d'Analyse ${coa.id} pour le lot ${coa.batch} (${coa.material}).

Tests non conformes:
${failedTestsText}

Pourriez-vous nous fournir des informations complémentaires concernant ces écarts ?

Actions demandées:
1. Confirmer les valeurs mesurées
2. Expliquer les causes possibles de l'écart
3. Proposer des actions correctives si nécessaire

Merci de votre retour rapide.

Cordialement,
Équipe Qualité eco2Veritas`
      : `Dear ${coa.supplierContact},

We have identified non-conformities in Certificate of Analysis ${coa.id} for batch ${coa.batch} (${coa.material}).

Failed tests:
${failedTestsText}

Could you please provide additional information regarding these discrepancies?

Actions requested:
1. Confirm the measured values
2. Explain possible causes of the deviation
3. Propose corrective actions if necessary

Thank you for your prompt response.

Best regards,
eco2Veritas Quality Team`;

    return `mailto:${coa.supplierEmail}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  };

  return (
    <div>
      {/* Header */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: tokens.radius.lg, background: tokens.colors.brand[600] + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="document" size={26} color={tokens.colors.brand[600]} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>{t.coa.title}</h2>
            <p style={{ fontSize: '13px', color: tokens.colors.text.muted, margin: '2px 0 0' }}>{t.coa.subtitle}</p>
          </div>
          <Button variant="secondary" icon="upload">{t.actions.upload} COA</Button>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          <div style={{ background: tokens.colors.cream[300], borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>Total COAs</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.text.primary }}>{totalCOAs}</div>
          </div>
          <div style={{ background: tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.status.verified}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.success.main }}>{verifiedCOAs}</div>
          </div>
          <div
            onClick={() => setShowFailedOnly(!showFailedOnly)}
            style={{
              background: tokens.colors.action.light,
              borderRadius: tokens.radius.md,
              padding: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              border: showFailedOnly ? `2px solid ${tokens.colors.action.main}` : '2px solid transparent',
              transition: 'all 150ms ease',
            }}
          >
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.coa.failedTests}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.action.main }}>{flaggedCOAs}</div>
            <div style={{ fontSize: '10px', color: tokens.colors.action.main, marginTop: '4px', fontWeight: 600 }}>
              {showFailedOnly ? (lang === 'fr' ? '✓ Filtre actif' : '✓ Filter active') : (lang === 'fr' ? 'Cliquer pour filtrer' : 'Click to filter')}
            </div>
          </div>
          <div style={{ background: tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.coa.passedTests}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.success.main }}>{passedTests}/{totalTests}</div>
          </div>
          <div style={{ background: parseFloat(errorRate) > 5 ? tokens.colors.action.light : tokens.colors.neutral.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.coa.errorRate}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: parseFloat(errorRate) > 5 ? tokens.colors.action.main : tokens.colors.neutral.main }}>{errorRate}%</div>
          </div>
        </div>
      </Card>

      {/* Failed Tests Detail Panel - Shown when filter is active */}
      {showFailedOnly && allFailedTests.length > 0 && (
        <Card style={{ marginBottom: '20px', borderLeft: `4px solid ${tokens.colors.action.main}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.colors.action.main, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="alertTriangle" size={20} color={tokens.colors.action.main} />
              {lang === 'fr' ? 'Tests échoués nécessitant une action' : 'Failed Tests Requiring Action'} ({allFailedTests.length})
            </h3>
            <button onClick={() => setShowFailedOnly(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <Icon name="xCircle" size={20} color={tokens.colors.text.muted} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {allFailedTests.map((test, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '14px',
                background: tokens.colors.cream[100],
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.colors.cream[400]}`,
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: tokens.radius.md, background: tokens.colors.action.light, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="xCircle" size={20} color={tokens.colors.action.main} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: tokens.colors.text.primary }}>{test.parameter}</span>
                    <Badge variant="action">{test.coaId}</Badge>
                  </div>
                  <div style={{ fontSize: '12px', color: tokens.colors.text.secondary, marginBottom: '4px' }}>
                    <strong>{lang === 'fr' ? 'Résultat' : 'Result'}:</strong> <span style={{ color: tokens.colors.action.main, fontWeight: 600 }}>{test.result} {test.unit}</span>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <strong>Spec:</strong> {test.specification}
                  </div>
                  <div style={{ fontSize: '11px', color: tokens.colors.text.muted }}>
                    {test.material} • {test.batch} • {test.supplier}
                  </div>
                </div>
                <a
                  href={generateEmailContent(coaData.find(c => c.id === test.coaId)!, test)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    background: tokens.colors.brand[600],
                    color: '#FFF',
                    borderRadius: tokens.radius.md,
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  <Icon name="document" size={14} color="#FFF" />
                  {lang === 'fr' ? 'Contacter' : 'Contact'}
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Verification Process */}
      <Card style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '16px', textTransform: 'uppercase' }}>COA Verification Process</h3>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {verificationSteps.map((step, idx) => (
            <div key={step.id} style={{ flex: 1, minWidth: '100px', display: 'flex', alignItems: 'center' }}>
              <div style={{
                flex: 1,
                background: step.status === 'verified' ? tokens.colors.success.light : step.status === 'pending' ? tokens.colors.neutral.light : tokens.colors.action.light,
                borderRadius: tokens.radius.md,
                padding: '12px 8px',
                textAlign: 'center',
                border: `2px solid ${step.status === 'verified' ? tokens.colors.success.main : step.status === 'pending' ? tokens.colors.neutral.main : tokens.colors.action.main}`,
              }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step.status === 'verified' ? tokens.colors.success.main : step.status === 'pending' ? tokens.colors.neutral.main : tokens.colors.action.main, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                  <Icon name={step.icon} size={14} color="#FFF" />
                </div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: tokens.colors.text.primary }}>{step.label}</div>
              </div>
              {idx < verificationSteps.length - 1 && <span style={{ margin: '0 2px', flexShrink: 0 }}><Icon name="arrowRight" size={12} color={tokens.colors.text.muted} /></span>}
            </div>
          ))}
        </div>
      </Card>

      {/* COA Table */}
      <Card>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '16px', textTransform: 'uppercase' }}>
          {showFailedOnly ? (lang === 'fr' ? 'COAs avec tests échoués' : 'COAs with Failed Tests') : (lang === 'fr' ? 'Documents COA récents' : 'Recent COA Documents')}
        </h3>
        <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '130px 160px 1fr 120px 100px 100px 100px 100px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
            <div>COA ID</div>
            <div>{t.coa.batchNumber}</div>
            <div>Supplier</div>
            <div>{t.common.material}</div>
            <div>{t.common.date}</div>
            <div style={{ textAlign: 'center' }}>Tests</div>
            <div style={{ textAlign: 'center' }}>{t.coa.result}</div>
            <div style={{ textAlign: 'center' }}>{t.common.status}</div>
          </div>
          {coaData
            .filter(coa => !showFailedOnly || coa.status === 'flagged')
            .map((coa, i) => (
            <div
              key={i}
              onClick={() => setSelectedCOA(coa)}
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 160px 1fr 120px 100px 100px 100px 100px',
                padding: '12px 14px',
                borderBottom: `1px solid ${tokens.colors.cream[300]}`,
                fontSize: '13px',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 150ms ease',
                background: coa.status === 'flagged' ? tokens.colors.action.light + '30' : 'transparent',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: tokens.colors.brand[600], fontWeight: 600 }}>{coa.id}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: tokens.colors.text.muted }}>{coa.batch}</div>
              <div style={{ fontWeight: 500, color: tokens.colors.text.primary }}>{coa.supplier}</div>
              <div style={{ color: tokens.colors.text.secondary }}>{coa.material}</div>
              <div style={{ color: tokens.colors.text.muted }}>{coa.received}</div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontWeight: 600, color: coa.passed === coa.tests ? tokens.colors.success.main : tokens.colors.action.main }}>{coa.passed}</span>
                <span style={{ color: tokens.colors.text.muted }}>/{coa.tests}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', height: '6px', background: tokens.colors.cream[400], borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(coa.passed / coa.tests) * 100}%`, background: coa.passed === coa.tests ? tokens.colors.success.main : tokens.colors.action.main }} />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}><StatusBadge status={coa.status} /></div>
            </div>
          ))}
        </div>
      </Card>

      {/* COA Detail Modal */}
      {selectedCOA && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setSelectedCOA(null)}>
          <div style={{
            background: tokens.colors.cream[50],
            borderRadius: tokens.radius.xl,
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
          }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${tokens.colors.cream[400]}`,
              background: selectedCOA.status === 'flagged' ? tokens.colors.action.light : tokens.colors.success.light,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>
                      {selectedCOA.id}
                    </h2>
                    <StatusBadge status={selectedCOA.status} />
                  </div>
                  <div style={{ fontSize: '13px', color: tokens.colors.text.secondary }}>
                    {selectedCOA.batch} • {selectedCOA.material} • {selectedCOA.supplier}
                  </div>
                </div>
                <button onClick={() => setSelectedCOA(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <Icon name="xCircle" size={24} color={tokens.colors.text.secondary} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px' }}>
              {/* Test Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: tokens.colors.cream[200], borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>Total Tests</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary }}>{selectedCOA.tests}</div>
                </div>
                <div style={{ background: tokens.colors.success.light, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>{t.coa.passedTests}</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.success.main }}>{selectedCOA.passed}</div>
                </div>
                <div style={{ background: tokens.colors.action.light, borderRadius: tokens.radius.md, padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '4px' }}>{t.coa.failedTests}</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.action.main }}>{selectedCOA.tests - selectedCOA.passed}</div>
                </div>
              </div>

              {/* Test Results Table */}
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.secondary, marginBottom: '12px', textTransform: 'uppercase' }}>
                {lang === 'fr' ? 'Résultats des tests' : 'Test Results'}
              </h4>
              <div style={{ background: tokens.colors.cream[100], borderRadius: tokens.radius.md, overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 120px 80px', padding: '10px 14px', background: tokens.colors.cream[300], fontSize: '11px', fontWeight: 600, color: tokens.colors.text.secondary }}>
                  <div>{t.coa.testParameter}</div>
                  <div>{t.coa.specification}</div>
                  <div>{t.coa.result}</div>
                  <div style={{ textAlign: 'center' }}>{t.common.status}</div>
                </div>
                {selectedCOA.testResults.map((test, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 150px 120px 80px',
                    padding: '12px 14px',
                    borderBottom: i < selectedCOA.testResults.length - 1 ? `1px solid ${tokens.colors.cream[300]}` : 'none',
                    background: !test.passed ? tokens.colors.action.light + '30' : 'transparent',
                  }}>
                    <div style={{ fontWeight: 500, color: tokens.colors.text.primary }}>{test.parameter}</div>
                    <div style={{ color: tokens.colors.text.muted, fontSize: '12px' }}>{test.specification}</div>
                    <div style={{ fontWeight: 600, color: test.passed ? tokens.colors.success.main : tokens.colors.action.main }}>
                      {test.result} {test.unit}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Icon name={test.passed ? 'checkCircle' : 'xCircle'} size={18} color={test.passed ? tokens.colors.success.main : tokens.colors.action.main} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Supplier Contact Info & Actions */}
              {selectedCOA.status === 'flagged' && (
                <div style={{
                  background: tokens.colors.cream[200],
                  borderRadius: tokens.radius.md,
                  padding: '16px',
                  border: `1px solid ${tokens.colors.cream[400]}`,
                }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.primary, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="complianceOfficer" size={18} color={tokens.colors.brand[600]} />
                    {lang === 'fr' ? 'Contact fournisseur' : 'Supplier Contact'}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.primary }}>{selectedCOA.supplierContact}</div>
                      <div style={{ fontSize: '13px', color: tokens.colors.text.secondary }}>{selectedCOA.supplier}</div>
                      <div style={{ fontSize: '12px', color: tokens.colors.brand[600] }}>{selectedCOA.supplierEmail}</div>
                    </div>
                    <a
                      href={generateEmailContent(selectedCOA)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        background: tokens.colors.brand[600],
                        color: '#FFF',
                        borderRadius: tokens.radius.md,
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      <Icon name="document" size={18} color="#FFF" />
                      {lang === 'fr' ? 'Demander des informations' : 'Request Information'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ERRORS & MISSING ITEMS VIEW
// ============================================================================

const ErrorsTrackingView: FC<{ industry: Industry }> = ({ industry }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'missing'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  // Mock error data
  const errorsData = [
    { id: 1, type: 'critical', icon: 'xCircle', title: 'COA Test Failure', description: 'Moisture content exceeds specification (5.2% vs 4.0% max)', item: 'BATCH-HDPE-2024-089', date: '2024-12-14', resolved: false },
    { id: 2, type: 'critical', icon: 'xCircle', title: 'PRN Coverage Gap', description: 'Plastic PRN coverage below target (60.7% vs 65% target)', item: 'PRN-Plastic-2024', date: '2024-12-13', resolved: false },
    { id: 3, type: 'warning', icon: 'alertTriangle', title: 'Certificate Expiring', description: 'ISCC+ certificate expires in 15 days', item: 'CERT-ISCC-2024-045', date: '2024-12-12', resolved: false },
    { id: 4, type: 'missing', icon: 'document', title: 'Missing Document', description: 'Weighbridge ticket not uploaded for delivery', item: 'DEL-2024-1892', date: '2024-12-11', resolved: false },
    { id: 5, type: 'missing', icon: 'document', title: 'Missing COA', description: 'Certificate of Analysis pending from supplier', item: 'BATCH-PET-2024-158', date: '2024-12-10', resolved: false },
    { id: 6, type: 'warning', icon: 'alertTriangle', title: 'Data Inconsistency', description: 'Input/output weight variance exceeds 3% threshold', item: 'FLOW-2024-0234', date: '2024-12-09', resolved: true },
    { id: 7, type: 'critical', icon: 'xCircle', title: 'Accreditation Expired', description: 'Reprocessor accreditation needs renewal', item: 'SUPP-Biffa-001', date: '2024-12-08', resolved: true },
    { id: 8, type: 'missing', icon: 'document', title: 'Missing Signature', description: 'Authorization signature required on COA', item: 'COA-2024-0894', date: '2024-12-07', resolved: false },
  ];

  const filteredErrors = errorsData.filter(e => {
    if (filter !== 'all' && e.type !== filter) return false;
    if (statusFilter === 'unresolved' && e.resolved) return false;
    if (statusFilter === 'resolved' && !e.resolved) return false;
    return true;
  });

  const criticalCount = errorsData.filter(e => e.type === 'critical' && !e.resolved).length;
  const warningCount = errorsData.filter(e => e.type === 'warning' && !e.resolved).length;
  const missingCount = errorsData.filter(e => e.type === 'missing' && !e.resolved).length;
  const totalUnresolved = errorsData.filter(e => !e.resolved).length;

  return (
    <div>
      {/* Header */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: tokens.radius.lg, background: tokens.colors.action.light, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="alertTriangle" size={26} color={tokens.colors.action.main} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: tokens.colors.text.primary, margin: 0 }}>{t.errors.title}</h2>
            <p style={{ fontSize: '13px', color: tokens.colors.text.muted, margin: '2px 0 0' }}>{t.errors.subtitle}</p>
          </div>
          <Button variant="secondary" icon="download">{t.actions.export}</Button>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ background: tokens.colors.cream[300], borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center', cursor: 'pointer', border: filter === 'all' ? `2px solid ${tokens.colors.brand[600]}` : '2px solid transparent' }} onClick={() => setFilter('all')}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.errors.totalErrors}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.text.primary }}>{totalUnresolved}</div>
          </div>
          <div style={{ background: tokens.colors.action.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center', cursor: 'pointer', border: filter === 'critical' ? `2px solid ${tokens.colors.action.main}` : '2px solid transparent' }} onClick={() => setFilter('critical')}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.errors.criticalErrors}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.action.main }}>{criticalCount}</div>
          </div>
          <div style={{ background: tokens.colors.neutral.light, borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center', cursor: 'pointer', border: filter === 'warning' ? `2px solid ${tokens.colors.neutral.main}` : '2px solid transparent' }} onClick={() => setFilter('warning')}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.errors.warnings}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.neutral.main }}>{warningCount}</div>
          </div>
          <div style={{ background: tokens.colors.brand[600] + '15', borderRadius: tokens.radius.md, padding: '16px', textAlign: 'center', cursor: 'pointer', border: filter === 'missing' ? `2px solid ${tokens.colors.brand[600]}` : '2px solid transparent' }} onClick={() => setFilter('missing')}>
            <div style={{ fontSize: '10px', color: tokens.colors.text.muted, textTransform: 'uppercase', marginBottom: '6px' }}>{t.errors.missingDocs}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: tokens.colors.brand[600] }}>{missingCount}</div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card style={{ marginBottom: '20px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: tokens.colors.text.secondary }}>{t.errors.filterByStatus}:</span>
            {(['all', 'unresolved', 'resolved'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: '6px 12px', border: 'none', borderRadius: tokens.radius.sm, fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                background: statusFilter === s ? tokens.colors.brand[600] : tokens.colors.cream[300],
                color: statusFilter === s ? '#FFF' : tokens.colors.text.secondary,
              }}>
                {t.errors[s]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Errors List */}
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredErrors.map(error => (
            <div key={error.id} style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px',
              background: error.resolved ? tokens.colors.cream[200] : error.type === 'critical' ? tokens.colors.action.light : error.type === 'warning' ? tokens.colors.neutral.light : tokens.colors.brand[600] + '10',
              borderRadius: tokens.radius.md,
              borderLeft: `4px solid ${error.type === 'critical' ? tokens.colors.action.main : error.type === 'warning' ? tokens.colors.neutral.main : tokens.colors.brand[600]}`,
              opacity: error.resolved ? 0.6 : 1,
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: tokens.radius.md, background: error.type === 'critical' ? tokens.colors.action.main : error.type === 'warning' ? tokens.colors.neutral.main : tokens.colors.brand[600], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={error.icon} size={18} color="#FFF" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: tokens.colors.text.primary }}>{error.title}</span>
                  {error.resolved && <Badge variant="success">{t.errors.resolved}</Badge>}
                </div>
                <div style={{ fontSize: '12px', color: tokens.colors.text.secondary, marginBottom: '4px' }}>{error.description}</div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: tokens.colors.text.muted }}>
                  <span><strong>{t.errors.affectedItem}:</strong> {error.item}</span>
                  <span><strong>{t.errors.detectedDate}:</strong> {error.date}</span>
                </div>
              </div>
              {!error.resolved && (
                <Button variant="primary" size="sm">{t.errors.markResolved}</Button>
              )}
            </div>
          ))}
          {filteredErrors.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: tokens.colors.text.muted }}>
              <Icon name="checkCircle" size={48} color={tokens.colors.success.main} />
              <p style={{ marginTop: '12px', fontSize: '14px' }}>No errors matching the selected filters</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// ============================================================================
// SIDEBAR
// ============================================================================

const Sidebar: FC<{ industry: Industry; persona: Persona; collapsed: boolean; activeTab: string; onTabChange: (tab: string) => void }> = ({ industry, persona, collapsed, activeTab, onTabChange }) => {
  const { t } = useLanguage();
  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: 'home' },
    { id: 'processconfig', label: t.nav.processConfig, icon: 'workflow' },
    { id: 'flows', label: `${industry.terminology.input}s`, icon: 'flows' },
    { id: 'documents', label: t.nav.documents, icon: 'document' },
    { id: 'prn', label: t.nav.prn, icon: 'certificate' },
    { id: 'coa', label: t.nav.coa, icon: 'document' },
    { id: 'errors', label: t.nav.errors, icon: 'alertTriangle' },
    { id: 'certificates', label: t.nav.certificates, icon: 'trophy' },
    { id: 'massbalance', label: t.nav.massBalance, icon: 'scale' },
    { id: 'reports', label: t.nav.reports, icon: 'reports' },
  ];
  
  return (
    <aside style={{
      width: collapsed ? '72px' : '260px',
      background: `linear-gradient(180deg, ${tokens.colors.brand[800]} 0%, ${tokens.colors.brand[600]} 100%)`,
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

// Language Selector Component
const LanguageSelector: FC = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: tokens.colors.cream[300], borderRadius: tokens.radius.md, padding: '4px' }}>
      <button
        onClick={() => setLang('en')}
        style={{
          padding: '6px 10px',
          border: 'none',
          borderRadius: tokens.radius.sm,
          background: lang === 'en' ? tokens.colors.brand[600] : 'transparent',
          color: lang === 'en' ? '#FFF' : tokens.colors.text.secondary,
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLang('fr')}
        style={{
          padding: '6px 10px',
          border: 'none',
          borderRadius: tokens.radius.sm,
          background: lang === 'fr' ? tokens.colors.brand[600] : 'transparent',
          color: lang === 'fr' ? '#FFF' : tokens.colors.text.secondary,
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        FR
      </button>
    </div>
  );
};

const Header: FC<{ industry: Industry; persona: Persona; onMenuClick: () => void }> = ({ industry, persona, onMenuClick }) => {
  const { t } = useLanguage();
  return (
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
          {industry.regulations.slice(0, 3).map(reg => <Badge key={reg} variant="neutral">{reg}</Badge>)}
        </div>
        <LanguageSelector />
        <button style={{ position: 'relative', background: tokens.colors.cream[300], border: 'none', padding: '9px', borderRadius: tokens.radius.md, cursor: 'pointer' }}>
          <Icon name="bell" size={18} color={tokens.colors.text.secondary} />
          <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: tokens.colors.action.main }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 12px 5px 5px', background: tokens.colors.cream[300], borderRadius: tokens.radius.full }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: tokens.colors.brand[600], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={persona.icon} size={16} color="#FFF" />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500, color: tokens.colors.text.primary }}>{persona.title}</span>
        </div>
      </div>
    </header>
  );
};

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
  const [lang, setLang] = useState<Language>('en'); // Default to English

  const industry = industries[industryId];
  const persona = personas[personaId];
  const mockData = useMemo(() => generateMockData(industry), [industry]);
  const t = translations[lang];

  const kpiValues: Record<string, number> = {
    // Tyval Tire EPR
    collectionVolume: 2450, reuseRate: 18.5, punrStock: 3200, valorizationRate: 97.2,
    // Chemical recycling
    massBalanceAccuracy: 99.1, pyoilOutput: 38.4, feedstockVerified: 94.5, wasteRate: 13.2,
    // Packaging PRN
    prnCoverage: 92, coaErrorRate: 9, yield: 87.5, infeedMapped: 78,
    // Fridge WEEE take-back
    unitsCollected: 3521, recycledWeight: 87.5, verificationRate: 98.2, manufacturerTally: 1250,
    // Plastics
    throughput: 1850, purityLevel: 98.7, traceabilityCoverage: 89, customerCompliance: 100,
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
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
                  {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'processconfig' ? 'Configuration Processus' : activeTab === 'flows' ? `${industry.terminology.input} Flows` : activeTab === 'documents' ? 'Document Processing' : activeTab === 'certificates' ? `${industry.terminology.certificate}s` : activeTab === 'massbalance' ? 'Mass Balance' : 'Reports'}
                </h1>
                <p style={{ fontSize: '14px', color: tokens.colors.text.muted, margin: 0 }}>{industry.terminology.compliance} • {persona.title} View</p>
              </div>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${industry.kpis.length}, 1fr)`, gap: '16px', marginBottom: '24px' }}>
                {industry.kpis.map(kpi => {
                  // Map KPI keys to navigation targets
                  const kpiNavigation: Record<string, { tab: string; label: string }> = {
                    prnCoverage: { tab: 'prn', label: t.nav.prn },
                    coaErrorRate: { tab: 'coa', label: t.nav.coa },
                  };
                  const nav = kpiNavigation[kpi.key];
                  return (
                    <KPICard
                      key={kpi.key}
                      label={kpi.label}
                      value={kpiValues[kpi.key] || 0}
                      unit={kpi.unit}
                      target={kpi.target}
                      industry={industry}
                      onClick={nav ? () => setActiveTab(nav.tab) : undefined}
                      linkLabel={nav ? nav.label : undefined}
                    />
                  );
                })}
              </div>
              <div style={{ marginBottom: '24px' }}><ProcessPipeline industry={industry} flows={mockData.flows} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <DocumentProcessingView industry={industry} flows={mockData.flows} />
                <CertificateTracking industry={industry} />
              </div>
              <MassBalanceView industry={industry} />
            </>
          )}

          {activeTab === 'processconfig' && <ProcessFlowEditor industry={industry} onNavigate={setActiveTab} />}
          {activeTab === 'flows' && <MaterialFlowsTable industry={industry} flows={mockData.flows} />}
          {activeTab === 'documents' && <DocumentProcessingView industry={industry} flows={mockData.flows} />}
          {activeTab === 'prn' && <PRNManagementView industry={industry} />}
          {activeTab === 'coa' && <COAVerificationView industry={industry} />}
          {activeTab === 'errors' && <ErrorsTrackingView industry={industry} />}
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
    </LanguageContext.Provider>
  );
};

export default App;
