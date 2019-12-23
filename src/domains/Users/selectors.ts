import { selector } from "@fleur/fleur";
import { UserStore } from "./store";

export const UserSelectors = {
  getById: selector((getState, id: string) => getState(UserStore).users[id])
};
