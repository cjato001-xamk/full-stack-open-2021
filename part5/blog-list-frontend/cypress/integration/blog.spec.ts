describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3133/api/testing/reset')
    cy.createUser({
      username: 'test-user',
      name: 'test-name',
      password: 'test-password',
    })
    cy.visit('http://localhost:3134')
  })

  it('Login form is shown', () => {
    cy.contains('h2', 'Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[name="username"]').type('test-user')
      cy.get('input[name="password"]').type('test-password')
      cy.contains('button', 'Login').click()

      cy.contains('You are logged in as test-name.')
    })

    it('fails with wrong credentials', () => {
      cy.get('input[name="username"]').type('test')
      cy.get('input[name="password"]').type('test')
      cy.contains('button', 'Login').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'You are logged in as')
    })
  })
})
