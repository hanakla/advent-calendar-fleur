import { selector, selectorWithStore } from "@fleur/fleur";
import { CharacterStore } from "./store";

export const CharacterSelectors = {
  getById: selector(
    (getState, id: string) => getState(CharacterStore).characters[id]
  ),
  a: selectorWithStore
};
