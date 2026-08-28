export interface ReportMetadata {
  title: string;
  reportType: string;
  establishment: string;
  location: string;
  state: string;
  studentName: string;
  matricNumber: string;
  department: string;
  institution: string;
  institutionShort: string;
  submissionTarget: string;
  purpose: string;
  startDate: string;
  endDate: string;
  duration: string;
  siwesSupervisorName?: string;
  institutionalSupervisorName?: string;
  academicYear: string;
}

export interface SectionContent {
  id: string;
  number?: string;
  title: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  subsections?: SectionContent[];
  specialComponent?: 'organogram' | 'project_demo' | 'network_demo' | 'signatures' | 'activity_cards';
}

export interface Chapter {
  id: string;
  chapterNumber?: string;
  title: string;
  sections: SectionContent[];
}

export interface OrganogramNode {
  title: string;
  role?: string;
  children?: OrganogramNode[];
  color?: string;
  tag?: string;
}

export interface LogbookWeek {
  weekNumber: number;
  startDate: string;
  endDate: string;
  title: string;
  objectives: string;
  activities: string[];
  skillsLearned: string[];
  supervisorRemarks: string;
  status: 'Completed' | 'In Progress';
}

export interface DailyLogEntry {
  id: string;
  date: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  weekNumber: number;
  unit: string;
  taskTitle: string;
  description: string;
  toolsUsed: string[];
  challenges: string;
  solution: string;
  hoursSpent: number;
  skillsLearned: string[];
  supervisorStatus: 'Approved' | 'Pending Review' | 'Flagged';
  supervisorNotes?: string;
  rating?: number;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  eventType: 'NETWORK' | 'SECURITY' | 'MAINTENANCE' | 'SERVER' | 'AUTH';
  severity: 'info' | 'warning' | 'success' | 'critical';
  source: string;
  message: string;
  details?: string;
}

export interface DefenseSlide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  keyPoints: string[];
  summary: string;
  visualType?: 'cover' | 'organogram' | 'activities' | 'project' | 'results' | 'conclusion';
}
