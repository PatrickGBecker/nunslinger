

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('First visit to homepage', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should be able to visit page and render correct elements', () => {
    cy.contains('NUNSLINGER')
  })
  
})