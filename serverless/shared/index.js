import faker from 'faker'

export const getFirstName = () => faker.name.firstName()
export const getLastName = () => faker.name.lastName()
export const getPassword = () => faker.internet.password()
