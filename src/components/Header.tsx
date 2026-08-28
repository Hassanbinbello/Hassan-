import React from 'react';
import { 
  BookOpen, 
  Printer, 
  Search, 
  SlidersHorizontal, 
  Type, 
  GraduationCap, 
  Laptop, 
  CalendarDays, 
  FileText,
  FileCode,
  Sparkles,
  ClipboardList,
  PenTool
} from 'lucide-react';

export type ViewMode = 'reader' | 'print' | 'project' | 'logbook' | 'logger' | 'defense';

interface HeaderProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  fontMode: 'serif' | 'sans';
  onToggleFontMode: () => void;
  fontSize: 'sm' | 'base' | 'lg';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg') => void;
  onOpenCustomizer: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onChangeViewMode,
  searchQuery,
  onSearchChange,
  fontMode,
  onToggleFontMode,
  fontSize,
  onChangeFontSize,
  onOpenCustomizer,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-[#1E293B] shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          
          {/* Brand & Document Identification */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#38BDF8] text-[#0F172A] flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/30">
                  FUG • Computer Science
                </span>
                <span className="text-xs text-slate-400 font-mono">2310308098</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white leading-tight truncate max-w-sm sm:max-w-md">
                ZITDA <span className="text-[#38BDF8]">SIWES Portal</span> • Technical Report
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64 lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search report contents..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#1E293B]/70 hover:bg-[#1E293B] focus:bg-[#0A0B0E] rounded-xl border border-[#334155] focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all placeholder:text-slate-500 text-slate-100"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            
            {/* Font Mode Switcher */}
            <button
              onClick={onToggleFontMode}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#334155] bg-[#1E293B]/60 hover:bg-[#1E293B] text-slate-300 hover:text-white transition-colors"
              title="Toggle Academic Serif / Modern Sans Font"
            >
              <Type className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{fontMode === 'serif' ? 'Serif' : 'Sans'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center border border-[#334155] rounded-lg p-0.5 bg-[#1E293B]/60 text-[11px] font-bold text-slate-400">
              <button
                onClick={() => onChangeFontSize('sm')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'sm' ? 'bg-[#38BDF8] text-[#0F172A] font-bold' : 'hover:text-white'}`}
                title="Small Text"
              >
                A-
              </button>
              <button
                onClick={() => onChangeFontSize('base')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'base' ? 'bg-[#38BDF8] text-[#0F172A] font-bold' : 'hover:text-white'}`}
                title="Normal Text"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize('lg')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'lg' ? 'bg-[#38BDF8] text-[#0F172A] font-bold' : 'hover:text-white'}`}
                title="Large Text"
              >
                A+
              </button>
            </div>

            {/* Edit / Customise Metadata */}
            <button
              onClick={onOpenCustomizer}
              className="p-2 rounded-lg border border-[#334155] bg-[#1E293B]/60 hover:bg-[#1E293B] text-slate-300 hover:text-white transition-colors"
              title="Customise Candidate or Supervisor Details"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#38BDF8]" />
            </button>

            {/* Print Button */}
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#0F172A] rounded-lg shadow-sm transition-all"
              title="Print Official A4 Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4</span>
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-[#1E293B] text-xs no-scrollbar">
          <button
            onClick={() => onChangeViewMode('reader')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              viewMode === 'reader'
                ? 'bg-[#1E293B] border-l-2 border-[#38BDF8] text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Interactive Technical Report</span>
          </button>

          <button
            onClick={() => onChangeViewMode('print')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              viewMode === 'print'
                ? 'bg-[#1E293B] border-l-2 border-[#38BDF8] text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/40'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>A4 Print & Submission Mode</span>
          </button>

          <button
            onClick={() => onChangeViewMode('project')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              viewMode === 'project'
                ? 'bg-[#1E293B] border-l-2 border-[#38BDF8] text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/40'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Project Sandbox & LAN Simulator</span>
          </button>

          <button
            onClick={() => onChangeViewMode('logger')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              viewMode === 'logger'
                ? 'bg-[#1E293B] border-l-2 border-[#38BDF8] text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/40'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Daily Activity Logger</span>
          </button>

          <button
            onClick={() => onChangeViewMode('logbook')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              viewMode === 'logbook'
                ? 'bg-[#1E293B] border-l-2 border-[#38BDF8] text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/40'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>6-Week Industrial Logbook</span>
          </button>

          <button
            onClick={() => onChangeViewMode('defense')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              viewMode === 'defense'
                ? 'bg-[#1E293B] border-l-2 border-[#38BDF8] text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/40'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Departmental Defense Slides</span>
          </button>
        </div>
      </div>
    </header>
  );
};
