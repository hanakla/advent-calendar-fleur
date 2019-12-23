import { fakeRawCharacter } from "spec/fakes/character";

export const API = {
  async getCharacter() {
    return fakeRawCharacter();
  },
  async putCharacter(field: { name: string }) {}
};
