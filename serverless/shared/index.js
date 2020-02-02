const faker = require('faker')

module.exports = {
  getFirstName: () => faker.name.firstName(),
  getLastName: () => faker.name.lastName(),
  getPassword: () => faker.internet.password()
}
