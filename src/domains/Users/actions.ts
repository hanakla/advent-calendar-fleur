import { actions, action } from '@fleur/fleur'
import { UserEntity } from './types'

export const UserActions = actions(
  /* Redux Devtools用の識別子 = */ 'Characters',
  {
    // action名: action<ペイロードの型>()
    usersFetched: action<UserEntity[]>()
  }
)
