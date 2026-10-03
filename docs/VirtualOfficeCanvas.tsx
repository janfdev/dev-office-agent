import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CustomAvatar, type AgentRole, type AgentState } from './CustomAvatar';
import { Terminal, Database, Palette, ShieldCheck, Cpu } from 'lucide-react';

interface SquadMember {
  role: AgentRole;
  name: string;
  title: string;
  state: AgentState;
  currentTask: string;
  stats: {
    prsCreated: number;
    testsPassed: number;
    linesOfCode: number;
  };
}

interface VirtualOfficeCanvasProps {
  squad: SquadMember[];
  activeLink?: {
    from: AgentRole;
    to: AgentRole;
    label: string;
  };
}

export const VirtualOfficeCanvas: React.FC<VirtualOfficeCanvasProps> = ({
  squad,
  activeLink,
}) => {
  const getMember = (role: AgentRole) => squad.find((m) => m.role === role)!;

  return (
    <Card className="border-border bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden relative border-cyan-900/30">
      <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
        
        {/* Office Top Status Bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5">
              <Cpu className="size-4 text-cyan-400" />
              DEV OFFICE FLOOR (LIVE POD)
            </h2>
          </div>
          <Badge variant="outline" className="font-mono text-[11px] border-cyan-800/60 bg-cyan-950/40 text-cyan-300">
            4 AGENTS ACTIVE
          </Badge>
        </div>

        {/* 2D Isometric Office Floor Layout */}
        <div className="relative w-full rounded-2xl bg-[#070b14] border border-border/80 p-4 sm:p-6 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
          
          {/* Subtle floor grid lines */}
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Active Collaboration Ray (Glow beam between collaborating agents) */}
          {activeLink && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-md text-[10px] font-mono text-cyan-300 animate-pulse shadow-lg">
                ⚡ Handshake: {activeLink.label}
              </div>
            </div>
          )}

          {/* ROW 1: Lead Architect / PM Command Desk (Tengah Atas) */}
          <div className="flex justify-center w-full z-20">
            <div className="flex flex-col items-center gap-2 bg-slate-900/90 border border-sky-500/40 rounded-2xl p-3 shadow-lg max-w-[280px] w-full text-center">
              <div className="flex items-center gap-3">
                <CustomAvatar role="pm" state={getMember('pm').state} size={50} />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-sky-400">{getMember('pm').name}</span>
                    <Badge variant="secondary" className="text-[9px] py-0 px-1 font-mono">LEAD</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono">{getMember('pm').title}</p>
                </div>
              </div>
              <div className="w-full bg-slate-950/80 rounded-lg p-1.5 border border-border text-[10px] font-mono text-cyan-200 truncate">
                {getMember('pm').currentTask}
              </div>
            </div>
          </div>

          {/* ROW 2: The Three Workstations (Backend, Frontend, QA) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 z-20">
            
            {/* Workstation 1: Backend Engineer */}
            <div className="flex flex-col items-center gap-2 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 shadow-md hover:border-emerald-500/60 transition-colors">
              <div className="flex items-center gap-2.5 w-full">
                <CustomAvatar role="backend" state={getMember('backend').state} size={46} />
                <div className="text-left overflow-hidden">
                  <span className="font-bold text-xs text-emerald-400 block truncate">{getMember('backend').name}</span>
                  <span className="text-[9px] text-muted-foreground font-mono flex items-center gap-1">
                    <Database className="size-2.5 text-emerald-400" /> Database & API
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-950/80 rounded-lg p-1.5 border border-border text-[10px] font-mono text-emerald-200 truncate">
                {getMember('backend').currentTask}
              </div>
              <div className="flex items-center justify-between w-full text-[9px] font-mono text-muted-foreground pt-1 border-t border-border/50">
                <span>PRs: {getMember('backend').stats.prsCreated}</span>
                <span>LOC: +{getMember('backend').stats.linesOfCode}</span>
              </div>
            </div>

            {/* Workstation 2: Frontend Engineer */}
            <div className="flex flex-col items-center gap-2 bg-slate-900/90 border border-pink-500/30 rounded-2xl p-3 shadow-md hover:border-pink-500/60 transition-colors">
              <div className="flex items-center gap-2.5 w-full">
                <CustomAvatar role="frontend" state={getMember('frontend').state} size={46} />
                <div className="text-left overflow-hidden">
                  <span className="font-bold text-xs text-pink-400 block truncate">{getMember('frontend').name}</span>
                  <span className="text-[9px] text-muted-foreground font-mono flex items-center gap-1">
                    <Palette className="size-2.5 text-pink-400" /> UI & shadcn
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-950/80 rounded-lg p-1.5 border border-border text-[10px] font-mono text-pink-200 truncate">
                {getMember('frontend').currentTask}
              </div>
              <div className="flex items-center justify-between w-full text-[9px] font-mono text-muted-foreground pt-1 border-t border-border/50">
                <span>Components: 8</span>
                <span>Responsive: OK</span>
              </div>
            </div>

            {/* Workstation 3: QA Automation Tester */}
            <div className="flex flex-col items-center gap-2 bg-slate-900/90 border border-purple-500/30 rounded-2xl p-3 shadow-md hover:border-purple-500/60 transition-colors">
              <div className="flex items-center gap-2.5 w-full">
                <CustomAvatar role="qa" state={getMember('qa').state} size={46} />
                <div className="text-left overflow-hidden">
                  <span className="font-bold text-xs text-purple-400 block truncate">{getMember('qa').name}</span>
                  <span className="text-[9px] text-muted-foreground font-mono flex items-center gap-1">
                    <ShieldCheck className="size-2.5 text-purple-400" /> E2E Tester
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-950/80 rounded-lg p-1.5 border border-border text-[10px] font-mono text-purple-200 truncate">
                {getMember('qa').currentTask}
              </div>
              <div className="flex items-center justify-between w-full text-[9px] font-mono text-muted-foreground pt-1 border-t border-border/50">
                <span>Playwright: PASS</span>
                <span>Passed: {getMember('qa').stats.testsPassed}</span>
              </div>
            </div>

          </div>

          {/* Coffee & Water Cooler Station indicator at bottom right */}
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2">
            <span className="flex items-center gap-1">
              <Terminal className="size-3 text-cyan-400" /> Live Event Stream Connected
            </span>
            <span>☕ Coffee Station: Ready</span>
          </div>

        </div>

      </CardContent>
    </Card>
  );
};
