import { Card } from '@/components/ui/card';
import { UnlockSequence } from '../components/UnlockSequence';

interface Level2MemoryArenaProps {
  onAdvance: () => void;
}

export function Level2MemoryArena({ onAdvance }: Level2MemoryArenaProps) {
  const memories = [
    { text: 'Our GMeet movie nights', badge: '❤️ Memory Unlocked' },
    { text: 'Our First date with jenga and our lake hangout', badge: '❤️ Memory Unlocked' },
    { text: 'Joshi laying on your shoulder', badge: '❤️ Memory Unlocked' },
    { text: 'Late night calls where there will be more roasting than flirting', badge: '❤️ Memory Unlocked' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Card className="game-panel p-6 inline-block">
          <h1 className="text-4xl font-display text-primary neon-glow">
            MEMORY ARENA
          </h1>
        </Card>
      </div>

      <UnlockSequence
        items={memories}
        onComplete={onAdvance}
      />
    </div>
  );
}
