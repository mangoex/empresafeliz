// Definición de Roles
export enum UserRole {
  ADMIN = 'ADMIN',       // Gestor de Bienestar
  EMPLOYEE = 'EMPLOYEE', // Colaborador
  AUDITOR = 'AUDITOR'    // Consultor POSITIVALA
}

// Estructura de Datos para el Modelo HAPI
export enum HapiPillar {
  HUMANIDAD = 'Humanidad',
  AMABILIDAD = 'Amabilidad',
  PROPOSITO = 'Propósito',
  IMPLICACION = 'Implicación'
}

export interface HapiScore {
  pillar: HapiPillar;
  rawScore: number; // 1-7 (Preserved for statistical analysis)
  normalizedScore: number; // 0-10 (For visualization)
  dimensions: { name: string; score: number }[];
}

// Estructura para el Workflow de Certificación
export enum CertificationPhaseStatus {
  LOCKED = 'LOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REVIEW_PENDING = 'REVIEW_PENDING'
}

export interface CertificationPhase {
  id: number;
  title: string;
  description: string;
  status: CertificationPhaseStatus;
  tasks: { id: string; name: string; completed: boolean }[];
}

// Datos de ROI (Actualizado con KPIs del PRD)
export interface BusinessKpi {
  month: string;
  turnoverRate: number;    // % Rotación (KPI Crítico)
  absenteeismRate: number; // % Absentismo (KPI Crítico)
  productivityIndex: number; // 0-100
  happinessIndex: number;  // 0-10 HAPI Average
}

// Gestión Documental (SIGEEF)
export enum DocumentType {
  POLICY = 'POLITICA', // Normativas (Prevención, Promoción, etc)
  EVIDENCE = 'EVIDENCIA' // Minutas, Fotos, Listas
}

export interface PolicyDocument {
  id: string;
  title: string;
  type: DocumentType;
  version: string;
  lastUpdated: string;
  status: 'VIGENTE' | 'OBSOLETO' | 'PENDIENTE';
  size: string;
}

// Encuesta
export interface SurveyQuestion {
  id: number;
  text: string;
  category: HapiPillar;
}