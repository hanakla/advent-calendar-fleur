import { render, getByTestId, fireEvent } from '@testing-library/react'
import { TestingFleurContext } from '@fleur/testing'
import React from 'react'
import { baseComponentContext } from 'spec/mock'
import { CharacterPage } from './character'
import { CharacterStore } from 'domains/Characters/store'
import { fakeCharacter } from 'spec/fakes/character'
import { fakeUser } from 'spec/fakes/user'
import { UserStore } from 'domains/Users/store'
import { API } from 'domains/api'
import { CharacterOps } from 'domains/Characters/operations'

describe('Character', () => {
  const mockedContext = baseComponentContext.derive(({ deriveStore }) => {
    deriveStore(CharacterStore, state => {
      state.characters['1'] = fakeCharacter({
        id: '1',
        name: 'Haru Sakura',
        user_id: '2'
      })
    })

    deriveStore(UserStore, state => {
      state.users['2'] = fakeUser({
        id: '2',
        name: 'Hanakla'
      })
    })
  })

  it('キャラクターの情報ちゃんと出てる？', async () => {
    const context = mockedContext.derive()

    const tree = render(
      <TestingFleurContext value={context}>
        {/* <なんとかRouter url='/characters/1'> */}
        <CharacterPage />
        {/* </なんとかRouter> */}
      </TestingFleurContext>
    )

    expect(tree.getByTestId('input').value).toBe('Haru Sakura')
    expect(tree.getByTestId('author').getAttribute('href')).toBe('/users/2')
    expect(tree.getByTestId('author').innerHTML).toBe('Hanakla')
  })

  it('APIリクエストちゃんと飛ぶ？', async () => {
    const apiSpy = jest.fn(async () => void 0)
    const context = mockedContext.derive(({ injectDep }) => {
      injectDep(API.putCharacter, apiSpy)
    })

    const tree = render(
      <TestingFleurContext value={context}>
        {/* <なんとかRouter url='/characters/1'> */}
        <CharacterPage />
        {/* </なんとかRouter> */}
      </TestingFleurContext>
    )

    fireEvent.change(tree.getByTestId('input'), {
      target: { value: 'Haru' }
    })

    // Wait for request
    await new Promise(r => setTimeout(r))

    expect(apiSpy).toBeCalledWith({ name: 'Haru' })
    expect(context.executes[0]).toMatchObject({
      op: CharacterOps.fetchCharacter,
      args: ['1']
    })
  })
})
