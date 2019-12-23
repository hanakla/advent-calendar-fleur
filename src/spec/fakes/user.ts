import { UserEntity } from "domains/Users/types";
import faker from "faker";

export const fakeUser = (part: Partial<UserEntity> = {}): UserEntity => ({
  id: faker.random.number().toString(),
  name: faker.internet.userName(),
  ...part
});
