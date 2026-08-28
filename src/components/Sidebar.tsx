import React from 'react';
import { reportChapters, reportMetadata } from '../data/reportData';
import { 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  Share2, 
  Clock,
  ListTree
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  readingProgress: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  readingProgress,
}) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* Table of Contents Box */}
      <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] p-4 shadow-md sticky top-20">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E293B]">
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
            <ListTree className="w-4 h-4 text-[#38BDF8]" />
            <span>Table of Contents</span>
          </div>
          <span className="text-[11px] font-mono text-[#38BDF8] font-bold">{Math.round(readingProgress)}% read</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="bg-[#38BDF8] h-full transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, readingProgress))}%` }}
          ></div>
        </div>

        {/* Navigation Item Tree */}
        <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 text-xs">
          {/* Preliminary Pages */}
          <button
            onClick={() => onSelectSection('cover-header')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-semibold flex items-center justify-between ${
              activeSection === 'cover-header'
                ? 'bg-[#1E293B] text-[#38BDF8] border-l-2 border-[#38BDF8] font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <span>Cover & Title Page</span>
            <span className="text-[10px] text-slate-500 font-mono">i</span>
          </button>

          <button
            onClick={() => onSelectSection('sec-declaration')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
              activeSection === 'sec-declaration'
                ? 'bg-[#1E293B] text-[#38BDF8] border-l-2 border-[#38BDF8] font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <span>Declaration</span>
            <span className="text-[10px] text-slate-500 font-mono">ii</span>
          </button>

          <button
            onClick={() => onSelectSection('sec-certification')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
              activeSection === 'sec-certification'
                ? 'bg-[#1E293B] text-[#38BDF8] border-l-2 border-[#38BDF8] font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <span>Certification</span>
            <span className="text-[10px] text-slate-500 font-mono">iii</span>
          </button>

          <button
            onClick={() => onSelectSection('sec-acknowledgement')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center justify-between ${
              activeSection === 'sec-acknowledgement'
                ? 'bg-[#1E293B] text-[#38BDF8] border-l-2 border-[#38BDF8] font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <span>Acknowledgement</span>
            <span className="text-[10px] text-slate-500 font-mono">iv</span>
          </button>

          <div className="pt-2 pb-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Technical Chapters
          </div>

          {/* Chapters and Subsections */}
          {reportChapters.map((chap) => (
            <div key={chap.id} className="space-y-0.5">
              <button
                onClick={() => onSelectSection(chap.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-bold flex items-center justify-between ${
                  activeSection === chap.id
                    ? 'bg-[#1E293B] text-white border-l-2 border-[#38BDF8]'
                    : 'text-slate-300 hover:bg-[#1E293B]/50 hover:text-white'
                }`}
              >
                <span className="truncate">{chap.chapterNumber}</span>
                <span className={`text-[10px] ${activeSection === chap.id ? 'text-[#38BDF8]' : 'text-slate-500'}`}>
                  {chap.sections.length} Sec
                </span>
              </button>

              <div className="pl-2 space-y-0.5 border-l border-[#1E293B] ml-2">
                {chap.sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors truncate block text-[11px] ${
                      activeSection === sec.id
                        ? 'text-[#38BDF8] font-bold bg-[#38BDF8]/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]/30'
                    }`}
                  >
                    {sec.number} {sec.title.split(' ')[0]} {sec.title.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => onSelectSection('sec-references')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-bold text-slate-200 mt-2 block ${
              activeSection === 'sec-references'
                ? 'bg-[#1E293B] text-[#38BDF8] border-l-2 border-[#38BDF8]'
                : 'hover:bg-[#1E293B]/50 hover:text-white'
            }`}
          >
            References
          </button>
        </nav>

        {/* Quick Report Statistics */}
        <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] text-slate-400 space-y-1.5">
          <div className="flex justify-between">
            <span>Report Length:</span>
            <span className="font-semibold text-slate-200">~2,450 Words</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Reading Time:</span>
            <span className="font-semibold text-slate-200">8-10 Mins</span>
          </div>
          <div className="flex justify-between">
            <span>Special Project:</span>
            <span className="font-semibold text-[#38BDF8]">Networking & Web</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
