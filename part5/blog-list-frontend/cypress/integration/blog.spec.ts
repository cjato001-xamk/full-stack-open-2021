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

      it('a blog can be liked', () => {
        cy.contains('button', 'Show details').click()

        cy.get('li').should('contain', 'Likes: 0')

        cy.contains('button', 'Like').click()

        cy.get('li').should('contain', 'Likes: 1')
      })

      it('a blog creator can remove a blog', () => {
        cy.contains('button', 'Show details').click()
        cy.contains('button', 'Remove').click()
        cy.get('span').should('contain', 'Are you sure?')
        cy.contains('button', 'Yes').click()

        cy.get('.success').should('contain', 'Blog "test-title" removed.')
      })

      it('a blog cannot be removed by a non-creator', () => {
        cy.createUser({
          username: 'test-user-2',
          name: 'test-name-2',
          password: 'test-password-2',
        })

        cy.contains('button', 'Logout').click()

        cy.login({ username: 'test-user-2', password: 'test-password-2' })

        cy.contains('button', 'Show details').click()

        cy.contains('button', 'Remove').should('not.exist')
      })
    })

    describe('when multiple blogs exist', () => {
      beforeEach(() => {
        for (let i = 1; i < 5; i++) {
          cy.createBlog({
            title: `test-title-${i}`,
            author: `test-author-${i}`,
            url: `test-url-${i}`,
            visit: i === 4,
          })
        }
      })

      it('blogs should be sorted by likes, most likes first', () => {
        // Open details for test-3
        cy.contains('#blogs div span.header', 'test-title-3')
          .contains('button', 'Show details')
          .click()

        // Like test-3
        cy.contains('li', 'test-url-3')
          .next('li')
          .contains('button', 'Like')
          .click()

        // Wait for the updates
        cy.contains('button', 'Liking...').should('not.exist')
        cy.contains('p', 'Updating bloglist...').should('not.exist')

        // test-3 should be first in list
        cy.get('#blogs>div').eq(0).should('contain', 'test-title-3')

        // Open details for test-2
        cy.contains('#blogs div span.header', 'test-title-2')
          .contains('button', 'Show details')
          .click()

        // Like test-2
        cy.contains('li', 'test-url-2')
          .next('li')
          .contains('button', 'Like')
          .click()
        // Wait for the updates
        cy.contains('button', 'Liking...').should('not.exist')
        cy.contains('p', 'Updating bloglist...').should('not.exist')

        // Like test-2 again
        cy.contains('li', 'test-url-2')
          .next('li')
          .contains('button', 'Like')
          .click()

        // Wait for the updates
        cy.contains('button', 'Liking...').should('not.exist')
        cy.contains('p', 'Updating bloglist...').should('not.exist')

        // test-2 should be first in list
        cy.get('#blogs>div').eq(0).should('contain', 'test-title-2')
        // test-2 should have 2 likes
        cy.contains('li', 'test-url-2').next('li').contains('Likes: 2')

        // test-3 should be second in list
        cy.get('#blogs>div').eq(1).should('contain', 'test-title-3')
        // test-3 should have 1 like
        cy.contains('li', 'test-url-3').next('li').contains('Likes: 1')

        // third item in the list should have 0 likes
        cy.get('#blogs>div').eq(2).contains('button', 'Show details').click()
        cy.get('#blogs>div')
          .eq(2)
          .contains('li', 'test-url-')
          .next('li')
          .contains('Likes: 0')

        // fourth item in the list should have 0 likes
        cy.get('#blogs>div').eq(3).contains('button', 'Show details').click()
        cy.get('#blogs>div')
          .eq(3)
          .contains('li', 'test-url-')
          .next('li')
          .contains('Likes: 0')
      })
    })
  })
})
