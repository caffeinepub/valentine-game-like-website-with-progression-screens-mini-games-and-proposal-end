import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Gift } from 'lucide-react';
import { useSound } from '../audio/SoundProvider';

interface LootChestProps {
  lootItems: string[];
  onComplete: () => void;
}

export function LootChest({ lootItems, onComplete }: LootChestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { playClick, playSuccess } = useSound();

  const handleOpen = () => {
    playClick();
    setIsOpen(true);
    playSuccess();
  };

  const handleContinue = () => {
    playSuccess();
    onComplete();
  };

  if (!isOpen) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-primary neon-glow mb-2">
            LOOT DROP INCOMING
          </h2>
          <p className="text-muted-foreground">Click to open the chest</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleOpen}
            className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <img
              src="/assets/generated/loot-chest.dim_512x512.png"
              alt="Loot Chest"
              className="w-64 h-64 object-contain float-animation"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Gift className="h-16 w-16 text-primary neon-glow" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 slide-up">
      <Card className="game-panel p-8 text-center neon-border">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-3xl font-display text-primary neon-glow mb-6">
          LOOT ACQUIRED!
        </h2>
        <div className="space-y-3 mb-8">
          {lootItems.map((item, index) => (
            <div
              key={index}
              className="bg-accent/20 border border-accent/50 rounded-lg p-4 text-lg font-semibold text-accent"
            >
              {item}
            </div>
          ))}
        </div>
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
