
describe('Componente de Login', () => {
  beforeEach(() => {
    // Visita a página principal onde o componente Login está renderizado
    cy.visit('/');
  });

  it('deve simular o login via SSO da OFM', () => {
    // Simula o clique no botão de login via SSO da OFM
    cy.get('button')
      .contains('Entrar com SSO da OFM')
      .click();

    // Aguarda a nova página carregar e procura pelo campo de username
    cy.origin('http://localhost:5175', () => {
      // Simula a entrada do usuário e senha
      cy.get('input[name="username"]').type('joao.mendes');
      cy.get('input[name="password"]').type('password123');

      // Submete o formulário de login
      cy.get('button[type="submit"]').click();
    });

    // Verifica se a mensagem do modal aparece
    cy.contains('Estamos redirecionando você...').should('be.visible');

    // Verifica se o redirecionamento para o dashboard ocorre
    cy.url().should('include', '/dashboard');
  });
});
