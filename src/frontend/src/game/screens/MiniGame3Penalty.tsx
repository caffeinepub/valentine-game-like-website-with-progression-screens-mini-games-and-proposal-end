import { Card } from '@/components/ui/card';
import { ChoiceMiniGame } from '../components/ChoiceMiniGame';

interface MiniGame3PenaltyProps {
  onAdvance: () => void;
}

export function MiniGame3Penalty({ onAdvance }: MiniGame3PenaltyProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Card className="game-panel p-6 inline-block border-primary/50">
          <h1 className="text-4xl font-display text-primary neon-glow">
            ⚽ FINAL CHANCE TO SCORE
          </h1>
        </Card>
      </div>

      <ChoiceMiniGame
        scenario="What always wins her heart?"
        choices={[
          'Send memes and nudes',
          'Efforts and showing up',
          'Ice cream and waffles',
          'Ignore',
        ]}
        correctIndex={1}
        successTitle="GOAL!"
        successSubtext="GOAL SCORED IN JOSHI'S HEART"
        onComplete={onAdvance}
      />
    </div>
  );
}
