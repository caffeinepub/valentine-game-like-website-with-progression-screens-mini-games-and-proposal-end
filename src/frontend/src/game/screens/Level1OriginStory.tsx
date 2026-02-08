import { Card } from '@/components/ui/card';
import { UnlockSequence } from '../components/UnlockSequence';

interface Level1OriginStoryProps {
  onAdvance: () => void;
}

export function Level1OriginStory({ onAdvance }: Level1OriginStoryProps) {
  const storyBeats = [
    { text: 'Out of all the places that night, Teammate somehow ended up sitting on a random footpath, slightly drunk, when the player and his friends walked up to her.' },
    { text: 'And the funniest part? Player, who doesn\'t smoke asked the Teammate who also doesn\'t smoke for a cigarette' },
    { text: 'They talked, laughed, and then the teammate left… thinking that was probably the end of it.' },
    { text: 'But somehow they kept running into each other that night.' },
    { text: 'Player asked for teammate\'s Instagram, she refused, and still somehow later she was the one searching for your account.' },
    { text: 'And then they discovered they\'re from the same town… maybe even grew up in the same colony without knowing.' },
    { text: 'Some coincidences feel too weird to ignore.' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Card className="game-panel p-6 inline-block">
          <h1 className="text-4xl font-display text-primary neon-glow">
            MISSION: HOW IT ALL STARTED
          </h1>
        </Card>
      </div>

      <UnlockSequence
        items={storyBeats}
        onComplete={onAdvance}
        finalMessage="MISSION COMPLETE"
        finalBadge="🎯"
        finalBody={
          <p className="text-lg text-accent font-semibold">
            Reward unlocked: First Memory
          </p>
        }
      />
    </div>
  );
}
