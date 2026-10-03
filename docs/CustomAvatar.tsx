import React from 'react';

export type AgentRole = 'pm' | 'backend' | 'frontend' | 'qa';
export type AgentState = 'IDLE' | 'THINKING' | 'WORKING' | 'COLLABORATING' | 'TESTING' | 'SUCCESS' | 'ERROR';

interface CustomAvatarProps {
  role: AgentRole;
  state: AgentState;
  size?: number;
  className?: string;
}

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  role,
  state,
  size = 56,
  className = '',
}) => {
  // Visual config based on role
  const config = {
    pm: {
      name: 'Ken (Lead/PM)',
      hair: '#38bdf8', // Cyan-sky
      skin: '#fed7aa',
      suit: '#0f172a',
      accessory: '#38bdf8',
      accentColor: 'border-sky-500',
    },
    backend: {
      name: 'Alex (Backend)',
      hair: '#10b981', // Emerald
      skin: '#fde047',
      suit: '#1e293b',
      accessory: '#34d399',
      accentColor: 'border-emerald-500',
    },
    frontend: {
      name: 'Elena (Frontend)',
      hair: '#ec4899', // Pink / Rose
      skin: '#fed7aa',
      suit: '#334155',
      accessory: '#f43f5e',
      accentColor: 'border-pink-500',
    },
    qa: {
      name: 'Maya (QA Tester)',
      hair: '#a855f7', // Purple / Violet
      skin: '#fed7aa',
      suit: '#1e1b4b',
      accessory: '#c084fc',
      accentColor: 'border-purple-500',
    },
  }[role];

  const isWorking = state === 'WORKING' || state === 'TESTING';
  const isThinking = state === 'THINKING';
  const isError = state === 'ERROR';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-card border-2 p-1.5 shadow-md select-none transition-all duration-300 ${config.accentColor} ${
        isWorking ? 'ring-2 ring-cyan-400/50 shadow-cyan-950/50 scale-105' : ''
      } ${isError ? 'ring-2 ring-rose-500 animate-bounce' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id={`glow-${role}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backdrop circle */}
        <circle cx="50" cy="50" r="46" fill="#0b1120" />

        {/* Body / Suit */}
        <path
          d="M20,95 Q50,70 80,95 L80,100 L20,100 Z"
          fill={config.suit}
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Collar / Tie / Accent badge */}
        <polygon points="45,76 55,76 50,92" fill={config.accessory} />

        {/* Head */}
        <ellipse cx="50" cy="48" rx="24" ry="26" fill={config.skin} />

        {/* Eyes */}
        <circle cx="41" cy="48" r={isWorking ? "4" : "3.5"} fill="#0f172a" />
        <circle cx="59" cy="48" r={isWorking ? "4" : "3.5"} fill="#0f172a" />
        {/* Eye highlights */}
        <circle cx="42" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="60" cy="46.5" r="1.2" fill="#ffffff" />

        {/* Eyebrows */}
        <path
          d={isThinking ? "M36,41 Q41,38 46,42" : "M36,41 Q41,40 46,41"}
          stroke="#334155"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={isThinking ? "M54,42 Q59,38 64,41" : "M54,41 Q59,40 64,41"}
          stroke="#334155"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mouth */}
        <path
          d={
            isError
              ? "M44,64 Q50,58 56,64"
              : isWorking
              ? "M44,60 Q50,66 56,60"
              : "M45,61 Q50,64 55,61"
          }
          stroke="#334155"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Hair Styles based on role */}
        {role === 'pm' && (
          // Slick combed architect hair
          <path
            d="M26,45 C24,24 40,16 60,18 C74,20 76,32 74,45 C70,30 55,24 35,32 Z"
            fill={config.hair}
          />
        )}
        {role === 'backend' && (
          // Tech short beanie / spiked hair
          <path
            d="M26,42 C24,22 42,16 52,15 C66,16 75,25 74,42 C70,28 62,25 50,26 C38,27 32,32 26,42 Z"
            fill={config.hair}
          />
        )}
        {role === 'frontend' && (
          // Creative side-bob with ponytail flare
          <path
            d="M24,48 C20,20 48,15 68,22 C78,28 78,48 76,55 C74,40 65,30 50,30 C34,30 26,40 24,48 Z"
            fill={config.hair}
          />
        )}
        {role === 'qa' && (
          // Headset with micro headphone for QA
          <g>
            <path
              d="M26,45 C24,24 42,18 58,19 C74,21 75,34 74,45 C70,30 55,24 35,32 Z"
              fill={config.hair}
            />
            {/* QA Headset band & earpieces */}
            <path d="M22,50 C20,26 80,26 78,50" fill="none" stroke="#a855f7" strokeWidth="4" />
            <rect x="18" y="44" width="7" height="14" rx="3.5" fill="#c084fc" />
            <rect x="75" y="44" width="7" height="14" rx="3.5" fill="#c084fc" />
          </g>
        )}

        {/* Status Bubble Badge at top right */}
        {isWorking && (
          <g transform="translate(68, 6)">
            <circle cx="10" cy="10" r="10" fill="#06b6d4" className="animate-ping" opacity="0.6" />
            <circle cx="10" cy="10" r="8" fill="#0891b2" />
            {/* Gear or dot */}
            <circle cx="10" cy="10" r="3" fill="#ffffff" />
          </g>
        )}
        {isThinking && (
          <g transform="translate(68, 6)">
            <circle cx="10" cy="10" r="8" fill="#eab308" />
            {/* Light bulb glyph */}
            <path d="M8,7 Q10,5 12,7 L11,11 L9,11 Z" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};
