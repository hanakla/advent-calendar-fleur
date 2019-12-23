import { CharacterStore } from './store'
import { CharacterActions } from './actions'
import { baseOperationContext } from 'spec/mock'
import { fakeCharacter } from 'spec/fakes/character'

describe('CharacterStore', () => {
  it('エンティティがちゃんと保存されるか', () => {
    const context = baseOperationContext.derive(({ deriveStore }) => {
      deriveStore(CharacterStore, state => {
        state.characters['10'] = fakeCharacter({ id: '10' })
      })
    })
    const character = fakeCharacter()
    context.dispatch(CharacterActions.charactersFetched, [character])

    expect(
      context.getStore(CharacterStore).state.characters[character.id]
    ).toEqual(character)
  })
})
