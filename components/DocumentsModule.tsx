import React, { useState } from 'react';
import { MOCK_DOCUMENTS } from '../constants';
import { DocumentType } from '../types';
import { FileText, Download, Eye, Upload, Filter, Search, ShieldCheck } from 'lucide-react';

const DocumentsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DocumentType>(DocumentType.POLICY);
  
  const documents = MOCK_DOCUMENTS.filter(doc => doc.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Gestor Documental</h2>
          <p className="text-sm md:text-base text-slate-500">Repositorio centralizado para cumplimiento.</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm w-full md:w-auto">
          <Upload className="w-4 h-4" />
          Subir Documento
        </button>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab(DocumentType.POLICY)}
          className={`px-4 md:px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === DocumentType.POLICY 
              ? 'border-teal-600 text-teal-700' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Políticas Normativas (NOM-035)
        </button>
        <button
          onClick={() => setActiveTab(DocumentType.EVIDENCE)}
          className={`px-4 md:px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === DocumentType.EVIDENCE
              ? 'border-teal-600 text-teal-700' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Evidencias (SIGEEF)
        </button>
      </div>

      {/* Info Banner for Policies */}
      {activeTab === DocumentType.POLICY && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 items-start">
          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-bold text-blue-900">Documentación Obligatoria</h4>
            <p className="text-blue-700 mt-1">
              Requerido: <span className="font-semibold">Política de Prevención</span> y <span className="font-semibold">Política de Intervención</span>.
            </p>
          </div>
        </div>
      )}

      {/* Filters & Search - Stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar documentos..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
          />
        </div>
        <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 text-sm">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filtrar</span>
        </button>
      </div>

      {/* Documents List - Horizontal Scroll for Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nombre del Documento</th>
                <th className="px-6 py-4">Versión</th>
                <th className="px-6 py-4">Actualización</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 truncate max-w-[250px]">{doc.title}</p>
                        <p className="text-xs text-slate-500">{doc.size} • {doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{doc.version}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${doc.status === 'VIGENTE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {documents.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No se encontraron documentos en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsModule;