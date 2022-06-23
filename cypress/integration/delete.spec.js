describe('DELETE /character/id', function(){

    before(function(){

        cy.back2ThePast();
        cy.setToken();
    });

    const tochaHumana = {
        name: "Jhonny Storm",
        alias: "Tocha Humana",
        team: ['Quarteto fantástico'],
        active: true
    }

    context('quando tem um personagem cadastrado', function(){
        before(function(){
            cy.postCharacter(tochaHumana).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        });

        it('deve remover o personagem pelo id', function(){
            const id = Cypress.env('characterId');
            cy.deleteCharacterById(id).then(function(response){
                expect(response.status).to.be.eql(204);
            })
        });

        after(function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.be.eql(404);
            })
        })

        it('deve retornar 404 ao tentar remover personagem não cadastrado', function(){
            const id = '62b4a917d25c4e70050b5951';
            cy.deleteCharacterById(id).then(function(response){
                expect(response.status).to.be.eql(404);
            });
        });

        
    });
});