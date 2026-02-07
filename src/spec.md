# Specification

## Summary
**Goal:** Build a single-page, game-like Valentine experience that progresses through a fixed sequence of screens/levels with mini-games and ends in a proposal + achievement screen.

**Planned changes:**
- Implement the full client-side screen flow with state-driven transitions: Boot Screen → Lobby → Level 1 → Mini Game 1 → Level 2 → Mini Game 2 → Level 3 → Level 4 → Mini Game 3 → Final Proposal → Ending/Achievement.
- Build each screen’s required UI and exact text (player name, prompts, rewards, memories, reasons, appreciation moments, proposal question, and ending achievement/rewards).
- Implement Mini Game 1 and Mini Game 3 as multiple-choice interactions with win/lose states and retry on incorrect choices.
- Implement Mini Game 2 as a clickable chest open that reveals loot including “1 Million kissies”.
- Add optional polish: toggleable sound, XP/achievement popups, at least one pixel-heart animation moment, inside-jokes-style popups, and at least one fake loading screen transition.
- Apply a consistent Fortnite/Valorant-inspired dark panel UI theme with bold typography and high-contrast accents using a palette that avoids blue/purple as primary accents.
- Add and use generated static images from `frontend/public/assets/generated` (background, chest, achievement badge/trophy, pixel heart sprite sheet).

**User-visible outcome:** A user can play through a complete Valentine “event” website from boot-up to final proposal, interact with three mini-games, see unlock/reward moments, and reach an ending achievement screen after accepting the Valentine prompt.

