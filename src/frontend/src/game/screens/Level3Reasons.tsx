import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Heart } from 'lucide-react';
import { RewardToast } from '../components/RewardToast';
import { useSound } from '../audio/SoundProvider';

interface Level3ReasonsProps {
  onAdvance: () => void;
}

export function Level3Reasons({ onAdvance }: Level3ReasonsProps) {
  const [showReward, setShowReward] = useState(false);
  const { playSuccess } = useSound();

  const reasons = [
    'How we think the same sometimes.',
    'How you understand things.',
    'How you try to make my normal days fun.',
    'How you listen to my yap sessions.',
    'How you make me laugh.',
    'How you\'re patient with me when I overthink.',
    'How you\'re so cute af.',
    'How you somehow challenge me but support me at the same time.',
    'Somehow being annoying together feels nice.',
  ];

  const handleContinue = () => {
    setShowReward(true);
    playSuccess();
    setTimeout(() => {
      onAdvance();
    }, 2000);
  };

  return (
    <>
      <RewardToast
        message="Relationship XP Increased"
        icon="⭐"
        show={showReward}
      />

      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Card className="game-panel p-6 inline-block">
            <h1 className="text-4xl font-display text-primary neon-glow">
              REASONS I LIKE YOU
            </h1>
          </Card>
        </div>

        <Card className="game-panel p-8">
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/30 rounded-lg slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Heart className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleContinue}
            className="game-button px-12 py-6 text-xl"
          >
            CONTINUE <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
