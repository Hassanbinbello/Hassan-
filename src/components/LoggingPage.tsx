import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Clock3, 
  Tag, 
  Wrench, 
  Lightbulb, 
  Award, 
  Trash2, 
  Edit3, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  ShieldCheck, 
  Star, 
  X, 
  Check, 
  Copy, 
  Layers, 
  BarChart2, 
  Laptop, 
  Cpu, 
  Flame,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import { DailyLogEntry, SystemAuditLog, ReportMetadata } from '../types';
import { initialDailyLogs, initialSystemAuditLogs, unitCategories, quickTaskTemplates } from '../data/loggingData';

interface LoggingPageProps {
  metadata?: ReportMetadata;
}

export const LoggingPage: React.FC<LoggingPageProps> = ({ metadata }) => {
  // Local state persisted in localStorage
  const [logs, setLogs] = useState<DailyLogEntry[]>(() => {
    const saved = localStorage.getItem('zitda_siwes_daily_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved logs', e);
      }
    }
    return initialDailyLogs;
  });

  const [systemLogs, setSystemLogs] = useState<SystemAuditLog[]>(() => {
    const saved = localStorage.getItem('zitda_siwes_audit_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse audit logs', e);
      }
    }
    return initialSystemAuditLogs;
  });

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('zitda_siwes_daily_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('zitda_siwes_audit_logs', JSON.stringify(systemLogs));
  }, [systemLogs]);

  // View Sub-tab
  const [activeTab, setActiveTab] = useState<'entries' | 'weekly' | 'audit' | 'analytics'>('entries');

  // Search, Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedWeek, setSelectedWeek] = useState<number | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Approved' | 'Pending Review' | 'Flagged'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'hours-desc'>('newest');

  // Modals & Drawers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<DailyLogEntry | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<DailyLogEntry>>({
    date: new Date().toISOString().split('T')[0],
    dayOfWeek: 'Monday',
    weekNumber: 1,
    unit: 'IT Infrastructure & Networking',
    taskTitle: '',
    description: '',
    toolsUsed: [],
    challenges: '',
    solution: '',
    hoursSpent: 8.0,
    skillsLearned: [],
    supervisorStatus: 'Approved',
    supervisorNotes: 'Completed with satisfactory technical rigor.',
    rating: 5,
  });

  const [toolInput, setToolInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  // Weekly Accordion Expansion State
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  // New simulated live telemetry entry input
  const [newAuditMessage, setNewAuditMessage] = useState('');
  const [newAuditType, setNewAuditType] = useState<SystemAuditLog['eventType']>('NETWORK');

  // Stats Calculations
  const stats = useMemo(() => {
    const totalEntries = logs.length;
    const totalHours = logs.reduce((sum, log) => sum + (Number(log.hoursSpent) || 0), 0);
    const approvedCount = logs.filter(l => l.supervisorStatus === 'Approved').length;
    const approvedRate = totalEntries > 0 ? Math.round((approvedCount / totalEntries) * 100) : 0;
    
    // Unique weeks
    const uniqueWeeks = Array.from(new Set(logs.map(l => Number(l.weekNumber)))).sort((a: number, b: number) => a - b);
    
    // Units distribution
    const unitCounts: Record<string, number> = {};
    logs.forEach(l => {
      unitCounts[l.unit] = (unitCounts[l.unit] || 0) + 1;
    });

    return {
      totalEntries,
      totalHours,
      approvedCount,
      approvedRate,
      uniqueWeeks,
      unitCounts
    };
  }, [logs]);

  // Filtered & Sorted Logs
  const filteredLogs = useMemo(() => {
    return logs
      .filter(log => {
        // Search matching
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
          !q ||
          log.taskTitle.toLowerCase().includes(q) ||
          log.description.toLowerCase().includes(q) ||
          log.unit.toLowerCase().includes(q) ||
          log.toolsUsed.some(t => t.toLowerCase().includes(q)) ||
          log.skillsLearned.some(s => s.toLowerCase().includes(q)) ||
          (log.challenges && log.challenges.toLowerCase().includes(q));

        // Unit filter
        const matchesUnit = selectedUnit === 'All Units' || log.unit === selectedUnit;

        // Week filter
        const matchesWeek = selectedWeek === 'All' || log.weekNumber === selectedWeek;

        // Status filter
        const matchesStatus = selectedStatus === 'All' || log.supervisorStatus === selectedStatus;

        return matchesSearch && matchesUnit && matchesWeek && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortOrder === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortOrder === 'hours-desc') {
          return (b.hoursSpent || 0) - (a.hoursSpent || 0);
        }
        return 0;
      });
  }, [logs, searchQuery, selectedUnit, selectedWeek, selectedStatus, sortOrder]);

  // Grouped by week for Weekly tab
  const logsByWeek = useMemo(() => {
    const map: Record<number, DailyLogEntry[]> = {};
    logs.forEach(log => {
      if (!map[log.weekNumber]) {
        map[log.weekNumber] = [];
      }
      map[log.weekNumber].push(log);
    });
    return map;
  }, [logs]);

  // Open Form for New Entry
  const handleOpenNewForm = () => {
    setEditingLog(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: 'Monday',
      weekNumber: logs.length > 0 ? Math.max(...logs.map(l => l.weekNumber)) : 1,
      unit: 'IT Infrastructure & Networking',
      taskTitle: '',
      description: '',
      toolsUsed: ['Cat6 Cable', 'RJ45 Crimper'],
      challenges: '',
      solution: '',
      hoursSpent: 8.0,
      skillsLearned: ['Structured Cabling', 'Network Diagnostics'],
      supervisorStatus: 'Approved',
      supervisorNotes: 'Task completed according to standard agency specifications.',
      rating: 5,
    });
    setToolInput('');
    setSkillInput('');
    setIsFormOpen(true);
  };

  // Open Form for Editing Existing Entry
  const handleOpenEditForm = (log: DailyLogEntry) => {
    setEditingLog(log);
    setFormData({ ...log });
    setToolInput('');
    setSkillInput('');
    setIsFormOpen(true);
  };

  // Apply Quick Template
  const handleApplyTemplate = (tmpl: typeof quickTaskTemplates[0]) => {
    setEditingLog(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: 'Monday',
      weekNumber: 1,
      unit: tmpl.unit,
      taskTitle: tmpl.title,
      description: tmpl.desc,
      toolsUsed: [...tmpl.tools],
      challenges: 'Overcoming technical precision constraints during setup.',
      solution: 'Applied step-by-step verification using laboratory testing instruments.',
      hoursSpent: tmpl.hours,
      skillsLearned: [...tmpl.skills],
      supervisorStatus: 'Approved',
      supervisorNotes: 'Demonstrated good competence during practical execution.',
      rating: 5,
    });
    setIsTemplateModalOpen(false);
    setIsFormOpen(true);
  };

  // Save / Update Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.taskTitle?.trim() || !formData.description?.trim()) {
      alert('Please provide a Task Title and Description.');
      return;
    }

    if (editingLog) {
      // Update existing
      setLogs(prev => prev.map(item => item.id === editingLog.id ? { ...item, ...(formData as DailyLogEntry) } : item));
    } else {
      // Create new
      const newEntry: DailyLogEntry = {
        id: `log-${Date.now()}`,
        date: formData.date || new Date().toISOString().split('T')[0],
        dayOfWeek: formData.dayOfWeek || 'Monday',
        weekNumber: Number(formData.weekNumber) || 1,
        unit: formData.unit || 'IT Infrastructure & Networking',
        taskTitle: formData.taskTitle || 'Untitled Practical Task',
        description: formData.description || '',
        toolsUsed: formData.toolsUsed || [],
        challenges: formData.challenges || 'No major blockers encountered.',
        solution: formData.solution || 'Followed standard operating procedures.',
        hoursSpent: Number(formData.hoursSpent) || 8,
        skillsLearned: formData.skillsLearned || [],
        supervisorStatus: formData.supervisorStatus || 'Approved',
        supervisorNotes: formData.supervisorNotes || 'Satisfactory work performed.',
        rating: formData.rating || 5,
      };

      setLogs(prev => [newEntry, ...prev]);

      // Also append a telemetry system audit log
      const newAudit: SystemAuditLog = {
        id: `sys-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        eventType: 'MAINTENANCE',
        severity: 'success',
        source: 'SIWES Logger Portal',
        message: `New activity log entry created: "${newEntry.taskTitle}" (Week ${newEntry.weekNumber})`,
        details: `Unit: ${newEntry.unit} | Hours: ${newEntry.hoursSpent}h | Recorded for ${metadata?.studentName || 'Candidate'}`
      };
      setSystemLogs(prev => [newAudit, ...prev]);
    }

    setIsFormOpen(false);
  };

  // Delete Log
  const handleDeleteLog = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete this log entry: "${title}"?`)) {
      setLogs(prev => prev.filter(l => l.id !== id));
    }
  };

  // Toggle Quick Status
  const handleToggleStatus = (id: string) => {
    setLogs(prev => prev.map(log => {
      if (log.id === id) {
        const nextStatus = log.supervisorStatus === 'Approved' ? 'Pending Review' : 'Approved';
        return { ...log, supervisorStatus: nextStatus };
      }
      return log;
    }));
  };

  // Add Tag Handlers
  const handleAddTool = () => {
    if (toolInput.trim()) {
      const current = formData.toolsUsed || [];
      if (!current.includes(toolInput.trim())) {
        setFormData({ ...formData, toolsUsed: [...current, toolInput.trim()] });
      }
      setToolInput('');
    }
  };

  const handleRemoveTool = (tool: string) => {
    const current = formData.toolsUsed || [];
    setFormData({ ...formData, toolsUsed: current.filter(t => t !== tool) });
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const current = formData.skillsLearned || [];
      if (!current.includes(skillInput.trim())) {
        setFormData({ ...formData, skillsLearned: [...current, skillInput.trim()] });
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const current = formData.skillsLearned || [];
    setFormData({ ...formData, skillsLearned: current.filter(s => s !== skill) });
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Log ID',
      'Date',
      'Day',
      'Week',
      'Unit',
      'Task Title',
      'Hours',
      'Tools Used',
      'Description',
      'Challenges',
      'Solution',
      'Skills Acquired',
      'Supervisor Status',
      'Supervisor Remarks',
      'Rating'
    ];

    const rows = logs.map(l => [
      `"${l.id}"`,
      `"${l.date}"`,
      `"${l.dayOfWeek}"`,
      `"${l.weekNumber}"`,
      `"${l.unit.replace(/"/g, '""')}"`,
      `"${l.taskTitle.replace(/"/g, '""')}"`,
      `"${l.hoursSpent}"`,
      `"${l.toolsUsed.join(', ').replace(/"/g, '""')}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${l.challenges.replace(/"/g, '""')}"`,
      `"${l.solution.replace(/"/g, '""')}"`,
      `"${l.skillsLearned.join(', ').replace(/"/g, '""')}"`,
      `"${l.supervisorStatus}"`,
      `"${(l.supervisorNotes || '').replace(/"/g, '""')}"`,
      `"${l.rating || 5}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIWES_Daily_Logs_${metadata?.matricNumber || '2310308098'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Daily Log Sheet
  const handlePrintLogs = () => {
    window.print();
  };

  // Add Manual Audit Entry
  const handleAddAuditLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuditMessage.trim()) return;

    const newAudit: SystemAuditLog = {
      id: `sys-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType: newAuditType,
      severity: newAuditType === 'SECURITY' ? 'warning' : 'info',
      source: 'Operator Console',
      message: newAuditMessage.trim(),
      details: 'Recorded via live logging interface.'
    };

    setSystemLogs(prev => [newAudit, ...prev]);
    setNewAuditMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Overview Metrics */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                SIWES Practical Activity Logger
              </span>
              <span className="text-xs text-slate-400">
                Host Agency: <strong className="text-slate-200">ZITDA Gusau</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">
                Candidate: <strong className="text-slate-200">{metadata?.studentName || 'Hassan Bin Bello'}</strong> (<span className="text-[#38BDF8] font-mono">{metadata?.matricNumber || '2310308098'}</span>)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Industrial Daily Work Log & Diagnostic Experience Journal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Systematic day-to-day documentation of hardware maintenance, structured Cat6 cabling, Cisco network switch administration, semantic web development, and digital literacy facilitation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleOpenNewForm}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#0A0B0E] text-xs font-bold shadow-lg shadow-sky-950/40 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Log New Activity
            </button>

            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-semibold border border-[#334155] transition-all cursor-pointer"
              title="Select from pre-defined SIWES IT task templates"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              Quick Templates
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-semibold border border-[#334155] transition-all cursor-pointer"
              title="Download entire log records as formatted CSV file"
            >
              <Download className="w-3.5 h-3.5 text-[#10B981]" />
              Export CSV
            </button>

            <button
              onClick={handlePrintLogs}
              className="p-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 border border-[#334155] transition-all cursor-pointer no-print"
              title="Print Official Logbook Record"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#1E293B]">
          <div className="p-3.5 rounded-xl bg-[#0A0B0E]/60 border border-[#1E293B]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Total Logged Entries</span>
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stats.totalEntries}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Comprehensive daily records</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0A0B0E]/60 border border-[#1E293B]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Total Training Hours</span>
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            </div>
            <div className="text-2xl font-bold text-[#10B981] font-mono">{stats.totalHours.toFixed(1)} hrs</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Avg ~{(stats.totalHours / Math.max(1, stats.totalEntries)).toFixed(1)} hrs/day</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0A0B0E]/60 border border-[#1E293B]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Supervisor Verification</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stats.approvedRate}%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{stats.approvedCount} of {stats.totalEntries} verified</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0A0B0E]/60 border border-[#1E293B]">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Units & Rotations</span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono">{Object.keys(stats.unitCounts).length} Units</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Hardware, Net, Web, Dev</div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-[#0F172A] border border-[#1E293B] rounded-2xl">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('entries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'entries'
                ? 'bg-[#1E293B] text-white border border-[#38BDF8]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Daily Work Entries ({filteredLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'weekly'
                ? 'bg-[#1E293B] text-white border border-[#38BDF8]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Weekly Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-[#1E293B] text-white border border-[#38BDF8]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Competencies & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-[#1E293B] text-white border border-[#38BDF8]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#1E293B]/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
            <span>System & Network Telemetry ({systemLogs.length})</span>
          </button>
        </div>

        {activeTab === 'entries' && (
          <div className="flex items-center gap-2 px-2 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#38BDF8]" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-[#1E293B] text-slate-200 rounded-lg px-2.5 py-1 text-xs border border-[#334155] focus:outline-none focus:border-[#38BDF8]"
            >
              <option value="newest">Sort: Date (Newest First)</option>
              <option value="oldest">Sort: Date (Oldest First)</option>
              <option value="hours-desc">Sort: Highest Hours</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: DAILY WORK ENTRIES */}
      {activeTab === 'entries' && (
        <div className="space-y-4">
          {/* Search & Multi-Filter Control Strip */}
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tasks, tools, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#1E293B] rounded-xl border border-[#334155] text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            {/* Unit Filter */}
            <div>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#1E293B] rounded-xl border border-[#334155] text-slate-200 focus:outline-none focus:border-[#38BDF8]"
              >
                {unitCategories.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {/* Week Filter */}
            <div>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-[#1E293B] rounded-xl border border-[#334155] text-slate-200 focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="All">All Weeks (Week 1 – 6+)</option>
                {stats.uniqueWeeks.map(w => (
                  <option key={w} value={w}>Week {w}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs bg-[#1E293B] rounded-xl border border-[#334155] text-slate-200 focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="All">All Verification Statuses</option>
                <option value="Approved">Approved / Verified Only</option>
                <option value="Pending Review">Pending Review Only</option>
                <option value="Flagged">Flagged Only</option>
              </select>
            </div>
          </div>

          {/* Entries List */}
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Matching Activity Logs Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No daily logs matched your search filters. Try clearing the search query or changing the selected unit or week.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedUnit('All Units');
                  setSelectedWeek('All');
                  setSelectedStatus('All');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#38BDF8] bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 rounded-xl border border-[#38BDF8]/30 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] hover:border-[#38BDF8]/30 transition-all shadow-md space-y-4 group"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                        WEEK {log.weekNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1 bg-[#1E293B] px-2.5 py-0.5 rounded-lg border border-[#334155]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {log.date} ({log.dayOfWeek})
                      </span>
                      <span className="text-xs font-medium text-slate-400 bg-[#1E293B]/70 px-2.5 py-0.5 rounded-lg">
                        {log.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Hours Badge */}
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#1E293B] text-[#10B981] border border-[#334155]">
                        <Clock className="w-3.5 h-3.5" />
                        {log.hoursSpent} hrs
                      </span>

                      {/* Status Badge */}
                      <button
                        onClick={() => handleToggleStatus(log.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          log.supervisorStatus === 'Approved'
                            ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/25'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'
                        }`}
                        title="Click to toggle approval status"
                      >
                        {log.supervisorStatus === 'Approved' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock3 className="w-3.5 h-3.5" />
                        )}
                        <span>{log.supervisorStatus}</span>
                      </button>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditForm(log)}
                          className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white border border-[#334155] transition-colors"
                          title="Edit Log Entry"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLog(log.id, log.taskTitle)}
                          className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-[#334155] transition-colors"
                          title="Delete Log Entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Task Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {log.taskTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {log.description}
                    </p>
                  </div>

                  {/* Tools & Equipment Used */}
                  {log.toolsUsed && log.toolsUsed.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                        <Wrench className="w-3 h-3 text-[#38BDF8]" />
                        Tools & Apparatus:
                      </span>
                      {log.toolsUsed.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs font-mono bg-[#1E293B] text-slate-200 rounded-md border border-[#334155]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Challenges & Solution Callout */}
                  {(log.challenges || log.solution) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0A0B0E] border border-[#1E293B]">
                      <div>
                        <div className="text-[11px] font-bold uppercase text-amber-400 flex items-center gap-1 mb-1">
                          <AlertCircle className="w-3 h-3" />
                          Technical Obstacle / Diagnostic Issue:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {log.challenges || 'None reported.'}
                        </p>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold uppercase text-[#10B981] flex items-center gap-1 mb-1">
                          <Lightbulb className="w-3 h-3" />
                          Applied Solution & Technical Remediation:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {log.solution || 'Followed standard procedure.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Skills Learned & Supervisor Note Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1E293B] text-xs">
                    {/* Skills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                        <Award className="w-3 h-3 text-amber-400" />
                        Competencies:
                      </span>
                      {log.skillsLearned.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-medium bg-[#38BDF8]/10 text-[#38BDF8] rounded border border-[#38BDF8]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Supervisor Evaluation */}
                    {log.supervisorNotes && (
                      <div className="flex items-center gap-2 text-slate-400 italic bg-[#1E293B]/40 px-3 py-1.5 rounded-lg border border-[#334155]/60">
                        <span className="text-slate-300 font-semibold not-italic">Supervisor:</span>
                        <span>"{log.supervisorNotes}"</span>
                        <div className="flex text-amber-400 not-italic ml-1">
                          {[...Array(log.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WEEKLY BREAKDOWN ACCORDION */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          {stats.uniqueWeeks.map((weekNum) => {
            const weekEntries = logsByWeek[weekNum] || [];
            const weekHours = weekEntries.reduce((sum, e) => sum + (e.hoursSpent || 0), 0);
            const isExpanded = expandedWeeks[weekNum] ?? true;

            return (
              <div
                key={weekNum}
                className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-md"
              >
                {/* Week Accordion Header */}
                <div
                  onClick={() => setExpandedWeeks(prev => ({ ...prev, [weekNum]: !isExpanded }))}
                  className="p-5 bg-[#0F172A] hover:bg-[#1E293B]/40 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/20 text-[#38BDF8] font-bold flex items-center justify-center border border-[#38BDF8]/30">
                      W{weekNum}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Week {weekNum} Industrial Cumulative Journal
                      </h3>
                      <p className="text-xs text-slate-400">
                        {weekEntries.length} daily task records logged
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#1E293B] text-[#10B981] border border-[#334155]">
                      {weekHours.toFixed(1)} Hours Total
                    </span>

                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approved
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Week Expanded Content */}
                {isExpanded && (
                  <div className="p-5 space-y-3 bg-[#0A0B0E]/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {weekEntries.map(entry => (
                        <div
                          key={entry.id}
                          className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-2 hover:border-[#38BDF8]/30 transition-all"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#38BDF8]">{entry.dayOfWeek} • {entry.date}</span>
                            <span className="font-mono text-[#10B981] bg-[#1E293B] px-2 py-0.5 rounded">{entry.hoursSpent}h</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white truncate">{entry.taskTitle}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{entry.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-[#1E293B] text-[11px] text-slate-500">
                            <span>{entry.unit}</span>
                            <span className="text-[#10B981] font-semibold">{entry.supervisorStatus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: COMPETENCIES & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unit Distribution Breakdown */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#38BDF8]" />
                  Rotational Unit Allocation
                </h3>
                <span className="text-xs text-slate-400 font-mono">{stats.totalEntries} Total Logs</span>
              </div>

              <div className="space-y-3">
                {Object.entries(stats.unitCounts).map(([unit, count]) => {
                  const numCount = Number(count);
                  const pct = Math.round((numCount / Math.max(1, stats.totalEntries)) * 100);
                  return (
                    <div key={unit} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium truncate max-w-xs">{unit}</span>
                        <span className="text-slate-400 font-mono">{numCount} tasks ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#38BDF8] to-[#10B981] rounded-full"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practical Technical Competency Matrix */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Key Practical Competencies Mastered
                </h3>
                <span className="text-xs text-[#10B981] font-semibold">100% Practical Verification</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { title: 'T568A/B Structured Cabling', level: 'Advanced', desc: 'RJ45 crimping, punchdown keystones, patch panels' },
                  { title: 'LAN Subnetting & IPv4 Routing', level: 'Advanced', desc: 'CIDR addressing, static IP, DHCP scopes' },
                  { title: 'Cisco Switch IOS Hardening', level: 'Intermediate', desc: 'CLI configuration, port duplex, console baud' },
                  { title: 'PC Hardware Diagnostics', level: 'Advanced', desc: 'PSU testing, ESD safety, heatsink repasting' },
                  { title: 'Semantic Web Development', level: 'Advanced', desc: 'HTML5 DOM hierarchy, CSS3 Flexbox & Grid' },
                  { title: 'Windows Server Active Directory', level: 'Intermediate', desc: 'User provisioning, GPO policy enforcement' },
                  { title: 'Endpoint Security & Antivirus', level: 'Intermediate', desc: 'Process analysis, vulnerability scanning' },
                  { title: 'Optical Fiber Inspection', level: 'Intermediate', desc: 'Visual fault locator, SC/LC ferrule hygiene' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0A0B0E] border border-[#1E293B] space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-200 truncate">{item.title}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Departmental Logbook Verification Statement */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                Official Departmental SIWES Compliance Attestation
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                All daily activity entries have been reviewed against the curriculum benchmarks of the Department of Computer Science, Federal University Gusau.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handlePrintLogs}
                className="px-4 py-2 rounded-xl bg-[#38BDF8] text-[#0A0B0E] text-xs font-bold hover:bg-[#38BDF8]/90 transition-all cursor-pointer"
              >
                Generate Certified Log PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM & NETWORK AUDIT TELEMETRY LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#38BDF8]" />
                  ZITDA Laboratory Diagnostic Telemetry & System Audit Log
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time event stream of network packet traces, server daemon bindings, Active Directory policy pushes, and hardware security alerts.
                </p>
              </div>

              <form onSubmit={handleAddAuditLog} className="flex items-center gap-2">
                <select
                  value={newAuditType}
                  onChange={(e) => setNewAuditType(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs bg-[#1E293B] text-slate-200 rounded-xl border border-[#334155] focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="NETWORK">Network Event</option>
                  <option value="SERVER">Server Daemon</option>
                  <option value="SECURITY">Security / Auth</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>

                <input
                  type="text"
                  placeholder="Record custom telemetry message..."
                  value={newAuditMessage}
                  onChange={(e) => setNewAuditMessage(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-[#1E293B] text-white rounded-xl border border-[#334155] focus:outline-none focus:border-[#38BDF8] min-w-[200px]"
                />

                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-[#38BDF8] text-[#0A0B0E] rounded-xl hover:bg-[#38BDF8]/90 transition-all cursor-pointer shrink-0"
                >
                  Push Event
                </button>
              </form>
            </div>

            {/* Terminal Window */}
            <div className="rounded-xl bg-[#0A0B0E] border border-[#1E293B] p-4 font-mono text-xs space-y-2 max-h-[500px] overflow-y-auto">
              <div className="text-slate-500 pb-2 border-b border-[#1E293B] flex items-center justify-between text-[11px]">
                <span>[TIMESTAMP] [SUBSYSTEM] [SEVERITY] MESSAGE / DIAGNOSTIC DETAILS</span>
                <span className="text-[#10B981] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  Telemetry Daemon Active
                </span>
              </div>

              {systemLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-lg bg-[#0F172A]/80 border border-[#1E293B] hover:border-[#38BDF8]/40 transition-colors space-y-1"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      log.eventType === 'NETWORK' ? 'bg-[#38BDF8]/20 text-[#38BDF8]' :
                      log.eventType === 'SECURITY' ? 'bg-amber-500/20 text-amber-300' :
                      log.eventType === 'SERVER' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-[#10B981]/20 text-[#10B981]'
                    }`}>
                      [{log.eventType}]
                    </span>
                    <span className="text-slate-400 font-semibold">{log.source}</span>
                  </div>
                  <div className="text-slate-100 font-medium">{log.message}</div>
                  {log.details && (
                    <div className="text-slate-400 text-[11px] pl-2 border-l border-slate-700">
                      {log.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ACTIVITY LOG MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-[#0F172A] rounded-2xl shadow-2xl border border-[#1E293B] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1E293B] bg-[#0A0B0E]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {editingLog ? 'Edit SIWES Activity Log Entry' : 'Create New SIWES Daily Activity Log'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Record day-to-day practical tasks, tools used, obstacles, and competencies
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto">
              {/* Row 1: Task Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Practical Task Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ethernet Cat6 Straight-Through Cable Termination & Pin Verification"
                  value={formData.taskTitle}
                  onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-medium"
                  required
                />
              </div>

              {/* Row 2: Date, Day, Week, Hours */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Day of Week</label>
                  <select
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Week Number</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={formData.weekNumber}
                    onChange={(e) => setFormData({ ...formData, weekNumber: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hours Spent</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="14"
                    value={formData.hoursSpent}
                    onChange={(e) => setFormData({ ...formData, hoursSpent: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-[#10B981] font-bold focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Unit / Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ZITDA Unit / Department</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                >
                  {unitCategories.filter(u => u !== 'All Units').map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              {/* Row 4: Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Description of Practical Work Done <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe step-by-step operations, hardware components handled, software commands executed, or diagnostic observations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] leading-relaxed"
                  required
                />
              </div>

              {/* Row 5: Tools Used (Interactive Tags) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tools, Software & Apparatus Used</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type tool name (e.g. RJ45 Crimper, Multimeter, VS Code)..."
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTool();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="px-3 py-1.5 text-xs font-bold bg-[#1E293B] hover:bg-[#334155] text-[#38BDF8] rounded-xl border border-[#334155] transition-colors"
                  >
                    Add Tool
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.toolsUsed || []).map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 px-2.5 py-0.5 text-xs bg-[#1E293B] text-slate-200 rounded-lg border border-[#334155]"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(t)}
                        className="text-slate-400 hover:text-red-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 6: Challenges & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Technical Obstacle Encountered</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Pin 4 continuity fault on cable tester..."
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Applied Solution / Fix</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Re-stripped cable and crimped fresh RJ45 connector..."
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              {/* Row 7: Skills Acquired Tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skills & Competencies Gained</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type skill name (e.g. Structured Cabling, IPv4 Subnetting)..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 text-xs font-bold bg-[#1E293B] hover:bg-[#334155] text-[#38BDF8] rounded-xl border border-[#334155] transition-colors"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.skillsLearned || []).map((s) => (
                    <span
                      key={s}
                      className="flex items-center gap-1 px-2.5 py-0.5 text-xs bg-[#38BDF8]/10 text-[#38BDF8] rounded-lg border border-[#38BDF8]/20"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="text-slate-400 hover:text-red-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 8: Supervisor Endorsement Status & Remarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1E293B]">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Supervisor Approval Status</label>
                  <select
                    value={formData.supervisorStatus}
                    onChange={(e) => setFormData({ ...formData, supervisorStatus: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    <option value="Approved">Approved & Signed</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Flagged">Flagged for Correction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Supervisor Remarks</label>
                  <input
                    type="text"
                    value={formData.supervisorNotes}
                    onChange={(e) => setFormData({ ...formData, supervisorNotes: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-[#0A0B0E] bg-[#38BDF8] hover:bg-[#38BDF8]/90 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  {editingLog ? 'Update Activity Log' : 'Save & Append Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK TEMPLATE SELECTION MODAL */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-[#0F172A] rounded-2xl shadow-2xl border border-[#1E293B] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#1E293B] bg-[#0A0B0E]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#38BDF8]" />
                <div>
                  <h3 className="font-bold text-base text-white">SIWES Standard Task Templates</h3>
                  <p className="text-xs text-slate-400">Select a pre-configured technical task for fast logging</p>
                </div>
              </div>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E293B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 overflow-y-auto">
              {quickTaskTemplates.map((tmpl, idx) => (
                <div
                  key={idx}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1E293B] hover:border-[#38BDF8] hover:bg-[#1E293B]/40 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {tmpl.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#10B981] bg-[#1E293B] px-2 py-0.5 rounded border border-[#334155]">
                      {tmpl.hours} Hours
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{tmpl.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {tmpl.skills.map((s, i) => (
                      <span key={i} className="text-[10px] bg-[#38BDF8]/10 text-[#38BDF8] px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
