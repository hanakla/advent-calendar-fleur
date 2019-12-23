import { reducerStore } from '@fleur/fleur'
import { CharacterActions } from './actions'
import { CharacterEntity } from './types'

interface State {
  characters: { [characterId: string]: CharacterEntity | void }
  fetching: { [characterId: string]: { fetching: boolean; error?: Error } }
}

export const CharacterStore = reducerStore<State>('Character', () => ({
  characters: {},
  fetching: {}
}))
  .listen(CharacterActions.charactersFetched, (state, characters) => {
    characters.forEach(c => (state.characters[c.id] = c))
  })
  .listen(CharacterActions.fetching.started, (state, { characterId }) => {
    state.fetching[characterId] = { fetching: true }
  })
  .listen(CharacterActions.fetching.done, (state, { characterId }) => {
    state.fetching[characterId] = { fetching: false }
  })
  .listen(CharacterActions.fetching.failed, (state, { characterId, error }) => {
    state.fetching[characterId] = { fetching: false, error }
  })
