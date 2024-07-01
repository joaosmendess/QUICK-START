describe("Gerenciar aplicação para permissão", () => {
    it("Cadastrar uma nova aplicação de permissão com sucesso", () => {
        cy.visit("/aplicacao-permissao/gerenciar");
        cy.get('input[placeholder="Ex.: SGC"]').type("XPTO");
        cy.get(".ql-editor").type("Sistema de Gerenciamento de Conteúdo");
        cy.get('input[placeholder=""]').first().type("http://develop.example.com");
        cy.get('input[placeholder=""]').eq(1).type("http://homolog.example.com");
        cy.get('input[placeholder=""]')
        .last()
        .type("http://production.example.com");
        cy.get("button").contains("Salvar").click();
        cy.contains("A aplicação foi salva com sucesso.").should("be.visible");
    });
    it("Visualizar a lista de aplicações para permissão", () => {
      cy.visit("/aplicacao-permissao/lista");
      cy.contains("XPTO").should("be.visible");
      cy.contains("Sistema de Gerenciamento de Conteúdo").should("be.visible");
    });
    
  it('Tentar cadastrar uma aplicação de permissão sem preencher o campo obrigatório "Nome"', () => {
    cy.visit("/aplicacao-permissao/gerenciar");
    cy.get(".ql-editor").type("Sistema de Gerenciamento de Conteúdo");
    cy.get('input[placeholder=""]').first().type("http://develop.example.com");
    cy.get('input[placeholder=""]').eq(1).type("http://homolog.example.com");
    cy.get('input[placeholder=""]')
      .last()
      .type("http://production.example.com");
    cy.get("button").contains("Salvar").click();
    cy.contains("Todos os campos obrigatórios devem ser preenchidos.").should(
      "be.visible"
    );
  });

  it("Editar uma aplicação de permissão existente com sucesso", () => {
    cy.visit("/aplicacao-permissao/lista");
    cy.contains("XPTO")
      .parent()
      .parent()
      .find('button[aria-label="menu"]')
      .click();
      
    cy.get('li[aria-label="editar"]').click();
    cy.get('input[value="XPTO"]').clear();
    cy.get('input[placeholder="Ex.: SGC"]').type("XPTO Editado");
    cy.get("button").contains("Salvar").click();
    cy.contains("A aplicação foi editada com sucesso.").should("be.visible");
  });

  it("Tentar editar uma aplicação de permissão para um nome já existente", () => {
    cy.visit("/aplicacao-permissao/lista");
    cy.contains("XPTO Editado")
      .parent()
      .parent()
      .find('button[aria-label="menu"]')
      .click();
    cy.get('li[aria-label="editar"]').click();
    cy.get('input[value="XPTO Editado"]').clear().type("SGC");
    cy.get("button").contains("Salvar").click();
    cy.contains("O nome SGC já está em uso").should("be.visible");
  });

  it("Cancelar a exclusão de uma aplicação de permissão", () => {
    cy.visit("/aplicacao-permissao/lista");
    cy.contains("XPTO Editado")
      .parent()
      .parent()
      .find('button[aria-label="menu"]')
      .click();
    cy.get('li[aria-label="delete"]').click();
    cy.contains("Tem certeza de que deseja excluir esta aplicação?").should(
      "be.visible"
    );
    cy.get("button").contains("Não").click();
    cy.url().should("include", "/aplicacao-permissao/lista");
  });

  it("Excluir uma aplicação de permissão com sucesso", () => {
    cy.visit("/aplicacao-permissao/lista");
    cy.contains("XPTO Editado")
      .parent()
      .parent()
      .find('button[aria-label="menu"]')
      .click();
    cy.get('li[aria-label="delete"]').click();
    cy.contains("Tem certeza de que deseja excluir esta aplicação?").should(
      "be.visible"
    );
    cy.get("button").contains("Sim").click();
    cy.contains("Aplicação excluída com sucesso!").should("be.visible");
  });

  it("Pesquisar uma aplicação de permissão por nome", () => {
    cy.visit("/aplicacao-permissao/lista");
    cy.get('input[placeholder="Pesquisar"]').type("SGC");
    cy.contains("SGC").should("be.visible");
    cy.contains("ERP").should("not.exist");
  });
});
