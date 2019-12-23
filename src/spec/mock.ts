import { mockFleurContext, mockStore } from "@fleur/testing"
import { CharacterStore } from "domains/Characters/store"
import { UserStore } from "domains/Users/store"

const baseContext = mockFleurContext({
  stores: [
    // ここにアプリで使われるStoreをこの形式で突っ込む
    mockStore(CharacterStore),
    mockStore(UserStore)
  ]
})

export const baseOperationContext = baseContext.mockOperationContext()
export const baseComponentContext = baseContext.mockComponentContext()
