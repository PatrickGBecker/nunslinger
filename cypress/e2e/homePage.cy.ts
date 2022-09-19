describe('First visit to homepage', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('Should be able to visit page and render correct elements', () => {
      cy.contains('NUNSLINGER')
    })

    // it('Should render a error message if user visits invalid URL', () => {
    //     cy.visit('http://localhost:3000/example')
    //       .contains('This Path Does Not Exist!')
    //   })
    
  })