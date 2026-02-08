import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSound } from '../audio/SoundProvider';
import { Heart } from 'lucide-react';

interface MiniGameHeartCollectorProps {
  onAdvance: () => void;
}

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

export function MiniGameHeartCollector({ onAdvance }: MiniGameHeartCollectorProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [nextHeartId, setNextHeartId] = useState(0);
  const { playClick, playSuccess } = useSound();

  const TARGET_SCORE = 15;

  // Spawn hearts periodically
  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

    const spawnInterval = setInterval(() => {
      const newHeart: FallingHeart = {
        id: nextHeartId,
        x: Math.random() * 80 + 10, // 10-90% of width
        y: -10,
        speed: Math.random() * 2 + 2, // 2-4 speed
        size: Math.random() * 20 + 30, // 30-50px
      };
      setHearts(prev => [...prev, newHeart]);
      setNextHeartId(prev => prev + 1);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameCompleted, nextHeartId]);

  // Move hearts down
  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

    const moveInterval = setInterval(() => {
      setHearts(prev => 
        prev
          .map(heart => ({ ...heart, y: heart.y + heart.speed }))
          .filter(heart => heart.y < 110) // Remove hearts that went off screen
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameCompleted]);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameCompleted) return;

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameStarted, gameCompleted]);

  // Check win condition
  useEffect(() => {
    if (score >= TARGET_SCORE && !gameCompleted) {
      setGameCompleted(true);
      playSuccess();
    }
  }, [score, gameCompleted, playSuccess]);

  const handleHeartClick = useCallback((heartId: number) => {
    setHearts(prev => prev.filter(h => h.id !== heartId));
    setScore(prev => prev + 1);
    playClick();
  }, [playClick]);

  const handleStart = () => {
    setGameStarted(true);
    playClick();
  };

  const handleContinue = () => {
    playClick();
    onAdvance();
  };

  const handleRetry = () => {
    playClick();
    // Reset all game state to initial values
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
    setGameStarted(true);
    setGameCompleted(false);
    setNextHeartId(0);
  };

  if (!gameStarted) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Card className="game-panel p-6 inline-block border-primary/50">
            <h1 className="text-4xl font-display text-primary neon-glow">
              💕 HEART COLLECTOR
            </h1>
          </Card>
        </div>

        <Card className="game-panel">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-lg">
              Tap the falling hearts to collect them!
            </p>
            <p className="text-center text-muted-foreground">
              Collect {TARGET_SCORE} hearts before time runs out to win.
            </p>
            <div className="flex justify-center pt-4">
              <Button onClick={handleStart} size="lg" className="game-button">
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    const won = score >= TARGET_SCORE;
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Card className={`game-panel p-6 inline-block ${won ? 'border-primary/50' : 'border-destructive/50'}`}>
            <h1 className={`text-4xl font-display ${won ? 'text-primary' : 'text-destructive'} neon-glow`}>
              {won ? '💕 HEARTS COLLECTED!' : '💔 TIME\'S UP!'}
            </h1>
          </Card>
        </div>

        <Card className="game-panel">
          <CardContent className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <p className="text-3xl font-display">
                {won ? 'SUCCESS!' : 'TRY AGAIN'}
              </p>
              <p className="text-xl text-muted-foreground">
                Final Score: {score} / {TARGET_SCORE}
              </p>
              {won && (
                <p className="text-lg text-primary">
                  You collected all the hearts! 💕
                </p>
              )}
            </div>
            <div className="flex justify-center gap-4">
              {won ? (
                <Button onClick={handleContinue} size="lg" className="game-button">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleRetry} size="lg" className="game-button">
                  Retry
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-4">
        <Card className="game-panel p-4 inline-block border-primary/50">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-display text-primary">{score} / {TARGET_SCORE}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-display text-accent">{timeLeft}s</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="game-panel relative overflow-hidden" style={{ height: '500px' }}>
        <CardContent className="p-0 h-full relative">
          {/* Game area */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background">
            {hearts.map(heart => (
              <button
                key={heart.id}
                onClick={() => handleHeartClick(heart.id)}
                className="absolute transition-none cursor-pointer hover:scale-110 active:scale-95"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  width: `${heart.size}px`,
                  height: `${heart.size}px`,
                }}
              >
                <Heart
                  className="w-full h-full"
                  style={{ 
                    color: '#ef4444',
                    fill: '#ef4444',
                    filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))'
                  }}
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Tap the hearts to collect them!
      </div>
    </div>
  );
}
