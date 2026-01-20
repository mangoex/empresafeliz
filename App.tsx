import React, { useState } from 'react';
import Layout from './components/Layout';
import HapiRadarChart from './components/HapiRadarChart';
import RoiChart from './components/RoiChart';
import CertificationWorkflow from './components/CertificationWorkflow';
import SurveyModule from './components/SurveyModule';
import DocumentsModule from './components/DocumentsModule';
import ProfileModule from './components/ProfileModule';
import { UserRole } from './types';
import { MOCK_HAPI_DATA, MOCK_ROI_DATA, CERTIFICATION_STEPS } from './constants';
import { ArrowUpRight, Users, Activity, Target, Clock } from 'lucide-react';

// Login Component (Internal to App for simplicity)
const LoginScreen = ({ onLogin }: { onLogin: (role: UserRole) => void }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div className="text-center mb-10">
      <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-600/20">
        <span className="text-3xl">😄</span>
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Empresa Feliz</h1>
      <p className="text-slate-500">Plataforma de Bienestar & Certificación NOM-035</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
      {[
        { role: UserRole.ADMIN, title: "Administrador", desc: "Gestión de encuestas y dashboard", icon: "📊" },
        { role: UserRole.EMPLOYEE, title: "Colaborador", desc: "Responder encuestas anónimas", icon: "👤" },
        { role: UserRole.AUDITOR, title: "Auditor POSITIVALA", desc: "Revisión y validación", icon: "🔍" },
      ].map((card) => (
        <button
          key={card.role}
          onClick={() => onLogin(card.role)}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{card.icon}</div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">{card.title}</h3>
          <p className="text-sm text-slate-500">{card.desc}</p>
        </button>
      ))}
    </div>
  </div>
);

// Admin Dashboard Component
const AdminDashboard = () => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Stats - Updated with Absenteeism as per PRD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Índice General HAPI", value: "7.8", change: "+0.4", icon: Activity },
          { label: "Participación Encuestas", value: "86%", change: "+12%", icon: Users },
          { label: "Tasa de Absentismo", value: "3.2%", change: "-1.3%", icon: Clock, isGood: true },
          { label: "ROI Estimado (Anual)", value: "$1.2M", change: "+8%", icon: ArrowUpRight },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${stat.isGood === undefined || stat.isGood ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-500'}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') || (stat.isGood && stat.change.startsWith('-')) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {stat.change} vs mes anterior
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Diagnóstico Modelo HAPI</h3>
              <p className="text-sm text-slate-500">Haz clic en un pilar para ver dominios y dimensiones</p>
            </div>
          </div>
          <HapiRadarChart data={MOCK_HAPI_DATA} onPillarClick={setSelectedPillar} />
          {selectedPillar && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-teal-700 mb-2">Detalle: {selectedPillar}</h4>
              <div className="space-y-2">
                {MOCK_HAPI_DATA.find(d => d.pillar === selectedPillar)?.dimensions.map(dim => (
                  <div key={dim.name} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{dim.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500" style={{ width: `${dim.score * 10}%` }}></div>
                      </div>
                      <span className="font-bold text-slate-800">{dim.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ROI Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-slate-800">Correlación Bienestar vs Negocio</h3>
            <p className="text-sm text-slate-500">Causalidad entre HAPI y reducción de Rotación/Absentismo</p>
          </div>
          <RoiChart data={MOCK_ROI_DATA} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // Set default view based on role
    if (role === UserRole.EMPLOYEE) setCurrentView('survey');
    else setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('dashboard');
  };

  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Layout 
      role={userRole} 
      onLogout={handleLogout} 
      currentView={currentView}
      onChangeView={setCurrentView}
    >
      {/* View Router */}
      {currentView === 'dashboard' && userRole === UserRole.ADMIN && <AdminDashboard />}
      {currentView === 'certification' && userRole === UserRole.ADMIN && <CertificationWorkflow steps={CERTIFICATION_STEPS} />}
      {currentView === 'survey' && <SurveyModule />}
      {currentView === 'documents' && <DocumentsModule />}
      {currentView === 'profile' && <ProfileModule />}
      
       {currentView === 'audit-dashboard' && (
        <div className="p-12 text-center text-slate-400">
          <div className="text-6xl mb-4">🕵️‍♂️</div>
          <h2 className="text-xl font-bold">Panel de Auditoría</h2>
          <p>Vista para consultores POSITIVALA (Validación de evidencias).</p>
          <div className="mt-8">
             <button onClick={() => setCurrentView('documents')} className="text-teal-600 hover:underline">Ir a Revisión de Documentos</button>
          </div>
        </div>
      )}
    </Layout>
  );
}