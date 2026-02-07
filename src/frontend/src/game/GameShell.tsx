import { ReactNode } from 'react';
import { SoundToggle } from './components/SoundToggle';

interface GameShellProps {
  children: ReactNode;
}

export function GameShell({ children }: GameShellProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-event-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Animated overlay effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Sound toggle */}
      <div className="fixed top-4 right-4 z-50">
        <SoundToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
