# :page_with_curl: Changelog

Below is a table for keeping track of time spent on the initial development phase in summer 2019.

| date   | hrs  | what was done |
| :-----:|:-----| :------|
| 7/12   | 1    | Added timeout for when an AI player places a garden item (for future animations), updated dependencies
| 7/11   | 1    | Some typing fixes, trying to find a good way to display AI player animations
| 7/10   | 2.5  | Took a 2-week break from the project after spending a few hours trying to nail the art style for cards and failing. Finally decided to go with a lot simpler style and managed to draw pictures for Fuschia, Lily, Chinese Lantern, Calla and Camellia.
| 6/23   | 1    | Added placeholder images for cards and garden items
| 6/22   | 0.5  | Removed React Prop-Types since TS is enough for type checking. Updated dependencies.
| 6/19   | 3    | Study & use TypeScript
| 6/18   | 2.5  | Test coverage is back to 97%. Fixed a few bugs created by previous day's refactoring. Separated active (in hand) defenders from passive (in garden) defenders. Game now ends if there are no more possible moves left.
| 6/17   | 2    | Moved game logic to Redux middlewares, aka. Refactoring Strikes Back
| 6/15   | 1    | Studied Redux middlewares as a way to neatly contain the game logic
| 6/14   | 2.5  | Refactored turn handling. Player can now use special cards - for AI, this is still work in progress.
| 6/13   | 1    | Defense cards are removed after use. Only some disasters affect all players. Environment items can protect plants from disasters.
| 6/12   | 1    | Some more refactoring. Defense cards are now played automatically.
| 6/11   | 2.5  | Did a whole lot of refactoring to get a better maintainability score. Moved game logic away from the React components.
| 6/9    | 0.5  | Updated dependencies, fixed AI logic (would not draw a card at start of turn)
| 6/7    | 2    | Turns out disaster handling did not work properly, but now it might. Also minor improvements such as displaying an empty deck.
| 6/6    | 2    | Fixed chaining Redux actions, disaster handling now works properly. AI can now use their turn to steal a plant. I have created a monster.
| 6/5    | 2    | Refactored some tests using Enzyme, wondering why disaster handling fails randomly
| 6/4    | 1.5  | Added styling and functionality for the deck - player now needs to manually pick a new card.
| 6/3    | 1.5  | Initial street functionality. Disasters may throw plants to the street and the player can choose to pick a plant from the street on their turn.
| 6/2    | 4    | Implemented positioning of a garden item, initial stealing and handling of disaster cards. AI players can now select and place random plants from their hand.
| 6/1    | 1    | Fixed ending the turn after adding a garden item, added a few tests & redux-mock-store
| 5/31   | 2    | Added primitive functionality for adding a new plant to garden. Frustration over mousemove events.
| 5/30   | 5    | Selected the tools (React, Webpack, Jest, etc.) and built a barebones version of the UI with some primitive state management. Card JSON now contains real data. |
| 5/29   | 0.5  | Created the repository and generated the placeholder card JSON. |
| total  | 43.5 | | 
