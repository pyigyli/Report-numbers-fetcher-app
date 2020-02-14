import { fetchResponse } from '../fixtures/chatData'

describe('Fetching chat data works', () => {
  it('Data can be fetched with correct token', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        win.fetch = () => Promise.resolve(new Response(fetchResponse))
      }
    })
    cy.get('.TokenInput').first().type('CorrectToken').prev().click()
    cy.get('table').first().should('be.visible')
  })

  it('Errormessage shows when fetch fails', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        win.fetch = () => Promise.reject()
      }
    })
    cy.get('.TokenInput').first().type('WrongToken').prev().click()
    cy.get('.Text').contains('Unable to fetch data, please check your token')
  })
})
