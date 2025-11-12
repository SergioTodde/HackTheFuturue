// cypress/e2e/spec.cy.js

describe('Volledig geautomatiseerde game test', () => {
  it('should complete game with all login fields', () => {
    cy.completeAutomatedGame('Sergio', 31, 'Belgium');
  });

  it('should test login only with all fields', () => {
    cy.autoLoginComplete('Sergio', 31, 'Belgium');
  });

  it('should test multiple players with different data', () => {
    cy.testMultiplePlayers();
  });

  it('should test different age scenarios', () => {
    const testCases = [
      { name: 'YoungPlayer', age: 18, country: 'Belgium' },
      { name: 'AdultPlayer', age: 30, country: 'Netherlands' },
      { name: 'SeniorPlayer', age: 65, country: 'France' }
    ];

    testCases.forEach(testCase => {
      cy.autoLoginComplete(testCase.name, testCase.age, testCase.country);
      cy.wait(2000);
    });
  });
});