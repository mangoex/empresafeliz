import React from 'react';
import { DEMO_QUESTIONS } from '../constants';
import { ShieldCheck, Info, ChevronRight, CheckCircle } from 'lucide-react';

const SurveyModule: React.FC = () => {
  const [started, setStarted] = React.useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [finished, setFinished] = React.useState(false);

  const currentQuestion = DEMO_QUESTIONS[currentQuestionIdx];
  const progress = ((currentQuestionIdx) / DEMO_QUESTIONS.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    if (currentQuestionIdx < DEMO_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIdx(prev => prev + 1), 300);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto mt-12 text-center p-8 bg-white rounded-2xl shadow-sm border border-emerald-100">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">¡Gracias por tu participación!</h2>
        <p className="text-slate-600 mb-8 text-lg">
          Tus respuestas han sido encriptadas y enviadas anónimamente. 
          Estás ayudando a construir una <strong>Empresa Feliz</strong>.
        </p>
        <button 
          onClick={() => { setStarted(false); setFinished(false); setCurrentQuestionIdx(0); setAnswers({}); }}
          className="text-teal-600 font-medium hover:underline"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="bg-teal-600 p-8 md:w-1/3 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold mb-4">Diagnóstico HAPI 2024</h2>
              <p className="text-teal-100 text-sm">Ayúdanos a medir el pulso de la organización.</p>
            </div>
            <ShieldCheck className="w-24 h-24 text-teal-400 opacity-50 absolute bottom-0 left-0 m-4" />
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex items-start gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Garantía de Anonimato</h4>
                <p className="text-blue-700 text-sm mt-1">
                  Tus respuestas son 100% confidenciales. El sistema desacopla tu identidad de los datos para generar estadísticas grupales.
                </p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                Tiempo estimado: 10 minutos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                Evalúa tu experiencia reciente
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                Sé honesto, no hay respuestas incorrectas
              </li>
            </ul>

            <button 
              onClick={() => setStarted(true)}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              Comenzar Encuesta <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
          <span>Pregunta {currentQuestionIdx + 1} de {DEMO_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Completado</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 transition-all">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-6">
          {currentQuestion.category}
        </span>
        
        <h3 className="text-2xl md:text-3xl font-medium text-slate-800 mb-12 leading-tight">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-xs text-slate-400 font-medium px-1 uppercase tracking-wider">
            <span>Totalmente en desacuerdo</span>
            <span>Totalmente de acuerdo</span>
          </div>
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((val) => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`
                  aspect-square rounded-xl text-lg font-bold border-2 transition-all duration-200
                  ${answers[currentQuestion.id] === val 
                    ? 'bg-teal-600 text-white border-teal-600 scale-110 shadow-lg' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'}
                `}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModule;
