describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login required').should('not.visible')
    cy.contains('login here').click()
    cy.contains('login required').should('be.visible')
    cy.get('form').find('input[name=username]')
    cy.get('form').find('input[name=password]')
    cy.get('form').children('button').contains('login')
  })
})