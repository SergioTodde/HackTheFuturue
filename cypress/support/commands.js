// cypress/support/commands.js

Cypress.Commands.add('completeAutomatedGame', (name, age, country) => {
  cy.log('🚀 START volledig geautomatiseerde game flow');


  cy.visit('https://hackthefuture.bignited.be/');
  cy.log('✅ Pagina geladen');
  cy.wait(3000);


  cy.log('🔍 Zoeken naar Start knop op eerste scherm...');
  cy.contains('Start', { timeout: 10000 })
    .click();
  cy.log('✅ Start knop geklikt - animaties starten');


  cy.log('⏳ Wachten tot Start knop verdwijnt...');
 
    cy.wait(30000);
  cy.log('✅ Start knop is verdwenen');


  cy.log('⏳ Wachten op welkomstbericht...');
  cy.contains('Welcome to the Character Select', { timeout: 20000 })
    .click();
  cy.log('✅ Welkomstbericht gevonden');



  cy.get('#male').click();
  cy.log('✅ Karakter geselecteerd');


  cy.log('⏳ Wachten tot login formulier zichtbaar wordt...');
  cy.contains('Yes')
    .click()

  cy.log('✅ Login formulier is zichtbaar!');

  cy.log('📝 Invullen van ALLE login gegevens...');
  
  cy.get('input[placeholder="Enter your name"]')
    .clear()
    .type(name);
  cy.log(`✅ Naam ingevuld: ${name}`);

  cy.get('input[placeholder="Enter your age"]')
    .clear()
    .type(String(age));
  cy.log(`✅ Leeftijd ingevuld: ${age}`);

  cy.get('select.form-control')
    .select(country);
  cy.log(`✅ Land geselecteerd: ${country}`);

  cy.get('button.center-button')
    .contains('Start Game')
    .click();
  cy.log('✅ Start Game geklikt');

  cy.wait(3000);
  cy.get('body').then(($body) => {
    if ($body.find('#popup:visible').length > 0) {
      cy.log(' Popup gevonden, klik Yes');
      cy.get('#popup button.btn-primary').contains('Yes').click();
      cy.log(' Popup bevestigd');
    } else {
      cy.log(' Geen popup gevonden');
    }
  });

  
  cy.wait(5000);
  cy.contains('letter-and-crystal', { timeout: 15000 })
    .click('letter-and-crystal');
  cy.log('✅ Mission gestart');


  cy.wait(5000);
  cy.log('🎮 Beginnen met levels spelen...');
  
  for (let level = 1; level <= 10; level++) {
    cy.get('button:visible', { timeout: 5000 })
      .first()
      .click();
    cy.log(`✅ Level ${level} voltooid`);
    cy.wait(2000);
  }

  cy.log(' ALLE LEVELS VOLTOOID!');
}); 

