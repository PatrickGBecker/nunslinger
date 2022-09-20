describe('First visit to missions page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/missions')
    })

    it('Should take user to missions page and render all the correct elements', () => {
        cy.get('[class*=missions-container]')
        cy.contains("Sister Beretta: Forgive me father, for I have sinned. My last confession was-")
    })

    it('Should be able to click the next button and render the next message', () => {
        cy.get('[class*=missions-container]')
        cy.get('[class*=DialogFooter]').click()
        cy.contains("Father Felix: I know when it was, where the hell have you been for the last two years?")
    })

    it('Should be able to click the accept mission button and move to game page', () => {
        cy.get('[class*=start-button]').click()
        cy.contains('Time to exorcise!')
    })
    
})