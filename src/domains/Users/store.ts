import { reducerStore } from "@fleur/fleur";
import { UserEntity } from "./types";

interface State {
  users: { [userId: string]: UserEntity | void };
}

export const UserStore = reducerStore<State>("User", () => ({ users: {} }));
