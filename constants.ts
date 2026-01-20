import { CertificationPhaseStatus, HapiPillar, HapiScore, BusinessKpi, CertificationPhase, SurveyQuestion, DocumentType, PolicyDocument } from './types';

// Datos simulados del Modelo HAPI (Drill-down data)
export const MOCK_HAPI_DATA: HapiScore[] = [
  {
    pillar: HapiPillar.HUMANIDAD,
    rawScore: 5.5,
    normalizedScore: 7.5,
    dimensions: [
      { name: 'Resiliencia', score: 7.2 },
      { name: 'Optimismo', score: 6.8 },
      { name: 'Salud', score: 8.5 }
    ]
  },
  {
    pillar: HapiPillar.AMABILIDAD,
    rawScore: 6.1,
    normalizedScore: 8.5,
    dimensions: [
      { name: 'Prosocialidad', score: 8.1 },
      { name: 'Empatía', score: 8.9 },
      { name: 'Confianza', score: 8.5 }
    ]
  },
  {
    pillar: HapiPillar.PROPOSITO,
    rawScore: 4.8,
    normalizedScore: 6.3,
    dimensions: [
      { name: 'Significado', score: 6.0 },
      { name: 'Contribución', score: 6.6 }
    ]
  },
  {
    pillar: HapiPillar.IMPLICACION,
    rawScore: 5.2,
    normalizedScore: 7.0,
    dimensions: [
      { name: 'Compromiso', score: 7.2 },
      { name: 'Flow', score: 6.8 }
    ]
  }
];

// Datos históricos para ROI (Incluye Absentismo según PRD)
export const MOCK_ROI_DATA: BusinessKpi[] = [
  { month: 'Ene', turnoverRate: 12, absenteeismRate: 8.5, productivityIndex: 75, happinessIndex: 6.2 },
  { month: 'Feb', turnoverRate: 11, absenteeismRate: 8.2, productivityIndex: 76, happinessIndex: 6.4 },
  { month: 'Mar', turnoverRate: 10, absenteeismRate: 7.5, productivityIndex: 78, happinessIndex: 6.8 },
  { month: 'Abr', turnoverRate: 9, absenteeismRate: 6.1, productivityIndex: 82, happinessIndex: 7.2 },
  { month: 'May', turnoverRate: 6, absenteeismRate: 4.5, productivityIndex: 85, happinessIndex: 7.8 },
  { month: 'Jun', turnoverRate: 4, absenteeismRate: 3.2, productivityIndex: 90, happinessIndex: 8.5 },
];

// Documentos requeridos (Sección 3.3.3 PRD)
export const MOCK_DOCUMENTS: PolicyDocument[] = [
  { id: '1', title: 'Política de Prevención de Riesgos Psicosociales', type: DocumentType.POLICY, version: 'v2.1', lastUpdated: '2024-01-15', status: 'VIGENTE', size: '2.4 MB' },
  { id: '2', title: 'Política de Promoción de Trabajo Saludable', type: DocumentType.POLICY, version: 'v1.0', lastUpdated: '2023-11-20', status: 'VIGENTE', size: '1.8 MB' },
  { id: '3', title: 'Política de Intervención de Riesgos', type: DocumentType.POLICY, version: 'v1.2', lastUpdated: '2024-02-10', status: 'VIGENTE', size: '3.1 MB' },
  { id: '4', title: 'Minuta Comité Bienestar - Q1 2024', type: DocumentType.EVIDENCE, version: '-', lastUpdated: '2024-03-30', status: 'VIGENTE', size: '0.5 MB' },
  { id: '5', title: 'Evidencia Fotográfica - Workshop Liderazgo', type: DocumentType.EVIDENCE, version: '-', lastUpdated: '2024-02-28', status: 'VIGENTE', size: '15.2 MB' },
  { id: '6', title: 'Listas de Asistencia - Capacitación NOM-035', type: DocumentType.EVIDENCE, version: '-', lastUpdated: '2024-01-20', status: 'VIGENTE', size: '1.2 MB' },
];

// Fases de Certificación con tareas SIGEEF
export const CERTIFICATION_STEPS: CertificationPhase[] = [
  {
    id: 1,
    title: 'Recopilación y Análisis',
    description: 'Lanzamiento de encuestas NOM-035 y HAPI.',
    status: CertificationPhaseStatus.COMPLETED,
    tasks: [
      { id: 't1', name: 'Cargar nómina de empleados', completed: true },
      { id: 't2', name: 'Lanzar encuesta NOM-035', completed: true },
      { id: 't3', name: 'Alcanzar 80% de participación', completed: true }
    ]
  },
  {
    id: 2,
    title: 'Diagnóstico General',
    description: 'Interpretación de resultados y detección de riesgos.',
    status: CertificationPhaseStatus.COMPLETED,
    tasks: [
      { id: 't4', name: 'Revisión de dashboard de resultados', completed: true },
      { id: 't5', name: 'Identificación de áreas rojas', completed: true }
    ]
  },
  {
    id: 3,
    title: 'Metodología HAPI',
    description: 'Capacitación a líderes y embajadores de bienestar.',
    status: CertificationPhaseStatus.IN_PROGRESS,
    tasks: [
      { id: 't6', name: 'Workshop de liderazgo positivo', completed: true },
      { id: 't7', name: 'Selección de embajadores', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Plan de Bienestar (SIGEEF)',
    description: 'Gestión SIGEEF: Planeación, Asignación y Seguimiento.',
    status: CertificationPhaseStatus.LOCKED,
    tasks: [
      { id: 't8', name: 'SIGEEF: Planeación Estratégica Anual', completed: false },
      { id: 't9', name: 'SIGEEF: Asignación de Recursos y Presupuesto', completed: false },
      { id: 't9b', name: 'SIGEEF: Definición de KPIs de Seguimiento', completed: false }
    ]
  },
  {
    id: 5,
    title: 'Auditoría Interna',
    description: 'Validación de evidencias por consultor POSITIVALA.',
    status: CertificationPhaseStatus.LOCKED,
    tasks: [
      { id: 't10', name: 'Subir evidencias documentales al repositorio', completed: false },
      { id: 't11', name: 'Entrevista con auditor', completed: false }
    ]
  }
];

// Preguntas de Encuesta Demo
export const DEMO_QUESTIONS: SurveyQuestion[] = [
  { id: 1, text: "En mi trabajo, siento que lo que hago tiene un propósito claro.", category: HapiPillar.PROPOSITO },
  { id: 2, text: "Mis compañeros muestran interés genuino por mi bienestar.", category: HapiPillar.AMABILIDAD },
  { id: 3, text: "Tengo las herramientas necesarias para manejar el estrés laboral.", category: HapiPillar.HUMANIDAD },
  { id: 4, text: "Me siento totalmente absorto en mis tareas (Estado de Flow).", category: HapiPillar.IMPLICACION },
];