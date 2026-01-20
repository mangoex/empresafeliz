import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  Heart,
  UserCircle,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
  currentView: string;
  onChangeView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, onLogout, currentView, onChangeView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // Cerrar sidebar por defecto en móvil
      } else {
        setIsSidebarOpen(true); // Abrir por defecto en escritorio
      }
    };

    handleResize(); // Check inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (viewId: string) => {
    onChangeView(viewId);
    if (isMobile) setIsSidebarOpen(false); // Cerrar sidebar al navegar en móvil
  };

  const getMenuItems = () => {
    switch(role) {
      case UserRole.EMPLOYEE:
        return [
          { id: 'survey', label: 'Mis Encuestas', icon: ClipboardCheck },
          { id: 'profile', label: 'Mi Perfil', icon: UserCircle },
        ];
      case UserRole.AUDITOR:
        return [
          { id: 'audit-dashboard', label: 'Panel de Auditoría', icon: LayoutDashboard },
          { id: 'companies', label: 'Empresas Asignadas', icon: FileText },
        ];
      case UserRole.ADMIN:
      default:
        return [
          { id: 'dashboard', label: 'Dashboard HAPI', icon: LayoutDashboard },
          { id: 'certification', label: 'Certificación', icon: ClipboardCheck },
          { id: 'documents', label: 'Gestor Documental', icon: FileText },
          { id: 'settings', label: 'Configuración', icon: Settings },
        ];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 relative">
      
      {/* Mobile Backdrop Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col shadow-xl md:shadow-none
          ${isMobile 
            ? (isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64') 
            : (isSidebarOpen ? 'translate-x-0 w-64' : 'translate-x-0 w-20')
          }
        `}
      >
        <div className="h-16 flex items-center justify-between md:justify-center border-b border-slate-100 px-4">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xl overflow-hidden">
            <Heart className="w-8 h-8 flex-shrink-0 fill-current" />
            <span className={`${!isSidebarOpen && !isMobile && 'hidden'} transition-opacity whitespace-nowrap`}>
              Empresa Feliz
            </span>
          </div>
          {/* Close button only visible on mobile */}
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors whitespace-nowrap
                ${currentView === item.id 
                  ? 'bg-teal-50 text-teal-700 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className={`${!isSidebarOpen && !isMobile && 'hidden'}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-500 transition-colors whitespace-nowrap"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`${!isSidebarOpen && !isMobile && 'hidden'}`}>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div 
        className={`
          flex-1 flex flex-col min-h-screen transition-all duration-300 w-full
          ${isMobile ? 'ml-0' : (isSidebarOpen ? 'ml-64' : 'ml-20')}
        `}
      >
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900 leading-tight">
                {role === UserRole.ADMIN ? 'Ana Martínez' : role === UserRole.EMPLOYEE ? 'Usuario Anónimo' : 'Carlos Auditor'}
              </p>
              <p className="text-xs text-slate-500 capitalize truncate max-w-[150px]">
                {role === UserRole.ADMIN ? 'Gerente de Bienestar' : role === UserRole.EMPLOYEE ? 'Colaborador' : 'Auditor POSITIVALA'}
              </p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm md:text-base">
              {role === UserRole.ADMIN ? 'AM' : role === UserRole.EMPLOYEE ? 'U' : 'CA'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;