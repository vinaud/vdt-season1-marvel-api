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
    });

    it('deve buscar personagem por nome', function(){
        cy.searchCharacters('Logan').then(function(response){
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.eql(1); 
            expect(response.body[0].alias).to.be.eql('Wolverine');
            expect(response.body[0].team).to.be.eql(['Novos vingadores', 'x-men']);
            expect(response.body[0].active).to.be.eql(true);
        });

    });
})