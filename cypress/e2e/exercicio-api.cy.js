/// <reference types="cypress" />
import '.support/commands'

describe('Testes da Funcionalidade Usuários Serverest', () => {
   let token
    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    });

  it('Deve validar contrato de usuários - GET', () => {
    //TODO: 
  });

  it('Deve listar usuários cadastrados - GET', () => {
     cy.request ({
    method: 'GET',
    url: 'usuarios',
    }).then((response) => {
            expect(response.status).to.equal(200)
            cy.log(response.body.authorization)
        })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    cy.request ({
    method: 'POST',
    url: 'usuarios',
    body:{
      "nome": "Sara Maria Gonçalves",
      "email": "smgs1@gmail.com.br",
      "password": "@123",
      "administrador": "true"
    }
    }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            cy.log(response.body.authorization)
        })
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.request ({
    method: 'POST',
    url: 'usuarios',
    body:{
      "nome": "Sara Gonçalves",
      "email": "smgs1@gmail.com.br",
      "password": "@teste",
      "administrador": "true"
    }
    }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Este email já está sendo usado')
            cy.log(response.body.authorization)
        })
  });

  it.only('Deve editar um usuário previamente cadastrado - PUT', () => {
  let nome = `Fulanin ${Math.floor(Math.random() * 100000000)}`
  let id = response.body._id
    cy.request ({
    method: 'PUT',
    url: `usuarios/${id}`,
    headers: {authorization:token},
    body:{
      "nome": nome,
      "email": "beltrano@qa.com.br",
      "password": "teste",
      "administrador": "true"
    }
    }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Registro alterado com sucesso')
            cy.log(response.body.authorization)
    }); 
  })

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    //TODO: 
  });


});
