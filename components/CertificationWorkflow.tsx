import React from 'react';
import { CertificationPhase, CertificationPhaseStatus } from '../types';
import { CheckCircle2, Circle, Lock, ArrowRight, Upload, AlertCircle } from 'lucide-react';

interface Props {
  steps: CertificationPhase[];
}

const CertificationWorkflow: React.FC<Props> = ({ steps }) => {
  const [activeStep, setActiveStep] = React.useState<number>(3); // Demo defaults to step 3 active

  const getStatusIcon = (status: CertificationPhaseStatus) => {
    switch(status) {
      case CertificationPhaseStatus.COMPLETED:
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case CertificationPhaseStatus.IN_PROGRESS:
        return <div className="w-6 h-6 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />;
      case CertificationPhaseStatus.LOCKED:
        return <Lock className="w-6 h-6 text-slate-300" />;
      default:
        return <Circle className="w-6 h-6 text-slate-300" />;
    }
  };

  const getStatusColor = (status: CertificationPhaseStatus) => {
    switch(status) {
      case CertificationPhaseStatus.COMPLETED: return 'bg-emerald-50 border-emerald-200';
      case CertificationPhaseStatus.IN_PROGRESS: return 'bg-white border-teal-500 shadow-md ring-2 ring-teal-100';
      case CertificationPhaseStatus.LOCKED: return 'bg-slate-50 border-slate-200 opacity-70';
      default: return 'bg-white border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ruta de Certificación "Empresa Feliz"</h2>
          <p className="text-slate-500 mt-1">Completa las 5 fases para obtener tu distintivo 2024.</p>
        </div>
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Progreso General: 60%
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 z-0"></div>

        <div className="space-y-6 relative z-10">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex gap-6 rounded-xl border p-6 transition-all duration-300 ${getStatusColor(step.status)}`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white p-1 rounded-full">{getStatusIcon(step.status)}</div>
                {step.status === CertificationPhaseStatus.IN_PROGRESS && (
                  <div className="h-full w-0.5 bg-teal-500"></div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-bold text-lg ${step.status === CertificationPhaseStatus.LOCKED ? 'text-slate-400' : 'text-slate-800'}`}>
                      Fase {step.id}: {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-xl">{step.description}</p>
                  </div>
                  {step.status === CertificationPhaseStatus.IN_PROGRESS && (
                    <button className="text-teal-600 font-medium text-sm hover:underline flex items-center gap-1">
                      Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Tasks Section - Expanded if Active or In Progress */}
                {(step.status === CertificationPhaseStatus.IN_PROGRESS || activeStep === step.id) && (
                  <div className="mt-6 bg-slate-50/50 rounded-lg p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lista de Tareas</h4>
                    {step.tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-3 group cursor-pointer">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                          ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300 group-hover:border-teal-400'}`}>
                          {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                          {task.name}
                        </span>
                      </div>
                    ))}

                    {/* Evidence Upload Area */}
                    <div className="mt-4 border-t border-slate-200 pt-4">
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-teal-400 hover:bg-teal-50/50 transition-colors cursor-pointer group">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2 group-hover:text-teal-500" />
                        <p className="text-sm text-slate-500">
                          Arrastra archivos aquí o <span className="text-teal-600 font-medium">busca en tu equipo</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">PDF, Excel o Imágenes (Evidencias Fase {step.id})</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationWorkflow;
