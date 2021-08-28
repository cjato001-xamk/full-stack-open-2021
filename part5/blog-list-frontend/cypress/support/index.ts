/// <reference types="cypress" />

import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  namespace Cypress {
    interface Chainable {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createUser({
        username,
        name,
        password,
      }: {
        username: string
        name: string
        password: string
      }): void
    }
  }
}
