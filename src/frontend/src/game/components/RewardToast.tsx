import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface RewardToastProps {
  message: string;
  icon?: string;
  show: boolean;
}

export function RewardToast({ message, icon = '⭐', show }: RewardToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 slide-up">
      <Card className="game-panel px-6 py-4 flex items-center gap-3 neon-border">
        <span className="text-3xl">{icon}</span>
        <span className="text-lg font-display text-primary">{message}</span>
      </Card>
    </div>
  );
}
