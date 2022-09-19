import { createYield } from "typescript"

describe('Starting NUNSLINGER', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/game')
    })
  
    it('Should be able to visit game page and render correct elements', () => {
        cy.contains('instructions go here')
    })

    it('Should be able to dismiss instructions and shoot', () => {
        cy.get('[class*=dismiss-instructions-button]').click()
        cy.get('[class*=trigger-button]').click()
      })

    it('Should be able to retire from hunting and go back to main page', () => {
        cy.get('[class*=back-to-main-page]').click()
        cy.contains('NUNSLINGER')
    })

    // it.only('Should be able to win a game and get daily celebration (with cheat button)', () => {
    //     cy.get('[class*=secret-button]').click()
    //     cy.contains('celebrationEn')
    // })

    it('Should be able lose a game and get losing message', () => {
        cy.get('[class*=dismiss-instructions-button]').click()
        cy.get('[class*=trigger-button]').wait(4000).should('be.visible').click().wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).should('be.visible').click().wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).should('be.visible').click().wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).should('be.visible').click().wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).should('be.visible').click().wait(4000)
        cy.contains('AND THEN THERE WERE NUN')
    })

    it('Should be able to get english celebration', () => {
        cy.intercept('GET', 'http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today', {
            celebrationEn: [{
                date: "2022-09-18",
                season: "ordinary",
                season_week: 25,
                celebrations: [
                {
                title: "25th Sunday in Ordinary Time",
                colour: "green",
                rank: "Sunday",
                rank_num: 2.6
                }
                ],
                weekday: "sunday"
                }]
        })
    })

    it('Should be able to get latin celebration', () => {
        cy.intercept('GET', 'http://calapi.inadiutorium.cz/api/v0/la/calendars/general-la/today', {
            celebrationLa: [{
                date: "2022-09-19",
                season: "ordinary",
                season_week: 25,
                celebrations: [
                {
                title: "Feria secunda, hebdomada XXV per annum",
                colour: "green",
                rank: "feria",
                rank_num: 3.13
                },
                {
                title: "S. Ianuarii, episcopi et martyris",
                colour: "red",
                rank: "memoria ad libitum",
                rank_num: 3.12
                }
                ],
                weekday: "monday"
                }]
        })
    })

    // it('Should be able to toggle between the daily celebration english and latin ', () => {

    //     cy.contains('celebrationEn')
    //     cy.get('[class*=toggle-languages]').click()
    //     cy.contains('celebrationLa')
    // })
    
  })


