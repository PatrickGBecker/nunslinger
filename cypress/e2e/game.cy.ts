

describe('Starting NUNSLINGER', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/game')

        cy.intercept('GET', 'http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today', {
            date: "2022-09-19",
            season: "Very ordinary",
            season_week: 25,
            celebrations: [
                {
                    title: "NUNNIES HAVE ARRIVED",
                    colour: "green",
                    rank: "ferial",
                    rank_num: 3.13
                },
                {
                    title: "NUNNIES HAVE ARRIVED",
                    colour: "red",
                    rank: "optional memorial",
                    rank_num: 3.12
                }
            ],
            weekday: "Nunday"
        })

        cy.intercept('GET', 'http://calapi.inadiutorium.cz/api/v0/la/calendars/general-la/today', {
            date: "2022-09-19",
            season: "Super ordinary",
            season_week: 24,
            celebrations: [
                {
                    title: "BUNNIES HAVE ARRIVED",
                    colour: "green",
                    rank: "feria",
                    rank_num: 5.00
                },
                {
                    title: "BUNNIES HAVE ARRIVED",
                    colour: "red",
                    rank: "memoria ad libitum",
                    rank_num: 5.00
                }
            ],
            weekday: "Nunday"
        })
    })


    it('Should be able to visit game page and render correct elements', () => {
        cy.contains('Time to exorcise!')
    })

    it('Should be able to dismiss instructions and shoot', () => {
        cy.get('[class*=dismiss-instructions-button]').click()
        cy.get('[class*=trigger-button]').click()
    })

    it('Should be able to retire from hunting and go back to main page (with secret button)', () => {
        cy.get('[class*=secret-celebration-button]').click({ force: true })
        cy.get('[class*=back-to-main-page]').click()
        cy.contains('NUNSLINGER')
    })

    it('Should be able to win a game and get daily celebration (with secret button)', () => {
        cy.get('[class*=secret-celebration-button]').click({ force: true })
        cy.contains("Thanks for kicking ass for The Lord, I mean, for me! Here's your daily bread, sister!")
    })

    it('Should be able lose a game and get losing message', () => {
        cy.get('[class*=dismiss-instructions-button]').click()
        cy.get('[class*=trigger-button]').wait(4000).should('be.visible').click({ multiple: true }).wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).click({ multiple: true }).wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).click({ multiple: true }).wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).click({ multiple: true }).wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).click().wait(4000)
        cy.get('[class*=trigger-button]').wait(4000).click().wait(4000)
        cy.contains('h1', 'AND THEN THERE WERE NUN')
    })

    it('Should be able to toggle between the daily celebration english and latin ', () => {
        cy.get('[class*=secret-celebration-button]').click({ force: true })
        cy.contains('NUNNIES HAVE ARRIVED')
        cy.get('[class*=toggle-languages]').click()
        cy.contains('BUNNIES HAVE ARRIVED')
    })

})


