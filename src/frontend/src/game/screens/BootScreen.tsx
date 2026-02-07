import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useSound } from '../audio/SoundProvider';

interface BootScreenProps {
  onAdvance: () => void;
}

export function BootScreen({ onAdvance }: BootScreenProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const { playClick } = useSound();

  const loadingMessages = [
    'Loading Valentine Event...',
    'Connecting to memory servers...',
    'Checking player data...',
    '',
    'Player detected:',
    'Awwds the white death',
    '',
    'Event ready.',
  ];

  useEffect(() => {
    if (loadingStep < loadingMessages.length) {
      const timer = setTimeout(() => {
        setLoadingStep(loadingStep + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loadingStep, loadingMessages.length]);

  const handleStart = () => {
    playClick();
    onAdvance();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Card className="game-panel p-8">
        <div className="space-y-3 font-mono text-sm mb-8">
          {loadingMessages.slice(0, loadingStep).map((msg, index) => (
            <div
              key={index}
              className={`slide-up ${msg.includes('Awwds') ? 'text-primary text-lg font-bold' : 'text-muted-foreground'}`}
            >
              {msg || '\u00A0'}
            </div>
          ))}
        </div>

        {loadingStep >= loadingMessages.length && (
          <div className="flex justify-center slide-up">
            <Button
              onClick={handleStart}
              className="game-button px-12 py-6 text-xl neon-border pulse-glow"
            >
              <Play className="mr-2 h-6 w-6" />
              PRESS START
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
