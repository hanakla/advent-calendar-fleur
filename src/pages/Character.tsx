import React, { useCallback, useState, ChangeEvent } from 'react'
import { CharacterSelectors } from 'domains/Characters/selectors'
import { useStore, useFleurContext } from '@fleur/react'
import { UserSelectors } from 'domains/Users/selectors'
import { CharacterOps } from 'domains/Characters/operations'
import { API } from 'domains/api'

export const CharacterPage = () => {
  // URLからテキトーにキャラクターIDを取ってくる
  // const { characterId } = useParams()
  const characterId = 1

  const { executeOperation, depend } = useFleurContext()
  const character = useStore(getStore =>
    CharacterSelectors.getById(getStore, '1')
  )
  const user = useStore(getStore =>
    character ? UserSelectors.getById(getStore, character.user_id) : null
  )

  const handleChangeName = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      if (!character) return
      depend(API.putCharacter)({ name: currentTarget!.value })
      executeOperation(CharacterOps.fetchCharacter, character.id)
    },
    [character]
  )

  if (!character || !user) {
    return <div>{/* いい感じのスケルトンを出す */}</div>
  }

  return (
    <div>
      <h1>
        <input
          type="text"
          defaultValue={character.name}
          onChange={handleChangeName}
          data-testid="input"
        />
      </h1>
      <h2>
        <a href={`/users/${user.id}`} data-testid="author">
          {user.name}
        </a>
      </h2>
    </div>
  )
}
