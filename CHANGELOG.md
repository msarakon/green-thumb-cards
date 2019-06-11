# :page_with_curl: Changelog

Below is a table for keeping track of time spent on the initial development phase in summer 2019.

| date   | hrs  | what was done |
| :-----:|:-----| :------|
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
| total  | 24.5 | | 
