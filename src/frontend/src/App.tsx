import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { GameShell } from './game/GameShell';
import { SoundProvider } from './game/audio/SoundProvider';
import { BootScreen } from './game/screens/BootScreen';
import { LobbyScreen } from './game/screens/LobbyScreen';
import { Level1OriginStory } from './game/screens/Level1OriginStory';
import { MiniGame1Defuse } from './game/screens/MiniGame1Defuse';
import { Level2MemoryArena } from './game/screens/Level2MemoryArena';
import { MiniGameHeartCollector } from './game/screens/MiniGameHeartCollector';
import { MiniGame2LootChest } from './game/screens/MiniGame2LootChest';
import { Level3Reasons } from './game/screens/Level3Reasons';
import { MiniGameCuteFootball } from './game/screens/MiniGameCuteFootball';
import { Level4SupportMission } from './game/screens/Level4SupportMission';
import { MiniGame3Penalty } from './game/screens/MiniGame3Penalty';
import { FinalProposal } from './game/screens/FinalProposal';
import { EndingAchievement } from './game/screens/EndingAchievement';
import { FakeLoading } from './game/screens/FakeLoading';
import { ScreenId } from './game/flow';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('boot');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdvance = (nextScreen: ScreenId, withLoading = false) => {
    if (withLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentScreen(nextScreen);
      }, 2500);
    } else {
      setCurrentScreen(nextScreen);
    }
  };

  const renderScreen = () => {
    if (isLoading) {
      return <FakeLoading />;
    }

    switch (currentScreen) {
      case 'boot':
        return <BootScreen onAdvance={() => handleAdvance('lobby')} />;
      case 'lobby':
        return <LobbyScreen onAdvance={() => handleAdvance('level1', true)} />;
      case 'level1':
        return <Level1OriginStory onAdvance={() => handleAdvance('minigame1')} />;
      case 'minigame1':
        return <MiniGame1Defuse onAdvance={() => handleAdvance('level2', true)} />;
      case 'level2':
        return <Level2MemoryArena onAdvance={() => handleAdvance('minigameHeartCollector')} />;
      case 'minigameHeartCollector':
        return <MiniGameHeartCollector onAdvance={() => handleAdvance('minigame2', true)} />;
      case 'minigame2':
        return <MiniGame2LootChest onAdvance={() => handleAdvance('level3')} />;
      case 'level3':
        return <Level3Reasons onAdvance={() => handleAdvance('minigameFootball', true)} />;
      case 'minigameFootball':
        return <MiniGameCuteFootball onAdvance={() => handleAdvance('level4', true)} />;
      case 'level4':
        return <Level4SupportMission onAdvance={() => handleAdvance('minigame3')} />;
      case 'minigame3':
        return <MiniGame3Penalty onAdvance={() => handleAdvance('proposal', true)} />;
      case 'proposal':
        return <FinalProposal onAdvance={() => handleAdvance('ending')} />;
      case 'ending':
        return <EndingAchievement />;
      default:
        return <BootScreen onAdvance={() => handleAdvance('lobby')} />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SoundProvider>
        <GameShell>
          {renderScreen()}
        </GameShell>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
