import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, X } from 'lucide-react';
import { useSound } from '../audio/SoundProvider';

interface ChoiceMiniGameProps {
  scenario: string;
  choices: string[];
  correctIndex: number;
  successTitle: string;
  successSubtext?: string;
  failureTitle?: string;
  onComplete: () => void;
}

export function ChoiceMiniGame({
  scenario,
  choices,
  correctIndex,
  successTitle,
  successSubtext,
  failureTitle = 'TRY AGAIN',
  onComplete,
}: ChoiceMiniGameProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { playClick, playSuccess, playError } = useSound();

  const handleChoice = (index: number) => {
    playClick();
    setSelectedIndex(index);
    setShowResult(true);
    if (index === correctIndex) {
      playSuccess();
    } else {
      playError();
    }
  };

  const handleRetry = () => {
    playClick();
    setSelectedIndex(null);
    setShowResult(false);
  };

  const handleContinue = () => {
    playSuccess();
    onComplete();
  };

  if (showResult && selectedIndex === correctIndex) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 slide-up">
        <Card className="game-panel p-8 text-center neon-border pulse-glow">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-4xl font-display text-primary neon-glow mb-2">
            {successTitle}
          </h2>
          {successSubtext && (
            <p className="text-xl text-accent mb-6">{successSubtext}</p>
          )}
          <Button
            onClick={handleContinue}
            className="game-button px-8 py-6 text-lg"
          >
            CONTINUE <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>
    );
  }

  if (showResult && selectedIndex !== correctIndex) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 slide-up">
        <Card className="game-panel p-8 text-center border-destructive/50">
          <X className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-3xl font-display text-destructive mb-6">
            {failureTitle}
          </h2>
          <Button
            onClick={handleRetry}
            variant="outline"
            className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10"
          >
            RETRY
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card className="game-panel p-8 text-center mb-8">
        <p className="text-xl text-foreground leading-relaxed">
          {scenario}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {choices.map((choice, index) => (
          <Button
            key={index}
            onClick={() => handleChoice(index)}
            className="game-button p-6 text-base h-auto whitespace-normal"
            variant="outline"
          >
            {choice}
          </Button>
        ))}
      </div>
    </div>
  );
}
