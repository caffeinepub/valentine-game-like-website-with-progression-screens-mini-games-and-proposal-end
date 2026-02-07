import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function FakeLoading() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Loading next mission...',
    'Preparing game assets...',
    'Syncing player data...',
    'Almost ready...',
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [messages.length]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="game-panel p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-2xl font-display text-primary neon-glow mb-2">
              {messages[messageIndex]}
            </div>
            <div className="text-sm text-muted-foreground">
              {progress}%
            </div>
          </div>

          <Progress value={progress} className="h-3" />

          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
