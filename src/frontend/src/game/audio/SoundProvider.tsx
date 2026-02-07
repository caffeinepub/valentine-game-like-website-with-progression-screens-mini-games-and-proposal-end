import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface SoundContextType {
  isEnabled: boolean;
  toggle: () => void;
  playClick: () => void;
  playUnlock: () => void;
  playSuccess: () => void;
  playError: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggle = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!isEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Silently fail if audio context is not available
    }
  }, [isEnabled]);

  const playClick = useCallback(() => playSound(800, 0.1, 'square'), [playSound]);
  const playUnlock = useCallback(() => {
    playSound(523, 0.1, 'sine');
    setTimeout(() => playSound(659, 0.1, 'sine'), 100);
    setTimeout(() => playSound(784, 0.15, 'sine'), 200);
  }, [playSound]);
  const playSuccess = useCallback(() => {
    playSound(523, 0.1, 'sine');
    setTimeout(() => playSound(659, 0.1, 'sine'), 80);
    setTimeout(() => playSound(784, 0.1, 'sine'), 160);
    setTimeout(() => playSound(1047, 0.2, 'sine'), 240);
  }, [playSound]);
  const playError = useCallback(() => playSound(200, 0.2, 'sawtooth'), [playSound]);

  return (
    <SoundContext.Provider value={{ isEnabled, toggle, playClick, playUnlock, playSuccess, playError }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
}
