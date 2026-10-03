export type AgentRole = 'pm' | 'backend' | 'frontend' | 'qa';
export type AgentState = 'IDLE' | 'THINKING' | 'WORKING' | 'COLLABORATING' | 'TESTING' | 'SUCCESS' | 'ERROR';

export interface SquadMember {
  role: AgentRole;
  name: string;
  title: string;
  clothing: string;
  state: AgentState;
  currentTask: string;
  position3D: [number, number, number]; // [x, y, z] in Three.js room
  color: string;
  stats: {
    prsCreated: number;
    testsPassed: number;
    linesOfCode: number;
  };
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  role: AgentRole;
  message: string;
  type: 'INFO' | 'CODE' | 'TEST' | 'HANDSHAKE' | 'ALERT';
}
