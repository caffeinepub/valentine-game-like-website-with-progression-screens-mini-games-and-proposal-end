import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { PixelHearts } from '../components/PixelHearts';
import { useSound } from '../audio/SoundProvider';

interface FinalProposalProps {
  onAdvance: () => void;
}

export function FinalProposal({ onAdvance }: FinalProposalProps) {
  const [showProposal, setShowProposal] = useState(false);
  const [tryAgainCount, setTryAgainCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const { playClick, playSuccess } = useSound();

  const handleShowProposal = () => {
    playClick();
    setTimeout(() => {
      setShowProposal(true);
    }, 1000);
  };

  const handleTryAgain = () => {
    playClick();
    setTryAgainCount(prev => prev + 1);
  };

  const handleYes = () => {
    playSuccess();
    setShowHearts(true);
    setTimeout(() => {
      onAdvance();
    }, 2000);
  };

  const yesButtonScale = 1 + (tryAgainCount * 0.15);

  if (!showProposal) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card className="game-panel p-8 text-center slide-up">
          <h2 className="text-3xl font-display text-primary neon-glow mb-4">
            MISSION COMPLETE
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Solo mode finished.
          </p>
          <div className="text-6xl mb-6">🎮</div>
          <Button
            onClick={handleShowProposal}
            className="game-button px-8 py-6 text-lg"
          >
            CONTINUE
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {showHearts && <PixelHearts count={30} />}

      <div className="w-full max-w-2xl mx-auto space-y-6 slide-up">
        <Card className="game-panel p-8 text-center neon-border pulse-glow">
          <div className="text-5xl mb-6 heart-beat">❤️</div>
          <h2 className="text-4xl font-display text-primary neon-glow mb-4">
            DUO MODE REQUEST
          </h2>
          <p className="text-xl text-foreground mb-8 leading-relaxed">
            "It's so much fun playing the game of life with you."
          </p>
          <div className="text-3xl font-display text-accent mb-8">
            💘 Will you be my Valentine?
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleYes}
              className="game-button text-xl neon-border transition-all duration-300"
              style={{
                transform: `scale(${yesButtonScale})`,
                padding: `${1.5 * yesButtonScale}rem ${3 * yesButtonScale}rem`,
              }}
            >
              <Heart className="mr-2 h-6 w-6 fill-current" />
              YES ❤️
            </Button>

            {tryAgainCount < 5 && (
              <Button
                onClick={handleTryAgain}
                variant="outline"
                className="px-6 py-3 text-base border-muted-foreground/30 hover:bg-muted/20"
              >
                TRY AGAIN 😄
              </Button>
            )}
          </div>

          {tryAgainCount >= 3 && (
            <p className="text-sm text-muted-foreground mt-6 slide-up">
              The YES button is getting bigger... maybe it's a sign? 😉
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
