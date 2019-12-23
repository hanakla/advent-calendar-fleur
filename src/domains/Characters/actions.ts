import { actions, action } from "@fleur/fleur";
import { CharacterEntity } from "./types";

export const CharacterActions = actions(
  /* Redux Devtools用の識別子 = */ "Characters",
  {
    // action名: action<ペイロードの型>()
    charactersFetched: action<CharacterEntity[]>(),
    fetching: action.async<
      { characterId: string },
      { characterId: string },
      { characterId: string; error: Error }
    >()
  }
);
