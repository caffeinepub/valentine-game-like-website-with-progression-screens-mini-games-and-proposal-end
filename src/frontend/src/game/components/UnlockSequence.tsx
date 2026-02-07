import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useSound } from '../audio/SoundProvider';

interface UnlockItem {
  text: string;
  badge?: string;
}

interface UnlockSequenceProps {
  items: UnlockItem[];
  onComplete: () => void;
  finalMessage?: string;
  finalBadge?: string;
}

export function UnlockSequence({ items, onComplete, finalMessage, finalBadge }: UnlockSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const { playUnlock, playSuccess } = useSound();

  const handleNext = () => {
    playUnlock();
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (finalMessage) {
      setShowFinal(true);
      playSuccess();
    } else {
      onComplete();
    }
  };

  const handleComplete = () => {
    playSuccess();
    onComplete();
  };

  if (showFinal && finalMessage) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 slide-up">
        <Card className="game-panel p-8 text-center neon-border">
          {finalBadge && (
            <div className="text-4xl mb-4">{finalBadge}</div>
          )}
          <h2 className="text-3xl font-display text-primary neon-glow mb-4">
            {finalMessage}
          </h2>
          <Button
            onClick={handleComplete}
            className="game-button px-8 py-6 text-lg"
          >
            CONTINUE <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-4">
        <div className="text-sm text-muted-foreground font-display">
          UNLOCKING {currentIndex + 1} / {items.length}
        </div>
      </div>

      <Card className="game-panel p-8 slide-up">
        {currentItem.badge && (
          <div className="text-2xl mb-4 text-center heart-beat">
            {currentItem.badge}
          </div>
        )}
        <p className="text-lg text-foreground leading-relaxed text-center">
          {currentItem.text}
        </p>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          className="game-button px-8 py-6 text-lg"
        >
          {currentIndex < items.length - 1 ? 'NEXT' : finalMessage ? 'COMPLETE' : 'CONTINUE'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
