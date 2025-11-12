// cypress/e2e/spec.cy.js

describe('Volledig geautomatiseerde game test', () => {
  it('should complete the entire game automatically', () => {
    cy.completeAutomatedGame('Sergio', 31, 'Belgium');
  });

  it('should handle multiple players', () => {
    const players = [
      { name: 'Sergio', age: 31, country: 'Belgium' },
      { name: 'Alice', age: 25, country: 'Netherlands' },
      { name: 'Bob', age: 28, country: 'France' }
    ];

    players.forEach(player => {
      cy.log(`🎮 Start game voor: ${player.name}`);
      cy.completeAutomatedGame(player.name, player.age, player.country);
      cy.wait(2000);
    });
  });

  it('should test login separately', () => {
    cy.autoLogin('Sergio', 31, 'Belgium');
    // Hierna kun je manual tests doen of verder automatiseren
  });

  it('should test only levels', () => {
    cy.autoLogin('Sergio', 31, 'Belgium');
    cy.playLevels(3);
  });
});