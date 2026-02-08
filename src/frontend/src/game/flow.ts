export type ScreenId = 
  | 'boot'
  | 'lobby'
  | 'level1'
  | 'minigame1'
  | 'level2'
  | 'minigameHeartCollector'
  | 'minigame2'
  | 'level3'
  | 'minigameFootball'
  | 'level4'
  | 'minigame3'
  | 'proposal'
  | 'ending';

export const SCREEN_FLOW: Record<ScreenId, ScreenId | null> = {
  boot: 'lobby',
  lobby: 'level1',
  level1: 'minigame1',
  minigame1: 'level2',
  level2: 'minigameHeartCollector',
  minigameHeartCollector: 'minigame2',
  minigame2: 'level3',
  level3: 'minigameFootball',
  minigameFootball: 'level4',
  level4: 'minigame3',
  minigame3: 'proposal',
  proposal: 'ending',
  ending: null,
};

export function getNextScreen(current: ScreenId): ScreenId | null {
  return SCREEN_FLOW[current];
}
