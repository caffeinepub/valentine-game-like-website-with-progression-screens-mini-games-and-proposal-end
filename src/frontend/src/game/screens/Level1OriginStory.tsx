import { Card } from '@/components/ui/card';
import { UnlockSequence } from '../components/UnlockSequence';

interface Level1OriginStoryProps {
  onAdvance: () => void;
}

export function Level1OriginStory({ onAdvance }: Level1OriginStoryProps) {
  const storyBeats = [
    { text: 'College event football and DJ night chaos' },
    { text: 'Cigarette interaction even though both don\'t smoke' },
    { text: 'Discovering both of them are from the same town, Kadapa' },
    { text: 'Dramatic Insta Rejection' },
    { text: 'Rejecting my cute BYE' },
    { text: 'Stalking and Coincidence' },
    { text: 'Plot twist: we might have grown up in the same colony' },
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
      />
    </div>
  );
}
