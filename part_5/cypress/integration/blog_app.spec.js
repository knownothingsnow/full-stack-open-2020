describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      'username': 'zhang',
      'name': 'san',
      'password': '123'
    })
    cy.visit('http://localhost:3000')
    cy.get('form').find('input[name=username]').as('username')
    cy.get('form').find('input[name=password]').as('password')
    cy.get('form').children('button').contains('login').as('loginBtn')
  })

  it('Login form is shown', function() {
    cy.contains('login required').should('not.visible')
    cy.contains('login here').click()
    cy.contains('login required').should('be.visible')
    cy.get('form').find('input[name=username]').as('username')
    cy.get('form').find('input[name=password]').as('password')
    cy.get('form').children('button').contains('login').as('loginBtn')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.contains('login here').click()
      cy.get('@username').type('zhang')
      cy.get('@password').type('123')
      cy.get('@loginBtn').click()
      cy.contains('zhang logged in')
      cy.contains('logout!').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('login here').click()
      cy.get('@username').type('zhang')
      cy.get('@password').type('something wrong')
      cy.get('@loginBtn').click()
      cy.get('.message.error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'zhang', password: '123' })
      cy.get('#blogs').children().should('not.exist')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('form').find('input[name=title]').as('title').type('A new way to test')
      cy.get('form').find('input[name=author]').as('author').type('zhang san')
      cy.get('form').find('input[name=url]').as('url').type('some-genius.dev')
      cy.get('form').children('button').click()
      cy.get('#blogs').children().should('have.length', 1)
      cy.get('#blogs').first().get('.blog-title').contains('A new way to test')
      cy.get('#blogs').first().get('.blog-author').contains('zhang san')
    })

    describe.only('manipulate a blog', function () {
      beforeEach(function () {
        cy.createBlog('a regular blog', 'a regular guy', 'a regular url')
          .then(() => {
            return cy.request('POST', 'http://localhost:3001/api/users', {
              'username': 'lee',
              'name': 'si',
              'password': '123'
            })
          })
      })
      it('add like of a blog', function () {
        cy.contains('view').click()
        cy.get('.blog-likes').contains('like')
          .click().parent().contains('Likes:1').contains('like')
          .click().parent().contains('Likes:2').contains('like')
          .click().parent().contains('Likes:3')
      })
      it.only('delete a blog', function () {
        cy.createBlog('a regular blog2', 'a regular guy2', 'a regular url2')
        cy.get('.blog-toggle').first().click()
        cy.get('.aBlog').first().contains('remove').click()
        cy.get('#blogs').children().should('have.length', 1)
        cy.contains('logout!').click()
        cy.login({ username: 'lee', password: '123' })
        cy.get('.blog-toggle').first().click()
        cy.get('.aBlog').first().contains('remove').click()
        cy.get('.message.error')
          .contains('delete blog a regular blog failed')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })
})