/// <reference types="Cypress" />

describe('POST /characters', function() {
    
    before(function(){

        //custom commands

        cy.setToken();

        cy.back2ThePast();
    })

    it('deve cadastrar um personagem', function(){

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.api({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.be.equal(201);
            expect(response.body.character_id.length).to.be.equal(24);
        });
    })
});