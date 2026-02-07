import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '../audio/SoundProvider';

export function SoundToggle() {
  const { isEnabled, toggle } = useSound();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className="bg-card/80 backdrop-blur-sm border-primary/30 hover:bg-card hover:border-primary/50"
    >
      {isEnabled ? (
        <Volume2 className="h-5 w-5 text-primary" />
      ) : (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
}
