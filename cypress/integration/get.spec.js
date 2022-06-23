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
});

describe('GET /characters/id', function(){

    before(function(){

        cy.back2ThePast();
        cy.setToken();
    });

    const tonyStark = {
        name: "Tony Stark",
        alias: "Homem de Ferro",
        team: ['Vingadores'],
        active: true
    }

    context('quando tem um personagem cadastrado', function(){
        before(function(){
            cy.postCharacter(tonyStark).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        });

        it('deve buscar o personagem pelo id', function(){
            const id = Cypress.env('characterId');
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.be.eql(200);
                expect(response.body.alias).to.be.eql('Homem de Ferro');
                expect(response.body.team).to.be.eql(['Vingadores']);
                expect(response.body.active).to.be.eql(true);
            })
        });

        it('deve retornar 404 ao buscar personagem não cadastrado', function(){
            const id = '62b4a917d25c4e70050b5951';
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.be.eql(404);
            });
        });

        
    });
});