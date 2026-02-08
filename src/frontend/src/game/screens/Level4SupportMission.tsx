import { Card } from '@/components/ui/card';
import { UnlockSequence } from '../components/UnlockSequence';

interface Level4SupportMissionProps {
  onAdvance: () => void;
}

export function Level4SupportMission({ onAdvance }: Level4SupportMissionProps) {
  const supportMoments = [
    { text: 'Times when i thought everything was falling part, you stood by me, supporting me and comforting me' },
    { text: 'You stayed, listened and made things easier' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Card className="game-panel p-6 inline-block">
          <h1 className="text-4xl font-display text-primary neon-glow">
            🔴 LEVEL 4 — SUPPORT MISSION
          </h1>
          <p className="text-muted-foreground mt-2">
            During difficult matches, teammates stay.
          </p>
        </Card>
      </div>

      <UnlockSequence
        items={supportMoments}
        onComplete={onAdvance}
        finalMessage="WE SURVIVED TOGETHER"
        finalBadge="🤝"
      />
    </div>
  );
}
