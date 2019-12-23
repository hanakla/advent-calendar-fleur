import { CharacterOps } from './operations'
import { CharacterActions } from './actions'
import { UserActions } from 'domains/Users/actions'
import { API } from 'domains/api'
import { baseOperationContext } from 'spec/mock'
import { fakeRawCharacter } from 'spec/fakes/character'

describe('CharacterOps', () => {
  it('キャラクターとユーザーのEntityちゃんと投げた？', async () => {
    const context = baseOperationContext.derive(({ injectDep }) => {
      // Storeの特定の状態を設定する場合は `deriveStore` をする
      // deriveStore(AppStore, { credentialKey: 'mock' })

      // API.getCharacterをモックする
      injectDep(API.getCharacter, async (_, characterId) => fakeRawCharacter())
    })

    await context.executeOperation(CharacterOps.fetchCharacter, '1011')

    expect(context.dispatches[1]).toMatchObject({
      action: CharacterActions.charactersFetched
    })
    // expect(context.dispatches[1].payload).toMatchInlineSnapshot()

    expect(context.dispatches[2]).toMatchObject({
      action: UserActions.usersFetched
    })
    // expect(context.dispatches[2].payload).toMatchInlineSnapshot()
  })
})
