import React, { useState } from 'react';
import { weeklyLogbookData } from '../data/reportData';
import { LogbookWeek } from '../types';
import { Calendar, CheckCircle2, Award, Clock, FileText, ChevronRight } from 'lucide-react';

export const WeeklyLogbook: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const currentWeek = weeklyLogbookData.find((w) => w.weekNumber === selectedWeek) || weeklyLogbookData[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              6-Week Industrial Experience
            </span>
            <span className="text-xs text-slate-400">10th May, 2026 – 11th August, 2026</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">SIWES Weekly Logbook & Progress Records</h2>
          <p className="text-xs text-slate-400 mt-1">
            Systematic day-to-day log of practical training activities conducted at ZITDA Headquarters, Gusau.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-xs font-bold text-[#10B981] block">100% Completed</span>
            <span className="text-[11px] text-slate-400">6 of 6 Weeks Approved</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-bold border border-[#10B981]/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {weeklyLogbookData.map((week) => (
          <button
            key={week.weekNumber}
            onClick={() => setSelectedWeek(week.weekNumber)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedWeek === week.weekNumber
                ? 'bg-[#1E293B] text-white border-[#38BDF8] shadow-md ring-2 ring-[#38BDF8]/20'
                : 'bg-[#0F172A] text-slate-400 border-[#1E293B] hover:border-[#38BDF8]/40 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${selectedWeek === week.weekNumber ? 'text-[#38BDF8]' : 'text-slate-500'}`}>
                WEEK {week.weekNumber}
              </span>
              <CheckCircle2 className={`w-3.5 h-3.5 ${selectedWeek === week.weekNumber ? 'text-[#38BDF8]' : 'text-[#10B981]'}`} />
            </div>
            <p className="text-xs font-semibold mt-1 truncate text-slate-200">{week.title.split('&')[0]}</p>
          </button>
        ))}
      </div>

      {/* Selected Week Detailed Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wide">
                Week {currentWeek.weekNumber} Breakdown
              </span>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{currentWeek.startDate} – {currentWeek.endDate}</span>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              {currentWeek.title}
            </h3>
          </div>

          <span className="self-start sm:self-center px-3 py-1 text-xs font-semibold rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            Supervisor Verified
          </span>
        </div>

        {/* Objectives Box */}
        <div className="p-4 rounded-xl bg-[#1E293B]/50 border border-[#334155]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            <Clock className="w-4 h-4 text-[#38BDF8]" />
            Weekly Learning Objectives
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentWeek.objectives}
          </p>
        </div>

        {/* Daily Activities Checklist */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-3">
            <FileText className="w-4 h-4 text-[#38BDF8]" />
            Detailed Practical Tasks & Industrial Activities
          </div>

          <div className="space-y-2.5">
            {currentWeek.activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#1E293B]/30 border border-[#334155]/60 hover:border-[#38BDF8]/40 transition-colors">
                <div className="w-5 h-5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-[#38BDF8]/30">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {act}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Gained Pills */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2.5">
            <Award className="w-4 h-4 text-amber-400" />
            Competencies & Skills Acquired
          </div>
          <div className="flex flex-wrap gap-2">
            {currentWeek.skillsLearned.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Supervisor Endorsement */}
        <div className="pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-[#1E293B]/60 border border-[#334155] p-4 rounded-xl">
          <div>
            <span className="font-bold text-white block">ZITDA Supervisor Remarks:</span>
            <p className="text-slate-300 italic mt-0.5">"{currentWeek.supervisorRemarks}"</p>
          </div>
          <div className="text-slate-400 font-mono text-[11px] shrink-0">
            Sign-off: <span className="text-[#10B981] font-bold">Approved & Endorsed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
