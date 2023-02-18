import { faker } from '@faker-js/faker';

export const fakeData = faker.random
  .word()
  .split('')
  .map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    contents: faker.random
      .word()
      .split('')
      .map(() => ({
        id: faker.datatype.uuid(),
        name: faker.music.songName(),
      })),
  }));
