import React, { useState } from 'react';
import { sampleWebpageProjectCode } from '../data/reportData';
import { 
  Code, 
  Eye, 
  Network, 
  Copy, 
  Check, 
  Play, 
  Terminal, 
  Server, 
  Laptop, 
  Wifi, 
  Activity,
  Globe
} from 'lucide-react';

export const ProjectSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'network'>('preview');
  const [codeType, setCodeType] = useState<'html' | 'css'>('html');
  const [copied, setCopied] = useState(false);
  const [pingRunning, setPingRunning] = useState(false);
  const [pingLogs, setPingLogs] = useState<string[]>([
    'ZITDA Network Diagnostics Terminal [Version 1.0.26]',
    'Host: Federal University Gusau SIWES Lab (Workstation 1: 192.168.1.10)',
    'Ready for diagnostic command...',
  ]);

  const handleCopy = () => {
    const textToCopy = codeType === 'html' ? sampleWebpageProjectCode.html : sampleWebpageProjectCode.css;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runPingTest = () => {
    if (pingRunning) return;
    setPingRunning(true);
    setPingLogs([
      'ZITDA Network Diagnostics Terminal [Version 1.0.26]',
      'Testing connection from Workstation 1 [192.168.1.10] to Gateway [192.168.1.1]...',
    ]);

    setTimeout(() => {
      setPingLogs((prev) => [...prev, 'Pinging 192.168.1.1 with 32 bytes of data:']);
    }, 600);

    setTimeout(() => {
      setPingLogs((prev) => [...prev, 'Reply from 192.168.1.1: bytes=32 time=1.42ms TTL=64']);
    }, 1200);

    setTimeout(() => {
      setPingLogs((prev) => [...prev, 'Reply from 192.168.1.1: bytes=32 time=1.18ms TTL=64']);
    }, 1800);

    setTimeout(() => {
      setPingLogs((prev) => [...prev, 'Reply from 192.168.1.1: bytes=32 time=1.25ms TTL=64']);
    }, 2400);

    setTimeout(() => {
      setPingLogs((prev) => [
        ...prev,
        'Reply from 192.168.1.1: bytes=32 time=1.10ms TTL=64',
        '',
        '--- Ping Statistics for 192.168.1.1 ---',
        'Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)',
        'Approximate round trip times in milli-seconds:',
        '    Minimum = 1.10ms, Maximum = 1.42ms, Average = 1.23ms',
        'STATUS: Connection Verified. Fast Ethernet LAN is Fully Operational.',
      ]);
      setPingRunning(false);
    }, 3000);
  };

  return (
    <div className="my-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md overflow-hidden">
      {/* Sandbox Header */}
      <div className="bg-[#0A0B0E] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              Interactive Practical Lab
            </span>
            <span className="text-xs text-slate-400">Chapter 3 Project Artifact</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            ZITDA Information Webpage & LAN Network Simulator
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[#1E293B] p-1 rounded-xl border border-[#334155]">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-[#38BDF8] text-[#0A0B0E] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-[#334155]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Webpage
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'code'
                ? 'bg-[#38BDF8] text-[#0A0B0E] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-[#334155]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Source Code
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'network'
                ? 'bg-[#38BDF8] text-[#0A0B0E] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-[#334155]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            LAN Topology
          </button>
        </div>
      </div>

      {/* Tab 1: Live Webpage Preview */}
      {activeTab === 'preview' && (
        <div className="p-4 sm:p-6 bg-[#0A0B0E]">
          {/* Simulated Browser Frame */}
          <div className="rounded-xl border border-[#334155] bg-white shadow-xl overflow-hidden">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-md text-xs text-slate-300 border border-slate-800 w-full max-w-sm justify-center">
                <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="font-mono text-slate-200">http://zitda.zamfara.gov.ng/information</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">100% Responsive</span>
            </div>

            {/* Rendered HTML/CSS Webpage */}
            <div className="text-slate-800">
              {/* Header */}
              <div className="bg-emerald-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-xs border border-emerald-500">
                    ZT
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase bg-emerald-800 px-2 py-0.5 rounded text-emerald-200 font-semibold block">
                      ZAMFARA STATE
                    </span>
                    <h2 className="text-lg font-bold tracking-tight text-white leading-tight">ZITDA Information Portal</h2>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-emerald-200">
                  <span className="hover:text-white cursor-pointer transition-colors border-b-2 border-emerald-400 pb-0.5">Overview</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Core Mandate</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Digital Skills</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
                </div>
              </div>

              {/* Hero Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white px-6 py-10 text-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700 mb-3">
                  Government of Zamfara State ICT Initiative
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold max-w-2xl mx-auto leading-tight mb-3">
                  Driving Digital Transformation & ICT Development
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed mb-6">
                  Empowering youths, students, and government ministries with modern ICT infrastructure, digital literacy, and e-governance systems.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
                    Explore Agency Services
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors">
                    Student SIWES Scheme
                  </button>
                </div>
              </div>

              {/* 3 Core Services Cards */}
              <div className="px-6 py-8 bg-slate-50">
                <div className="text-center mb-6">
                  <h3 className="text-base font-bold text-slate-900">Key Pillars of Digital Empowerment</h3>
                  <p className="text-xs text-slate-500">Structured modules developed during SIWES technical training</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                      <Server className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">ICT Infrastructure</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deploying high-speed Local Area Networks (LAN), secure server nodes, and diagnostic hardware maintenance across public offices.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all text-center">
                    <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Digital Literacy</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Conducting youth capacity-building bootcamps, computer training workshops, and fostering university SIWES internships.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all text-center">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Cybersecurity</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Safeguarding state digital assets, enforcing secure data access controls, and training staff on anti-phishing protocols.
                    </p>
                  </div>
                </div>
              </div>

              {/* Webpage Footer */}
              <div className="bg-slate-900 text-slate-400 px-6 py-4 text-center text-xs border-t border-slate-800">
                <p>&copy; 2026 Zamfara Information Technology Development Agency (ZITDA), Gusau. Developed by Hassan Bin Bello (2310308098).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Source Code Inspector */}
      {activeTab === 'code' && (
        <div className="p-4 sm:p-6 bg-[#0A0B0E] text-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E293B]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeType('html')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  codeType === 'html' ? 'bg-[#38BDF8] text-[#0A0B0E] font-bold' : 'bg-[#1E293B] text-slate-400 hover:text-white'
                }`}
              >
                index.html (Semantic Structure)
              </button>
              <button
                onClick={() => setCodeType('css')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  codeType === 'css' ? 'bg-[#38BDF8] text-[#0A0B0E] font-bold' : 'bg-[#1E293B] text-slate-400 hover:text-white'
                }`}
              >
                style.css (Layout & Theme)
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-[#1E293B] hover:bg-[#334155] text-slate-300 rounded-md border border-[#334155] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </button>
          </div>

          <pre className="font-mono-code text-xs sm:text-[13px] leading-relaxed p-4 bg-[#0F172A] rounded-xl overflow-x-auto border border-[#1E293B] text-slate-200 max-h-96">
            <code>{codeType === 'html' ? sampleWebpageProjectCode.html : sampleWebpageProjectCode.css}</code>
          </pre>
        </div>
      )}

      {/* Tab 3: LAN Topology & Ping Diagnostics */}
      {activeTab === 'network' && (
        <div className="p-4 sm:p-6 bg-[#0A0B0E] text-slate-100">
          <div className="mb-6">
            <h4 className="text-base font-bold text-white">Local Area Network (LAN) Architecture</h4>
            <p className="text-xs text-slate-400">Physical and logical network topology deployed during the SIWES project</p>
          </div>

          {/* Interactive Topology Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {/* Node 1: Router */}
            <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-[#334155] text-center relative">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto mb-2 border border-[#10B981]/30">
                <Wifi className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#10B981]">Gateway / Router</span>
              <h5 className="font-semibold text-xs text-white mt-1">ZITDA Edge Router</h5>
              <p className="text-[11px] font-mono text-slate-400 mt-1">IP: 192.168.1.1</p>
              <div className="mt-2 text-[10px] text-slate-500">DHCP & NAT Enabled</div>
            </div>

            {/* Node 2: Fast Switch */}
            <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-[#38BDF8]/40 text-center relative shadow-lg shadow-sky-950/40">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center mx-auto mb-2 border border-[#38BDF8]/30">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#38BDF8]">Core Switch</span>
              <h5 className="font-semibold text-xs text-white mt-1">8-Port Fast Switch</h5>
              <p className="text-[11px] font-mono text-slate-400 mt-1">100 Mbps Full-Duplex</p>
              <div className="mt-2 text-[10px] text-slate-500">Star Topology Hub</div>
            </div>

            {/* Node 3: Workstation 1 (Hassan's Machine) */}
            <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-[#334155] text-center relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2 border border-indigo-500/30">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Host Workstation 1</span>
              <h5 className="font-semibold text-xs text-white mt-1">Hassan's Lab PC</h5>
              <p className="text-[11px] font-mono text-slate-400 mt-1">IP: 192.168.1.10</p>
              <div className="mt-2 text-[10px] text-slate-500">Cat6 Straight-Through</div>
            </div>

            {/* Node 4: Workstation 2 */}
            <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-[#334155] text-center relative">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2 border border-purple-500/30">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Host Workstation 2</span>
              <h5 className="font-semibold text-xs text-white mt-1">Peer Client PC</h5>
              <p className="text-[11px] font-mono text-slate-400 mt-1">IP: 192.168.1.11</p>
              <div className="mt-2 text-[10px] text-slate-500">Cat6 Straight-Through</div>
            </div>
          </div>

          {/* Interactive Terminal Section */}
          <div className="rounded-xl bg-[#0F172A] border border-[#1E293B] p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs font-semibold text-slate-300">Live ICMP Ping Diagnostics</span>
              </div>
              <button
                onClick={runPingTest}
                disabled={pingRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#38BDF8] hover:bg-[#38BDF8]/90 disabled:opacity-50 text-[#0A0B0E] rounded-lg transition-all shadow-xs"
              >
                <Play className="w-3 h-3 fill-current" />
                {pingRunning ? 'Transmitting Packets...' : 'Run Diagnostics Ping'}
              </button>
            </div>

            <div className="font-mono-code text-xs text-[#38BDF8] space-y-1 bg-[#0A0B0E] p-3.5 rounded-lg border border-[#1E293B] min-h-[140px]">
              {pingLogs.map((log, index) => (
                <div key={index} className={log.includes('STATUS') ? 'text-white font-bold bg-[#10B981]/20 border border-[#10B981]/40 p-1.5 rounded' : ''}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
