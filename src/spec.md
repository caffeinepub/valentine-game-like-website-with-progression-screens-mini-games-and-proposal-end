# Specification

## Summary
**Goal:** Add static Ronaldo goal-kick visuals to the Cute Football mini-game and display them across gameplay states (idle/aiming, kick, goal, miss).

**Planned changes:**
- Add new static image assets under `frontend/public/assets/generated` for Ronaldo kick/celebrate/miss, a goalpost, and a motion football.
- Update `MiniGameCuteFootball` UI to render the appropriate images for idle/aiming, kick action, and result (goal vs miss) states without changing game rules or flow.

**User-visible outcome:** During the Cute Football mini-game, players see Ronaldo-themed visuals that change when aiming, kicking, and when the shot results in a goal or a miss.
