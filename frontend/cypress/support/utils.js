import { faker } from "@faker-js/faker";

export const fakeUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  validPassword: faker.string.alphanumeric(6),
};

export const fakeUserLogin = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  validPassword: faker.string.alphanumeric(6),
};
