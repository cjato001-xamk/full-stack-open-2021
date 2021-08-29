Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3133/api/users', {
    username,
    name,
    password,
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3133/api/auth/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body.data))
    cy.visit('http://localhost:3134')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3133/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }).then(() => {
    cy.visit('http://localhost:3134')
  })
})
