import { useEffect, useState } from 'react';

interface PixelHeartsProps {
  count?: number;
}

export function PixelHearts({ count = 20 }: PixelHeartsProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: '4s',
          }}
        >
          <div className="text-4xl opacity-80">💖</div>
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
