import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Briefcase, MapPin, Camera, Save, Building } from 'lucide-react';

const ProfileModule: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@empresa.com',
    phone: '55 1234 5678',
    birthDate: '1990-05-15',
    employeeId: 'EMP-2024-001',
    department: 'Ventas',
    position: 'Ejecutivo de Cuenta',
    location: 'Ciudad de México',
    joinDate: '2022-03-01'
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSave = () => {
    setNotification("Datos actualizados correctamente");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Mi Perfil</h2>
        {notification && (
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium animate-fade-in-down w-full md:w-auto text-center">
                {notification}
            </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column: Photo & Brief Info */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                <div className="relative mb-4 group cursor-pointer">
                    <div className="w-32 h-32 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-lg relative">
                         <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                         />
                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white shadow-md group-hover:bg-teal-700 transition-transform transform group-hover:scale-110">
                        <Camera className="w-4 h-4" />
                    </div>
                </div>
                <h3 className="font-bold text-xl text-slate-800">{formData.firstName} {formData.lastName}</h3>
                <p className="text-slate-500 text-sm mb-4">{formData.position}</p>
                <div className="w-full pt-4 border-t border-slate-100 flex justify-between text-sm">
                    <span className="text-slate-500">ID Empleado</span>
                    <span className="font-mono text-slate-700 font-medium">{formData.employeeId}</span>
                </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <h4 className="font-bold text-blue-900 text-sm mb-2">Estado de Privacidad</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                    Tu información personal es confidencial y solo se utiliza para fines administrativos. Tus respuestas en las encuestas permanecen anónimas.
                </p>
            </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-6">
            {/* Personal Data */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2 pb-2 border-b border-slate-50">
                    <User className="w-5 h-5 text-teal-600" /> Datos Personales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Nombre(s)</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Apellidos</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Correo Electrónico</label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                         </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Teléfono</label>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                         </div>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Nacimiento</label>
                         <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full pl-10 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                         </div>
                    </div>
                </div>
            </div>

            {/* Work Data */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2 pb-2 border-b border-slate-50">
                    <Briefcase className="w-5 h-5 text-teal-600" /> Información Laboral
                </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Departamento / Área</label>
                        <div className="relative">
                             <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full pl-10 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Puesto / Cargo</label>
                        <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Ubicación / Sede</label>
                         <div className="relative">
                             <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full pl-10 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Ingreso</label>
                        <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-slate-700 text-sm" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-xl active:scale-95">
                    <Save className="w-4 h-4" /> Guardar Cambios
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModule;