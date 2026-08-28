import React, { useState, useEffect, useRef } from 'react';
import { weeklyLogbookData as initialData } from '../data/reportData';
import { LogbookWeek } from '../types';
import { 
  Calendar, 
  CheckCircle2, 
  Award, 
  Clock, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  Download,
  Sparkles,
  CloudCheck,
  ChevronRight
} from 'lucide-react';

const STORAGE_KEY = 'zitda_siwes_weekly_logbook';

export const WeeklyLogbook: React.FC = () => {
  // Initialize from localStorage or fallback to default data
  const [logbookData, setLogbookData] = useState<LogbookWeek[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved logbook from localStorage', e);
    }
    return initialData;
  });

  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [newActivityText, setNewActivityText] = useState<string>('');
  const [newSkillText, setNewSkillText] = useState<string>('');
  const isFirstMount = useRef(true);

  // Current active week object
  const currentWeek = logbookData.find((w) => w.weekNumber === selectedWeekNum) || logbookData[0] || initialData[0];

  // Auto-save effect whenever logbookData changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      return;
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logbookData));
        const now = new Date();
        setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setSaveStatus('saved');
      } catch (err) {
        console.error('Auto-save to localStorage failed', err);
        setSaveStatus('saved');
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [logbookData]);

  // Update specific fields of the current week
  const updateCurrentWeek = (fields: Partial<LogbookWeek>) => {
    setLogbookData((prev) =>
      prev.map((week) =>
        week.weekNumber === currentWeek.weekNumber
          ? { ...week, ...fields }
          : week
      )
    );
  };

  // Add new activity item
  const handleAddActivity = () => {
    if (!newActivityText.trim()) return;
    const updatedActivities = [...(currentWeek.activities || []), newActivityText.trim()];
    updateCurrentWeek({ activities: updatedActivities });
    setNewActivityText('');
  };

  // Remove activity item
  const handleRemoveActivity = (indexToRemove: number) => {
    const updatedActivities = currentWeek.activities.filter((_, idx) => idx !== indexToRemove);
    updateCurrentWeek({ activities: updatedActivities });
  };

  // Edit specific activity item text
  const handleUpdateActivity = (index: number, newText: string) => {
    const updatedActivities = [...currentWeek.activities];
    updatedActivities[index] = newText;
    updateCurrentWeek({ activities: updatedActivities });
  };

  // Add new skill
  const handleAddSkill = () => {
    if (!newSkillText.trim()) return;
    if (!currentWeek.skillsLearned.includes(newSkillText.trim())) {
      const updatedSkills = [...(currentWeek.skillsLearned || []), newSkillText.trim()];
      updateCurrentWeek({ skillsLearned: updatedSkills });
    }
    setNewSkillText('');
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = currentWeek.skillsLearned.filter((s) => s !== skillToRemove);
    updateCurrentWeek({ skillsLearned: updatedSkills });
  };

  // Add a new week entry
  const handleAddNewWeek = () => {
    const nextWeekNum = logbookData.length > 0 ? Math.max(...logbookData.map((w) => w.weekNumber)) + 1 : 1;
    const newWeek: LogbookWeek = {
      weekNumber: nextWeekNum,
      startDate: 'Auto Date',
      endDate: 'Auto Date',
      title: `Industrial Training & Project Phase ${nextWeekNum}`,
      objectives: 'Conduct specialized laboratory practicals, technical documentation, and project reviews.',
      activities: [
        'Engage in hands-on departmental rotation and diagnostic troubleshooting.',
        'Document technical observations and supervisor recommendations.'
      ],
      skillsLearned: ['Technical Documentation', 'Practical Problem Solving'],
      supervisorRemarks: 'Progress reviewed and endorsed for academic compliance.',
      status: 'Completed'
    };

    setLogbookData((prev) => [...prev, newWeek]);
    setSelectedWeekNum(nextWeekNum);
    setIsEditing(true);
  };

  // Reset to original default data
  const handleResetToDefaults = () => {
    if (window.confirm('Reset the Weekly Logbook back to the original curriculum defaults? Any custom modifications will be replaced.')) {
      setLogbookData(initialData);
      setSelectedWeekNum(1);
      setIsEditing(false);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      const now = new Date();
      setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  // Export Logbook Data
  const handleExportLogbook = () => {
    const exportString = JSON.stringify(logbookData, null, 2);
    const blob = new Blob([exportString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIWES_Weekly_Logbook_Backup.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const completedWeeksCount = logbookData.filter((w) => w.status === 'Completed').length;
  const totalWeeksCount = logbookData.length;
  const completionPercentage = totalWeeksCount > 0 ? Math.round((completedWeeksCount / totalWeeksCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner with Auto-Save Indicator */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {totalWeeksCount}-Week Industrial Experience Logbook
            </span>
            <span className="text-xs text-slate-400">10th May, 2026 – 11th August, 2026</span>
            
            {/* Live Auto-Save Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>
                {saveStatus === 'saving' ? 'Auto-saving to localStorage...' : `Auto-saved locally (${lastSavedTime || 'Active'})`}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mt-2">SIWES Weekly Logbook & Progress Records</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Systematic day-to-day log of practical training activities conducted at ZITDA Headquarters, Gusau. All modifications automatically save to browser storage so student progress is permanently preserved.
          </p>
        </div>

        {/* Action Controls & Progress */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isEditing
                ? 'bg-[#38BDF8] text-[#0A0B0E] shadow-sm'
                : 'bg-[#1E293B] hover:bg-[#334155] text-slate-200 border border-[#334155]'
            }`}
            title="Toggle inline editing for objectives, tasks, and remarks"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Done Editing' : 'Edit Logbook Entries'}</span>
          </button>

          <button
            onClick={handleAddNewWeek}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-semibold border border-[#334155] transition-all cursor-pointer"
            title="Append a new week to the training logbook"
          >
            <Plus className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Add Week</span>
          </button>

          <button
            onClick={handleExportLogbook}
            className="p-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-300 border border-[#334155] transition-all cursor-pointer"
            title="Download JSON backup of logbook"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetToDefaults}
            className="p-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-400 hover:text-white border border-[#334155] transition-all cursor-pointer"
            title="Reset to official curriculum defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="pl-2 border-l border-[#1E293B] flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs font-bold text-[#10B981] block">{completionPercentage}% Completed</span>
              <span className="text-[11px] text-slate-400">{completedWeeksCount} of {totalWeeksCount} Approved</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-bold border border-[#10B981]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {logbookData.map((week) => (
          <button
            key={week.weekNumber}
            onClick={() => setSelectedWeekNum(week.weekNumber)}
            className={`p-3 rounded-xl border text-left transition-all relative group cursor-pointer ${
              selectedWeekNum === week.weekNumber
                ? 'bg-[#1E293B] text-white border-[#38BDF8] shadow-md ring-2 ring-[#38BDF8]/20'
                : 'bg-[#0F172A] text-slate-400 border-[#1E293B] hover:border-[#38BDF8]/40 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${selectedWeekNum === week.weekNumber ? 'text-[#38BDF8]' : 'text-slate-500'}`}>
                WEEK {week.weekNumber}
              </span>
              <CheckCircle2 className={`w-3.5 h-3.5 ${selectedWeekNum === week.weekNumber ? 'text-[#38BDF8]' : 'text-[#10B981]'}`} />
            </div>
            <p className="text-xs font-semibold mt-1 truncate text-slate-200">{week.title.split('&')[0]}</p>
          </button>
        ))}
      </div>

      {/* Selected Week Detailed Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-6">
        {/* Card Header & Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wide">
                Week {currentWeek.weekNumber} Breakdown
              </span>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {isEditing ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={currentWeek.startDate}
                      onChange={(e) => updateCurrentWeek({ startDate: e.target.value })}
                      placeholder="Start Date"
                      className="px-2 py-0.5 text-xs bg-[#1E293B] border border-[#334155] rounded text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                    <span>–</span>
                    <input
                      type="text"
                      value={currentWeek.endDate}
                      onChange={(e) => updateCurrentWeek({ endDate: e.target.value })}
                      placeholder="End Date"
                      className="px-2 py-0.5 text-xs bg-[#1E293B] border border-[#334155] rounded text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                ) : (
                  <span>{currentWeek.startDate} – {currentWeek.endDate}</span>
                )}
              </div>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={currentWeek.title}
                onChange={(e) => updateCurrentWeek({ title: e.target.value })}
                className="w-full text-base sm:text-lg font-bold text-white mt-1.5 px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-xl focus:outline-none focus:border-[#38BDF8]"
                placeholder="Week Title"
              />
            ) : (
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {currentWeek.title}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => updateCurrentWeek({ status: currentWeek.status === 'Completed' ? 'In Progress' : 'Completed' })}
              className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentWeek.status === 'Completed'
                  ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 hover:bg-[#10B981]/25'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25'
              }`}
              title="Click to toggle completion status"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentWeek.status === 'Completed' ? 'Supervisor Verified' : 'In Progress'}</span>
            </button>
          </div>
        </div>

        {/* Objectives Box */}
        <div className="p-4 rounded-xl bg-[#1E293B]/50 border border-[#334155]">
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#38BDF8]" />
              Weekly Learning Objectives
            </div>
            {isEditing && <span className="text-[10px] text-[#38BDF8] font-normal lowercase">auto-saves as you type</span>}
          </div>

          {isEditing ? (
            <textarea
              value={currentWeek.objectives}
              onChange={(e) => updateCurrentWeek({ objectives: e.target.value })}
              rows={2}
              className="w-full text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 focus:outline-none focus:border-[#38BDF8]"
              placeholder="Enter weekly objectives..."
            />
          ) : (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentWeek.objectives}
            </p>
          )}
        </div>

        {/* Daily Activities Checklist */}
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-white uppercase tracking-wider mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              Detailed Practical Tasks & Industrial Activities
            </div>
            <span className="text-[11px] font-normal text-slate-400 font-mono">
              {currentWeek.activities?.length || 0} Practical Tasks
            </span>
          </div>

          <div className="space-y-2.5">
            {currentWeek.activities && currentWeek.activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#1E293B]/30 border border-[#334155]/60 hover:border-[#38BDF8]/40 transition-colors group">
                <div className="w-5 h-5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-[#38BDF8]/30">
                  {idx + 1}
                </div>

                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={act}
                      onChange={(e) => handleUpdateActivity(idx, e.target.value)}
                      className="flex-1 text-xs sm:text-sm text-slate-200 bg-[#1E293B] border border-[#334155] rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#38BDF8]"
                    />
                    <button
                      onClick={() => handleRemoveActivity(idx)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                      title="Remove task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex-1">
                    {act}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Add New Activity Input */}
          {isEditing && (
            <div className="mt-3 flex items-center gap-2 p-2 bg-[#1E293B]/60 border border-[#334155] rounded-xl">
              <input
                type="text"
                placeholder="Add another practical task performed this week..."
                value={newActivityText}
                onChange={(e) => setNewActivityText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddActivity();
                  }
                }}
                className="flex-1 text-xs text-white bg-transparent px-2 py-1 focus:outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={handleAddActivity}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#38BDF8] text-[#0A0B0E] text-xs font-bold rounded-lg hover:bg-[#38BDF8]/90 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                Add Task
              </button>
            </div>
          )}
        </div>

        {/* Skills Gained Pills */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider mb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Competencies & Skills Acquired
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {currentWeek.skillsLearned && currentWeek.skillsLearned.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 flex items-center gap-1.5"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-400 ml-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}

            {isEditing && (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="New skill (e.g. Wireshark)..."
                  value={newSkillText}
                  onChange={(e) => setNewSkillText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="px-2.5 py-1 text-xs bg-[#1E293B] border border-[#334155] rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
                <button
                  onClick={handleAddSkill}
                  className="p-1 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 border border-[#38BDF8]/30 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Supervisor Endorsement */}
        <div className="pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-[#1E293B]/60 border border-[#334155] p-4 rounded-xl">
          <div className="flex-1">
            <span className="font-bold text-white block">ZITDA Supervisor Remarks:</span>
            {isEditing ? (
              <input
                type="text"
                value={currentWeek.supervisorRemarks}
                onChange={(e) => updateCurrentWeek({ supervisorRemarks: e.target.value })}
                className="w-full text-xs text-slate-200 mt-1 px-2.5 py-1 bg-[#1E293B] border border-[#334155] rounded-lg focus:outline-none focus:border-[#38BDF8]"
                placeholder="Supervisor feedback remarks..."
              />
            ) : (
              <p className="text-slate-300 italic mt-0.5">"{currentWeek.supervisorRemarks}"</p>
            )}
          </div>
          <div className="text-slate-400 font-mono text-[11px] shrink-0">
            Sign-off: <span className="text-[#10B981] font-bold">Approved & Endorsed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
