import { Card } from '@/components/ui/card';
import { ChoiceMiniGame } from '../components/ChoiceMiniGame';

interface MiniGame1DefuseProps {
  onAdvance: () => void;
}

export function MiniGame1Defuse({ onAdvance }: MiniGame1DefuseProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Card className="game-panel p-6 inline-block border-destructive/50">
          <h1 className="text-4xl font-display text-destructive neon-glow">
            ⚠️ DEFUSE THE BAD DAY
          </h1>
        </Card>
      </div>

      <ChoiceMiniGame
        scenario="Oh no! Bad day for Joshi has planted."
        choices={[
          'Send memes',
          'Call or Cuddle',
          'Order food',
          'Ignore',
        ]}
        correctIndex={1}
        successTitle="ROUND WON"
        successSubtext="TEAM SURVIVED"
        onComplete={onAdvance}
      />
    </div>
  );
}
