/// <reference types="cypress" />
import cadastrarUsuario from "../support/commands"

describe('Testes da Funcionalidade Usuários Serverest', () => {
   let token
    before(() => {
        cy.token('teste@gmail.com.br', '@123').then(tkn => { token = tkn })
    });

  it('Deve validar contrato de usuários - GET', () => {
    cy.request({
      method: 'GET',
      url:'usuarios/0uxuPY0cbmQhpEz1',
      headers: {authorization: token}
    }).then(response =>{
      expect(response.status).to.equal(200)
    })
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
    let email = `smgs${Math.floor(Math.random() * 1000)}@gmail.com.br`
    cy.cadastrarUsuario('Sara Maria Gonçalves', email,'@123')
    .then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            cy.log(response.body.authorization)
        })
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.request({
        method: 'POST', 
        url: 'usuarios', 
        body:{
            "nome": 'Sara Gonçalves',
            "email": 'smgs1@gmail.com.br',
            "password": '@teste123',
            "administrador": "true"
        }, 
        failOnStatusCode: false
      }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Este email já está sendo usado')
    })
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    let nome = ` Sara ${Math.floor(Math.random() * 100000000)}`
    cy.cadastrarUsuario('Sara Maria Gonçalves', 'teste@gmail.com.br','@123')
       .then(response =>{
      let id = response.body._id
      cy.request({
      method: 'PUT',
      url:`usuarios/${id}`,
      headers: {authorization: token},
      body: {
        "nome": nome,
        "email": "test123@gmail.com.br",
        "password": "@123",
        "administrador": "true"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Este email já está sendo usado')
    })
    })
  });
   

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    cy.cadastrarUsuario('SMGS', 'ssmg@gmail.com.br','@t123')
       .then(response =>{
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url:`usuarios/${id}`,
          headers: {authorization: token},
        })
       })
 
  })
})
