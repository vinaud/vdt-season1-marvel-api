/// <reference types="Cypress" />

describe('POST /characters', function() {
    
    before(function(){
        cy.request({
            method: 'POST',
            url: '/sessions',
            body:  {
                 email: "vinaud@qacademy.io",
                 password: "qa-cademy"
            }
            
        }).then(function(response){
            expect(response.status).to.eql(200);
            cy.log(response.body.token);
            Cypress.env('token', response.body.token)
        });

        cy.request({
            method: 'DELETE',
            url: '/back2thepast/6297fc216791aa00161c9804'
        }).then(function(response){
            expect(response.status).to.eql(200);
        })
    })

    it('deve cadastrar um personagem', function(){

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.be.equal(201);
        });
    })
});