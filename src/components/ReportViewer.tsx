import React from 'react';
import { 
  reportMetadata, 
  preliminarySections, 
  reportChapters, 
  referencesList 
} from '../data/reportData';
import { OrganogramChart } from './OrganogramChart';
import { ActivityGrid } from './ActivityGrid';
import { ProjectSandbox } from './ProjectSandbox';
import { 
  BookOpen, 
  CheckCircle, 
  Copy, 
  Check, 
  FileText, 
  Building2, 
  GraduationCap, 
  Calendar, 
  User, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ReportViewerProps {
  searchQuery: string;
  fontMode: 'serif' | 'sans';
  fontSize: 'sm' | 'base' | 'lg';
  activeSectionId?: string;
  onNavigateSection?: (id: string) => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  searchQuery,
  fontMode,
  fontSize,
  activeSectionId,
  onNavigateSection,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopySection = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-[#38BDF8]/30 text-[#38BDF8] rounded px-0.5 font-bold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const fontSizeClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
  }[fontSize];

  return (
    <div className={`space-y-8 ${fontMode === 'serif' ? 'font-academic' : 'font-sans'}`}>
      
      {/* 1. DOCUMENT HEADER HERO / SUMMARY CARD */}
      <section id="cover-header" className="p-6 sm:p-10 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 uppercase tracking-wider">
                SIWES Technical Report
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1E293B] text-slate-300 border border-[#334155]">
                {reportMetadata.duration} Duration
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1E293B] text-slate-300 border border-[#334155]">
                {reportMetadata.academicYear}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {reportMetadata.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {reportMetadata.reportType}{' '}
              <strong className="text-white">{reportMetadata.establishment}</strong>,{' '}
              {reportMetadata.location}, {reportMetadata.state}
            </p>
          </div>

          {/* Student Profile Badge */}
          <div className="p-4 rounded-xl bg-[#1E293B]/60 border border-[#334155] text-xs space-y-2 shrink-0 md:w-72">
            <div className="flex items-center gap-2 pb-2 border-b border-[#334155]">
              <div className="w-8 h-8 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center font-bold text-xs border border-[#38BDF8]/30">
                HB
              </div>
              <div>
                <p className="font-bold text-white">{reportMetadata.studentName}</p>
                <p className="font-mono text-slate-400 text-[11px]">{reportMetadata.matricNumber}</p>
              </div>
            </div>

            <div className="space-y-1 text-slate-300 text-[11px]">
              <p className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{reportMetadata.department}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{reportMetadata.institution}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{reportMetadata.startDate} – {reportMetadata.endDate}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRELIMINARY SECTIONS (DECLARATION, CERTIFICATION, ACKNOWLEDGEMENT) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Declaration Card */}
        <div id="sec-declaration" className="p-6 sm:p-7 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-bold text-base text-white tracking-wide">
                  {preliminarySections.declaration.title}
                </h3>
              </div>
              <button
                onClick={() => handleCopySection('dec', preliminarySections.declaration.text)}
                className="text-slate-400 hover:text-white text-xs p-1"
                title="Copy Declaration"
              >
                {copiedId === 'dec' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {highlightText(preliminarySections.declaration.text)}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              {highlightText(preliminarySections.declaration.subtext)}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 italic mt-2">
              {highlightText(preliminarySections.declaration.closing)}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
            <span>Candidate: <strong className="text-white">{reportMetadata.studentName}</strong></span>
            <span className="font-mono text-[#10B981] font-semibold">Signed & Declared</span>
          </div>
        </div>

        {/* Certification Card */}
        <div id="sec-certification" className="p-6 sm:p-7 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-bold text-base text-white tracking-wide">
                  {preliminarySections.certification.title}
                </h3>
              </div>
              <button
                onClick={() => handleCopySection('cert', preliminarySections.certification.text)}
                className="text-slate-400 hover:text-white text-xs p-1"
                title="Copy Certification"
              >
                {copiedId === 'cert' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {highlightText(preliminarySections.certification.text)}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              {highlightText(preliminarySections.certification.subtext)}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1E293B] grid grid-cols-2 gap-2 text-xs text-slate-400">
            <div>
              <p className="font-semibold text-white">Industry Supervisor</p>
              <p className="text-[11px] text-slate-500">ZITDA Gusau</p>
            </div>
            <div>
              <p className="font-semibold text-white">Institutional Supervisor</p>
              <p className="text-[11px] text-slate-500">Computer Science, FUG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgement Full Card */}
      <section id="sec-acknowledgement" className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#38BDF8]" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              {preliminarySections.acknowledgement.title}
            </h3>
          </div>
        </div>

        <div className="space-y-3 text-slate-300 leading-relaxed">
          {preliminarySections.acknowledgement.paragraphs.map((para, idx) => (
            <p key={idx} className="text-xs sm:text-sm leading-relaxed">
              {highlightText(para)}
            </p>
          ))}
        </div>
      </section>

      {/* 3. REPORT CHAPTERS */}
      {reportChapters.map((chapter) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className="p-6 sm:p-10 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-8"
        >
          {/* Chapter Header */}
          <div className="pb-4 border-b-2 border-[#38BDF8]/40">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#38BDF8] block">
              {chapter.chapterNumber}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {chapter.title}
            </h2>
          </div>

          {/* Chapter Sections */}
          <div className="space-y-8">
            {chapter.sections.map((section) => (
              <div key={section.id} id={section.id} className="space-y-4">
                
                {/* Section Title Bar */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="text-[#38BDF8] font-mono font-bold text-sm sm:text-base">
                      {section.number}
                    </span>
                    <span>{section.title}</span>
                  </h3>
                  <button
                    onClick={() =>
                      handleCopySection(
                        section.id,
                        (section.paragraphs || []).join('\n\n') +
                          '\n\n' +
                          (section.bulletPoints || []).join('\n')
                      )
                    }
                    className="text-slate-400 hover:text-white text-xs p-1"
                    title="Copy Section Text"
                  >
                    {copiedId === section.id ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Paragraphs */}
                {section.paragraphs && (
                  <div className="space-y-3 text-slate-300">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className={`${fontSizeClass} leading-relaxed`}>
                        {highlightText(p)}
                      </p>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                {section.bulletPoints && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {section.bulletPoints.map((bp, bpIdx) => (
                      <div
                        key={bpIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1E293B]/50 border border-[#334155]/60 text-xs sm:text-sm text-slate-200"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0 mt-2"></div>
                        <span>{highlightText(bp)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subsections if any */}
                {section.subsections && (
                  <div className="space-y-5 pt-2 pl-2 sm:pl-4 border-l-2 border-[#1E293B]">
                    {section.subsections.map((sub) => (
                      <div key={sub.id} id={sub.id} className="space-y-2">
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {sub.title}
                        </h4>
                        {sub.paragraphs && (
                          <div className="space-y-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {sub.paragraphs.map((sp, spIdx) => (
                              <p key={spIdx}>{highlightText(sp)}</p>
                            ))}
                          </div>
                        )}
                        {sub.bulletPoints && (
                          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                            {sub.bulletPoints.map((sbp, sbpIdx) => (
                              <li key={sbpIdx}>{highlightText(sbp)}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive Special Component Embeds */}
                {section.specialComponent === 'organogram' && <OrganogramChart />}
                {section.specialComponent === 'activity_cards' && <ActivityGrid />}
                {section.specialComponent === 'project_demo' && <ProjectSandbox />}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 4. REFERENCES SECTION */}
      <section id="sec-references" className="p-6 sm:p-10 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-6">
        <div className="pb-4 border-b-2 border-[#38BDF8]/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Academic Sources</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">REFERENCES</h2>
          </div>
          <span className="text-xs text-[#38BDF8] font-semibold">{referencesList.length} Cited Sources</span>
        </div>

        <div className="space-y-3">
          {referencesList.map((ref, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#1E293B]/50 border border-[#334155]/60 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3"
            >
              <span className="font-mono text-[#38BDF8] font-bold shrink-0">[{idx + 1}]</span>
              <div>
                <p>
                  <strong className="text-white">{ref.author}</strong> ({ref.year}). <em>{ref.title}</em>. {ref.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
