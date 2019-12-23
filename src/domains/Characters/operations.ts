import { operations } from '@fleur/fleur'
import { CharacterActions } from 'domains/Characters/actions'
import { UserActions } from 'domains/Users/actions'
import { normalize } from 'domains/normalize'
import { API } from 'domains/api'
import { rethrowIfNotResponseError } from 'utils'

export const CharacterOps = operations({
  // 特定のキャラクターの情報を取得する
  async fetchCharacter(context, characterId: string) {
    context.dispatch(CharacterActions.fetching.started, { characterId })

    // 認証情報取る
    // const credential = AppSelectors.getCredential(context.getStore);

    try {
      // APIからデータを取る
      const response = await context.depend(API.getCharacter)(
        // credential,
        characterId
      )

      // Entityを正規化したりDateに変換したりは`normalize`でやったことにする
      const { user, ...character } = normalize(response)
      console.log(user, character, response)

      // 正規化したデータをStoreに送りつける
      context.dispatch(CharacterActions.charactersFetched, [character])
      context.dispatch(UserActions.usersFetched, [user])
      context.dispatch(CharacterActions.fetching.done, { characterId })
    } catch (error) {
      rethrowIfNotResponseError(error)
      context.dispatch(CharacterActions.fetching.failed, {
        characterId,
        error
      })
    }
  }
  // 他のoperationの定義が続く
})
