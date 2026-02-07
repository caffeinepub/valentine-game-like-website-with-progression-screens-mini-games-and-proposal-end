import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface AchievementToastProps {
  title: string;
  description: string;
  show: boolean;
}

export function AchievementToast({ title, description, show }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 slide-up">
      <Card className="game-panel p-4 flex items-start gap-3 neon-border max-w-sm">
        <Trophy className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
        <div>
          <div className="font-display text-primary text-sm mb-1">ACHIEVEMENT UNLOCKED</div>
          <div className="font-bold text-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </Card>
    </div>
  );
}
