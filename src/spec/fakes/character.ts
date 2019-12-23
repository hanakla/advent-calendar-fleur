import { CharacterEntity } from 'domains/Characters/types'
import faker from 'faker'

export const fakeRawCharacter = () => ({
  id: faker.random.number().toString(),
  name: faker.internet.userName(),
  user: {
    id: faker.random.number().toString(),
    name: faker.internet.userName()
  }
})

export const fakeCharacter = (
  patch: Partial<CharacterEntity> = {}
): CharacterEntity => ({
  id: faker.random.number().toString(),
  name: faker.internet.userName(),
  user_id: faker.random.number().toString(),
  ...patch
})
