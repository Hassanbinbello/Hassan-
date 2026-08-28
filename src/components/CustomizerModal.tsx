import React, { useState } from 'react';
import { reportMetadata } from '../data/reportData';
import { ReportMetadata } from '../types';
import { X, Check, RotateCcw, Settings2 } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: ReportMetadata;
  onSaveMetadata: (newMeta: ReportMetadata) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  metadata,
  onSaveMetadata,
}) => {
  const [formData, setFormData] = useState<ReportMetadata>({ ...metadata });

  if (!isOpen) return null;

  const handleChange = (field: keyof ReportMetadata, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMetadata(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...reportMetadata });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-[#0F172A] rounded-2xl shadow-2xl border border-[#1E293B] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E293B] bg-[#0A0B0E]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Customise SIWES Technical Report</h3>
              <p className="text-xs text-slate-400">Edit candidate details, supervisors, and dates</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Matriculation Number</label>
              <input
                type="text"
                value={formData.matricNumber}
                onChange={(e) => handleChange('matricNumber', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-mono font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Higher Institution</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => handleChange('institution', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Establishment / Host Agency</label>
            <input
              type="text"
              value={formData.establishment}
              onChange={(e) => handleChange('establishment', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-semibold"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#1E293B] rounded-xl hover:bg-[#334155] border border-[#334155] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-[#0A0B0E] bg-[#38BDF8] hover:bg-[#38BDF8]/90 rounded-xl shadow-xs transition-colors"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Apply Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
