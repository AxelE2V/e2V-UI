// ============================================================================
// eco₂Veritas - Type Definitions
// ============================================================================

// Language & i18n
export type Language = 'en' | 'fr';

export interface Translations {
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
  demo: {
    switchIndustry: string;
  };
  language: {
    select: string;
    english: string;
    french: string;
  };
}

// Industry types
export type IndustryId = 'tire_epo' | 'chemical_recycling' | 'packaging_prn' | 'weee_collection' | 'plastics_mechanical';

export type ProcessStep =
  | 'collection' | 'reception' | 'processing' | 'output' | 'certification'
  | 'coa_verification' | 'prn_management';

export interface Industry {
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

// Persona types
export type PersonaId = 'compliance_officer' | 'operations_manager' | 'site_operator';

export interface Persona {
  id: PersonaId;
  title: string;
  icon: string;
  focus: string[];
  dashboardLayout: string[];
}

// Evidence & Process Configuration
export type EvidenceType = 'document' | 'photo' | 'iot' | 'manual' | 'signature' | 'geolocation';

export interface EvidenceRequirement {
  id: string;
  name: string;
  type: EvidenceType;
  description: string;
  required: boolean;
  acceptedFormats?: string[];
  extractionFields?: { id: string; name: string; type: string; required: boolean }[];
  verificationCriteria?: { id: string; rule: string; severity: 'error' | 'warning' }[];
}

export interface ProcessStepConfig {
  id: ProcessStep;
  label: string;
  icon: string;
  description: string;
  evidenceRequirements: EvidenceRequirement[];
  outputs: string[];
  predecessors: ProcessStep[];
  estimatedDuration: string;
  responsibleRole: string;
}

export interface ProcessConfiguration {
  industryId: IndustryId;
  name: string;
  version: string;
  lastModified: string;
  steps: ProcessStepConfig[];
}

// Process Definition for multi-process support
export interface ProcessDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  navTab?: string;
  steps: {
    id: string;
    label: string;
    icon: string;
    description: string;
    status: 'verified' | 'pending' | 'flagged';
  }[];
}

// Document status
export type DocumentStatus = 'verified' | 'pending' | 'flagged' | 'missing';

// Material Flow types
export interface MaterialFlow {
  id: string;
  date: string;
  source: string;
  material: string;
  quantity: number;
  unit: string;
  status: DocumentStatus;
  documents: { type: string; status: string }[];
  certificate?: string;
  step?: ProcessStep;
}

// Chat Message for AI Agent
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  navigationAction?: { tab: string; label: string };
}

// Navigation item
export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
