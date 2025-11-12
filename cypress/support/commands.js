// cypress/support/commands.js

Cypress.Commands.add('completeAutomatedGame', (name, age, country) => {
  cy.log('🚀 START volledig geautomatiseerde game flow');

  // Stap 1: Bezoek de pagina
  cy.visit('https://hackthefuture.bignited.be/', {
    timeout: 60000
  });
  cy.log('✅ Pagina geladen');

  // Stap 2: Wacht tot pagina laadt
  cy.get('body', { timeout: 30000 }).should('be.visible');
  cy.wait(3000);

  // Stap 3: Klik op Start knop op het hoofdscherm
  cy.log('🔍 Zoeken naar Start knop op hoofdscherm...');
  
  cy.contains('Start', { timeout: 10000 })
    .should('be.visible')
    .click();
  cy.log('✅ Start knop geklikt');

  // Stap 4: Wacht tot character select scherm laadt
  cy.wait(5000);
  
  // Stap 5: Vul login formulier in op character select scherm
  cy.get('#whoami', { timeout: 15000 })
    .should('be.visible');
  
  cy.log('📝 Invullen login gegevens...');
  
  // Vul naam in
  cy.get('input[placeholder="Enter your name"]')
    .type(name);
  cy.log('✅ Naam ingevuld');
  
  // Vul leeftijd in
  cy.get('input[placeholder="Enter your age"]')
    .type(String(age));
  cy.log('✅ Leeftijd ingevuld');
  
  // Selecteer land
  cy.get('select.form-control')
    .select(country);
  cy.log('✅ Land geselecteerd');
  
  // Klik op "Start Game" knop
  cy.get('button.center-button')
    .contains('Start Game')
    .click();
  cy.log('✅ Start Game geklikt');

  // Stap 6: Handle popup (als die verschijnt)
  cy.wait(3000);
  
  cy.get('body').then(($body) => {
    if ($body.find('#popup').is(':visible')) {
      cy.log('🪟 Popup gevonden, klik Yes');
      cy.get('#popup button.btn-primary').contains('Yes').click();
    }
  });

  // Stap 7: Wacht en start mission
  cy.wait(5000);
  
  cy.contains('Start the mission', { timeout: 10000 })
    .should('be.visible')
    .click();
  cy.log('✅ Mission gestart');

  // Stap 8: Speel levels - klik door buttons heen
  cy.wait(5000);
  
  for (let level = 1; level <= 10; level++) {
    cy.get('button:visible', { timeout: 5000 })
      .first()
      .click();
    cy.log(`✅ Level ${level} voltooid`);
    cy.wait(2000);
  }

  cy.log('🎉 ALLE LEVELS VOLTOOID!');
});

// Command voor alleen de login
Cypress.Commands.add('autoLogin', (name, age, country) => {
  cy.log('🔐 Automatische login');
  
  cy.visit('https://hackthefuture.bignited.be/');
  cy.wait(5000);
  
  // Klik Start op hoofdscherm
  cy.contains('Start').click();
  cy.wait(5000);
  
  // Vul character select formulier in
  cy.get('input[placeholder="Enter your name"]').type(name);
  cy.get('input[placeholder="Enter your age"]').type(String(age));
  cy.get('select.form-control').select(country);
  cy.get('button.center-button').contains('Start Game').click();
  
  // Handle popup
  cy.wait(3000);
  cy.get('body').then(($body) => {
    if ($body.find('#popup').is(':visible')) {
      cy.get('#popup button.btn-primary').click();
    }
  });
  
  cy.log('✅ Login compleet');
});

// Command om alleen levels te spelen (na login)
Cypress.Commands.add('playLevels', (levelCount = 5) => {
  cy.log('🎮 Start met spelen levels');
  
  // Start mission
  cy.wait(5000);
  cy.contains('Start the mission').click();
  
  // Speel levels
  for (let i = 1; i <= levelCount; i++) {
    cy.wait(2000);
    cy.get('button:visible').first().click();
    cy.log(`✅ Level ${i} voltooid`);
  }
});