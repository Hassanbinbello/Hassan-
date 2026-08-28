import React, { useState, useEffect } from 'react';
import { defenseSlidesData, reportMetadata } from '../data/reportData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Layers, 
  GraduationCap, 
  Clock, 
  Award, 
  CheckCircle2, 
  Monitor, 
  Cpu
} from 'lucide-react';

export const DefensePresentation: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const slide = defenseSlidesData[currentSlideIndex];
  const totalSlides = defenseSlidesData.length;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const goToNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Presentation Control Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">SIWES Departmental Defense Slides</h3>
            <p className="text-xs text-slate-400">Federal University Gusau • Computer Science Department</p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] text-slate-200 text-xs font-mono border border-[#334155]">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setTimerActive(!timerActive)}
              className="text-[10px] font-bold uppercase text-[#38BDF8] hover:text-white ml-1 underline"
            >
              {timerActive ? 'Pause' : 'Start'}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={goToPrev}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-lg border border-[#334155] bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 transition-colors text-slate-200"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-300 px-2 font-mono">
              {currentSlideIndex + 1} / {totalSlides}
            </span>
            <button
              onClick={goToNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-2 rounded-lg border border-[#334155] bg-[#1E293B] hover:bg-[#334155] disabled:opacity-30 transition-colors text-slate-200"
              title="Next Slide (Right Arrow or Space)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-[#334155] bg-[#1E293B] hover:bg-[#334155] transition-colors text-slate-200"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="relative min-h-[460px] sm:min-h-[520px] rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#0A0B0E] to-[#1E293B] text-white p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden border border-[#1E293B]">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Top Metadata */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#334155] pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 uppercase tracking-wider">
              {slide.category}
            </span>
            <span className="text-xs text-slate-400">Federal University Gusau</span>
          </div>
          <span className="text-xs font-mono text-[#38BDF8]">Slide {slide.id} of {totalSlides}</span>
        </div>

        {/* Slide Main Content */}
        <div className="relative z-10 my-auto py-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-[#38BDF8] mt-2 font-medium">
              {slide.subtitle}
            </p>

            <div className="mt-6 space-y-3">
              {slide.keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#1E293B]/60 border border-[#334155] backdrop-blur-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            {slide.summary && (
              <div className="mt-4 p-3 rounded-lg bg-[#1E293B]/90 border border-[#38BDF8]/30 text-xs text-slate-200 italic">
                <span className="font-bold text-[#38BDF8] not-italic">Key Summary: </span>
                {slide.summary}
              </div>
            )}
          </div>
        </div>

        {/* Slide Footer */}
        <div className="relative z-10 pt-4 border-t border-[#334155] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            <span className="text-white font-medium">{reportMetadata.studentName}</span> ({reportMetadata.matricNumber})
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>{reportMetadata.establishment}</span>
            <span>•</span>
            <span>{reportMetadata.location}</span>
          </div>
        </div>
      </div>

      {/* Slide Thumbnails strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {defenseSlidesData.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              currentSlideIndex === idx
                ? 'bg-[#1E293B] text-white border-[#38BDF8] shadow-md ring-2 ring-[#38BDF8]/20'
                : 'bg-[#0F172A] text-slate-400 border-[#1E293B] hover:border-[#38BDF8]/40 hover:text-white'
            }`}
          >
            <span className={`text-[10px] font-bold block ${currentSlideIndex === idx ? 'text-[#38BDF8]' : 'text-slate-500'}`}>
              Slide {s.id}
            </span>
            <p className="text-xs font-semibold truncate mt-0.5 text-slate-200">{s.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
