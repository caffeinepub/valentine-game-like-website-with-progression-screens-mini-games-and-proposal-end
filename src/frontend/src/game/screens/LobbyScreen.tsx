import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, User, Gamepad2 } from 'lucide-react';
import { useSound } from '../audio/SoundProvider';

interface LobbyScreenProps {
  onAdvance: () => void;
}

export function LobbyScreen({ onAdvance }: LobbyScreenProps) {
  const { playClick } = useSound();

  const handleStart = () => {
    playClick();
    onAdvance();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-display text-primary neon-glow mb-2">
          GAME LOBBY
        </h1>
      </div>

      <Card className="game-panel p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">PLAYER</div>
                <div className="text-xl font-display text-foreground">Awwds the white death</div>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/50">Online</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 className="h-8 w-8 text-accent" />
              <div>
                <div className="text-sm text-muted-foreground">MODE</div>
                <div className="text-xl font-display text-foreground">Solo</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="game-panel p-6 border-accent/50 bg-accent/10 slide-up">
        <div className="flex items-center gap-3">
          <div className="text-2xl">💌</div>
          <div className="text-accent font-semibold">
            New teammate request pending...
          </div>
        </div>
      </Card>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleStart}
          className="game-button px-12 py-6 text-xl neon-border"
        >
          <Play className="mr-2 h-6 w-6" />
          START MATCH
        </Button>
      </div>
    </div>
  );
}
