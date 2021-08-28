/// <reference types="cypress" />

import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command for creating a user
       * @example cy.createUser({username: 'test-user', name: 'test-name', password: 'test-password'})
       */
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

      /**
       * Custom command to login given user
       * @example login({username: 'test', password: 'test'})
       */
      login({
        username,
        password,
      }: {
        username: string
        password: string
      }): void
    }
  }
}
