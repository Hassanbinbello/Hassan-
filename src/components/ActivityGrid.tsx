import React, { useState } from 'react';
import { 
  Cpu, 
  DownloadCloud, 
  Wrench, 
  FolderTree, 
  AlertTriangle, 
  Network, 
  Layers, 
  Code, 
  Palette, 
  Database, 
  ShieldCheck, 
  Monitor, 
  Briefcase
} from 'lucide-react';

interface ActivityItem {
  id: number;
  title: string;
  category: 'Hardware' | 'Networking' | 'Software & Web' | 'Security & Management';
  icon: React.ReactNode;
  summary: string;
  keySkills: string[];
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: 'Computer Hardware Identification',
    category: 'Hardware',
    icon: <Cpu className="w-5 h-5 text-indigo-600" />,
    summary: 'Identification and physical handling of motherboard components, processor sockets, RAM modules (DDR4/DDR5), SSD/HDD storage, and Power Supply Units.',
    keySkills: ['Form Factors', 'Socket Compatibility', 'Bus Speeds', 'ESD Safety'],
  },
  {
    id: 2,
    title: 'Computer Software Installation',
    category: 'Software & Web',
    icon: <DownloadCloud className="w-5 h-5 text-blue-600" />,
    summary: 'Deploying operating systems via bootable USB media, configuring chipset and peripheral drivers, and installing core utility/office suites.',
    keySkills: ['UEFI/BIOS Setup', 'Partition Tables', 'Driver Configuration', 'Software Licensing'],
  },
  {
    id: 3,
    title: 'Computer Maintenance',
    category: 'Hardware',
    icon: <Wrench className="w-5 h-5 text-amber-600" />,
    summary: 'Preventive and corrective servicing including chassis dust removal, cooling fan cleaning, thermal paste replacement, and disk optimization.',
    keySkills: ['Thermal Management', 'Dust Removal', 'Disk Defrag/Cleanup', 'System Tuning'],
  },
  {
    id: 4,
    title: 'File and Folder Management',
    category: 'Software & Web',
    icon: <FolderTree className="w-5 h-5 text-cyan-600" />,
    summary: 'Organizing directory structures, managing access permissions, establishing standardized backup routines, and managing cloud storage.',
    keySkills: ['File Permissions', 'Hierarchical Trees', 'Backup Strategies', 'Data Archiving'],
  },
  {
    id: 5,
    title: 'Basic Computer Troubleshooting',
    category: 'Hardware',
    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    summary: 'Systematic diagnosis of hardware beep codes, "No Display" faults, operating system crashes, driver conflicts, and peripheral errors.',
    keySkills: ['POST Beep Codes', 'Cable Checking', 'OS Recovery Diagnostics', 'Root Cause Isolation'],
  },
  {
    id: 6,
    title: 'Computer Networking',
    category: 'Networking',
    icon: <Network className="w-5 h-5 text-emerald-600" />,
    summary: 'Foundational concepts of Local Area Networks (LAN), OSI model layers, packet transmission, and IP address assignment.',
    keySkills: ['LAN Architecture', 'TCP/IP Model', 'Subnet Masking', 'Default Gateways'],
  },
  {
    id: 7,
    title: 'Identification & Use of Networking Devices',
    category: 'Networking',
    icon: <Layers className="w-5 h-5 text-teal-600" />,
    summary: 'Hands-on configuration of broadband routers, managed Ethernet switches, wireless access points, Cat6 patch cables, and RJ-45 crimping.',
    keySkills: ['Fast Ethernet Switches', 'Routers', 'Cat5e/Cat6 Cables', 'RJ-45 Crimping (T568B)'],
  },
  {
    id: 8,
    title: 'Basic Web Development',
    category: 'Software & Web',
    icon: <Code className="w-5 h-5 text-violet-600" />,
    summary: 'Introduction to client-server web architecture, frontend webpage design principles, responsive layouts, and cross-browser testing.',
    keySkills: ['Web Architecture', 'DOM Structure', 'Modern Browser Tools', 'Responsive Flow'],
  },
  {
    id: 9,
    title: 'HTML and CSS',
    category: 'Software & Web',
    icon: <Palette className="w-5 h-5 text-pink-600" />,
    summary: 'Authoring semantic HTML5 documents and writing responsive CSS3 stylesheets for colors, typography, cards, grids, and navigation bars.',
    keySkills: ['HTML5 Tags', 'CSS Selectors', 'Flexbox & CSS Grid', 'Styling Aesthetics'],
  },
  {
    id: 10,
    title: 'Database Concepts',
    category: 'Software & Web',
    icon: <Database className="w-5 h-5 text-sky-600" />,
    summary: 'Understanding relational database architectures, table schemas, primary keys, record querying, and data integrity.',
    keySkills: ['Relational Schemas', 'Primary & Foreign Keys', 'SQL Queries', 'Data Normalization'],
  },
  {
    id: 11,
    title: 'Cybersecurity Awareness',
    category: 'Security & Management',
    icon: <ShieldCheck className="w-5 h-5 text-rose-600" />,
    summary: 'Learning strong password formulation, phishing threat prevention, multi-factor authentication (MFA), and organizational data safety.',
    keySkills: ['Phishing Detection', 'Password Hygiene', 'MFA Implementation', 'Safe Browsing'],
  },
  {
    id: 12,
    title: 'Practical Computer Operations',
    category: 'Software & Web',
    icon: <Monitor className="w-5 h-5 text-slate-700" />,
    summary: 'Day-to-day agency computing tasks, operating system productivity shortcuts, technical documentation, and presentation preparation.',
    keySkills: ['OS Shortcuts', 'Command Line Basics', 'Office Documentation', 'Multi-tasking'],
  },
  {
    id: 13,
    title: 'Teamwork and Office Procedures',
    category: 'Security & Management',
    icon: <Briefcase className="w-5 h-5 text-emerald-800" />,
    summary: 'Adhering to public service workplace etiquette, participating in IT team standups, reporting to supervisors, and following work logs.',
    keySkills: ['Professional Ethics', 'Technical Collaboration', 'Logbook Keeping', 'Client Communication'],
  },
];

export const ActivityGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hardware', 'Networking', 'Software & Web', 'Security & Management'];

  const filteredActivities = selectedCategory === 'All'
    ? activities
    : activities.filter((a) => a.category === selectedCategory);

  return (
    <div className="my-6 p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider">Chapter 2 Breakdown</span>
          <h3 className="text-lg font-bold text-white mt-0.5">13 Industrial Training Activities & Core Competencies</h3>
          <p className="text-xs text-slate-400">Comprehensive overview of hands-on technical competencies acquired at ZITDA</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#38BDF8] text-[#0A0B0E] font-bold shadow-xs'
                  : 'bg-[#1E293B] text-slate-300 hover:text-white hover:bg-[#334155] border border-[#334155]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            id={`activity-card-${act.id}`}
            className="p-4 rounded-xl border border-[#334155]/60 bg-[#1E293B]/40 hover:bg-[#1E293B] hover:border-[#38BDF8]/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="p-2 rounded-lg bg-[#0A0B0E] border border-[#334155] shadow-xs">
                  {act.icon}
                </div>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/20">
                  {act.category}
                </span>
              </div>
              <h4 className="font-semibold text-white text-sm leading-snug mb-1.5">
                {act.id}. {act.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {act.summary}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-[#1E293B]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Key Competencies</span>
              <div className="flex flex-wrap gap-1">
                {act.keySkills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
