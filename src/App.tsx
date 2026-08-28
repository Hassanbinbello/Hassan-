import React, { useState, useEffect } from 'react';
import { reportMetadata as defaultMetadata } from './data/reportData';
import { ReportMetadata } from './types';
import { Header, ViewMode } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ReportViewer } from './components/ReportViewer';
import { A4PrintDocument } from './components/A4PrintDocument';
import { ProjectSandbox } from './components/ProjectSandbox';
import { WeeklyLogbook } from './components/WeeklyLogbook';
import { LoggingPage } from './components/LoggingPage';
import { DefensePresentation } from './components/DefensePresentation';
import { CustomizerModal } from './components/CustomizerModal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('reader');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontMode, setFontMode] = useState<'serif' | 'sans'>('serif');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [activeSectionId, setActiveSectionId] = useState<string>('cover-header');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<ReportMetadata>(defaultMetadata);

  // Track scroll position for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    if (viewMode !== 'reader') {
      setViewMode('reader');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrint = () => {
    if (viewMode !== 'print') {
      setViewMode('print');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#E2E8F0] flex flex-col selection:bg-[#38BDF8]/30 selection:text-white relative">
      {/* Background radial ambient glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1e293b_0%,_#0a0b0e_50%)] pointer-events-none z-0"></div>

      {/* Top Application Header */}
      <div className="relative z-10">
        <Header
          viewMode={viewMode}
          onChangeViewMode={(mode) => setViewMode(mode)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          fontMode={fontMode}
          onToggleFontMode={() => setFontMode((prev) => (prev === 'serif' ? 'sans' : 'serif'))}
          fontSize={fontSize}
          onChangeFontSize={(s) => setFontSize(s)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onPrint={handlePrint}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {viewMode === 'reader' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left sticky table of contents & stats */}
            <div className="hidden lg:block">
              <Sidebar
                activeSection={activeSectionId}
                onSelectSection={handleNavigateSection}
                readingProgress={readingProgress}
              />
            </div>

            {/* Main Interactive Academic Document Viewer */}
            <div className="flex-1 w-full min-w-0">
              <ReportViewer
                searchQuery={searchQuery}
                fontMode={fontMode}
                fontSize={fontSize}
                activeSectionId={activeSectionId}
                onNavigateSection={handleNavigateSection}
              />
            </div>
          </div>
        )}

        {viewMode === 'print' && (
          <div className="w-full">
            <A4PrintDocument customMetadata={metadata} />
          </div>
        )}

        {viewMode === 'project' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-[#334155] shadow-lg relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded-full border border-[#38BDF8]/20">
                  SIWES Practical Project Artifact
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">
                  Special Project: Basic Computer Networking & Web Development
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                  Practical implementation of the ZITDA Public Information Webpage and 4-Node Fast Ethernet Local Area Network (LAN) deployed during industrial training at Gusau.
                </p>
              </div>
            </div>

            <ProjectSandbox />
          </div>
        )}

        {viewMode === 'logger' && (
          <div className="w-full">
            <LoggingPage metadata={metadata} />
          </div>
        )}

        {viewMode === 'logbook' && (
          <div className="w-full">
            <WeeklyLogbook />
          </div>
        )}

        {viewMode === 'defense' && (
          <div className="w-full">
            <DefensePresentation />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-[#0F172A] border-t border-[#1E293B] py-6 mt-12 text-center text-xs text-slate-500 space-y-1 relative z-10">
        <p className="font-semibold text-slate-300">
          STUDENTS INDUSTRIAL WORK EXPERIENCE SCHEME (SIWES) TECHNICAL REPORT
        </p>
        <p>
          Candidate: <strong className="text-white">{metadata.studentName}</strong> (<span className="text-[#38BDF8] font-mono">{metadata.matricNumber}</span>) • {metadata.department}, {metadata.institution}
        </p>
        <p className="text-[11px] text-slate-500">
          Establishment: {metadata.establishment}, {metadata.location}, {metadata.state} • Duration: <span className="text-[#10B981] font-medium">{metadata.duration}</span>
        </p>
      </footer>

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        metadata={metadata}
        onSaveMetadata={(newMeta) => setMetadata(newMeta)}
      />
    </div>
  );
}
