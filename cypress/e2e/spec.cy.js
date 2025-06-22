describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Remove tarefas completadas', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input')
      .type('Primeira tarefa{enter}')
      .type('Segunda tarefa{enter}')

    cy.get('[data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('.clear-completed')
      .click();

    cy.get('[data-cy=todos-list]').children().should('have.length', 1)
      .first()
      .should('have.text', 'Segunda tarefa');
  });

  it('Edita uma tarefa', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .as('input')
      .type('Tarefa de exemplo{enter}')

    cy.contains('[data-cy=todos-list] li', 'Tarefa de exemplo')
      .as('tarefa')
      .dblclick();

    cy.get('@tarefa')
      .find('.edit')
      .as('inputEdicao')
      .clear()
      .type('Tarefa de exemplo modificada{enter}')

    cy.get('[data-cy=todos-list] > li')
      .should('contain.text', 'Tarefa de exemplo modificada')

    cy.get('[data-cy=todos-list]')
      .children()
      .its('length')
      .should('eq', 1)
  })

  it('Marca 3 tarefas como completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}')

    cy.get('.toggle-all-label').click();

    cy.get('[data-cy=todos-list] li')
      .should('have.length', 3)
      .each(($el) => {
        cy.wrap($el).should('have.class', 'completed');
      });
  })
});