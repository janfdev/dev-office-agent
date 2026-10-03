'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Terminal, 
  Cpu, 
  Send, 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import type { SquadMember, ActivityLog, AgentRole } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dynamic import with SSR disabled for Three.js Canvas
const Office3DCanvas = dynamic(() => import('@/components/Office3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-cyan-950/40 text-muted-foreground gap-3">
      <div className="size-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-cyan-400">Loading 3D Virtual Office & Three.js Engine...</span>
    </div>
  ),
});

export default function Home() {
  const [promptInput, setPromptInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  // 4 Squad Members State
  const [squad, setSquad] = useState<SquadMember[]>([
    {
      role: 'pm',
      name: 'Ken (Lead/PM)',
      title: 'Architect & Prompt Orchestrator',
      clothing: 'Navy Blazer & Lanyard',
      state: 'IDLE',
      currentTask: 'Standing by for user prompt in chat',
      position3D: [0, 0, -2.4], // Center Back
      color: '#38bdf8',
      stats: { prsCreated: 12, testsPassed: 48, linesOfCode: 2450 },
    },
    {
      role: 'backend',
      name: 'Alex (Backend)',
      title: 'Database, DTO & API Engine',
      clothing: 'Emerald Tech Hoodie',
      state: 'IDLE',
      currentTask: 'Postgres & Prisma schema idle',
      position3D: [-2.6, 0, 0.4], // Left
      color: '#10b981',
      stats: { prsCreated: 8, testsPassed: 32, linesOfCode: 1820 },
    },
    {
      role: 'frontend',
      name: 'Elena (Frontend)',
      title: 'UI Component & Design Systems',
      clothing: 'Rose Pastel Jacket',
      state: 'IDLE',
      currentTask: 'shadcn/ui design tokens ready',
      position3D: [2.6, 0, 0.4], // Right
      color: '#ec4899',
      stats: { prsCreated: 6, testsPassed: 24, linesOfCode: 1540 },
    },
    {
      role: 'qa',
      name: 'Maya (QA Tester)',
      title: 'E2E Playwright & Regression Lab',
      clothing: 'Violet Vest & Headset',
      state: 'IDLE',
      currentTask: 'CI/CD pipeline test runner idle',
      position3D: [0, 0, 2.2], // Center Front
      color: '#a855f7',
      stats: { prsCreated: 0, testsPassed: 64, linesOfCode: 420 },
    },
  ]);

  const [activeHandshake, setActiveHandshake] = useState<{
    from: AgentRole;
    to: AgentRole;
    label: string;
  } | undefined>(undefined);

  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      timestamp: 'Just now',
      role: 'pm',
      message: 'DevOffice-360 3D Squad initialized. Ready to receive commands from Telegram chat.',
      type: 'INFO',
    },
  ]);

  // Execute full feature simulation when prompt submitted
  const handleExecutePrompt = (customText?: string) => {
    const text = customText || promptInput;
    if (!text.trim() || isSimulating) return;

    setIsSimulating(true);
    setPromptInput('');

    // Step 1: PM analyzes prompt
    setSquad(prev => prev.map(m => m.role === 'pm' ? { ...m, state: 'THINKING', currentTask: `Analyzing: "${text}"` } : m));
    setLogs(prev => [{
      id: `log-${Date.now()}`,
      timestamp: 'Now',
      role: 'pm',
      message: `Prompt received: "${text}". Parsing requirements and drafting API contracts.`,
      type: 'INFO',
    }, ...prev]);

    // Step 2: PM dispatches to Backend (Handshake PM -> BE)
    setTimeout(() => {
      setActiveHandshake({ from: 'pm', to: 'backend', label: 'PRD & Schema Dispatch' });
      setSquad(prev => prev.map(m => {
        if (m.role === 'pm') return { ...m, state: 'COLLABORATING', currentTask: 'Handing specs to Backend' };
        if (m.role === 'backend') return { ...m, state: 'WORKING', currentTask: 'Writing DB migration & NestJS endpoints' };
        return m;
      }));
      setLogs(prev => [{
        id: `log-${Date.now()}`,
        timestamp: 'Now',
        role: 'backend',
        message: 'Alex created schema & API endpoints: POST /api/v1/auth/mfa/verify. DTO validated.',
        type: 'CODE',
      }, ...prev]);
    }, 1800);

    // Step 3: Backend handshakes to Frontend (BE -> FE)
    setTimeout(() => {
      setActiveHandshake({ from: 'backend', to: 'frontend', label: 'API Contract / DTO Truth' });
      setSquad(prev => prev.map(m => {
        if (m.role === 'backend') return { ...m, state: 'SUCCESS', currentTask: 'API Contracts Published' };
        if (m.role === 'frontend') return { ...m, state: 'WORKING', currentTask: 'Building shadcn dialog & form components' };
        return m;
      }));
      setLogs(prev => [{
        id: `log-${Date.now()}`,
        timestamp: 'Now',
        role: 'frontend',
        message: 'Elena created responsive UI components with clean Tailwind & shadcn tokens.',
        type: 'CODE',
      }, ...prev]);
    }, 3800);

    // Step 4: Frontend handshakes to QA (FE -> QA)
    setTimeout(() => {
      setActiveHandshake({ from: 'frontend', to: 'qa', label: 'E2E Testing Handshake' });
      setSquad(prev => prev.map(m => {
        if (m.role === 'frontend') return { ...m, state: 'SUCCESS', currentTask: 'UI Build Verified' };
        if (m.role === 'qa') return { ...m, state: 'TESTING', currentTask: 'Running Playwright E2E headless test suite' };
        return m;
      }));
      setLogs(prev => [{
        id: `log-${Date.now()}`,
        timestamp: 'Now',
        role: 'qa',
        message: 'Maya executed 12/12 Playwright assertions: Auth flow, CSRF, and responsive checks PASSED.',
        type: 'TEST',
      }, ...prev]);
    }, 5800);

    // Step 5: Complete & All Squad Success
    setTimeout(() => {
      setActiveHandshake(undefined);
      setSquad(prev => prev.map(m => ({ ...m, state: 'IDLE', currentTask: 'Task completed. Ready for next prompt.' })));
      setIsSimulating(false);
      setLogs(prev => [{
        id: `log-${Date.now()}`,
        timestamp: 'Now',
        role: 'pm',
        message: 'Sprint cycle finished successfully! Artifacts built and verified by QA.',
        type: 'INFO',
      }, ...prev]);
    }, 8000);
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Top Navbar */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-950/50">
            <Cpu className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                DevOffice-360
              </h1>
              <Badge variant="outline" className="text-cyan-400 border-cyan-800/60 bg-cyan-950/40 text-[10px] font-mono">
                3D Live Squad
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Autonomous AI Agent Observability & Virtual Tech Office
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Badge variant="outline" className="bg-emerald-950/40 text-emerald-400 border-emerald-800/60 gap-1.5 py-1 px-3">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono">AI PIPELINE READY</span>
          </Badge>
        </div>
      </header>

      {/* Main 3D Canvas Floor */}
      <Office3DCanvas squad={squad} activeHandshake={activeHandshake} />

      {/* Interactive Prompt & Simulation Panel */}
      <Card className="border-border bg-card/60 backdrop-blur-md shadow-xl">
        <CardContent className="p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Terminal className="size-4 text-cyan-400" />
              Chat Prompt Dispatcher (Simulate Turn)
            </span>
            {isSimulating && (
              <Badge variant="secondary" className="text-cyan-300 font-mono text-[10px] animate-pulse">
                SQUAD EXECUTING SPRINT...
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecutePrompt()}
              placeholder="Berikan instruksi (contoh: 'Bangun fitur multi-factor authentication dan testing')..."
              className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-400 font-sans"
              disabled={isSimulating}
            />
            <Button
              onClick={() => handleExecutePrompt()}
              disabled={isSimulating || !promptInput.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl gap-1.5 px-5"
            >
              <Send className="size-4" />
              <span>Kirim</span>
            </Button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-muted-foreground font-mono">Preset Prompt:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExecutePrompt('Bangun endpoint autentikasi MFA + UI Dialog + E2E Playwright')}
              disabled={isSimulating}
              className="text-xs h-7 border-border hover:border-cyan-500/40 text-muted-foreground hover:text-cyan-300"
            >
              ✨ Feature: MFA Auth + UI
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExecutePrompt('Investigasi dan perbaiki bug data scope isolation pada role Manager')}
              disabled={isSimulating}
              className="text-xs h-7 border-border hover:border-cyan-500/40 text-muted-foreground hover:text-cyan-300"
            >
              🐛 Bug Fix: Data Scope Isolation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Squad Cards Grid (The 4 Roles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {squad.map((member) => (
          <Card key={member.role} className="border-border bg-card/80 shadow-md">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">{member.name}</span>
                <Badge variant="outline" className={`text-[10px] font-mono uppercase ${
                  member.state === 'WORKING' ? 'border-cyan-500 text-cyan-400 bg-cyan-950/30' :
                  member.state === 'TESTING' ? 'border-purple-500 text-purple-400 bg-purple-950/30' :
                  member.state === 'THINKING' ? 'border-amber-500 text-amber-400 bg-amber-950/30' :
                  'border-border text-muted-foreground'
                }`}>
                  {member.state}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-1">{member.title}</p>
              
              <div className="p-2 rounded-lg bg-secondary/40 border border-border text-[11px] font-mono text-cyan-200 line-clamp-2 min-h-11 flex items-center">
                {member.currentTask}
              </div>

              <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between pt-1 border-t border-border/60">
                <span>Outfit: {member.clothing}</span>
                <span className="text-cyan-400 font-semibold">Ready</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Log Feed */}
      <Card className="border-border bg-card/70 shadow-md">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileCode className="size-4 text-cyan-400" />
              Live Squad Inter-Communication & Activity Stream
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">{logs.length} events logged</span>
          </div>

          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div key={log.id} className="p-2.5 rounded-lg bg-secondary/30 border border-border/60 text-xs flex items-start gap-2.5">
                <Badge variant="outline" className="text-[9px] uppercase font-mono shrink-0 mt-0.5 border-border">
                  {log.role}
                </Badge>
                <div className="flex-1 flex flex-col">
                  <span className="text-foreground">{log.message}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </main>
  );
}
