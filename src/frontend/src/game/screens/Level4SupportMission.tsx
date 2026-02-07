import { Card } from '@/components/ui/card';
import { UnlockSequence } from '../components/UnlockSequence';

interface Level4SupportMissionProps {
  onAdvance: () => void;
}

export function Level4SupportMission({ onAdvance }: Level4SupportMissionProps) {
  const supportMoments = [
    { text: 'Times when I thought everything was falling apart, you stood by me, supporting me and comforting me' },
    { text: 'Supporting me emotionally' },
    { text: 'Staying during bad days' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Card className="game-panel p-6 inline-block">
          <h1 className="text-4xl font-display text-primary neon-glow">
            SUPPORT MISSION
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
