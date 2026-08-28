import React, { useState } from 'react';
import { zitdaOrganogram } from '../data/reportData';
import { OrganogramNode } from '../types';
import { ChevronDown, ChevronRight, Shield, Server, Users, Landmark, FileSpreadsheet, Radio } from 'lucide-react';

export const OrganogramChart: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'EXECUTIVE SECRETARY': true,
    'INFORMATION & COMMUNICATION TECHNOLOGY (ICT)': true,
    'DIGITAL ECONOMY': true,
  });

  const toggleNode = (title: string) => {
    setExpandedNodes((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const getIconForNode = (title: string) => {
    if (title.includes('EXECUTIVE')) return <Landmark className="w-5 h-5 text-[#38BDF8]" />;
    if (title.includes('ICT') || title.includes('Infrastructure')) return <Server className="w-4 h-4 text-sky-400" />;
    if (title.includes('Cybersecurity')) return <Shield className="w-4 h-4 text-rose-400" />;
    if (title.includes('DIGITAL') || title.includes('Literacy')) return <Users className="w-4 h-4 text-teal-400" />;
    if (title.includes('FINANCE') || title.includes('PROCUREMENT')) return <FileSpreadsheet className="w-4 h-4 text-amber-400" />;
    return <Radio className="w-4 h-4 text-purple-400" />;
  };

  const renderNode = (node: OrganogramNode, level: number = 0) => {
    const isExpanded = expandedNodes[node.title] ?? true;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.title} className="flex flex-col items-center w-full my-2">
        {/* Node Card */}
        <div
          id={`organogram-node-${node.title.replace(/\s+/g, '-').toLowerCase()}`}
          onClick={() => hasChildren && toggleNode(node.title)}
          className={`relative z-10 w-full max-w-md p-4 rounded-xl border transition-all duration-200 ${
            level === 0
              ? 'bg-[#1E293B] border-[#38BDF8] text-white shadow-lg ring-2 ring-[#38BDF8]/20'
              : level === 1
              ? 'bg-[#1E293B]/70 border-[#334155] hover:border-[#38BDF8]/60 hover:bg-[#1E293B]'
              : 'bg-[#0A0B0E]/80 border-[#334155] text-sm'
          } ${hasChildren ? 'cursor-pointer' : ''}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${level === 0 ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'bg-[#0A0B0E] text-slate-300 border border-[#334155]'}`}>
                {getIconForNode(node.title)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`font-semibold tracking-tight ${level === 0 ? 'text-base text-white font-bold' : 'text-sm text-slate-100'}`}>
                    {node.title}
                  </h4>
                  {node.tag && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                      {node.tag}
                    </span>
                  )}
                </div>
                {node.role && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{node.role}</p>}
              </div>
            </div>

            {hasChildren && (
              <button
                type="button"
                className="text-slate-400 hover:text-white p-1"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Children Branches */}
        {hasChildren && isExpanded && (
          <div className="w-full relative mt-3 pt-3 border-t border-[#1E293B]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              {node.children!.map((child) => renderNode(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="my-6 p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider">Figure 1.1: Visual Structure</span>
          <h3 className="text-lg font-bold text-white mt-0.5">ZITDA Organizational Hierarchy</h3>
          <p className="text-xs text-slate-400">Interactive organogram representing administrative and technical divisions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setExpandedNodes({
                'EXECUTIVE SECRETARY': true,
                'INFORMATION & COMMUNICATION TECHNOLOGY (ICT)': true,
                'DIGITAL ECONOMY': true,
              })
            }
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-lg transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {renderNode(zitdaOrganogram, 0)}
      </div>

      <div className="mt-6 pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
          Industrial Training Unit: ICT Directorate (IT Infrastructure & Cybersecurity)
        </span>
        <span>Source: ZITDA Operational Manual (2026)</span>
      </div>
    </div>
  );
};
