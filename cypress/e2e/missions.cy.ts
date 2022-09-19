describe('First visit to missions page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/missions')
    })

    it('Should take user to missions page and render all the correct elements', () => {
        cy.get('[class*=missions-container]')
        cy.contains("Killing is like forgiveness, the more you do it - the easier it gets.")
    })

    it('Should be able to click the next button and render the next message', () => {
        cy.get('[class*=missions-container]')
        cy.get('[class*=DialogFooter]').click()
        cy.contains("I always wipe demon blood on my clothes, it's a nasty habit.")
    })

    it('Should be able to click the accept mission button and move to game page', () => {
        cy.get('[class*=start-button]').click()
        cy.contains('instructions go here')
    })
    
})