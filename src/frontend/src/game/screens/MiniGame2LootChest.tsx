import { LootChest } from '../components/LootChest';

interface MiniGame2LootChestProps {
  onAdvance: () => void;
}

export function MiniGame2LootChest({ onAdvance }: MiniGame2LootChestProps) {
  return (
    <LootChest
      lootItems={['1 Million kissies']}
      onComplete={onAdvance}
    />
  );
}
