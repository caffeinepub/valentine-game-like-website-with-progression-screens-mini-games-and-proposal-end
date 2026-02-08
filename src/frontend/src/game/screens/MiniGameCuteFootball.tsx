import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSound } from '../audio/SoundProvider';

interface MiniGameCuteFootballProps {
  onAdvance: () => void;
}

// Difficulty constants
const SWEET_SPOT_MIN = 30; // Easier: was 40
const SWEET_SPOT_MAX = 85; // Easier: was 80
const METER_INTERVAL = 40; // Slower: was 30
const METER_STEP = 2; // Slower: was 3

export function MiniGameCuteFootball({ onAdvance }: MiniGameCuteFootballProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [power, setPower] = useState(0);
  const [powerDirection, setPowerDirection] = useState<'up' | 'down'>('up');
  const [kicked, setKicked] = useState(false);
  const [result, setResult] = useState<'goal' | 'miss' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [goals, setGoals] = useState(0);
  const { playClick, playSuccess, playError } = useSound();

  const REQUIRED_GOALS = 3;
  const MAX_ATTEMPTS = 5;

  // Power meter animation
  useEffect(() => {
    if (!gameStarted || kicked || result) return;

    const interval = setInterval(() => {
      setPower(prev => {
        if (powerDirection === 'up') {
          if (prev >= 100) {
            setPowerDirection('down');
            return 100;
          }
          return prev + METER_STEP;
        } else {
          if (prev <= 0) {
            setPowerDirection('up');
            return 0;
          }
          return prev - METER_STEP;
        }
      });
    }, METER_INTERVAL);

    return () => clearInterval(interval);
  }, [gameStarted, kicked, result, powerDirection]);

  const handleKick = useCallback(() => {
    if (kicked || result) return;

    setKicked(true);
    const isGoal = power >= SWEET_SPOT_MIN && power <= SWEET_SPOT_MAX;

    setTimeout(() => {
      if (isGoal) {
        setResult('goal');
        setGoals(prev => prev + 1);
        playSuccess();
      } else {
        setResult('miss');
        playError();
      }
      setAttempts(prev => prev + 1);
    }, 800);
  }, [kicked, result, power, playSuccess, playError]);

  const handleNextKick = useCallback(() => {
    setKicked(false);
    setResult(null);
    setPower(0);
    setPowerDirection('up');
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
    setGameStarted(true);
    setPower(0);
    setPowerDirection('up');
    setKicked(false);
    setResult(null);
    setAttempts(0);
    setGoals(0);
  };

  const gameOver = attempts >= MAX_ATTEMPTS;
  const won = goals >= REQUIRED_GOALS;

  if (!gameStarted) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Card className="game-panel p-6 inline-block border-accent/50">
            <h1 className="text-4xl font-display text-accent neon-glow">
              ⚽ CUTE FOOTBALL
            </h1>
          </Card>
        </div>

        <Card className="game-panel">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-lg">
              Time your kick perfectly to score goals!
            </p>
            <p className="text-center text-muted-foreground">
              Click "Kick" when the power meter is in the green zone ({SWEET_SPOT_MIN}-{SWEET_SPOT_MAX}%).
            </p>
            <p className="text-center text-muted-foreground">
              Score {REQUIRED_GOALS} goals out of {MAX_ATTEMPTS} attempts to win!
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

  if (gameOver) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Card className={`game-panel p-6 inline-block ${won ? 'border-accent/50' : 'border-destructive/50'}`}>
            <h1 className={`text-4xl font-display ${won ? 'text-accent' : 'text-destructive'} neon-glow`}>
              {won ? '⚽ VICTORY!' : '😢 GAME OVER'}
            </h1>
          </Card>
        </div>

        <Card className="game-panel">
          <CardContent className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <p className="text-3xl font-display">
                {won ? 'AMAZING KICKS!' : 'KEEP PRACTICING'}
              </p>
              <p className="text-xl text-muted-foreground">
                Goals Scored: {goals} / {REQUIRED_GOALS}
              </p>
              {won && (
                <p className="text-lg text-accent">
                  You're a football champion! ⚽
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
        <Card className="game-panel p-4 inline-block border-accent/50">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Goals</p>
              <p className="text-2xl font-display text-accent">{goals} / {REQUIRED_GOALS}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Attempts</p>
              <p className="text-2xl font-display text-primary">{attempts} / {MAX_ATTEMPTS}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="game-panel">
        <CardContent className="space-y-6 pt-6">
          {/* Ronaldo + Goalpost Scene */}
          <div className="relative h-64 flex items-end justify-center overflow-hidden">
            {/* Goalpost in background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <img
                src="/assets/generated/goalpost.dim_768x512.png"
                alt="Goalpost"
                className="h-48 opacity-90"
              />
            </div>

            {/* Ronaldo - changes based on game state */}
            {!result && (
              <div className="relative z-10 mb-4">
                <img
                  src="/assets/generated/ronaldo-kick.dim_768x768.png"
                  alt="Ronaldo ready to kick"
                  className="h-56 w-56 object-contain"
                />
              </div>
            )}

            {result === 'goal' && (
              <div className="relative z-10 mb-4 slide-up">
                <img
                  src="/assets/generated/ronaldo-celebrate.dim_768x768.png"
                  alt="Ronaldo celebrating"
                  className="h-56 w-56 object-contain"
                />
              </div>
            )}

            {result === 'miss' && (
              <div className="relative z-10 mb-4 slide-up">
                <img
                  src="/assets/generated/ronaldo-miss.dim_768x768.png"
                  alt="Ronaldo disappointed"
                  className="h-56 w-56 object-contain"
                />
              </div>
            )}

            {/* Football - animates during kick */}
            {kicked && !result && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 ball-flight">
                <img
                  src="/assets/generated/football-motion.dim_512x512.png"
                  alt="Football"
                  className="w-16 h-16 object-contain"
                />
              </div>
            )}
          </div>

          {/* Result message */}
          {result && (
            <div className="text-center">
              <p className={`text-2xl font-display ${result === 'goal' ? 'text-accent' : 'text-destructive'}`}>
                {result === 'goal' ? '⚽ GOAL!' : '❌ MISSED!'}
              </p>
            </div>
          )}

          {/* Power meter */}
          {!result && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Power Meter</p>
                <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                  {/* Green zone indicator */}
                  <div 
                    className="absolute h-full bg-accent/20" 
                    style={{ 
                      left: `${SWEET_SPOT_MIN}%`, 
                      width: `${SWEET_SPOT_MAX - SWEET_SPOT_MIN}%` 
                    }}
                  />
                  {/* Power bar */}
                  <div
                    className="absolute left-0 h-full bg-gradient-to-r from-destructive via-accent to-primary transition-all duration-100"
                    style={{ width: `${power}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Green zone ({SWEET_SPOT_MIN}-{SWEET_SPOT_MAX}%) = Goal!
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleKick}
                  disabled={kicked}
                  size="lg"
                  className="game-button"
                >
                  Kick!
                </Button>
              </div>
            </div>
          )}

          {/* Next kick button */}
          {result && !gameOver && (
            <div className="flex justify-center">
              <Button onClick={handleNextKick} size="lg" className="game-button">
                Next Kick
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Click "Kick" when the power meter is in the green zone!
      </div>
    </div>
  );
}
