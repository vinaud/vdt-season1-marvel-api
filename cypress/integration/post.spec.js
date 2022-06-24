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
            expect(response.body.character_id.length).to.be.equal(24);
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

    context('quando o usuário não informa todos os dados do cadastro', function(){
        it('deve validar o campo "name"', function(){
            const character = {
                alias: 'Black Bolt',
                team: ['Inumanos', 'iluminatti'],
                active: true
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                expect(response.body.error).to.be.equal('Bad Request');
                expect(response.body.validation.body.message).to.be.equal('\"name\" is required');
            });

        });

        it('deve validar o campo "alias"', function(){
            const character = {
                name: 'Blackagar Boltagon',
                team: ['Inumanos', 'iluminatti'],
                active: true
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                expect(response.body.error).to.be.equal('Bad Request');
                expect(response.body.validation.body.message).to.be.equal('\"alias\" is required');
            });

        });

        it('deve validar o campo "team"', function(){
            const character = {
                name: 'Blackagar Boltagon',
                alias: 'Black Bolt',
                active: true
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                expect(response.body.error).to.be.equal('Bad Request');
                expect(response.body.validation.body.message).to.be.equal('\"team\" is required');
            });

        });

        it('deve validar o campo "active"', function(){
            const character = {
                name: 'Blackagar Boltagon',
                alias: 'Black Bolt',
                team: ['Inumanos', 'iluminatti']
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(400);
                expect(response.body.error).to.be.equal('Bad Request');
                expect(response.body.validation.body.message).to.be.equal('\"active\" is required');
            });

        });

        before(function(){
            cy.back2ThePast();
        })

        it('deve cadastrar mesmo sem preencher o campo "age"', function(){
            const character = {
                name: 'Blackagar Boltagon',
                alias: 'Black Bolt',
                team: ['Inumanos', 'iluminatti'],
                active: true
            }

            cy.postCharacter(character).then(function(response){
                expect(response.status).to.be.equal(201);
                expect(response.body.character_id.length).to.be.equal(24);
            });

        });
        
    })
});