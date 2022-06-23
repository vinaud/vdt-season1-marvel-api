/// <reference types="Cypress" />

describe('GET /characters', function(){

    const characters = [
        {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        },
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['Novos vingadores', 'x-men'],
            active: true
        }
    ]

    before(function(){

        cy.back2ThePast();
        cy.setToken();
        cy.populateCharacters(characters);

    });

    it('deve retornar uma lista de personagens', function(){

        cy.getCharacters().then(function(response){
            expect(response.status).to.eq(200);
            expect(response.body).to.be.a('array');
            expect(response.body.length).to.greaterThan(0);
        });
    })
})