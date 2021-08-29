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

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'test-user', password: 'test-password' })
    })

    it('a blog can be created', () => {
      cy.contains('button', '+ Create new').click()
      cy.contains('h2', 'Create new blog')

      cy.get('input[name="title"]').type('test-title')
      cy.get('input[name="author"]').type('test-author')
      cy.get('input[name="url"]').type('test-url')

      cy.contains('button', 'Create').click()

      cy.get('.success').should(
        'contain',
        'A new blog "test-title" by "test-author" added.'
      )

      cy.get('div').should('contain', 'test-title test-author')
    })

    describe('when a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test-title',
          author: 'test-author',
          url: 'test-url',
        })
      })

      it.only('a blog can be liked', () => {
        cy.contains('button', 'Show details').click()

        cy.get('li').should('contain', 'Likes: 0')

        cy.contains('button', 'Like').click()
        cy.get('button').should('contain', 'Liking...')

        cy.get('li').should('contain', 'Likes: 1')
      })
    })
  })
})
