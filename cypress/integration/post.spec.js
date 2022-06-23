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

        cy.postCharacter(character).then(function(response){
            expect(response.status).to.be.equal(201);
            expect(response.body.character_id.length).to.be.equal(204);
        });
        
    });

    context('quando o personagem já existe', function(){

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Marcurio',
            team: ['vingadores da costa oeste', 'irmandade de mutantes'],
            active: true
        }

        before(function(){

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(201);
            });
           
        })

        it('não deve cadastrar duplicado', function() {

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                expect(response.body.error).to.be.equal('Duplicate character');
            });
            
        });
    });
});