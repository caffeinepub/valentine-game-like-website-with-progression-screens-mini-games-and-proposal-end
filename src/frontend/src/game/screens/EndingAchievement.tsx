import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Heart } from 'lucide-react';
import { AchievementToast } from '../components/AchievementToast';
import { PixelHearts } from '../components/PixelHearts';

export function EndingAchievement() {
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAchievement(true), 500);
  }, []);

  const rewards = [
    'Unlimited kissies and cuddles',
    'My yap dustbin',
    'Cute pictures and gifts',
  ];

  return (
    <>
      <AchievementToast
        title="Valentine Partner 2026"
        description="Best matches are played with great teamwork"
        show={showAchievement}
      />
      <PixelHearts count={25} />

      <div className="w-full max-w-3xl mx-auto space-y-6">
        <Card className="game-panel p-12 text-center neon-border pulse-glow slide-up">
          <div className="mb-6">
            <img
              src="/assets/generated/valentine-achievement-badge.dim_512x512.png"
              alt="Achievement Badge"
              className="w-32 h-32 mx-auto object-contain float-animation"
            />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-display text-primary neon-glow">
              ACHIEVEMENT UNLOCKED
            </h1>
          </div>

          <h2 className="text-3xl font-display text-accent mb-8">
            Valentine Partner 2026
          </h2>

          <div className="mb-8">
            <div className="text-xl font-display text-foreground mb-4">REWARDS:</div>
            <div className="space-y-3">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 bg-primary/10 border border-primary/30 rounded-lg slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Heart className="h-5 w-5 text-primary fill-current" />
                  <span className="text-lg text-foreground">{reward}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-2xl text-accent font-display italic">
            "Best matches are played with great teamwork."
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            © 2026. Built with <Heart className="inline h-4 w-4 text-destructive fill-current" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </Card>
      </div>
    </>
  );
}
